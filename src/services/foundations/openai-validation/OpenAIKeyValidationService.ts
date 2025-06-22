// --------------------------------------------------
// OpenAI Key Validation Types
// --------------------------------------------------
export interface ValidateKeyRequest {
  apiKey: string
}

export interface ValidateKeyResponse {
  isValid: boolean
  error?: string
  message?: string
}

export type ValidateKeyError = 
  | 'MISSING_API_KEY'
  | 'INVALID_KEY_FORMAT' 
  | 'INVALID_API_KEY'
  | 'RATE_LIMITED'
  | 'INSUFFICIENT_CREDITS'
  | 'API_ERROR'
  | 'INTERNAL_ERROR'
  | 'NETWORK_ERROR'

// --------------------------------------------------
// OpenAI Key Validation Service
// --------------------------------------------------
export class OpenAIKeyValidationService {
  private static readonly API_ENDPOINT = '/api/ai/validate-key'

  /**
   * Validates an OpenAI API key by making a test request
   * @param apiKey - The OpenAI API key to validate
   * @returns Promise with validation result
   */
  static async validateKey(apiKey: string): Promise<ValidateKeyResponse> {
    try {
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey } satisfies ValidateKeyRequest),
      })

      if (!response.ok) {
        if (response.status >= 500) {
          return {
            isValid: false,
            error: 'INTERNAL_ERROR',
            message: 'Server error during validation',
          }
        }
        
        // Try to parse error response
        try {
          const errorData = await response.json()
          return errorData
        } catch {
          return {
            isValid: false,
            error: 'API_ERROR',
            message: `HTTP ${response.status}: ${response.statusText}`,
          }
        }
      }

      const result: ValidateKeyResponse = await response.json()
      return result

    } catch (error: any) {
      console.error('Network error during key validation:', error)
      
      return {
        isValid: false,
        error: 'NETWORK_ERROR',
        message: 'Network error. Please check your connection and try again.',
      }
    }
  }

  /**
   * Validates key format without making API call
   * @param apiKey - The API key to check format
   * @returns boolean indicating if format is valid
   */
  static isValidKeyFormat(apiKey: string): boolean {
    if (!apiKey || typeof apiKey !== 'string') {
      return false
    }

    // OpenAI keys start with 'sk-' and are typically 51 characters long
    return apiKey.startsWith('sk-') && apiKey.length >= 20
  }

  /**
   * Gets user-friendly error message for validation errors
   * @param error - The error code from validation
   * @returns User-friendly error message
   */
  static getErrorMessage(error: ValidateKeyError): string {
    const errorMessages: Record<ValidateKeyError, string> = {
      MISSING_API_KEY: 'Please enter your OpenAI API key',
      INVALID_KEY_FORMAT: 'Invalid API key format. OpenAI keys start with "sk-"',
      INVALID_API_KEY: 'Invalid API key. Please check your key and try again',
      RATE_LIMITED: 'Too many requests. Please wait a moment and try again',
      INSUFFICIENT_CREDITS: 'Your OpenAI account has insufficient credits',
      API_ERROR: 'Unable to validate API key. Please try again',
      INTERNAL_ERROR: 'Server error. Please try again later',
      NETWORK_ERROR: 'Connection error. Please check your internet and try again',
    }

    return errorMessages[error] || 'Unknown error occurred'
  }
}

// --------------------------------------------------
// Convenience Hook for React Components
// --------------------------------------------------
export const useOpenAIKeyValidation = () => {
  return {
    validateKey: OpenAIKeyValidationService.validateKey,
    isValidKeyFormat: OpenAIKeyValidationService.isValidKeyFormat,
    getErrorMessage: OpenAIKeyValidationService.getErrorMessage,
  }
}
