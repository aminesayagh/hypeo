"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Card, CardBody, CardFooter } from "@/components/card";
import { Text } from "@/components/text";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Check, Copy, Loader2, Send, StopCircle } from "lucide-react";
import { useTranslations } from "next-intl";

// --------------------------------------------------
// Types
// --------------------------------------------------

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface InitialInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  placeholder: string;
}

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  placeholder: string;
}

interface MessageProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

// --------------------------------------------------
// Initial Input Component (First Message)
// --------------------------------------------------

const InitialInput = ({ value, onChange, onSubmit, disabled, placeholder }: InitialInputProps) => {
  const input_handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  }, [onSubmit]);

  const input_markup = (
    <div className="w-full max-w-3xl">
      <Card className="relative bg-background-level-1">
        <CardBody>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={input_handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            size="sm"
            variant="faded"
            classNames={{
              inputWrapper: "h-16 px-6 bg-transparent border-none shadow-none"
            }}
          />
        </CardBody>
        <CardFooter>  
        </CardFooter>
      </Card>
    </div>
  );

  return input_markup;
};


// --------------------------------------------------
// Chat Input Component (Subsequent Messages)
// --------------------------------------------------

const ChatInput = ({ value, onChange, onSubmit, disabled, placeholder }: ChatInputProps) => {
  const input_handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  }, [onSubmit]);

  const input_markup = (
    <div className="flex gap-2 items-end">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={input_handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1"
        variant="bordered"
      />
      <Button
        isIconOnly
        color="primary"
        variant="solid"
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        className="h-14"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );

  return input_markup;
};


// --------------------------------------------------
// Message Component
// --------------------------------------------------

const Message = ({ message, isStreaming = false }: MessageProps) => {
  const t = useTranslations();
  const [copyButton_copied, copyButton_setCopied] = useState(false);
  
  const copyButton_handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      copyButton_setCopied(true);
      setTimeout(() => copyButton_setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  }, [message.content]);

  const copyButton_markup = (
    <Button
      isIconOnly
      size="sm"
      variant="light"
      onClick={copyButton_handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {copyButton_copied ? (
        <Check className="w-3 h-3 text-success" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
    </Button>
  );

  const message_markup = (
    <div className={`group flex gap-3 p-4 ${
      message.role === 'user' 
        ? 'bg-primary-50 ml-8' 
        : 'bg-background-level-1 mr-8'
    } rounded-lg`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
        message.role === 'user'
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary text-secondary-foreground'
      }`}>
        {message.role === 'user' ? 'U' : 'AI'}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <Text variant="bodySm" degree="300" className="capitalize">
            <Text>{message.role === 'user' ? t('pages.newAiCampaign.chat.user') : t('pages.newAiCampaign.chat.assistant')}</Text>
          </Text>
          <div className="flex items-center gap-2">
            {copyButton_markup}
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <Text variant="bodyMd" className="whitespace-pre-wrap">
            {message.content}
            {isStreaming && (
              <span className="animate-pulse ml-1 text-primary">▋</span>
            )}
          </Text>
        </div>
        
        <Text variant="bodyXs" degree="200">
          {message.timestamp.toLocaleTimeString()}
        </Text>
      </div>
    </div>
  );

  return message_markup;
};


// --------------------------------------------------
// Main Component
// --------------------------------------------------

export default function NewAiCampaignPage() {
  const t = useTranslations();
  
  // --------------------------------------------------
  // Chat State Management
  // --------------------------------------------------

  const [chat_messages, chat_setMessages] = useState<ChatMessage[]>([]);
  const [chat_input, chat_setInput] = useState("");
  const [chat_hasStarted, chat_setHasStarted] = useState(false);
  
  const chat_messagesEndRef = useRef<HTMLDivElement>(null);
  
  // --------------------------------------------------
  // AI Chat Integration
  // --------------------------------------------------

  const {
    messages: ai_messages,
    input: ai_input,
    handleInputChange: ai_handleInputChange,
    handleSubmit: ai_handleSubmit,
    isLoading: ai_isLoading,
    stop: ai_stop,
    error: ai_error,
  } = useChat({
    api: '/api/ai/command',
    body: {
      system: "You are a helpful AI assistant for marketing campaign creation. Help users brainstorm, plan, and develop effective marketing campaigns.",
    },
    onFinish: (message) => {
      // Chat continues after first response
    },
  });

  // --------------------------------------------------
  // Message Synchronization
  // --------------------------------------------------

  useEffect(() => {
    const syncedMessages: ChatMessage[] = ai_messages.map((msg, index) => ({
      id: `${msg.role}-${index}`,
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
      timestamp: new Date(),
    }));
    
    chat_setMessages(syncedMessages);
    
    // If we have messages, switch to chat view
    if (syncedMessages.length > 0) {
      chat_setHasStarted(true);
    }
  }, [ai_messages]);

  // --------------------------------------------------
  // Auto Scroll
  // --------------------------------------------------

  useEffect(() => {
    if (chat_hasStarted) {
      chat_messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat_messages, chat_hasStarted]);

  
  // --------------------------------------------------
  // Input Handlers
  // --------------------------------------------------

  const input_handleChange = useCallback((value: string) => {
    chat_setInput(value);
    ai_handleInputChange({ target: { value } } as any);
  }, [ai_handleInputChange]);

  const input_handleSubmit = useCallback(() => {
    if (!chat_input.trim() || ai_isLoading) return;
    
    ai_handleSubmit();
    chat_setInput("");
    
    // Start chat view after first message
    if (!chat_hasStarted) {
      chat_setHasStarted(true);
    }
  }, [chat_input, ai_isLoading, ai_handleSubmit, chat_hasStarted]);

  // --------------------------------------------------
  // Stop Generation
  // --------------------------------------------------

  const generation_handleStop = useCallback(() => {
    ai_stop();
  }, [ai_stop]);


  
  // --------------------------------------------------
  // Initial View (Before First Message)
  // --------------------------------------------------

  if (!chat_hasStarted) {
    const initialView_markup = (
      <section className="flex flex-col items-center justify-center gap-12 p-12 h-full w-full">
        <div className="flex flex-col items-center justify-center gap-6 max-w-4xl w-full">
          <Text variant="headingXl" degree="100" as="h1" className="text-center">
            {t('pages.newAiCampaign.title')}
          </Text>
          
          <div className="w-full flex justify-center mt-8">
            <InitialInput
              value={chat_input}
              onChange={input_handleChange}
              onSubmit={input_handleSubmit}
              disabled={ai_isLoading}
              placeholder={t('pages.newAiCampaign.chat.placeholder')}
            />
          </div>
          
          {ai_isLoading && (
            <div className="flex items-center gap-2 mt-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              <Text variant="bodySm" degree="300" as="p">
                {t('pages.newAiCampaign.chat.generating')}
              </Text>
            </div>
          )}
          
          {ai_error && (
            <Card className="border-danger bg-danger-50 max-w-md w-full mt-4">
              <CardBody className="p-3">
                <Text variant="bodySm" className="text-danger text-center" as="p">
                  {t('pages.newAiCampaign.chat.error.prefix')} {ai_error.message}
                </Text>
              </CardBody>
            </Card>
          )}
        </div>
      </section>
    );

    return initialView_markup;
  }

  // --------------------------------------------------
  // Chat View (After First Message)
  // --------------------------------------------------

  // Messages Area
  const messages_markup = (
    <div className="flex-1 overflow-y-auto space-y-4 px-4 py-6">
      {chat_messages.map((message, index) => (
        <Message 
          key={message.id} 
          message={message}
          isStreaming={ai_isLoading && index === chat_messages.length - 1 && message.role === 'assistant'}
        />
      ))}
      <div ref={chat_messagesEndRef} />
    </div>
  );

  // Loading Indicator
  const loading_markup = ai_isLoading ? (
    <div className="flex items-center gap-2 px-4 py-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <Text variant="bodySm" degree="300" as="p">
        {t('pages.newAiCampaign.chat.generating')}
      </Text>
      <Button
        size="sm"
        variant="light"
        onClick={generation_handleStop}
        className="ml-auto"
      >
        <StopCircle className="w-4 h-4 mr-1" />
        {t('pages.newAiCampaign.chat.stop')}
      </Button>
    </div>
  ) : null;

  // Error Display
  const error_markup = ai_error ? (
    <div className="px-4 py-2">
      <Card className="border-danger bg-danger-50">
        <CardBody className="p-3">
          <Text variant="bodySm" className="text-danger" as="p">
            {t('pages.newAiCampaign.chat.error.prefix')} {ai_error.message}
          </Text>
        </CardBody>
      </Card>
    </div>
  ) : null;

  // Chat Header
  const chatHeader_markup = (
    <div className="px-6 py-4 border-b border-divider">
      <Text variant="headingXl" as="h1" degree="100" className="text-center">
        {t('pages.newAiCampaign.title')}
      </Text>
    </div>
  );

  // Chat Block
  const chatBlock_markup = (
    <Card className="max-w-screen-xl w-full h-[85vh] bg-background-level-1">
      <CardBody className="p-0 flex flex-col h-full">
        {chatHeader_markup}
        {messages_markup}
        {loading_markup}
        {error_markup}
      </CardBody>
      
      <CardFooter className="p-4 border-t border-divider">
        <div className="w-full">
          <ChatInput
            value={chat_input}
            onChange={input_handleChange}
            onSubmit={input_handleSubmit}
            disabled={ai_isLoading}
            placeholder={t('pages.newAiCampaign.chat.placeholder')}
          />
        </div>
      </CardFooter>
    </Card>
  );

  const chatBlock = {
    markup: chatBlock_markup,
  };
  
  return (
    <section className='flex flex-col items-center justify-center gap-12 p-12 h-full w-full'>
      {chatBlock.markup}
    </section>
  );
}