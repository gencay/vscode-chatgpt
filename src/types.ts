// Adapted from https://github.com/transitive-bullshit/chatgpt-api/blob/v3/license

/**
 * 
 * MIT License

Copyright (c) 2023 Travis Fischer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

export type ContentType = 'text';

export type Role = 'user' | 'assistant';

/**
 * https://chat.openapi.com/api/auth/session
 */
export type SessionResult = {
    /**
     * Authenticated user
     */
    user: User;

    /**
     * ISO date of the expiration date of the access token
     */
    expires: string;

    /**
     * The access token
     */
    accessToken: string;

    /**
     * If there was an error associated with this request
     */
    error?: string | null;
};

export type User = {
    /**
     * ID of the user
     */
    id: string;

    /**
     * Name of the user
     */
    name: string;

    /**
     * Email of the user
     */
    email?: string;

    /**
     * Image of the user
     */
    image: string;

    /**
     * Picture of the user
     */
    picture: string;

    /**
     * Groups the user is in
     */
    groups: string[];

    /**
     * Features the user is in
     */
    features: string[];
};

/**
 * https://chat.openapi.com/backend-api/models
 */
export type ModelsResult = {
    /**
     * Array of models
     */
    models: Model[];
};

export type Model = {
    /**
     * Name of the model
     */
    slug: string;

    /**
     * Max tokens of the model
     */
    max_tokens: number;

    /**
     * Whether or not the model is special
     */
    is_special: boolean;
};

/**
 * https://chat.openapi.com/backend-api/moderations
 */
export type ModerationsJSONBody = {
    /**
     * Input for the moderation decision
     */
    input: string;

    /**
     * The model to use in the decision
     */
    model: AvailableModerationModels;
};

export type AvailableModerationModels = 'text-moderation-playground';

/**
 * https://chat.openapi.com/backend-api/moderations
 */
export type ModerationsJSONResult = {
    /**
     * Whether or not the input is flagged
     */
    flagged: boolean;

    /**
     * Whether or not the input is blocked
     */
    blocked: boolean;

    /**
     * The ID of the decision
     */
    moderation_id: string;
};

/**
 * https://chat.openapi.com/backend-api/conversation
 */
export type ConversationJSONBody = {
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

export type Prompt = {
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

export type PromptContent = {
    /**
     * The content type of the prompt
     */
    content_type: ContentType;

    /**
     * The parts to the prompt
     */
    parts: string[];
};

/**
 * https://chat.openapi.com/backend-api/conversation/message_feedback
 */
export type MessageFeedbackJSONBody = {
    /**
     * The ID of the conversation
     */
    conversation_id: string;

    /**
     * The message ID
     */
    message_id: string;

    /**
     * The rating
     */
    rating: MessageFeedbackRating;

    /**
     * Tags to give the rating
     */
    tags?: MessageFeedbackTags[];

    /**
     * The text to include
     */
    text?: string;
};

export type MessageFeedbackTags = 'harmful' | 'false' | 'not-helpful';

export type MessageFeedbackResult = {
    /**
     * The message ID
     */
    message_id: string;

    /**
     * The ID of the conversation
     */
    conversation_id: string;

    /**
     * The ID of the user
     */
    user_id: string;

    /**
     * The rating
     */
    rating: MessageFeedbackRating;

    /**
     * The text the server received, including tags
     */
    text?: string;
};

export type MessageFeedbackRating = 'thumbsUp' | 'thumbsDown';

export type ConversationResponseEvent = {
    message?: Message;
    conversation_id?: string;
    error?: string | null;
};

export type Author = {
    role: "user" | "assistant" | "system";
    name: null;
    metadata: MessageMetadata;
};

export type Message = {
    id: string;
    content: MessageContent;
    role?: string;
    user?: string | null;
    create_time: string | number;
    update_time: string | null;
    end_turn: boolean | null;
    author: Author;
    weight: number;
    recipient: string;
    metadata: MessageMetadata;
};

export type MessageContent = {
    content_type: "text";
    parts: string[];
};

export type MessageMetadata = any;
export type MessageActionType = 'next' | 'variant';

export type SendMessageOptions = {
    conversationId?: string;
    parentMessageId?: string;
    messageId?: string;
    action?: MessageActionType;
    timeoutMs?: number;
    onProgress?: (partialResponse: ChatResponse) => void;
    abortSignal: AbortSignal;
    model?: string;
};

export type SendConversationMessageOptions = Omit<
    SendMessageOptions,
    'conversationId' | 'parentMessageId'
>;

export class ChatGPTError extends Error {
    statusCode?: number;
    statusText?: string;
    response?: Response;
    originalError?: Error;
}

export type ChatError = {
    error: { message: string; statusCode?: number; statusText?: string; };
    conversationId?: string;
    messageId?: string;
};

export type ChatResponse = {
    response: string;
    conversationId: string;
    messageId: string;
    origMessageId: string;
};

export type ConversationsItem = {
    create_time: string;
    id: string;
    title: string;
};

export type ConversationsResponse = {
    items: ConversationsItem[];
    total: number;
    limit: number;
    offset: number;

};

export type ConversationItem = {
    id: string;
    message: Message | null;
    parent: string | null;
    children: string[];
};

export type ConversationResponse = {
    title: string;
    mapping: Record<string, ConversationItem>;
    create_time: number;
    moderation_results: any[];
    current_node: string;
};

export type LoginMethod = "GPT3 OpenAI API Key";

export type AuthType = "OpenAI Authentication" | "Google Authentication" | "Microsoft Authentication";