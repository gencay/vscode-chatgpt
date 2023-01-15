# Change Log

All notable changes to the "vscode-chatgpt" extension will be documented in this file.

## [3.2.0] - 2022-01-15

- You can now use `Google` or `Microsoft` Authentication types during login flow to auto-fill the forms with the email/password you provide the extension with.

## [3.1.0] - 2022-01-12

- You can now have conversations with GPT3 using the Official OpenAI APIs.
- The GPT3/Codex dialogue support is similar to what ChatGPT offers. However, note that ChatGPT is more advanced in dialogues.

## [3.0.0] - 2022-01-06

- Added support for Official OpenAI APIs for GPT3 and Codex using API Keys.

## [2.6.0] - 2022-01-04

- Added proxy server. Addressing issue #32
- Added custom timeout. Addressing issue #33

## [2.3.0] - 2022-12-27

- You can now add custom prefix commands for the selected code. The extension will remember the prompt for subsequent queries. Addressing issue #28

## [2.2.0] - 2022-12-27

- You can now use any Chromium-based browser for autologin. Search for setting `chatgpt:chromiumpath` to override it. Check out the Readme for more.

## [2.1.0] - 2022-12-26

- Automatically login without needing to copy-paste session cookies is now live and enabled by default
- UX improvements: moved `Clear conversation` and `Export to MD` buttons to flyout.
- Improved error handling
- Misc. bug fixes

## [1.8.0] - 2022-12-14

- 🚀 [Experimental Feature] Automatically login without needing to copy-paste session cookies

## [1.7.0] - 2022-12-12

- 🚀 Automatically login without needing to copy-paste session cookies
- OpenAI servers are experiencing exceptionally high demand, which may cause intermittent errors in this extension.

## [1.6.0] - 2022-12-11

- 🆕 New vs-code commands to Clear and Export conversations

## [1.5.0] - 2022-12-11

- 🆕 Clear conversations and reset thread
- 🆕 Export all your conversation dialogue into a new tab with single click
- 🆕 Added a new introduction page that shows up before the conversation starts

## [1.4.3] - 2022-12-10

- 🚀 Better theming support in markdown

## [1.4.2] - 2022-12-10

- Update icons and SVGs used in conversation window.
- Show copy to clipboard buttons on hover for better UX.

## [1.4.0] - 2022-12-09

- Introduced edit and resend feature 🚀. Addressing #6
- Edit previous prompt in-place
- Better font-family support for code highlighter

## [1.3.0] - 2022-12-08

- Continuous conversations with ChatGPT with follow-ups. Addressing #7
- UX improvements

## [1.2.0] - 2022-12-07

- Automatically highlight code in conversation view
- UX improvements addressing #4 and #8

## [1.1.0] - 2022-12-07

- Adding a new configuration to opt-in to receive notifications when chatgpt responds.
  - This config is set to false by default to prevent notification spams.
  - If users are interested in it due to high-volume latencies, they can opt-in to get notifications when answers are ready.

## [1.0.0] - 2022-12-07

- Introducing new ways to interact with the suggested code
- Copy code to clipboard
- Insert code to text editor
- Create a new file with the ChatGPT suggested code

## [0.1.0] - 2022-12-6

- Initial release of the ChatGPT - VS Code extension.
