import { RotateCcw } from 'lucide-react'
import type { ChatMessage } from './ai-chat.types'
import { Text } from '@/components/text'
import { Button } from '@/components/button'
import { useCallback } from 'react'
import { CopyToClipboard } from '@/components/copyToClipboard'

export function MessageAssistant({
  content,
  id,
  role,
  createdAt,
  resetHandler,
}: ChatMessage & {
  resetHandler: () => void
}) {
  // --------------------------------------------------
  // Reset
  // --------------------------------------------------

  const reset_handlePress = useCallback(() => {
    resetHandler()
  }, [resetHandler])

  const reset_markup = (
    <Button
      isIconOnly
      variant='light'
      size='sm'
      className='p-0'
      onPress={reset_handlePress}
    >
      <RotateCcw className='size-4 opacity-60' />
    </Button>
  )

  const feature = {
    copyToClipboard_markup: <CopyToClipboard content={content} />,
    reset_markup: reset_markup,
  }

  // --------------------------------------------------
  // Content
  // --------------------------------------------------
  const content_markup = (
    <div>
      <Text variant='bodySm' degree='100' className='text-foreground'>
        {content}
      </Text>
    </div>
  )

  return (
    <div className='flex w-full flex-col gap-1'>
      {content_markup}
      <div className='flex flex-row gap-0'>
        <CopyToClipboard content={content} />
        {feature.reset_markup}
      </div>
    </div>
  )
}
