import type { ChatMessage } from "./ai-chat.types";
import { useChat } from "@ai-sdk/react";

interface UseChatMessageProps {
    systemPrompt: string;
    onMessageSent: (message: ChatMessage) => void;
    onError: (error: Error) => void;
}

export function useChatMessage({
    systemPrompt,
    onMessageSent,
    onError,
}: UseChatMessageProps) {
    

    // --------------------------------------------------
    // AI Integration
    // --------------------------------------------------
    const ai_config = {
        api: "/api/ai/command",
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
        },
        onFinish: (message) => {
            console.log(message);
            const chatMessage: ChatMessage = {
                id: `assistant-${Date.now()}`,
                role: 'assistant',
                content: message.content,
                timestamp: new Date(),
            };
            onMessageSent?.(chatMessage);
        },
        onError: (error) => {
            console.error(error);
            onError?.(error);
        },
    });

    const ai = {
        config: ai_config,
        messages: ai_messages,
        input: ai_input,
        status: ai_status,
        error: ai_error,
        setInput: ai_setInput,
        stop: ai_stop,
        handleSubmit: ai_handleSubmit
    };

    return ai;
}