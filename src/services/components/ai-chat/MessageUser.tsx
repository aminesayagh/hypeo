import type { MessageUserProps } from './ai-chat.types'
import { Text } from '@/components/typo'
import { Textarea } from '@/components/textarea'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useState, useRef, useEffect } from 'react'
import { Button, ButtonTooltip } from '@/components/button'
import { Edit3 } from 'lucide-react'
import { CopyToClipboard } from '@/components/copyToClipboard'
import { useTranslations } from 'next-intl'
import { isHotkey } from 'is-hotkey'
import { Card } from '@/components/card'

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

  const edit_handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      edit_setValue(e.target.value)
    },
    []
  )

  const edit_handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Enter to save
      if (isHotkey('enter')(e) && !e.shiftKey) {
        e.preventDefault()
        edit_handleSave()
      }
      // Escape to cancel
      if (isHotkey('Escape')(e) && !e.shiftKey) {
        e.preventDefault()
        edit_handleCancel()
      }
    },
    [edit_handleSave, edit_handleCancel]
  )

  // Focus textarea when edit starts
  useEffect(() => {
    if (edit_active && edit_textareaRef.current) {
      edit_textareaRef.current.focus()
      // Move cursor to end
      edit_textareaRef.current.setSelectionRange(
        edit_value.length,
        edit_value.length
      )
    }
  }, [edit_active])

  const edit_inputMarkup = (
    <Card className='relative flex flex-col gap-2 border-transparent bg-transparent shadow-none w-9/12' radius='md' shadow='none'>
      <Textarea
        ref={edit_textareaRef}
        value={edit_value}
        onChange={edit_handleChange}
        onKeyDown={edit_handleKeyDown}
        color='default'
        minRows={3}
        maxRows={10}
        classNames={{
          inputWrapper: 'bg-background-level-3 py-5 px-4',
          input: 'text-foreground',
        }}
      />
      <div className='flex justify-end gap-2 p-2'>
        <Button
          size='sm'
          variant='flat'
          onPress={edit_handleCancel}
          radius='full'
        >
          {t('cancel')}
        </Button>
        <Button
          size='sm'
          color='secondary'
          onPress={edit_handleSave}
          isDisabled={!edit_value.trim() || edit_value === content}
          radius='full'
        >
          {t('save')}
        </Button>
      </div>
    </Card>
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
    <div className='flex flex-row gap-1 rounded-lg border border-divider bg-background p-1 shadow-lg'>
      <CopyToClipboard content={content} />
      <ButtonTooltip onPress={menu_handleEditClick} title={t('edit')}>
        <Edit3 className='size-3' />
      </ButtonTooltip>
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
    >
      <AnimatePresence>
        {content_markup}
      </AnimatePresence>
      {!edit.active && menu.markup}
    </motion.div>
  )

  return messageContainer_markup
}
