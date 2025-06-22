export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
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
}
