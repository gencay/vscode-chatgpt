import * as vscode from "vscode";
import ChatGptViewProvider from './chatgpt-view-provider';

export async function activate(context: vscode.ExtensionContext) {
	const chatGptExtensionConfig = vscode.workspace.getConfiguration("chatgpt");
	const provider = new ChatGptViewProvider(context);

	const selectionCommandHandler = async (commandPrefix: string) => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const selection = editor.document.getText(editor.selection);
		if (selection) {
			provider?.sendApiRequest(commandPrefix, selection);
		}
	};

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
			provider?.sendApiRequest(value);
		}
	});

	const commands = [
		["vscode-chatgpt.addTests", "promptPrefix.addTests"],
		["vscode-chatgpt.findProblems", "promptPrefix.findProblems"],
		["vscode-chatgpt.optimize", "promptPrefix.optimize"],
		["vscode-chatgpt.explain", "promptPrefix.explain"],
	];

	const registeredCommands = commands.map(([command, configKey]) =>
		vscode.commands.registerCommand(command, () => {
			const commandPrefix = chatGptExtensionConfig.get(configKey) as string;
			selectionCommandHandler(commandPrefix);
		})
	);

	const clear = vscode.commands.registerCommand("vscode-chatgpt.clearSession", () => {
		context.globalState.update("chatgpt-session-token", null);
	});

	context.subscriptions.push(view, freeText, ...registeredCommands, clear);
}

export function deactivate() { }
