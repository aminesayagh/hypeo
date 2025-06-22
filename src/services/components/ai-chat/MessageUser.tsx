import type { MessageUserProps } from './ai-chat.types'
import { Text } from '@/components/text'
import { Textarea } from '@/components/textarea'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useState, useRef, useEffect } from 'react'
import { Button } from '@/components/button'
import { Ellipsis, Edit3, Save, X } from 'lucide-react'
import { CopyToClipboard } from '@/components/copyToClipboard'
import { useTranslations } from 'next-intl'

export function MessageUser({ id, content, onEdit }: MessageUserProps) {
  // --------------------------------------------------
  // Translations
  // --------------------------------------------------
  const t = useTranslations('pages.newAiCampaign.chat.messageActions')

  // --------------------------------------------------
  // Edit State
  // --------------------------------------------------
  const [edit_active, edit_setActive] = useState(false)
  const [edit_value, edit_setValue] = useState(content)
  const edit_textareaRef = useRef<HTMLTextAreaElement>(null)

  const edit_handleStart = useCallback(() => {
    edit_setActive(true)
    edit_setValue(content)
  }, [content])

  const edit_handleCancel = useCallback(() => {
    edit_setActive(false)
    edit_setValue(content)
  }, [content])

  const edit_handleSave = useCallback(() => {
    if (edit_value.trim() && edit_value !== content) {
      onEdit?.(id, edit_value.trim())
    }
    edit_setActive(false)
  }, [edit_value, content, onEdit, id])

  const edit_handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    edit_setValue(e.target.value)
  }, [])

  const edit_handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      edit_handleSave()
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      edit_handleCancel()
    }
  }, [edit_handleSave, edit_handleCancel])

  // Focus textarea when edit starts
  useEffect(() => {
    if (edit_active && edit_textareaRef.current) {
      edit_textareaRef.current.focus()
      // Move cursor to end
      edit_textareaRef.current.setSelectionRange(edit_value.length, edit_value.length)
    }
  }, [edit_active, edit_value.length])

  const edit_inputMarkup = (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <Textarea
        ref={edit_textareaRef}
        value={edit_value}
        onChange={edit_handleChange}
        onKeyDown={edit_handleKeyDown}
        variant="bordered"
        minRows={1}
        maxRows={10}
        classNames={{
          inputWrapper: 'bg-background border-2 border-primary-200 focus-within:border-primary-500',
          input: 'text-foreground',
        }}
      />
      <div className="flex justify-end gap-2">
        <Button
          size="sm"
          variant="ghost"
          onPress={edit_handleCancel}
          startContent={<X className="size-3" />}
        >
          <Text variant="bodySm" degree="100">
            {t('cancel')}
          </Text>
        </Button>
        <Button
          size="sm"
          color="primary"
          onPress={edit_handleSave}
          isDisabled={!edit_value.trim() || edit_value === content}
          startContent={<Save className="size-3" />}
        >
          <Text variant="bodySm" degree="100">
            {t('save')}
          </Text>
        </Button>
      </div>
    </div>
  )

  const edit = {
    active: edit_active,
    setActive: edit_setActive,
    value: edit_value,
    setValue: edit_setValue,
    textareaRef: edit_textareaRef,

    handleStart: edit_handleStart,
    handleCancel: edit_handleCancel,
    handleSave: edit_handleSave,
    handleChange: edit_handleChange,
    handleKeyDown: edit_handleKeyDown,

    inputMarkup: edit_inputMarkup,
  }

  // --------------------------------------------------
  // Menu
  // --------------------------------------------------
  const [menu_isOpen, menu_setIsOpen] = useState(false)

  const menu_handleOpen = useCallback(() => {
    if (!edit.active) {
      menu_setIsOpen(true)
    }
  }, [edit.active])

  const menu_handleClose = useCallback(() => {
    menu_setIsOpen(false)
  }, [])

  const menu_handleEditClick = useCallback(() => {
    edit.handleStart()
    menu_handleClose()
  }, [edit, menu_handleClose])

  const menu_actionsMarkup = (
    <div className="flex flex-col gap-1 bg-background border border-divider rounded-lg p-1 shadow-lg">
      <CopyToClipboard content={content} />
      <Button
        size="sm"
        variant="ghost"
        onPress={menu_handleEditClick}
        startContent={<Edit3 className="size-3" />}
        className="justify-start"
      >
        <Text variant="bodySm" degree="100">
          {t('edit')}
        </Text>
      </Button>
    </div>
  )

  const menu_markup = (
    <AnimatePresence>
      {menu_isOpen && (
        <motion.div
          className='absolute right-0 top-full z-10 mt-1'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
        >
          {menu_actionsMarkup}
        </motion.div>
      )}
    </AnimatePresence>
  )

  const menu = {
    isOpen: menu_isOpen,
    setIsOpen: menu_setIsOpen,

    handleOpen: menu_handleOpen,
    handleClose: menu_handleClose,
    handleEditClick: menu_handleEditClick,

    actionsMarkup: menu_actionsMarkup,
    markup: menu_markup,
  }

  // --------------------------------------------------
  // Content
  // --------------------------------------------------
  const content_displayMarkup = (
    <div className='rounded-full bg-foreground-200 px-4 py-2'>
      <Text variant='bodySm' degree='100' className='text-foreground'>
        {content}
      </Text>
    </div>
  )

  const content_markup = edit.active ? edit.inputMarkup : content_displayMarkup

  // --------------------------------------------------
  // Message Container
  // --------------------------------------------------
  const messageContainer_markup = (
    <motion.div
      className='relative flex w-full flex-row items-end justify-end'
      onMouseEnter={menu.handleOpen}
      onMouseLeave={menu.handleClose}
      layout
    >
      {content_markup}
      {!edit.active && menu.markup}
    </motion.div>
  )

  return messageContainer_markup
}
