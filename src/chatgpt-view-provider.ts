/**
 * @author Ali Gençay
 * https://github.com/gencay/vscode-chatgpt
 *
 * @license
 * Copyright (c) 2022 - Present, Ali Gençay
 *
 * All rights reserved. Code licensed under the MIT license
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */

import { ChatGPTAPI, ChatGPTConversation } from 'chatgpt';
import * as vscode from 'vscode';

export default class ChatGptViewProvider implements vscode.WebviewViewProvider {
	private webView?: vscode.WebviewView;
	private chatGptApi?: ChatGPTAPI;
	private chatGptConversation?: ChatGPTConversation;
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
						language: data.language
					});
					vscode.window.showTextDocument(document);
					break;
				case 'clearConversation':
					this.prepareConversation();
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

	private async prepareConversation(): Promise<boolean> {
		this.sessionToken = await this.context.globalState.get("chatgpt-session-token") as string;

		if (this.sessionToken == null) {
			await vscode.window
				.showInputBox({ prompt: "Please enter your OpenAPI session token (__Secure-next-auth.session-token)", ignoreFocusOut: true, placeHolder: "Enter the JWT Token starting with ey***" })
				.then((value) => {
					this.sessionToken = value!;
					this.context.globalState.update("chatgpt-session-token", this.sessionToken);
				});
		}

		if (this.chatGptApi == null || this.chatGptConversation == null) {
			try {
				this.chatGptApi = new ChatGPTAPI({ sessionToken: this.sessionToken });
				this.chatGptConversation = this.chatGptApi.getConversation();
			} catch (error: any) {
				vscode.window.showErrorMessage("Failed to instantiate the ChatGPT API. Try ChatGPT: Clear session.", error?.message);
				this.sendMessage({ type: 'addError' });
				return false;
			}
		}

		return true;
	}

	public async sendApiRequest(prompt: string, code?: string) {
		await this.prepareConversation();

		if (this.chatGptApi == null || this.chatGptConversation == null) {
			return;
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

			response = await this.chatGptConversation.sendMessage(question, {
				timeoutMs: 2 * 60 * 1000
			});

			if (this.subscribeToResponse) {
				vscode.window.showInformationMessage("ChatGPT responded to your question.", "Open conversation").then(async () => {
					await vscode.commands.executeCommand('vscode-chatgpt.view.focus');
				});
			}
		} catch (error: any) {
			vscode.window.showErrorMessage("An error occured. If the issue persists try 'ChatGPT: Clear session.'", error?.message);
			this.sendMessage({ type: 'addError' });
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

		const vendorHighlightCss = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'vendor', 'highlight.min.css'));
		const vendorHighlightJs = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'vendor', 'highlight.min.js'));
		const vendorMarkedJs = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'vendor', 'marked.min.js'));
		const vendorTailwindJs = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'vendor', 'tailwindcss.3.2.4.min.js'));
		const vendorTurndownJs = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'vendor', 'turndown.js'));

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${stylesMainUri}" rel="stylesheet">
				<link href="${vendorHighlightCss}" rel="stylesheet">
				<script src="${vendorHighlightJs}"></script>
				<script src="${vendorMarkedJs}"></script>
				<script src="${vendorTailwindJs}"></script>
				<script src="${vendorTurndownJs}"></script>
			</head>
			<body class="overflow-hidden">
				<div class="flex flex-col h-screen">
					<div id="introduction" class="flex h-full items-center justify-center px-6 w-full relative">
						<div class="flex items-start text-center gap-3.5">
							<div class="flex flex-col gap-3.5 flex-1">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="w-6 h-6 m-auto">
									<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
								</svg>
								<h2 class="text-lg font-normal">Features</h2>
								<ul class="flex flex-col gap-3.5">
									<li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">Optimized for dialogue</li>
									<li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">Improve your code, add tests & find bugs</li>
									<li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">Copy or create new files automatically</li>
									<li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">Syntax highlighting with auto language detection</li>
								</ul>
							</div>
							<div class="flex flex-col gap-3.5 flex-1">
								<svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 m-auto" height="1em" width="1em"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
									<line x1="12" y1="9" x2="12" y2="13"></line>
									<line x1="12" y1="17" x2="12.01" y2="17"></line>
								</svg>
								<h2 class="text-lg font-normal">Limitations</h2>
								<ul class="flex flex-col gap-3.5">
									<li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">May occasionally take long time to respond/fail</li>
									<li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">May throw HTTP 429, if you make too many requests</li>
									<li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">If issues persist, clear your session and re-login</li>
								</ul>
							</div>
						</div>
						<p class="absolute bottom-0 max-w-sm text-center text-xs text-slate-500">Get your session token <a href="https://chat.openai.com">here</a>.<br /><a href="https://github.com/gencay/vscode-chatgpt">©️ Open source</a></p>
					</div>

					<div class="flex-1 overflow-y-auto" id="qa-list"></div>

					<div id="in-progress" class="pl-4 pt-4 flex items-center hidden">
						<div class="typing">Typing</div>
						<div class="spinner">
							<div class="bounce1"></div>
							<div class="bounce2"></div>
							<div class="bounce3"></div>
						</div>
					</div>

					<div id="chat-button-wrapper" class="w-full flex gap-4 justify-center items-center mt-2 hidden">
						<button class="flex gap-2 justify-center items-center rounded-lg p-2" id="clear-button">
							<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
							Clear conversation
						</button>
						<button class="flex gap-2 justify-center items-center rounded-lg p-2" id="export-button">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
							</svg>
							Export all
						</button>
					</div>

					<div class="p-4 flex items-center pt-2">
						<div class="flex-1 textarea-wrapper">
							<textarea
								type="text"
								rows="1"
								id="question-input"
								placeholder="Ask a question..."
								onInput="this.parentNode.dataset.replicatedValue = this.value"></textarea>
						</div>
						<button title="Submit prompt" class="right-8 absolute ask-button rounded-lg p-0.5 ml-5" id="ask-button">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
						</button>
					</div>
				</div>

				<script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}
