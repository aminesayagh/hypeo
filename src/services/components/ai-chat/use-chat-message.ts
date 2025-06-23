import type { ChatMessage } from "./ai-chat.types";
import { useChat } from "@ai-sdk/react";
import type { Message, UIMessage } from "ai";
import { useCallback } from "react";

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
        setMessages: ai_setMessages,
        input: ai_input,
        setInput: ai_setInput,
        status: ai_status,
        stop: ai_stop,
        error: ai_error,
        handleSubmit: ai_handleSubmit,
        reload: ai_reload
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

    // --------------------------------------------------
    // Message Handlers
    // --------------------------------------------------

    
    /**
     * Get the index of a message in the conversation
     */
    const messageHandler_getMessageIndex = useCallback((messageId: string): number => {
        return ai_messages.findIndex(msg => msg.id === messageId);
    }, [ai_messages]);

    /**
     * Get a message by id
     */
    const messageHandler_getMessage = useCallback((messageId: string): {message: Message, index: number} => {
        const messageIndex = messageHandler_getMessageIndex(messageId);
        if (messageIndex === -1) {
            throw new Error('Message not found');
        }
        return {message: ai_messages[messageIndex] as Message, index: messageIndex};
    }, [ai_messages, messageHandler_getMessageIndex]);

    /**
     * Check if this is the last message in the conversation
     */
    const messageHandler_isLastMessage = useCallback((messageId: string): boolean => {
        const messageIndex = messageHandler_getMessageIndex(messageId);
        return messageIndex === ai_messages.length - 1;
    }, [ai_messages, messageHandler_getMessageIndex]);
    
    /**
     * Edit a user message and optionally regenerate subsequent responses
     */
    const messageHandler_editUserMessage = useCallback(async (messageId: string, newContent: string) => {
        try {
            const {message: messageToEdit, index: messageIndex} = messageHandler_getMessage(messageId);
            
            if (messageToEdit.role !== 'user') {
                throw new Error('Can only edit user messages');
            }

            // Create updated message
            const updatedMessage = {
                ...messageToEdit,
                content: newContent,
            };

            // Update messages array - keep messages up to the edited one, replace the edited message
            // and remove all subsequent messages (they'll be regenerated)
            const messagesUpToEdit = ai_messages.slice(0, messageIndex);
            const updatedMessages = [...messagesUpToEdit, updatedMessage];

            // Update the messages array
            ai_setMessages(updatedMessages);

            // If this was the last message or there were assistant responses after it,
            // we need to regenerate the assistant response
            const hadSubsequentMessages = messageIndex < ai_messages.length - 1;
            
            if (hadSubsequentMessages || messageIndex === ai_messages.length - 1) {
                // Trigger regeneration by setting up the state and calling reload
                // We need to temporarily set the input to trigger the generation
                const currentInput = ai_input;
                ai_setInput(newContent);
                
                // Small delay to ensure state is updated
                setTimeout(() => {
                    ai_reload();
                    ai_setInput(currentInput); // Restore original input
                }, 0);
            }

        } catch (error) {
            console.error('Error editing message:', error);
            onError?.(error as Error);
        }
    }, [ai_messages, ai_setMessages, ai_reload, ai_input, ai_setInput, onError]);

    /**
     * Regenerate a specific assistant message
     */
    const messageHandler_reloadAssistantMessage = useCallback(async (messageId: string) => {
        try {
            const {message: messageToReload, index: messageIndex} = messageHandler_getMessage(messageId);
            
            if (messageToReload.role !== 'assistant') {
                throw new Error('Can only reload assistant messages');
            }

            // Keep all messages up to (but not including) the message we want to reload
            const messagesUpToReload = ai_messages.slice(0, messageIndex);
            
            // Update messages array to remove the message to reload and all subsequent messages
            ai_setMessages(messagesUpToReload);

            // Trigger regeneration
            setTimeout(() => {
                ai_reload();
            }, 0);

        } catch (error) {
            console.error('Error reloading assistant message:', error);
            onError?.(error as Error);
        }
    }, [ai_messages, ai_setMessages, ai_reload, onError]);

    /**
     * Regenerate the last assistant message (most common use case)
     */
    const messageHandler_reloadLastMessage = useCallback(async () => {
        ai_reload();
    }, [ai_reload]);

    /**
     * Delete a message and all subsequent messages
     */
    const messageHandler_deleteMessage = useCallback((messageId: string) => {
        try {
            const {index: messageIndex} = messageHandler_getMessage(messageId);
            
            // Keep only messages up to (but not including) the deleted message
            const remainingMessages = ai_messages.slice(0, messageIndex);
            ai_setMessages(remainingMessages);

        } catch (error) {
            console.error('Error deleting message:', error);
            onError?.(error as Error);
        }
    }, [messageHandler_getMessage, ai_setMessages, onError, ai_messages]);

    /**
     * Clear all messages
     */
    const messageHandler_clearAll = useCallback(() => {
        ai_setMessages([]);
    }, [ai_setMessages]);

    /**
     * Check if a message can be edited (only user messages)
     */
    const messageHandler_canEdit = useCallback((messageId: string): boolean => {
        const message = ai_messages.find(msg => msg.id === messageId);
        return message?.role === 'user';
    }, [ai_messages]);

    /**
     * Check if a message can be reloaded (only assistant messages)
     */
    const messageHandler_canReload = useCallback((messageId: string): boolean => {
        const message = ai_messages.find(msg => msg.id === messageId);
        return message?.role === 'assistant';
    }, [ai_messages]);


    // --------------------------------------------------
    // Message Handler Object
    // --------------------------------------------------
    const messageHandler = {
        // Core functionality
        editUserMessage: messageHandler_editUserMessage,
        reloadAssistantMessage: messageHandler_reloadAssistantMessage,
        reloadLastMessage: messageHandler_reloadLastMessage,
        
        // Utility functions
        deleteMessage: messageHandler_deleteMessage,
        clearAll: messageHandler_clearAll,
        
        // Helper functions
        canEdit: messageHandler_canEdit,
        canReload: messageHandler_canReload,
        getMessageIndex: messageHandler_getMessageIndex,
        isLastMessage: messageHandler_isLastMessage,
    };

    // --------------------------------------------------
    // AI State Object
    // --------------------------------------------------
    const ai = {
        config: ai_config,
        messages: parseMessages(ai_messages),
        input: ai_input,
        status: ai_status,
        error: ai_error,
        setInput: ai_setInput,
        stop: ai_stop,
        handleSubmit: ai_handleSubmit,
        reload: ai_reload,
    };

    return {
        ...ai,
        messageHandler,
    };
}
