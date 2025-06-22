'use client'

import { Paperclip, Send } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useRef, useState } from 'react'
import { isHotkey } from 'is-hotkey'
import { useTranslations } from 'next-intl'

import { cn } from '@/services/foundations/utilities/UtileClassService'
import type { AIChatProps, ChatMessage } from './ai-chat.types'
import { Card, CardHeader, CardBody, CardFooter } from '@/components/card'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react'
import { useChatMessage } from './use-chat-message'
import { Text } from '@/components/text'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { Button } from '@/components/button'
import { toast } from '@/services/foundations/toast'
import { MessageUser } from './MessageUser'
import { MessageAssistant } from './MessageAssistant'

export function AIChat({ className = '' }: AIChatProps) {
  // --------------------------------------------------
  // Translations
  // --------------------------------------------------
  const t = useTranslations('pages.newAiCampaign.chat')

  // --------------------------------------------------
  // OpenAI Key Modal
  // --------------------------------------------------
  const [openaiKeyModal_active, openaiKeyModal_setActive] = useState(false)
  const [openaiKeyModal_inputValue, openaiKeyModal_setInputValue] = useState('')
  const [openaiKeyModal_error, openaiKeyModal_setError] = useState('')

  const openaiKeyModal_handleOpen = useCallback(() => {
    openaiKeyModal_setActive(true)
    openaiKeyModal_setInputValue('')
    openaiKeyModal_setError('')
  }, [])

  const openaiKeyModal_handleClose = useCallback(() => {
    openaiKeyModal_setActive(false)
    openaiKeyModal_setInputValue('')
    openaiKeyModal_setError('')
  }, [])

  const openaiKeyModal_handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      openaiKeyModal_setInputValue(e.target.value)
      if (openaiKeyModal_error) {
        openaiKeyModal_setError('')
      }
    },
    [openaiKeyModal_error]
  )

  const openaiKeyModal_handleSave = useCallback(() => {
    if (!openaiKeyModal_inputValue.trim()) {
      openaiKeyModal_setError(t('apiKey.modal.required'))
      return
    }

    openaiKeyModal_handleClose()
    toast.success('API key saved successfully')
  }, [openaiKeyModal_inputValue, openaiKeyModal_handleClose, t])

  const openaiKeyModal_markup = (
    <Modal
      isOpen={openaiKeyModal_active}
      onClose={openaiKeyModal_handleClose}
      placement='center'
      backdrop='blur'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          <Text variant='headingMd' degree='100'>
            {t('apiKey.modal.title')}
          </Text>
        </ModalHeader>
        <ModalBody>
          <div className='flex flex-col gap-4'>
            <Text variant='bodyMd' degree='100'>
              {t('apiKey.modal.description')}
            </Text>
            <Input
              label={t('apiKey.modal.placeholder')}
              placeholder={t('apiKey.modal.placeholder')}
              value={openaiKeyModal_inputValue}
              onChange={openaiKeyModal_handleInputChange}
              isInvalid={!!openaiKeyModal_error}
              errorMessage={openaiKeyModal_error}
              autoFocus
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className='flex gap-2'>
            <Button variant='ghost' onPress={openaiKeyModal_handleClose}>
              <Text variant='bodySm' degree='100'>
                {t('apiKey.modal.cancel')}
              </Text>
            </Button>
            <Button color='primary' onPress={openaiKeyModal_handleSave}>
              <Text variant='bodySm' degree='100'>
                {t('apiKey.modal.save')}
              </Text>
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  const openaiKeyModal = {
    // state
    active: openaiKeyModal_active,
    setActive: openaiKeyModal_setActive,
    inputValue: openaiKeyModal_inputValue,
    setInputValue: openaiKeyModal_setInputValue,
    error: openaiKeyModal_error,
    setError: openaiKeyModal_setError,

    // handlers
    handleOpen: openaiKeyModal_handleOpen,
    handleClose: openaiKeyModal_handleClose,
    handleInputChange: openaiKeyModal_handleInputChange,
    handleSave: openaiKeyModal_handleSave,

    // markup
    markup: openaiKeyModal_markup,
  }

  // --------------------------------------------------
  // Chat Request
  // --------------------------------------------------
  const chatRequest_config = {
    systemPrompt:
      'You are a helpful AI assistant for marketing campaign creation. Help users brainstorm, plan, and develop effective marketing campaigns.',
  }

  const chatRequest_chat = useChatMessage({
    openaiKey: openaiKeyModal.inputValue,
    systemPrompt: chatRequest_config.systemPrompt,
    onMessageSent: message => {
      console.log(message)
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  // --------------------------------------------------
  // Chat handlers
  // --------------------------------------------------
  const chatRequest_handleSubmit = useCallback(() => {
    // Check if OpenAI key is available
    if (!openaiKeyModal.inputValue) {
      openaiKeyModal.handleOpen()
    } else {
      // Submit chat request
      chatRequest_chat.handleSubmit()
    }
  }, [chatRequest_chat, openaiKeyModal])

  const chatRequest_handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      chatRequest_chat.setInput(e.target.value)
    },
    [chatRequest_chat]
  )

  const chatRequest_handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Backspace to stop
      if (isHotkey('backspace')(e) && chatRequest_chat.input.length === 0) {
        e.preventDefault()
        chatRequest_chat.stop()
      }
      // Enter to send
      if (isHotkey('enter')(e) && !e.shiftKey) {
        e.preventDefault()
        chatRequest_handleSubmit()
      }
    },
    [chatRequest_chat, chatRequest_handleSubmit]
  )

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
  // Chat Block
  // --------------------------------------------------
  const chatBlock_inputRef = useRef<HTMLTextAreaElement>(null)

  const chatBlock_handleInputFocus = useCallback(() => {
    chatBlock_inputRef.current?.focus()
  }, [])

  const chatBlock_markup = (
    <Card className='mx-auto h-full w-full max-w-4xl border bg-background p-0 shadow-md dark:border-white/20 dark:shadow-white/10'>
      <CardHeader className='p-0 px-4 pt-4'></CardHeader>
      <CardBody className='p-0 px-4'>
        <Textarea
          aria-label='Chat Input'
          ref={chatBlock_inputRef}
          value={chatRequest.input}
          onChange={chatRequest.changeHandler}
          onKeyDown={chatRequest.keydownHandler}
          autoFocus
          placeholder={t('placeholder')}
          variant='faded'
          size='sm'
          minRows={1}
          maxRows={20}
          classNames={{
            inputWrapper: 'px-0 bg-transparent border-none shadow-none',
            input: 'text-foreground',
          }}
        />
      </CardBody>
      <CardFooter
        className='flex items-center justify-between px-4 pb-4 pt-2'
        onClick={chatBlock_handleInputFocus}
      >
        <Button isIconOnly variant='light' size='sm' className='h-10 w-10'>
          <Paperclip className='size-4' />
        </Button>

        <Button
          isIconOnly
          color='default'
          variant='solid'
          size='sm'
          onPress={chatRequest.submitHandler}
          isDisabled={!chatRequest.input.trim()}
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

  const chatBlock = {
    inputRef: chatBlock_inputRef,
    handleInputFocus: chatBlock_handleInputFocus,
    markup: chatBlock_markup,
  }

  // --------------------------------------------------
  // Chat Initialization
  // --------------------------------------------------

  const chatInitialization_markup = (
    <div className='relative bottom-40 flex h-full w-full max-w-4xl flex-col items-center justify-center gap-12'>
      <Text variant='headingXl' degree='100' className='text-center'>
        New AI Campaign
      </Text>

      {chatBlock.markup}
    </div>
  )

  const chatInitialization = {
    block_markup: chatBlock.markup,
    markup: chatInitialization_markup,
  }

  // --------------------------------------------------
  // Chat Assistant
  // --------------------------------------------------

  const messageDemo: ChatMessage[] = [
    {
      id: '0',
      role: 'user',
      content: 'Hello',
      timestamp: new Date(),
    },
    {
      id: '1',
      role: 'assistant',
      content: 'Hello, how can I help you today?',
      timestamp: new Date(),
    },
    {
      id: '2',
      role: 'user',
      content: 'I need help with my campaign.',
      timestamp: new Date(),
    },
    {
      id: '3',
      role: 'assistant',
      content: 'I can help you with that. What do you need help with?',
      timestamp: new Date(),
    },
  ]

  const chatAssistant_messagesMarkup = (
    <div className='mx-auto flex w-full max-w-4xl flex-col gap-6'>
      {messageDemo.map((message, index) =>
        message.role === 'assistant' ? (
          <MessageAssistant
            key={message.id}
            {...message}
            resetHandler={() => {
              console.log('reset')
            }}
          />
        ) : (
          <MessageUser key={message.id} {...message} />
        )
      )}
    </div>
  )

  const chatAssistant_markup = (
    <div className='absolute bottom-20 left-0 w-full'>
      {chatInitialization.block_markup}
    </div>
  )

  const chatAssistant = {
    messagesMarkup: chatAssistant_messagesMarkup,
    markup: chatAssistant_markup,
  }

  // --------------------------------------------------
  // Chat Block
  // --------------------------------------------------
  const chatArchetype_markup = (
    <>
      <AnimatePresence>
        {chatRequest.messages.length === 0 ? (
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className={cn(
              `flex w-full flex-col items-center justify-center gap-6 px-6`,
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
            style={{
              minHeight: 'min-content',
            }}
            className={cn(
              `select flex min-h-full w-full flex-col items-center gap-6 p-6`,
              className
            )}
          >
            {chatAssistant.messagesMarkup}
            {chatAssistant.markup}
          </motion.section>
        )}
      </AnimatePresence>
      {openaiKeyModal.markup}
    </>
  )

  return chatArchetype_markup
}
