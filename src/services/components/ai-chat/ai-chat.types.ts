export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system' | 'data'
  content: string
  createdAt: Date
}

export interface MessageUserProps extends ChatMessage {
  onEdit?: (id: string, newContent: string) => void
}

export interface AIChatProps {
  className?: string
}

export interface AIChatState {
  config: {
    api: string
    systemPrompt: string
  }
  messages: ChatMessage[]
  input: string
  setInput: (input: string) => void
  status: 'submitted' | 'streaming' | 'ready' | 'error'
  stop: () => void
  error: Error | null
  openaiKey: string | null
  setOpenaiKey: (key: string | null) => void
}
