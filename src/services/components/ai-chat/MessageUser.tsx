import type { ChatMessage } from './ai-chat.types'
import { Text } from '@/components/text'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useState } from 'react'
import { Button } from '@/components/button'
import { Ellipsis } from 'lucide-react'
import { CopyToClipboard } from '@/components/copyToClipboard'

export function MessageUser({ content }: ChatMessage) {
  // --------------------------------------------------
  // Menu
  // --------------------------------------------------
  const [menu_isOpen, setMenu_isOpen] = useState(false)

  const menu_handleOpen = useCallback(() => {
    setMenu_isOpen(true)
  }, [])

  const menu_handleClose = useCallback(() => {
    setMenu_isOpen(false)
  }, [])

  const menu_markup = (
    <AnimatePresence>
      {menu_isOpen && (
        <motion.div
          className='absolute right-0 top-full'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <CopyToClipboard content={content} />
          {/* TODO: Add edit button here */}
        </motion.div>
      )}
    </AnimatePresence>
  )

  const menu = {
    // State
    isOpen: menu_isOpen,

    // Handlers
    handleOpen: menu_handleOpen,
    handleClose: menu_handleClose,

    // Markup
    markup: menu_markup,
  }

  // Content
  // --------------------------------------------------
  const content_markup = (
    <div className='rounded-full bg-foreground-200 px-4 py-2'>
      <Text variant='bodySm' degree='100' className='text-foreground'>
        {content}
      </Text>
    </div>
  )
  return (
    <motion.div
      className='relative flex w-full flex-row items-end justify-end'
      onMouseEnter={menu_handleOpen}
      onMouseLeave={menu_handleClose}
    >
      {content_markup}
      {menu.markup}
    </motion.div>
  )
}
