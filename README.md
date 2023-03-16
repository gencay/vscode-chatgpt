<h2 align="center"><img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/iconWhite.png" height="64"><br>Ask ChatGPT</h2>
<p align="center"><strong>ChatGPT, GPT-3 and Codex conversations in Visual Studio Code</strong></p>

<p align="center">
    <a href="https://discord.gg/GuEdNDHQaM" title="Join Discord">
        <img src="https://discordapp.com/api/guilds/1081195390734438510/widget.png?style=shield" />
    </a>
    <a href="https://marketplace.visualstudio.com/items?itemName=gencay.vscode-chatgpt" alt="Marketplace version">
        <img src="https://img.shields.io/visual-studio-marketplace/v/gencay.vscode-chatgpt?color=orange&label=VS%20Code%20Marketplace" />
    </a>
    <a href="https://marketplace.visualstudio.com/items?itemName=gencay.vscode-chatgpt" alt="Marketplace download count">
        <img src="https://img.shields.io/visual-studio-marketplace/d/gencay.vscode-chatgpt?color=blueviolet&label=Downloads" />
    </a>
    <a href="https://github.com/gencay/vscode-chatgpt" alt="Github star count">
        <img src="https://img.shields.io/github/stars/gencay/vscode-chatgpt?color=blue&label=Github%20Stars" />
    </a>
</p>

> ## Testimonials
>
> #### ❄️ Featured by [Snowflake](https://www.linkedin.com/embed/feed/update/urn:li:share:7032091318650605568) on Medium blogpost
>
> #### 🎌 Blogpost [VSCode に ChatGPT の拡張機能を入れてコードレビューやバグを発見してもらう](https://qiita.com/tak001/items/c3000b3ce9b6e72b2ae5)
>
> #### 💙 Reviews on [Twitter](https://twitter.com/jarrodWattsDev/status/1623092184906928132)
>
> #### ❤️ ChatGPT the pair programmer - VS Code on [Youtube](https://www.youtube.com/watch?v=zWTU9xH6T70)
>
> #### 💙 Generative AI on [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7030732108612423681)

# ChatGPT as your copilot to level up your developer experience

- ➕ ChatGPT Turbo support with GPT3.5 models
- 📃 ChatGPT web conversation history within VS Code. Switch between past conversations, continue them, or export all conversations to markdown.
- 🔥 Streaming conversation support for both browser and API Key method. Stop the response to save your tokens.
- 📝 Create files/projects or fix your code with one click or with keyboard shortcuts.
- 🤖 Zero-Config setup. Simply login to OpenAI as usual. Or use OpenAI's official GPT3 APIs.
- ➡️ Export all your conversation history at once in Markdown format.

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/chatgpt-gif.gif">

## 📢 Announcements - ChatGPT Plus GPT-4 is now available via Browser autologin

<details open>
  <summary>🍀 ChatGPT Plus GPT-4 is now available via Browser autologin</summary>

- You can now use the GPT-4 via your ChatGPT Plus subscription on web using Browser autologin method
  > GPT-4 is only available on browser.

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/gpt4-model.png">

</details>

<details open>
  <summary>🚀 Official ChatGPT API / GPT 3.5 Turbo support</summary>

- You can now use the following official ChatGPT APIs from OpenAI:
  - "OpenAI API Key - gpt-3.5-turbo"
  - "OpenAI API Key - gpt-3.5-turbo-0301"
- 'gpt-3.5-turbo' model is now the default model used.
- Make sure to update your model setting in your 'settings.json' if you previously used a different model.

</details>

<details>
  <summary>✋ Stop generating feature + Disabling autoscroll</summary>

- Added stop generating responses feature.
  - You can now stop GPT to generate new tokens to save tokens if the response is too long.
- Improved Codex support.
- Added a new context menu item when a `code-` model is selected: `ChatGPT-Codex: Generate code`
  - Use `ctrl+shift+a` or `cmd+shift+a` to ask GPT to generate code 👆
- Added a new setting to disable automatic scrolling of the responses as ChatGPT responds.

</details>

<details>
  <summary>💬💬 Access all of your ChatGPT conversation history</summary>

- You can view top 50 recent conversations
- Continue or switch between conversations easily
- NOTE: this is only available if you use the extension with Browser Auto-login method.

</details>

<details>
  <summary>Keybindings, new custom prompts and enable/disable prompts</summary>

- You can now use/customize keybindings for your prompts. (i.e. Use `cmd+k cmd+shift+1` to run `ChatGPT: Add Tests` on the selected code on MacOS)
- You can now enable/disable prompts that you wish to see in the editor's context menus.
- There are 2 new prompts that you can customize and enable if the currently available prompts are insufficient for your use case.

</details>

# Get Started

1. `Use OpenAI API key integration` - Use your personal/organizational API Keys. This method provides many parameters to customize your prompt. Check out the GPT3 settings. For more details how to set it up: [GPT3 OpenAI API Key](#api-key-setup). See below for the models available today:

   | Available model    | Description                                                                                                                                                                                | Max token | Knowledge |
   | :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------- | :-------- |
   | gpt-3.5-turbo      | Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of `text-davinci-003`. Will be updated with our latest model iteration.                                               | 4,096     | Sep 2021  |
   | gpt-3.5-turbo-0301 | Snapshot of `gpt-3.5-turbo` from March 1st 2023. Unlike `gpt-3.5-turbo`, this model will not receive updates, and will only be supported for a three month period ending on June 1st 2023. | 4,096     | Sep 2021  |
   | text-davinci-003   | Can do any language task with better quality, longer output, and consistent instruction-following than the curie, babbage, or ada models.                                                  | 4,000     | Jun 2021  |
   | text-davinci-002   | Similar capabilities to `text-davinci-003` but trained with supervised fine-tuning instead of reinforcement learning                                                                       | 4,000     | Jun 2021  |
   | code-davinci-002   | Optimized for code-completion tasks                                                                                                                                                        | 4,000     | Jun 2021  |
   | code-cushman-001   | Almost as capable as Davinci Codex, but slightly faster. This speed advantage may make it preferable for real-time applications.                                                           | 2,048     |           |

2. `Use browser integration` - Uses browser to ask questions to ChatGPT. Zero-Config Autologin lets the extension grab the required tokens automatically using `puppeteer`. The extension will use the browser behind the scenes, so you are not expected to receive 4xx errors while asking ChatGPT via extension unless there is OpenAI outages. [Autologin Setup (Default)](#browser-setup)

   | Available model              | Description                                                                                                                      |
   | :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
   | text-davinci-002-render-sha  | The default ChatGPT web model.                                                                                                   |
   | text-davinci-002-render-paid | The Turbo ChatGPT web model. You need an OpenAI Plus subscription for this. [Learn more](https://openai.com/blog/chatgpt-plus) . |

## API Key Setup

Get your API Key ready from here: [OpenAI](https://beta.openai.com/account/api-keys)

1. Click `Login` in your extension or ask any coding question by selecting a code fragment.
2. Once asked provide your API Key to the extension
   - [Optional] You could also store your API Key in your settings.json. However, it's highly discouraged due to security reasons.

## Browser Setup

> ❕ Please do not interrupt the autologin flow and do not close the browser. Let the extension log you in and the browser will be minimized automatically.
> ➕ Magic Links with ChatGPT Plus subscriptions should be opened on the same tab the extension is opening. Do not click it from your email. Just copy and paste it into the same browser extension is using.

🚀 All you need to do is click Login or ask a question to get started!

1. Click on the ChatGPT extension icon on your sidebar and hit `Login` button.

2. A new browser window (Default is `Chrome` but you may override it with any Chromium-based browser) will open up redirected to https://chat.openai.com/. Wait till you see login page, and click on Login on your browser.

   - If you see a `ChatGPT is at capacity right now` message, the extension will refresh the page every 2 seconds until it's passed. If OpenAI systems are experiencing issues and the extension fails to see Login page after 10 retries, the browser will be automatically closed.
   - If you are ChatGPT Plus subscriber, you may enter your email address to receive a Magic Link. Open that link in the same tab that the extension opens for Browser auto-login. Do not click on it from your email, since clicking will deactivate it and you will need to request a new link. This is required for the extension to be able to use the browser it opened for asking questions to ChatGPT.

3. Solve captchas if you are prompted and continue.

4. After successfully logging in, the browser will be minimized.

🔑 Use Google, Microsoft or standard OpenAI credentials to login. The email/password will be used to autofill the login form depending on the authentication type you choose. **NOTE**: We don't recommend storing your password in your settings.json since the file is plain text. However, you can opt-in to use it to reduce the friction during logins.

❗ You will need to have the browser open and be logged in at all times. If you close the browser or your VS-Code instance, you will be asked to login again in your next session.

📝 You can have the extension auto-fill the email address and/or password during logins. Update the extension settings with those information for quicker login. NOTE: We never store any of this information locally or remotely.

🤖 Below is a sample autologin flow. Simply login & keep your browser minimized for dialogues with ChatGPT:

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/chatgpt-autologin.gif">

---

# Features

The extension comes with context menu commands, copy/move suggested code into editor with one-click, conversation window and customization options for OpenAI's ChatGPT prompts.

### ChatGPT Conversation History

- Use `Browser Auto-login` method to access all of your ChatGPT conversations.
- Either from the home page or the kebab menu, click `Show conversations`.
- Select a conversation to load.
- You can continue the conversation or move to another conversation easily.
- A timestamp for when the chat was created along with its title will be displayed on the top of the window.

<img src="https://raw.githubusercontent.com/gencay/vscode-chatgpt/main/images/conversation-history.gif">

### 📤 Export all your conversation history with one click

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

## Custom prompts

- You can enable/disable all of your context menu items. Simply go to settings and find the prompt that you would like to disable. Custom prompts are hidden by default.
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
- `ChatGPT: Custom prompt 1`: Your custom prompt 1. It's disabled by default, please set to a custom prompt and enable it if you prefer using customized prompt
  - "default": "",
- `ChatGPT: Custom prompt 2`: Your custom prompt 2. It's disabled by default, please set to a custom prompt and enable it if you prefer using customized prompt
  - "default": "",
- `ChatGPT-Codex: Generate code`: If you select a Codex model (`code-*`) you will see this option in your context menu. This option will not feed the ChatGPT with any context like the other text completion prompts.

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

> Setting up your system level VPN should also work but if you prefer setting up proxy only for the extension continue reading

The autologin supports setting a proxy server. This is useful if you're running into rate limiting issues or if you want to use a proxy to hide your IP address. Right now this setting only supports http proxies. Don't provide a protocol in the setting.

To use a proxy, update the settings with your proxy server details. For more information on the format, see [here](https://www.chromium.org/developers/design-documents/network-settings).

Format examples:

- Authenticated: `myUsername:myPassword@my.proxy.com:3001`
- Anonymous: `204.137.172.37:999`

## Override settings with any Chromium-based browser

1. To use `Edge`, go to this URL: `edge://version` and copy the executable path used by your Edge browser.
2. Override the chromium path by going to vs-code settings and search for `chatgpt:chromiumPath`. Paste the executable path. i.e. `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`
3. [Maybe required] Run `ChatGPT: Reset session` command to clear your previous browser selection. This is required only if you have previously authenticated using a different browser.

### Run on Linux or remote - SSH workspace

There are community members who are able to run the extension in WSL, Linux, remote-SSH workspaces. Please check these issues for instructions.

Credits to [@EzyDark](https://github.com/EzYDark)

- [How to get it work in remote workspace (Remote - SSH) #39](https://github.com/gencay/vscode-chatgpt/issues/39#issuecomment-1370272656)
- [How to get it work under WSL2 #25](https://github.com/gencay/vscode-chatgpt/issues/25#issuecomment-1374833026)

# Troubleshooting

- It's possible that OpenAI systems may experience issues responding to your queries due to high-traffic from time to time.
- `connect ETIMEDOUT` may mean OpenAI servers are blocking your IP address. You could use/change your VPN or update your ports to continue using ChatGPT. For more information check out this issue: [#176](https://github.com/gencay/vscode-chatgpt/issues/176)
- If you get `ChatGPTAPI error 429`, it means that you are making Too Many Requests. Please wait and try again in a few moments. If it persists, restart your vs-code.

  - This could be due to `insufficient_quota` on your OpenAI account. You could run the following cURL command to check if your account has enough quota. (Make sure to replace `$OPENAI_API_KEY` with your key that you use in this extension)

  ```bash
    curl https://api.openai.com/v1/completions \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $OPENAI_API_KEY" \
      -d '{
      "model": "text-davinci-003",
      "prompt": "Can I make a request?\n\n",
      "temperature": 0.7,
      "max_tokens": 256,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0
    }'
  ```

  - This could also be due to multiple browser/requests being active on OpenAI. Make sure that none of your API Keys are being actively used at the moment.
  - You could also try re-generating a new API Key [here](https://beta.openai.com/account/api-keys)

- If you get `404 NotFound` error, it means one of the parameters you provided is unknown (i.e. `chatgpt.gpt3.model`). Most likely switching to default `model` in your settings would fix this issue.
- If you get `400 BadRequest` error with API Key based method, it means that your conversation's length is more than GPT/Codex models can handle. Clear your conversation history with `ChatGPT: Clear conversation` command and retry sending your prompt.
- If you get `ChatGPT is at capacity right now` during autologin, the extension will refresh the page every 2 seconds until you see the login page. Refreshing may help in some cases, when there is a queue. This is unfortunately out of this extension's control. If, even after refresh, OpenAI shows capacity error, the browser will close automatically.
- If you see `ChatGPTAPI error terminated`, your requests are being throttled. Please try again later.
- If you encounter persistent issues with your queries
  - Try `ChatGPT: Reset session` command
  - As a last resort try restarting your VS-Code and retry logging in.
- If you are using Remote Development and cant login to ChatGPT
  - In settings.json add
  - "remote.extensionKind": {"gencay.vscode-chatgpt": ["ui"]}

# Disclaimer and Credits

- This public repository is only used for documentation purposes at the moment. It's due to various reasons outlined [here](https://github.com/gencay/vscode-chatgpt/issues/68). Please make sure you are comfortable with the disclaimers below before using the extension.
- There is no guarantee that the extension will continue to work as-is without any issues or side-effects. Please use it at your own risk. It may stop working without a notice e.g. OpenAI may decide to change all or some of its functionality, which will affect this extension.
- This extension never uses/stores your personally identifiable information. There are some optional settings that you may opt-in to use i.e. OpenAI API Key. Please be careful of what you are storing in your settings.json file, since vs-code may sync them across their instances and it's outside of this extension's boundary. We recommend not storing any personally identifiable information in your settings.json.
- This extension collects metadata to improve its features. No personally identifiable information is collected. You can opt-out from telemetry either by setting the global 'telemetry.telemetryLevel' or 'chatgpt.telemetry.disable'. The extension will respect both of these settings and will collect metadata only if both allow telemetry. We use the official telemetry package provided by the vscode team [here](https://github.com/Microsoft/vscode-extension-telemetry) to understand this extension's usage patterns better to plan new feature releases i.e. popularity of Browser-based autologin vs. API Key method setting.
- We assume no responsibility of any issues that you may face using this extension. Your use of OpenAI services is subject to OpenAI's [Privacy Policy](https://openai.com/privacy/) and [Terms of Use](https://openai.com/terms/).
- 💻 Open AI ChatGPT: https://chat.openai.com/
- 🖼️ Open AI Dall-E-2: https://openai.com/dall-e-2/
- 🧪 Uses [NodeJS OpenAI API wrapper](https://github.com/transitive-bullshit/chatgpt-api) for conversational fetch calls to api.openai.com.
