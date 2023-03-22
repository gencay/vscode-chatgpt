/**
 * @author Ali Gençay
 * https://github.com/gencay/vscode-chatgpt
 *
 * @license
 * Copyright (c) 2022 - Present, Ali Gençay
 *
 * All rights reserved. Code licensed under the ISC license
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */

import * as vscode from "vscode";
import ChatGptViewProvider from './chatgpt-view-provider';

const menuCommands = ["addTests", "findProblems", "optimize", "explain", "addComments", "completeCode", "generateCode", "customPrompt1", "customPrompt2", "adhoc"];

export async function activate(context: vscode.ExtensionContext) {
	let adhocCommandPrefix: string = context.globalState.get("chatgpt-adhoc-prompt") || '';

	const provider = new ChatGptViewProvider(context);

	const view = vscode.window.registerWebviewViewProvider(
		"vscode-chatgpt.view",
		provider,
		{
			webviewOptions: {
				retainContextWhenHidden: true,
			},
		}
	);

	const freeText = vscode.commands.registerCommand("vscode-chatgpt.freeText", async () => {
		const value = await vscode.window.showInputBox({
			prompt: "Ask anything...",
		});

		if (value) {
			provider?.sendApiRequest(value, { command: "freeText" });
		}
	});

	const resetThread = vscode.commands.registerCommand("vscode-chatgpt.clearConversation", async () => {
		provider?.sendMessage({ type: 'clearConversation' }, true);
	});

	const exportConversation = vscode.commands.registerCommand("vscode-chatgpt.exportConversation", async () => {
		provider?.sendMessage({ type: 'exportConversation' }, true);
	});

	const clearSession = vscode.commands.registerCommand("vscode-chatgpt.clearSession", () => {
		context.globalState.update("chatgpt-session-token", null);
		context.globalState.update("chatgpt-clearance-token", null);
		context.globalState.update("chatgpt-user-agent", null);
		context.globalState.update("chatgpt-gpt3-apiKey", null);
		provider?.clearSession();
	});

	const configChanged = vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration('chatgpt.response.showNotification')) {
			provider.subscribeToResponse = vscode.workspace.getConfiguration("chatgpt").get("response.showNotification") || false;
		}

		if (e.affectsConfiguration('chatgpt.response.autoScroll')) {
			provider.autoScroll = !!vscode.workspace.getConfiguration("chatgpt").get("response.autoScroll");
		}

		if (e.affectsConfiguration('chatgpt.useAutoLogin')) {
			provider.useAutoLogin = vscode.workspace.getConfiguration("chatgpt").get("useAutoLogin") || false;

			context.globalState.update("chatgpt-session-token", null);
			context.globalState.update("chatgpt-clearance-token", null);
			context.globalState.update("chatgpt-user-agent", null);
		}

		if (e.affectsConfiguration('chatgpt.chromiumPath')) {
			provider.setChromeExecutablePath();
		}

		if (e.affectsConfiguration('chatgpt.profilePath')) {
			provider.setProfilePath();
		}

		if (e.affectsConfiguration('chatgpt.proxyServer')) {
			provider.setProxyServer();
		}

		if (e.affectsConfiguration('chatgpt.method')) {
			provider.setMethod();
		}

		if (e.affectsConfiguration('chatgpt.authenticationType')) {
			provider.setAuthType();
		}

		if (e.affectsConfiguration('chatgpt.gpt3.model')) {
			provider.model = vscode.workspace.getConfiguration("chatgpt").get("gpt3.model");
		}

		if (e.affectsConfiguration('chatgpt.gpt3.apiBaseUrl')
			|| e.affectsConfiguration('chatgpt.gpt3.model')
			|| e.affectsConfiguration('chatgpt.gpt3.organization')
			|| e.affectsConfiguration('chatgpt.gpt3.maxTokens')
			|| e.affectsConfiguration('chatgpt.gpt3.temperature')
			|| e.affectsConfiguration('chatgpt.gpt3.top_p')) {
			provider.prepareConversation(true);
		}

		if (e.affectsConfiguration('chatgpt.promptPrefix') || e.affectsConfiguration('chatgpt.gpt3.generateCode-enabled') || e.affectsConfiguration('chatgpt.gpt3.model') || e.affectsConfiguration('chatgpt.method')) {
			setContext();
		}
	});

	const adhocCommand = vscode.commands.registerCommand("vscode-chatgpt.adhoc", async () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		}

		const selection = editor.document.getText(editor.selection);
		let dismissed = false;
		if (selection) {
			await vscode.window
				.showInputBox({
					title: "Add prefix to your ad-hoc command",
					prompt: "Prefix your code with your custom prompt. i.e. Explain this",
					ignoreFocusOut: true,
					placeHolder: "Ask anything...",
					value: adhocCommandPrefix
				})
				.then((value) => {
					if (!value) {
						dismissed = true;
						return;
					}

					adhocCommandPrefix = value.trim() || '';
					context.globalState.update("chatgpt-adhoc-prompt", adhocCommandPrefix);
				});

			if (!dismissed && adhocCommandPrefix?.length > 0) {
				provider?.sendApiRequest(adhocCommandPrefix, { command: "adhoc", code: selection });
			}
		}
	});

	const generateCodeCommand = vscode.commands.registerCommand(`vscode-chatgpt.generateCode`, () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		}

		const selection = editor.document.getText(editor.selection);
		if (selection) {
			provider?.sendApiRequest(selection, { command: "generateCode", language: editor.document.languageId });
		}
	});

	// Skip AdHoc - as it was registered earlier
	const registeredCommands = menuCommands.filter(command => command !== "adhoc" && command !== "generateCode").map((command) => vscode.commands.registerCommand(`vscode-chatgpt.${command}`, () => {
		const prompt = vscode.workspace.getConfiguration("chatgpt").get<string>(`promptPrefix.${command}`);
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		}

		const selection = editor.document.getText(editor.selection);
		if (selection && prompt) {
			provider?.sendApiRequest(prompt, { command, code: selection, language: editor.document.languageId });
		}
	}));

	context.subscriptions.push(view, freeText, resetThread, exportConversation, clearSession, configChanged, adhocCommand, generateCodeCommand, ...registeredCommands);

	const setContext = () => {
		menuCommands.forEach(command => {
			if (command === "generateCode") {
				let generateCodeEnabled = !!vscode.workspace.getConfiguration("chatgpt").get<boolean>("gpt3.generateCode-enabled");
				const modelName = vscode.workspace.getConfiguration("chatgpt").get("gpt3.model") as string;
				const method = vscode.workspace.getConfiguration("chatgpt").get("method") as string;
				generateCodeEnabled = generateCodeEnabled && method === "GPT3 OpenAI API Key" && modelName.startsWith("code-");
				vscode.commands.executeCommand('setContext', "generateCode-enabled", generateCodeEnabled);
			} else {
				const enabled = !!vscode.workspace.getConfiguration("chatgpt.promptPrefix").get<boolean>(`${command}-enabled`);
				vscode.commands.executeCommand('setContext', `${command}-enabled`, enabled);
			}
		});
	};

	setContext();
}

export function deactivate() { }
