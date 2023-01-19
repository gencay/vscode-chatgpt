<h2 align="center"><img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/iconWhite.png" height="64"><br>Ask ChatGPT</h2>
<p align="center"><strong>ChatGPT, GPT-3 and Codex conversations in Visual Studio Code</strong></p>

<div align="center">

[![Badge for version](https://img.shields.io/visual-studio-marketplace/v/gencay.vscode-chatgpt?color=orange&label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=gencay.vscode-chatgpt)
[![Badge for download count](https://img.shields.io/visual-studio-marketplace/d/gencay.vscode-chatgpt?color=blueviolet&label=Downloads)](https://marketplace.visualstudio.com/items?itemName=gencay.vscode-chatgpt)
[![Github stars](https://img.shields.io/github/stars/gencay/vscode-chatgpt?color=blue&label=Github%20Stars)](https://github.com/gencay/vscode-chatgpt)

</div>

## 📢 New feature - Use Official OpenAI GPT3 APIs or browser integration with zero-config

The extension now supports official APIs from OpenAI along with zero-config browser based integration. Simply switch methods in your settings and use your API Key to ask questions.

Dialogues are also supported in this official method similar to what ChatGPT offers. However, ChatGPT may provide better answers in conversations since it's optimized for chat.

If you opt-in to use this method, make sure you are aware of the limitations set by OpenAI team [here](https://help.openai.com/en/articles/5955598-is-api-usage-subject-to-any-rate-limits).

# ChatGPT as your copilot to level up your developer experience

- 📝 Create files/projects or fix your code with one click.
- 🤖 Zero-Config setup. Simply login to OpenAI as usual. Or use OpenAI's official GPT3 APIs.
- ➡️ Export all your conversation history at once in Markdown format.

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/chatgpt-gif.gif">

# Zero Configuration with Browser Auto Login

### 3 options to run ChatGPT assistant in your vs-code

1. [**Recommended**] Autologin - Uses browser to ask questions to ChatGPT. [Autologin Setup (Default)](#setup). Zero-Config Autologin lets the extension grab the required tokens automatically using `puppeteer`. The extension will use the browser behind the scenes, so you are not expected to receive 4xx errors while asking ChatGPT via extension unless there is OpenAI outages.
2. Use OpenAI's official GPT3 APIs - Use your personal/organizational API Keys. This method provides many parameters to customize your prompt. Check out the GPT3 settings. For more details: [GPT3 OpenAI API Key](#gpt3)
3. [Not recommended due to throttling] Manually login on a browser and grab required tokens. Described in [Manual Setup](#manual-setup). This option has problems due to using unofficial OpenAI API usage and rate-limiting.

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/methods.png">

# Setup

🚀 All you need to do is click Login or ask a question to get started!

1. Click on the ChatGPT extension icon on your sidebar and hit `Login` button.

2. A new browser window (Default is `Chrome` but you may override it with any Chromium-based browser) will open up redirected to https://chat.openai.com/. Wait till you see login page, and click on Login on your browser.

   - If you see a `ChatGPT is at capacity right now` message, the extension will refresh the page every 2 seconds until it's passed. If OpenAI systems are experiencing issues and the extension fails to see Login page after 10 retries, the browser will be automatically closed.

3. Solve captchas if you are prompted and continue.

4. After successfully logging in, the browser will be minimized.

🔑 Use Google, Microsoft or standard OpenAI credentials to login. The email/password will be used to autofill the login form depending on the authentication type you choose. **NOTE**: We don't recommend storing your password in your settings.json since the file is plain text. However, you can opt-in to use it to reduce the friction during logins.

ℹ️ You will need to have a browser open and be logged in at all times. If you close the browser or your VS-Code instance, you will be asked to login again in your next session.

📝 You can have the extension auto-fill the email address and/or password during logins. Update the extension settings with those information for quicker login. NOTE: We never store any of this information locally or remotely.

🤖 Below is a sample autologin flow. Simply login & keep your browser minimized for dialogues with ChatGPT:

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/chatgpt-autologin.gif">

---

## Override settings with any Chromium-based browser

1. To use `Edge`, go to this URL: `edge://version` and copy the executable path used by your Edge browser.
2. Override the chromium path by going to vs-code settings and search for `chatgpt:chromiumPath`. Paste the executable path. i.e. `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`
3. [Maybe required] Run `ChatGPT: Reset session` command to clear your previous browser selection. This is required only if you have previously authenticated using a different browser.

### Run on Linux or remote - SSH workspace

There are community members who are able to run the extension in WSL, Linux, remote-SSH workspaces. Please check these issues for instructions.

Credits to [@EzyDark](https://github.com/EzYDark)

- [How to get it work in remote workspace (Remote - SSH) #39](https://github.com/gencay/vscode-chatgpt/issues/39#issuecomment-1370272656)
- [How to get it work under WSL2 #25](https://github.com/gencay/vscode-chatgpt/issues/25#issuecomment-1374833026)

## GPT3

### Official OpenAI API - GPT3 Setup

If you prefer using OpenAI's official APIs to communicate, switch your method setting to `GPT3 OpenAI API Key` and get your API Key ready from here: [OpenAI](https://beta.openai.com/account/api-keys)

1. Click `Login` in your extension or ask any coding question by selecting a code fragment.
2. Once asked provide your API Key to the extension
   - [Optional] You could also store your API Key in your settings.json. However, it's highly discouraged due to security reasons.

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/api-key.png">

# Features

The extension comes with context menu commands, copy/move suggested code into editor with one-click, conversation window and customization options for OpenAI's ChatGPT prompts.

## ChatGPT conversation window in vs-code

### 🆕 Export all your conversation history withs one click

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/export-convo.png">

---

### Ad-hoc prompt prefixes for you to customize what you are asking ChatGPT

Customize what you are asking with the selected code. The extension will remember your prompt for subsequent questions.

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/adhoc.png">

---

### Automatic partial code response detection

The extension will detect if ChatGPT didn't complete code in their answer and it will suggest automatic continuation and combination of answers

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/continue-combine.png">

---

### 🍻 Optimized for dialogue

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/conversation-mode-2.png">

---

### Edit and resend a previous prompt

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/edit-resend.png">

---

### Copy or insert the code ChatGPT is suggesting right into your editor.

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/code-actions.png">

---

### Ask free-form text questions that will be listed in the conversation window. The conversation is kept in cache until vs-code instance is closed.

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/rust.png">

# Use defaults or customize your code prompts

- `ChatGPT: Ad-hoc prompt`: Ad-hoc custom prompt prefix for the selected code. Right click on a selected block of code, run command.
  - You will be asked to fill in your preferred custom prefix and the extension will remember that string for your subsequent ad-hoc queries.
- `ChatGPT: Add tests`: Write tests for you. Right click on a selected block of code, run command.
  - "default": "Implement tests for the following code",
  - "description": "The prompt prefix used for adding tests for the selected code"
- `ChatGPT: Find bugs`: Analyze and find bugs in your code. Right click on a selected block of code, run command.
  - "default": "Find problems with the following code",
  - "description": "The prompt prefix used for finding problems for the selected code"
- `ChatGPT: Optimize`: Add suggestions to your code to improve. Right click on a selected block of code, run command.
  - "default": "Optimize the following code",
  - "description": "The prompt prefix used for optimizing the selected code"
- `ChatGPT: Explain`: Explain the selected code. Right click on a selected block of code, run command.
  - "default": "Explain the following code",
  - "description": "The prompt prefix used for explaining the selected code"
- `ChatGPT: Add comments`: Add comments for the selected code. Right click on a selected block of code, run command.
  - "default": "Add comments for the following code",
  - "description": "The prompt prefix used for adding comments for the selected code"

## Other available commands

- `ChatGPT: Ask anything`: Free-form text questions within conversation window.
- `ChatGPT: Reset session`: Clears the current session and resets your connection with ChatGPT
- `ChatGPT: Clear conversation`: Clears the conversation window and resets the thread to start a new conversation with ChatGPT.
- `ChatGPT: Export conversation`: Exports the whole conversation in Markdown for you to easily store and find the Q&A list.

## Customization settings

- Use proxy with autologin puppeteer setup
- Opt-in to use automation to authenticate OpenAI.
- You can configure the commands to use any prompts for the selected code!
- Opt-in to receive notification when ChatGPT sends you a message!

### Using Proxy

The autologin supports setting a proxy server. This is useful if you're running into rate limiting issues or if you want to use a proxy to hide your IP address. Right now this setting only supports http proxies. Don't provide a protocol in the setting.

To use a proxy, update the settings with your proxy server details. For more information on the format, see [here](https://www.chromium.org/developers/design-documents/network-settings).

Format examples:

- Authenticated: `myUsername:myPassword@my.proxy.com:3001`
- Anonymous: `204.137.172.37:999`

## Manual Setup

ℹ️ This method is no longer recommended/maintained since hard rate-limiting by OpenAI services. Please use the `AutoLogin` option with Zero-Configuration required.

1. Go to https://chat.openai.com and login.
2. Open your browser's developer tools
   - Hit F12 to open the developer tools in most browsers
   - Alternatively, right click on the browser window and select `Inspect`
3. Go to `Application` -> `Cookies` -> `https://chat.openai.com`. You will need the following cookies:
   - `__Secure-next-auth.session-token`: The extension will use this to send prompts to ChatGPT
   - `cf_clearance`: CloudFlare clearance token. A security measure OpenAI put in place to block automated access.
4. Go to `Console` and type in the following code to get your `user-agent`
   - `navigator.userAgent`: This is your browser's user-agent, needed for CloudFlare clearance. Enter the value of `userAgent` when prompted by the extension. Copy its value **without single or double quotes**.
5. Now that you have all required session variables, run any command using the extension and you'll be asked to enter these values:
   - `__Secure-next-auth.session-token`: An encoded token starting with `ey***`
   - `cf_clearance`: An alpha-numeric token
   - `userAgent`

# Troubleshooting

- It's possible that OpenAI systems may experience issues responding to your queries due to high-traffic from time to time.
- If you get `400 BadRequest` error with API Key based method, it means that your conversation's length is more than GPT/Codex models can handle. Clear your conversation history with `ChatGPT: Clear conversation` command and retry sending your prompt.
- If you get `ChatGPT is at capacity right now` during autologin, the extension will refresh the page every 2 seconds until you see the login page. Refreshing may help in some cases, when there is a queue. This is unfortunately out of this extension's control. If, even after refresh, OpenAI shows capacity error, the browser will close automatically.
- If you get `ChatGPTAPI error 429`, it means that you are making Too Many Requests. Please wait and try again in a few moments. If it persists, restart your vs-code.
  - This could also be due to multiple browser/requests being active on OpenAI. Make sure that none of your API Keys are being actively used at the moment.
  - You could also try re-generating a new API Key [here](https://beta.openai.com/account/api-keys)
- If you see `ChatGPTAPI error terminated`, your requests are being throttled. Please try again later.
- If you encounter persistent issues with your queries
  - Try `ChatGPT: Reset session` command
  - As a last resort try restarting your VS-Code and retry logging in.

# Disclaimer and Credits

- There is no guarantee that the extension will continue to work as-is without any issues or side-effects. Please use it at your own risk. It may stop working without a notice e.g. OpenAI may decide to change all or some of its functionality, which will affect this extension.
- This extension never uses/stores your personally identifiable information. There are some optional settings that you may opt-in to use i.e. OpenAI API Key. Please be careful of what you are storing in your settings.json file, since vs-code may sync them across their instances and it's outside of this extension's boundary. We recommend not storing any personally identifiable information in your settings.json.
- This extension collects metadata to improve its features. No personally identifiable information is collected. You can opt-out from telemetry either by setting the global 'telemetry.telemetryLevel' or 'chatgpt.telemetry.disable'. The extension will respect both of these settings and will collect metadata only if both allow telemetry. We use the official telemetry package provided by the vscode team [here](https://github.com/Microsoft/vscode-extension-telemetry) to understand this extension's usage patterns better to plan new feature releases i.e. popularity of Browser-based autologin vs. API Key method setting.
- We assume no responsibility of any issues that you may face using this extension. Your use of OpenAI services is subject to OpenAI's [Privacy Policy](https://openai.com/privacy/) and [Terms of Use](https://openai.com/terms/).
- 💻 Open AI ChatGPT: https://chat.openai.com/
- 🖼️ Open AI Dall-E-2: https://openai.com/dall-e-2/
- 🧪 The manual setup option uses [unofficial nodejs OpenAI API wrapper](https://github.com/transitive-bullshit/chatgpt-api).
