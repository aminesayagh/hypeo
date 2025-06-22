import type { ChatMessage } from "./ai-chat.types";
import { useChat } from "@ai-sdk/react";
import type { Message, UIMessage } from "ai";

interface UseChatMessageProps {
    openaiKey: string;
    systemPrompt: string;
    onMessageSent: (message: ChatMessage) => void;
    onError: (error: Error) => void;
}

function parseMessages(messages: UIMessage[]): ChatMessage[] {
    return messages.map(message => ({
        id: message.id,
        role: message.role,
        content: message.content,
        createdAt: message.createdAt ?? new Date(),
    }));
}

function parseMessage(message: Message): ChatMessage {
    return {
        id: message.id,
        role: message.role,
        content: message.content,
        createdAt: message.createdAt ?? new Date(),
    };
}

export function useChatMessage({
    openaiKey,
    systemPrompt,
    onMessageSent,
    onError,
}: UseChatMessageProps) {

    // --------------------------------------------------
    // AI Integration
    // --------------------------------------------------
    const ai_config = {
        api: "/api/ai/command",
        apiKey: openaiKey,
        systemPrompt,
    }
    
    const {
        messages: ai_messages,
        input: ai_input,
        setInput: ai_setInput,
        status: ai_status,
        stop: ai_stop,
        error: ai_error,
        handleSubmit: ai_handleSubmit,
    } = useChat({
        api: ai_config.api,
        body: {
            system: ai_config.systemPrompt,
            apiKey: ai_config.apiKey,
        },
        onFinish: (message) => {
            onMessageSent?.(parseMessage(message));
        },
        onError: (error) => {
            console.error(error);
            onError?.(error);
        },
    });

    const ai = {
        config: ai_config,
        messages: parseMessages(ai_messages),
        input: ai_input,
        status: ai_status,
        error: ai_error,
        setInput: ai_setInput,
        stop: ai_stop,
        handleSubmit: ai_handleSubmit,
    };

    return ai;
}