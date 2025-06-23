import { RotateCcw } from 'lucide-react'
import type { ChatMessage } from './ai-chat.types'
import { ButtonTooltip } from '@/components/button'
import { useCallback } from 'react'
import { CopyToClipboard } from '@/components/copyToClipboard'
import ReactMarkdown from 'react-markdown'

export function MessageAssistant({
  content,
  id,
  onReload,
}: ChatMessage & {
  onReload: (messageId: string) => void
}) {
  const markdown_content = (
    <ReactMarkdown>
      {content}
    </ReactMarkdown>
  )

  const markdown = {
    content: markdown_content,
  }

  // --------------------------------------------------
  // Reset
  // --------------------------------------------------
  const reset_handlePress = useCallback(() => {
    onReload(id)
  }, [onReload, id])

  const reset_markup = (
    <ButtonTooltip      
      title='Reset'
      onPress={reset_handlePress}
    >
      <RotateCcw className='size-4 opacity-60' />
    </ButtonTooltip>
  )

  const reset = {
    handlePress: reset_handlePress,
    markup: reset_markup,
  }

  // --------------------------------------------------
  // Features
  // --------------------------------------------------
  const features_copyToClipboard = <CopyToClipboard content={content} />
  
  const features_actionsMarkup = (
    <div className='flex flex-row gap-0'>
      {features_copyToClipboard}
      {reset.markup}
    </div>
  )

  const features = {
    copyToClipboard: features_copyToClipboard,
    actionsMarkup: features_actionsMarkup,
  }

  // --------------------------------------------------
  // Content
  // --------------------------------------------------
  const content_markup = (
    <div className="text-foreground leading-relaxed">
      {markdown.content}
    </div>
  )

  const content_container = {
    markup: content_markup,
  }

  // --------------------------------------------------
  // Message Container
  // --------------------------------------------------
  const messageContainer_markup = (
    <div className='flex w-full flex-col gap-3'>
      {content_container.markup}
      {features.actionsMarkup}
    </div>
  )

  return messageContainer_markup
}
