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

export interface MessageHandler {
  // Core functionality
  editUserMessage: (messageId: string, newContent: string) => Promise<void>
  reloadAssistantMessage: (messageId: string) => Promise<void>
  reloadLastMessage: () => Promise<void>
  
  // Utility functions
  deleteMessage: (messageId: string) => void
  clearAll: () => void
  
  // Helper functions
  canEdit: (messageId: string) => boolean
  canReload: (messageId: string) => boolean
  getMessageIndex: (messageId: string) => number
  isLastMessage: (messageId: string) => boolean
}
