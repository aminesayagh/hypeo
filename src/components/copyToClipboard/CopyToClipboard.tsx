import { useState, useCallback } from 'react'
import { Button } from '@/components/button'
import { Check, Copy } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

export function CopyToClipboard({ content }: { content: string }) {
    const [isCopied, setIsCopied] = useState(false)
  
    const handleCopy = useCallback(() => {
      navigator.clipboard.writeText(content)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }, [content])
  
    return (
      <Button
        isIconOnly
        variant='light'
        size='sm'
        className='p-0'
        onPress={handleCopy}
      >
        <AnimatePresence>
          {isCopied ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Check className='size-4 opacity-60' />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Copy className='size-4 opacity-60' />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    );
  }
  