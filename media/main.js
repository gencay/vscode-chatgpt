// @ts-nocheck

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
    const vscode = acquireVsCodeApi();

    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code, _lang) {
            return hljs.highlightAuto(code).value;
        },
        langPrefix: 'hljs language-',
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartypants: false,
        xhtml: false
    });

    const copySvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>`;

    const checkSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>`;

    const pencilSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>`;

    const plusSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`;

    const userSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`;

    const aiSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>`;

    // Handle messages sent from the extension to the webview
    window.addEventListener("message", (event) => {
        const message = event.data;
        const list = document.getElementById("qa-list");

        switch (message.type) {
            case "addQuestion":
                const html = message.code != null
                    ? marked.parseInline(message.value + "<br /> <br /><pre><code class='block whitespace-pre overflow-x-scroll'>```" + message.code + "```</code></pre>")
                    : message.value;

                list.innerHTML +=
                    `<div class="p-4 self-end mb-4" style="background: var(--vscode-list-hoverBackground)">
                        <p class="font-bold mb-5 flex">${userSvg}You</p>
                        <div>${html}</div>
                    </div>`;

                document.getElementById("in-progress")?.classList?.remove("hidden");
                list.lastChild?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                break;
            case "addResponse":
                document.getElementById("in-progress")?.classList?.add("hidden");

                const markedResponse = new DOMParser().parseFromString(marked.parse(message.value), "text/html");
                const preCodeList = markedResponse.querySelectorAll("pre > code");

                preCodeList.forEach((preCode, index) => {
                    preCode.parentElement.classList.add("pre-code-element");

                    if (index != preCodeList.length - 1) {
                        preCode.parentElement.classList.add("mb-8");
                    }

                    preCode.classList.add("block", "whitespace-pre", "overflow-x-scroll");

                    const buttonWrapper = document.createElement("div");
                    buttonWrapper.classList.add("flex", "gap-4", "flex-wrap", "mb-3", "mt-6", "items-center");

                    // Create copy to clipboard button
                    const copyButton = document.createElement("button");
                    copyButton.title = "Copy to clipboard";
                    copyButton.innerHTML = copySvg + "Copy code";

                    copyButton.classList.add("code-element-gnc", "p-1", "pr-2", "flex", "items-center");
                    copyButton.style.background = "var(--vscode-button-secondaryBackground)";
                    copyButton.style.color = "var(--vscode-button-secondaryForeground)";

                    const insert = document.createElement("button");
                    insert.title = "Insert the below code to the current file";
                    insert.innerHTML = pencilSvg + "Insert";

                    insert.classList.add("edit-element-gnc", "p-1", "pr-2", "flex", "items-center");
                    insert.style.background = "var(--vscode-button-secondaryBackground)";
                    insert.style.color = "var(--vscode-button-secondaryForeground)";

                    const newTab = document.createElement("button");
                    newTab.title = "Create a new file with the below code";
                    newTab.innerHTML = plusSvg + "New";

                    newTab.classList.add("new-code-element-gnc", "p-1", "pr-2", "flex", "items-center");
                    newTab.style.background = "var(--vscode-button-secondaryBackground)";
                    newTab.style.color = "var(--vscode-button-secondaryForeground)";

                    buttonWrapper.append(copyButton, insert, newTab);

                    preCode.parentElement.prepend(buttonWrapper);
                });

                list.innerHTML +=
                    `<div class="p-4 self-end mb-4 pb-8">
                        <p class="font-bold mb-5 flex">${aiSvg}ChatGPT</p>
                        <div>${markedResponse.documentElement.innerHTML}</div>
                    </div>`;

                list.lastChild?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                break;
            case "addError":
                list.innerHTML +=
                    `<div class="p-4 self-end mb-4 pb-8">
                        <p class="font-bold mb-5 flex">${aiSvg}ChatGPT</p>
                        <div class="text-red-400">${marked.parse("An error occurred. If this issue persists please clear your session token with `ChatGPT: Clear session` command and/or restart your Visual Studio Code. If you still experience issues, it may be due to outage on https://openai.com services.")}</div>
                    </div>`;

                document.getElementById("in-progress")?.classList?.add("hidden");
                list.lastChild?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                break;
            default:
                break;
        }
    });

    const addFreeTextQuestion = () => {
        const input = document.getElementById("question-input");
        if (input.value?.length > 0) {
            vscode.postMessage({
                type: "addFreeTextQuestion",
                value: input.value,
            });

            input.value = "";
        }
    };

    document.getElementById('question-input').addEventListener("keydown", function (event) {
        if (event.key == "Enter" && !event.shiftKey) {
            event.preventDefault();
            addFreeTextQuestion();
        }
    });

    document.getElementById("ask-button")?.addEventListener("click", function (e) {
        e.preventDefault();
        addFreeTextQuestion();
    });

    document.addEventListener("click", (e) => {
        if (e.target?.classList.contains("code-element-gnc")) {
            e.preventDefault();
            navigator.clipboard.writeText(e.target.parentElement?.parentElement?.lastChild?.textContent).then(() => {
                e.target.innerHTML = checkSvg + "Copied";

                setTimeout(() => {
                    e.target.innerHTML = copySvg + "Copy code";
                }, 1500);
            });

            return;
        }

        if (e.target?.classList.contains("edit-element-gnc")) {
            e.preventDefault();
            vscode.postMessage({
                type: "editCode",
                value: e.target.parentElement?.parentElement?.lastChild?.textContent,
            });

            return;
        }

        if (e.target?.classList.contains("new-code-element-gnc")) {
            e.preventDefault();
            vscode.postMessage({
                type: "openNew",
                value: e.target.parentElement?.parentElement?.lastChild?.textContent,
            });

            return;
        }
    });

})();
