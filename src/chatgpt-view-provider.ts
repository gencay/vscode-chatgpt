import { ChatGPTAPI } from 'chatgpt';
import * as vscode from 'vscode';

const sendSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>`;

export default class ChatGptViewProvider implements vscode.WebviewViewProvider {
	private webView?: vscode.WebviewView;
	private chatGptApi?: ChatGPTAPI;
	private sessionToken?: string;
	public subscribeToResponse: boolean;

	/**
	 * Message to be rendered lazily if they haven't been rendered
	 * in time before resolveWebviewView is called.
	 */
	private leftOverMessage?: any;

	constructor(private context: vscode.ExtensionContext) {
		this.subscribeToResponse = vscode.workspace.getConfiguration("chatgpt").get("response.showNotification") || false;
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
					vscode.window.showErrorMessage("Failed to get response in 60 seconds. Please try again.");
				}
			}, 60000);

			response = await this.chatGptApi.sendMessage(question);

			if (this.subscribeToResponse) {
				vscode.window.showInformationMessage('ChatGPT responded to your question.', "Open conversation").then(async () => {
					await vscode.commands.executeCommand('vscode-chatgpt.view.focus');
				});
			}
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
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/default.min.css">
				<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js"></script>
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
						<div class="flex-1 textarea-wrapper">
							<textarea
								type="text"
								rows="1"
								id="question-input"
								placeholder="Ask a question..."
								onInput="this.parentNode.dataset.replicatedValue = this.value"></textarea>
						</div>
						<button class="right-8 absolute ask-button rounded-lg p-0.5 ml-5" id="ask-button">
							${sendSvg}
						</button>
					</div>
				</div>

				<script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}
