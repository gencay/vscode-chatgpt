import * as vscode from "vscode";
import ChatGptViewProvider from './chatgpt-view-provider';

export async function activate(context: vscode.ExtensionContext) {
	const chatGptExtensionConfig = vscode.workspace.getConfiguration("chatgpt");
	const provider = new ChatGptViewProvider(context);

	const selectionCommandHandler = async (commandPrefix: string) => {
		const editor = vscode.window.activeTextEditor;

		if (editor != null) {
			const selection = editor.document.getText(editor.selection);
			if (selection != null) {
				provider?.sendApiRequest(commandPrefix, selection);
			}
		}
	};

	const view = vscode.window.registerWebviewViewProvider("vscode-chatgpt.view", provider, {
		webviewOptions: {
			retainContextWhenHidden: true
		}
	});

	const freeText = vscode.commands.registerCommand("vscode-chatgpt.freeText", async () => {
		vscode.window
			.showInputBox({ prompt: "Ask anything..." })
			.then((value) => {
				provider?.sendApiRequest(value!);
			});
	});

	const addTests = vscode.commands.registerCommand("vscode-chatgpt.addTests", () => {
		selectionCommandHandler(chatGptExtensionConfig.get("promptPrefix.addTests")!);
	});

	const findProblems = vscode.commands.registerCommand("vscode-chatgpt.findProblems", () => {
		selectionCommandHandler(chatGptExtensionConfig.get("promptPrefix.findProblems")!);
	});

	const optimize = vscode.commands.registerCommand("vscode-chatgpt.optimize", () => {
		selectionCommandHandler(chatGptExtensionConfig.get("promptPrefix.optimize")!);
	});

	const explain = vscode.commands.registerCommand("vscode-chatgpt.explain", () => {
		selectionCommandHandler(chatGptExtensionConfig.get("promptPrefix.explain")!);
	});

	const clear = vscode.commands.registerCommand("vscode-chatgpt.clearSession", () => {
		context.globalState.update("chatgpt-session-token", null);
	});

	context.subscriptions.push(view, freeText, addTests, findProblems, optimize, explain, clear);
}

export function deactivate() { }
