import Keyv from 'keyv';

type Role = 'user' | 'assistant';
type FetchFn = typeof fetch;
type SendMessageOptions = {
    conversationId?: string;
    parentMessageId?: string;
    messageId?: string;
    stream?: boolean;
    promptPrefix?: string;
    promptSuffix?: string;
    timeoutMs?: number;
    onProgress?: (partialResponse: ChatMessage) => void;
    abortSignal?: AbortSignal;
};
type MessageActionType = 'next' | 'variant';
type SendMessageBrowserOptions = {
    conversationId?: string;
    parentMessageId?: string;
    messageId?: string;
    action?: MessageActionType;
    timeoutMs?: number;
    onProgress?: (partialResponse: ChatMessage) => void;
    abortSignal?: AbortSignal;
};
interface ChatMessage {
    id: string;
    text: string;
    role: Role;
    parentMessageId?: string;
    conversationId?: string;
    detail?: any;
}
type ChatGPTErrorType = 'unknown' | 'chatgpt:pool:account-on-cooldown' | 'chatgpt:pool:account-not-found' | 'chatgpt:pool:no-accounts' | 'chatgpt:pool:timeout' | 'chatgpt:pool:rate-limit' | 'chatgpt:pool:unavailable';
declare class ChatGPTError extends Error {
    statusCode?: number;
    statusText?: string;
    isFinal?: boolean;
    accountId?: string;
    type?: ChatGPTErrorType;
}
/** Returns a chat message from a store by it's ID (or null if not found). */
type GetMessageByIdFunction = (id: string) => Promise<ChatMessage>;
/** Upserts a chat message to a store. */
type UpsertMessageFunction = (message: ChatMessage) => Promise<void>;
declare namespace openai {
    type CompletionParams = {
        /** ID of the model to use. */
        model: string;
        /** The string prompt to generate a completion for. */
        prompt: string;
        /**
         * The suffix that comes after a completion of inserted text.
         */
        suffix?: string;
        /**
         * The maximum number of tokens to generate in the completion.  The token count of your prompt plus `max_tokens` cannot exceed the model\'s context length. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
         */
        max_tokens?: number;
        /**
         * What [sampling temperature](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277) to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer.  We generally recommend altering this or `top_p` but not both.
         */
        temperature?: number;
        /**
         * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  We generally recommend altering this or `temperature` but not both.
         */
        top_p?: number;
        /**
         * Include the log probabilities on the `logprobs` most likely tokens, as well the chosen tokens. For example, if `logprobs` is 5, the API will return a list of the 5 most likely tokens. The API will always return the `logprob` of the sampled token, so there may be up to `logprobs+1` elements in the response.  The maximum value for `logprobs` is 5. If you need more than this, please contact us through our [Help center](https://help.openai.com) and describe your use case.
         */
        logprobs?: number;
        /**
         * Echo back the prompt in addition to the completion
         */
        echo?: boolean;
        /**
         * Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
         */
        stop?: string[];
        /**
         * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model\'s likelihood to talk about new topics.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
         */
        presence_penalty?: number;
        /**
         * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model\'s likelihood to repeat the same line verbatim.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
         */
        frequency_penalty?: number;
        /**
         * Generates `best_of` completions server-side and returns the \"best\" (the one with the highest log probability per token). Results cannot be streamed.  When used with `n`, `best_of` controls the number of candidate completions and `n` specifies how many to return – `best_of` must be greater than `n`.  **Note:** Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
         */
        best_of?: number;
        /**
         * Modify the likelihood of specified tokens appearing in the completion.  Accepts a json object that maps tokens (specified by their token ID in the GPT tokenizer) to an associated bias value from -100 to 100. You can use this [tokenizer tool](/tokenizer?view=bpe) (which works for both GPT-2 and GPT-3) to convert text to token IDs. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.  As an example, you can pass `{\"50256\": -100}` to prevent the <|endoftext|> token from being generated.
         */
        logit_bias?: Record<string, number>;
        /**
         * A unique identifier representing your end-user, which will help OpenAI to monitor and detect abuse. [Learn more](/docs/usage-policies/end-user-ids).
         */
        user?: string;
    };
    type ReverseProxyCompletionParams = CompletionParams & {
        paid?: boolean;
    };
    type CompletionResponse = {
        id: string;
        object: string;
        created: number;
        model: string;
        choices: CompletionResponseChoices;
        usage?: CompletionResponseUsage;
    };
    type CompletionResponseChoices = {
        text?: string;
        index?: number;
        logprobs?: {
            tokens?: Array<string>;
            token_logprobs?: Array<number>;
            top_logprobs?: Array<object>;
            text_offset?: Array<number>;
        } | null;
        finish_reason?: string;
    }[];
    type CompletionResponseUsage = {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}
/**
 * https://chat.openapi.com/backend-api/conversation
 */
type ConversationJSONBody = {
    /**
     * The action to take
     */
    action: string;
    /**
     * The ID of the conversation
     */
    conversation_id?: string;
    /**
     * Prompts to provide
     */
    messages: Prompt[];
    /**
     * The model to use
     */
    model: string;
    /**
     * The parent message ID
     */
    parent_message_id: string;
};
type Prompt = {
    /**
     * The content of the prompt
     */
    content: PromptContent;
    /**
     * The ID of the prompt
     */
    id: string;
    /**
     * The role played in the prompt
     */
    role: Role;
};
type ContentType = 'text';
type PromptContent = {
    /**
     * The content type of the prompt
     */
    content_type: ContentType;
    /**
     * The parts to the prompt
     */
    parts: string[];
};
type ConversationResponseEvent = {
    message?: Message;
    conversation_id?: string;
    error?: string | null;
};
type Message = {
    id: string;
    content: MessageContent;
    role: Role;
    user: string | null;
    create_time: string | null;
    update_time: string | null;
    end_turn: null;
    weight: number;
    recipient: string;
    metadata: MessageMetadata;
};
type MessageContent = {
    content_type: string;
    parts: string[];
};
type MessageMetadata = any;
type GetAccessTokenFn = ({ email, password, sessionToken }: {
    email: string;
    password: string;
    sessionToken?: string;
}) => string | Promise<string>;

declare class ChatGPTAPI {
    protected _apiKey: string;
    protected _apiBaseUrl: string;
    protected _apiReverseProxyUrl: string;
    protected _debug: boolean;
    protected _completionParams: Omit<openai.CompletionParams, 'prompt'>;
    protected _maxModelTokens: number;
    protected _maxResponseTokens: number;
    protected _userLabel: string;
    protected _assistantLabel: string;
    protected _endToken: string;
    protected _sepToken: string;
    protected _fetch: FetchFn;
    protected _getMessageById: GetMessageByIdFunction;
    protected _upsertMessage: UpsertMessageFunction;
    protected _messageStore: Keyv<ChatMessage>;
    protected _organization: string;
    /**
     * Creates a new client wrapper around OpenAI's completion API using the
     * unofficial ChatGPT model.
     *
     * @param apiKey - OpenAI API key (required).
     * @param apiBaseUrl - Optional override for the OpenAI API base URL.
     * @param apiReverseProxyUrl - Optional override for a reverse proxy URL to use instead of the OpenAI API completions API.
     * @param debug - Optional enables logging debugging info to stdout.
     * @param completionParams - Param overrides to send to the [OpenAI completion API](https://platform.openai.com/docs/api-reference/completions/create). Options like `temperature` and `presence_penalty` can be tweaked to change the personality of the assistant.
     * @param maxModelTokens - Optional override for the maximum number of tokens allowed by the model's context. Defaults to 4096 for the `text-chat-davinci-002-20230126` model.
     * @param maxResponseTokens - Optional override for the minimum number of tokens allowed for the model's response. Defaults to 1000 for the `text-chat-davinci-002-20230126` model.
     * @param messageStore - Optional [Keyv](https://github.com/jaredwray/keyv) store to persist chat messages to. If not provided, messages will be lost when the process exits.
     * @param getMessageById - Optional function to retrieve a message by its ID. If not provided, the default implementation will be used (using an in-memory `messageStore`).
     * @param upsertMessage - Optional function to insert or update a message. If not provided, the default implementation will be used (using an in-memory `messageStore`).
     * @param organization - Optional organization string for openai calls
     * @param fetch - Optional override for the `fetch` implementation to use. Defaults to the global `fetch` function.
     */
    constructor(opts: {
        apiKey: string;
        /** @defaultValue `'https://api.openai.com'` **/
        apiBaseUrl?: string;
        /** @defaultValue `undefined` **/
        apiReverseProxyUrl?: string;
        /** @defaultValue `false` **/
        debug?: boolean;
        completionParams?: Partial<openai.CompletionParams>;
        /** @defaultValue `4096` **/
        maxModelTokens?: number;
        /** @defaultValue `1000` **/
        maxResponseTokens?: number;
        /** @defaultValue `'User'` **/
        userLabel?: string;
        /** @defaultValue `'ChatGPT'` **/
        assistantLabel?: string;
        /** @defaultValue `undefined` **/
        organization?: string;
        messageStore?: Keyv;
        getMessageById?: GetMessageByIdFunction;
        upsertMessage?: UpsertMessageFunction;
        fetch?: FetchFn;
    });
    /**
     * Sends a message to ChatGPT, waits for the response to resolve, and returns
     * the response.
     *
     * If you want your response to have historical context, you must provide a valid `parentMessageId`.
     *
     * If you want to receive a stream of partial responses, use `opts.onProgress`.
     * If you want to receive the full response, including message and conversation IDs,
     * you can use `opts.onConversationResponse` or use the `ChatGPTAPI.getConversation`
     * helper.
     *
     * Set `debug: true` in the `ChatGPTAPI` constructor to log more info on the full prompt sent to the OpenAI completions API. You can override the `promptPrefix` and `promptSuffix` in `opts` to customize the prompt.
     *
     * @param message - The prompt message to send
     * @param opts.conversationId - Optional ID of a conversation to continue (defaults to a random UUID)
     * @param opts.parentMessageId - Optional ID of the previous message in the conversation (defaults to `undefined`)
     * @param opts.messageId - Optional ID of the message to send (defaults to a random UUID)
     * @param opts.promptPrefix - Optional override for the prompt prefix to send to the OpenAI completions endpoint
     * @param opts.promptSuffix - Optional override for the prompt suffix to send to the OpenAI completions endpoint
     * @param opts.timeoutMs - Optional timeout in milliseconds (defaults to no timeout)
     * @param opts.onProgress - Optional callback which will be invoked every time the partial response is updated
     * @param opts.abortSignal - Optional callback used to abort the underlying `fetch` call using an [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
     *
     * @returns The response from ChatGPT
     */
    sendMessage(text: string, opts?: SendMessageOptions): Promise<ChatMessage>;
    get apiKey(): string;
    set apiKey(apiKey: string);
    protected _buildPrompt(message: string, opts: SendMessageOptions): Promise<{
        prompt: string;
        maxTokens: number;
    }>;
    protected _getTokenCount(text: string): Promise<number>;
    protected get _isChatGPTModel(): boolean;
    protected get _isCodexModel(): boolean;
    protected _defaultGetMessageById(id: string): Promise<ChatMessage>;
    protected _defaultUpsertMessage(message: ChatMessage): Promise<void>;
}

declare class ChatGPTUnofficialProxyAPI {
    protected _accessToken: string;
    protected _apiReverseProxyUrl: string;
    protected _debug: boolean;
    protected _model: string;
    protected _headers: Record<string, string>;
    protected _fetch: FetchFn;
    /**
     * @param fetch - Optional override for the `fetch` implementation to use. Defaults to the global `fetch` function.
     */
    constructor(opts: {
        accessToken: string;
        /** @defaultValue `https://chat.openai.com/backend-api/conversation` **/
        apiReverseProxyUrl?: string;
        /** @defaultValue `text-davinci-002-render-sha` **/
        model?: string;
        /** @defaultValue `false` **/
        debug?: boolean;
        /** @defaultValue `undefined` **/
        headers?: Record<string, string>;
        fetch?: FetchFn;
    });
    get accessToken(): string;
    set accessToken(value: string);
    /**
     * Sends a message to ChatGPT, waits for the response to resolve, and returns
     * the response.
     *
     * If you want your response to have historical context, you must provide a valid `parentMessageId`.
     *
     * If you want to receive a stream of partial responses, use `opts.onProgress`.
     * If you want to receive the full response, including message and conversation IDs,
     * you can use `opts.onConversationResponse` or use the `ChatGPTAPI.getConversation`
     * helper.
     *
     * Set `debug: true` in the `ChatGPTAPI` constructor to log more info on the full prompt sent to the OpenAI completions API. You can override the `promptPrefix` and `promptSuffix` in `opts` to customize the prompt.
     *
     * @param message - The prompt message to send
     * @param opts.conversationId - Optional ID of a conversation to continue (defaults to a random UUID)
     * @param opts.parentMessageId - Optional ID of the previous message in the conversation (defaults to `undefined`)
     * @param opts.messageId - Optional ID of the message to send (defaults to a random UUID)
     * @param opts.timeoutMs - Optional timeout in milliseconds (defaults to no timeout)
     * @param opts.onProgress - Optional callback which will be invoked every time the partial response is updated
     * @param opts.abortSignal - Optional callback used to abort the underlying `fetch` call using an [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
     *
     * @returns The response from ChatGPT
     */
    sendMessage(text: string, opts?: SendMessageBrowserOptions): Promise<ChatMessage>;
}

export { ChatGPTAPI, ChatGPTError, ChatGPTErrorType, ChatGPTUnofficialProxyAPI, ChatMessage, ContentType, ConversationJSONBody, ConversationResponseEvent, FetchFn, GetAccessTokenFn, GetMessageByIdFunction, Message, MessageActionType, MessageContent, MessageMetadata, Prompt, PromptContent, Role, SendMessageBrowserOptions, SendMessageOptions, UpsertMessageFunction, openai };
