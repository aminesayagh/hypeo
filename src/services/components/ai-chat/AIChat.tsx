    'use client'

import { Paperclip, Send } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useRef, useState } from 'react'
import { isHotkey } from 'is-hotkey'
import { useTranslations } from 'next-intl'

import { cn } from '@/services/foundations/utilities/UtileClassService'
import type { AIChatProps } from './ai-chat.types'
import { Card, CardHeader, CardBody, CardFooter } from '@/components/card'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react'
import { useChatMessage } from './use-chat-message'
import { Text } from '@/components/typo'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { Button } from '@/components/button'
import { toast } from '@/services/foundations/toast'
import { MessageUser } from './MessageUser'
import { MessageAssistant } from './MessageAssistant'
import { ScrollShadow } from '@/components/scroll-shadow'

export function AIChat({ className = '' }: AIChatProps) {
  // --------------------------------------------------
  // Translations
  // --------------------------------------------------
  const t = useTranslations('pages.newAiCampaign.chat')

  // --------------------------------------------------
  // OpenAI Key State
  // --------------------------------------------------
  const [openaiKey_value, openaiKey_setValue] = useState<string>('')

  const openaiKey_setKey = useCallback((key: string) => {
    openaiKey_setValue(key)
  }, [])

  const openaiKey = {
    value: openaiKey_value,
    setValue: openaiKey_setValue,
    setKey: openaiKey_setKey,
  }

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

    // TODO: Validate key
    fetch('/api/ai/validate-key', {
      method: 'POST',
      body: JSON.stringify({ apiKey: openaiKeyModal_inputValue.trim() }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.isValid) {
          openaiKey.setKey(openaiKeyModal_inputValue.trim())
          openaiKeyModal_handleClose()
          toast.success('API key saved successfully')
        } else {
          openaiKeyModal_setError(data.message)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [openaiKeyModal_inputValue, openaiKey, openaiKeyModal_handleClose])

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
  // Message Edit Handler
  // --------------------------------------------------
  const messageEdit_handleEdit = async (
    messageId: string,
    newContent: string
  ) => {
    try {
      await chatRequest_chat.messageHandler.editUserMessage(
        messageId,
        newContent
      )
      toast.success('Message edited successfully')
    } catch (error) {
      console.error('Error editing message:', error)
      toast.error('Failed to edit message')
    }
  }

  const messageEdit_handleReload = async (messageId: string) => {
    try {
      await chatRequest_chat.messageHandler.reloadAssistantMessage(messageId)
    } catch (error) {
      console.error('Error reloading message:', error)
      toast.error('Failed to regenerate message')
    }
  }

  const messageEdit = {
    handleEdit: messageEdit_handleEdit,
    handleReload: messageEdit_handleReload,
  }

  // --------------------------------------------------
  // Chat Request
  // --------------------------------------------------
  const chatRequest_config = {
    systemPrompt:
      'You are a helpful AI assistant for marketing campaign creation. Help users brainstorm, plan, and develop effective marketing campaigns.',
  }

  const chatRequest_chat = useChatMessage({
    openaiKey: openaiKey.value,
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
    if (!openaiKey.value) {
      openaiKeyModal.handleOpen()
    } else {
      // Submit chat request
      chatRequest_chat.handleSubmit()
    }
  }, [chatRequest_chat, openaiKey.value, openaiKeyModal])

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
    isNewChat: chatRequest_chat.messages.length === 0,

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
          color='secondary'
          variant='solid'
          size='sm'
          onPress={chatRequest.submitHandler}
          isDisabled={!chatRequest.input.trim()}
          className='h-10 w-fit px-5'
          radius='full'
          endContent={<Send className='ml-2 size-4' />}
        >
          <Text
            variant='bodySm'
            degree='100'
            fontWeight='bold'
            className='text-white'
          >
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
    <div className='relative flex h-full w-full max-w-4xl flex-col items-center justify-center gap-12'>
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
  const chatAssistant_messagesMarkup = (
    <ScrollShadow
      className='mx-auto flex w-full flex-col items-center gap-6'
      style={{
        height: 'calc(100vh - 280px)',
      }}
    >
      <div className='flex w-full max-w-4xl flex-col gap-6 px-2 pb-10 pt-4'>
        {chatRequest.messages.map(message =>
          message.role === 'assistant' ? (
            <MessageAssistant
              key={message.id}
              {...message}
              onReload={messageEdit.handleReload}
            />
          ) : (
            <MessageUser
              key={message.id}
              {...message}
              onEdit={messageEdit.handleEdit}
            />
          )
        )}
      </div>
    </ScrollShadow>
  )

  const chatAssistant_markup = (
    <div className='flex w-full flex-col items-center justify-center gap-4'>
      {chatInitialization.block_markup}
      <div className='flex w-full flex-col items-center justify-center gap-6'>
        <Text variant='bodySm' degree='100' className='text-center'>
          Powered by OpenAI
        </Text>
      </div>
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
        {chatRequest.isNewChat ? (
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className={cn(
              `flex w-full flex-col items-center justify-center gap-6`,
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
            className={cn(`flex w-full flex-col items-center gap-6`, className)}
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
