'use client'

import { Paperclip, Send } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/services/foundations/utilities/UtileClassService'
import { isHotkey } from 'is-hotkey'
import type { AIChatProps } from './ai-chat.types'
import { Card, CardHeader, CardBody, CardFooter } from '@/components/card'
import { useChatMessage } from './use-chat-message'
import { Text } from '@/components/text'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { Button } from '@/components/button'
import { toast } from "@/services/foundations/toast"
import { useRef } from 'react'

export function AIChat({ className = '' }: AIChatProps) {
  // --------------------------------------------------
  // Chat Request
  // --------------------------------------------------
  const chatRequest_config = {
    systemPrompt:
      'You are a helpful AI assistant for marketing campaign creation. Help users brainstorm, plan, and develop effective marketing campaigns.',
  }

  const chatRequest_chat = useChatMessage({
    systemPrompt: chatRequest_config.systemPrompt,
    onMessageSent: message => {
      console.log(message)
    },
    onError: error => {
      toast.error(error.message);
    },
  })

  // --------------------------------------------------
  // Chat handlers
  // --------------------------------------------------

  const chatRequest_handleSubmit = () => {
    chatRequest_chat.handleSubmit()
  }

  const chatRequest_handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    chatRequest_chat.setInput(e.target.value)
  }

  const chatRequest_handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Backspace to stop
    if (isHotkey('backspace')(e) && chatRequest.input.length === 0) {
      e.preventDefault()
      chatRequest_chat.stop()
    }
    // Enter to send
    if (isHotkey('enter')(e) && !e.shiftKey && !chatRequest.input) {
      e.preventDefault()
      chatRequest_chat.setInput(chatRequest.input + '\n')
    }
  }

  const chatRequest = {
    // config
    config: chatRequest_config,

    // state
    input: chatRequest_chat.input,
    messages: chatRequest_chat.messages,
    status: chatRequest_chat.status,
    error: chatRequest_chat.error,

    // handlers
    submitHandler: chatRequest_handleSubmit,
    changeHandler: chatRequest_handleChange,
    keydownHandler: chatRequest_handleKeyDown,
  }

  // --------------------------------------------------
  // Chat Initialization
  // --------------------------------------------------
  const chatInitialization_inputRef = useRef<HTMLTextAreaElement>(null);

  const chatInitialization_handleInputFocus = () => {
    chatInitialization_inputRef.current?.focus();
  }

  const chatInitialization_ReadyMarkup = (
    <Card className='w-full max-w-4xl bg-background p-0 shadow-md border dark:shadow-white/10 dark:border-white/20'>
      <CardHeader className='p-0 px-4 pt-4'></CardHeader>
      <CardBody className='p-0 px-4'>
        <Textarea
          aria-label='Chat Input'
          ref={chatInitialization_inputRef}
          value={chatRequest.input}
          onChange={chatRequest.changeHandler}
          onKeyDown={chatRequest.keydownHandler}
          autoFocus
          placeholder='Ask me anything...'
          variant='faded'
          size='sm'
          minRows={1}
          maxRows={20}
          classNames={{
            inputWrapper: 'h-16 px-0 bg-transparent border-none shadow-none',
            input: 'text-foreground',
          }}
        />
      </CardBody>
      <CardFooter className='flex items-center justify-between pt-2 px-4 pb-4' onClick={chatInitialization_handleInputFocus}>
        <Button
          isIconOnly
          variant='light'
          size='sm'
          //   onPress={fileSelect_handleClick}
          //   disabled={disabled || upload_isUploading}
          className='h-10 w-10'
        >
          <Paperclip className='size-4' />
        </Button>

        <Button
          isIconOnly
          color='default'
          variant='solid'
          size='sm'
          onPress={chatRequest.submitHandler}
          //   disabled={
          //     upload_isUploading ||
          //     (!value.trim() && uploadedFiles.length === 0)
          //   }
          className='h-10 w-fit px-2'
          endContent={<Send className='ml-2 size-4 text-foreground' />}
        >
          <Text variant='bodySm' degree='100' className='pl-1'>
            Send
          </Text>
        </Button>
      </CardFooter>
    </Card>
  )

  const chatInitialization_markup = (
    <div className='flex w-full max-w-4xl h-full flex-col items-center justify-center gap-12 relative bottom-40'>
      <Text variant='headingXl' degree='100' className='text-center'>
        New AI Campaign
      </Text>

      {chatInitialization_ReadyMarkup}

    </div>
  )

  const chatInitialization = {
    markup: chatInitialization_markup,
  }

  // --------------------------------------------------
  // Chat Assistant
  // --------------------------------------------------

  const chatAssistant_markup = <div className='flex flex-col'>
    <div className='absolute bottom-0 w-full h-full'>
        {chatInitialization.markup}
    </div>
  </div>

  const chatAssistant = {
    markup: chatAssistant_markup,
  }

  // --------------------------------------------------
  // Chat Block
  // --------------------------------------------------
  const chatBlock_markup = (
    <AnimatePresence>
      {chatRequest.messages.length === 0 ? (
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className={cn(
            `flex items-center justify-center w-full flex-col gap-6 px-6`,
            className
          )}
          style={{
            minHeight: 'inherit',
          }}
        >
          {chatInitialization.markup}
        </motion.section>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className={cn(
            `flex min-h-full w-full flex-col items-center gap-6 p-6 pt-12`,
            className
          )}
        >
          {chatAssistant.markup}
        </motion.section>
      )}
    </AnimatePresence>
  )

  return chatBlock_markup
}
