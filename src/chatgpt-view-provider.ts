import { ChatGPTAPI } from 'chatgpt';
import * as vscode from 'vscode';

export default class ChatGptViewProvider implements vscode.WebviewViewProvider {
	private webView?: vscode.WebviewView;
	private chatGptApi?: ChatGPTAPI;
	private sessionToken?: string;

	/**
	 * Message to be rendered lazily if they haven't been rendered
	 * in time before resolveWebviewView is called.
	 */
	private leftOverMessage?: any;

	constructor(private context: vscode.ExtensionContext) {
	}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		_context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this.webView = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this.context.extensionUri
			]
		};

		webviewView.webview.html = this.getWebviewHtml(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(async data => {
			switch (data.type) {
				case 'addFreeTextQuestion':
					this.sendApiRequest(data.value);
					break;
				case 'editCode':
					vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(data.value));
					break;
				case 'openNew':
					const document = await vscode.workspace.openTextDocument({
						content: data.value,
					});
					vscode.window.showTextDocument(document);
					break;
				default:
					break;
			}
		});

		if (this.leftOverMessage != null) {
			// If there were any messages that wasn't delivered, render after resolveWebView is called.
			this.sendMessage(this.leftOverMessage);
			this.leftOverMessage = null;
		}
	}

	public async sendApiRequest(prompt: string, code?: string) {
		if (this.chatGptApi == null || this.sessionToken == null) {
			this.sessionToken = await this.context.globalState.get("chatgpt-session-token") as string;

			if (this.sessionToken == null) {
				await vscode.window
					.showInputBox({ prompt: "Please enter your OpenAPI session token (__Secure-next-auth.session-token)" })
					.then((value) => {
						this.sessionToken = value!;
						this.context.globalState.update("chatgpt-session-token", this.sessionToken);
					});
			}

			try {
				this.chatGptApi = new ChatGPTAPI({ sessionToken: this.sessionToken });
			} catch (error: any) {
				vscode.window.showErrorMessage("Failed to instantiate the ChatGPT API. Try ChatGPT: Clear session.", error?.message);
				return;
			}
		}

		let response: string;
		let question = prompt;

		if (code != null) {
			// Add prompt prefix to the code if there was a code block selected
			question = `${prompt}: ${code}`;
		}

		// If the ChatGPT view is not in focus/visible; focus on it to render Q&A
		if (this.webView == null) {
			await vscode.commands.executeCommand('vscode-chatgpt.view.focus');
		} else {
			this.webView?.show?.(true);
		}

		this.sendMessage({ type: 'addQuestion', value: prompt, code });

		try {
			await this.chatGptApi.ensureAuth();

			setTimeout(() => {
				if (!response) {
					this.sendMessage({ type: 'addError' });
					vscode.window.showErrorMessage("Failed to get response in 30 seconds. Please try again.");
				}
			}, 30000);

			response = await this.chatGptApi.sendMessage(question);
		} catch (error: any) {
			vscode.window.showErrorMessage("Failed to instantiate the ChatGPT API. Try ChatGPT: Clear session.", error?.message);
			return;
		}

		this.sendMessage({ type: 'addResponse', value: response });
	}

	/**
	 * Message sender, stores if a message cannot be delivered
	 * @param message Message to be sent to WebView
	 */
	public sendMessage(message: any) {
		if (this.webView) {
			this.webView?.webview.postMessage(message);
		} else {
			this.leftOverMessage = message;
		}
	}

	private getWebviewHtml(webview: vscode.Webview) {

		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'main.js'));
		const stylesMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'main.css'));

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${stylesMainUri}" rel="stylesheet">

				<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
				<script src="https://cdn.tailwindcss.com"></script>
			</head>
			<body class="overflow-hidden">
				<div class="flex flex-col h-screen">
					<div class="flex-1 overflow-y-auto" id="qa-list"></div>
					<div id="in-progress" class="pl-4 flex items-center hidden">
						<div class="typing">Typing</div>
						<div class="spinner">
							<div class="bounce1"></div>
							<div class="bounce2"></div>
							<div class="bounce3"></div>
						</div>
					</div>
					<div class="p-4 flex items-center">
						<div class="flex-1">
							<textarea
								type="text"
								rows="2"
								class="border p-2 w-full"
								id="question-input"
								placeholder="Ask a question..."
							></textarea>
						</div>
						<button style="background: var(--vscode-button-background);color: var(--vscode-button-foreground)" id="ask-button" class="p-2 ml-5">
							Ask
						</button>
					</div>
				</div>

				<script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}
