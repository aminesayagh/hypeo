import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'


async function validateOpenAIKey(apiKey: string): Promise<boolean> {
  try {
    const openai = createOpenAI({ apiKey });
    
    // Attempt a lightweight API call (models.list is efficient)
    await openai('gpt-3.5-turbo-instruct').doGenerate({
      inputFormat: 'prompt',
      mode: { type: 'regular' },
      maxTokens: 5,
      temperature: 0,
      prompt: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Say "test"',
            },
          ],
        },
      ]      
    });
    
    return true; // Key is valid if no error
  } catch (error: any) {
    // Check for authentication errors
    if (error?.status === 401 || error?.message.includes('401') || error?.message.includes('authentication')) {
      return false;
    }
    // Re-throw non-authentication errors (e.g., network issues)
    throw error;
  }
}

// --------------------------------------------------
// Types
// --------------------------------------------------
interface ValidateKeyRequest {
  apiKey: string
}

interface ValidateKeyResponse {
  isValid: boolean
  error?: string
  message?: string
}

// --------------------------------------------------
// API Route Handler
// --------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    // --------------------------------------------------
    // Request Validation
    // --------------------------------------------------
    const body: ValidateKeyRequest = await request.json()
    
    if (!body.apiKey) {
      return NextResponse.json(
        {
          isValid: false,
          error: 'MISSING_API_KEY',
          message: 'API key is required',
        } satisfies ValidateKeyResponse,
        { status: 400 }
      )
    }

    // Basic format validation - OpenAI keys start with 'sk-'
    if (!body.apiKey.startsWith('sk-')) {
      return NextResponse.json(
        {
          isValid: false,
          error: 'INVALID_KEY_FORMAT',
          message: 'Invalid API key format. OpenAI keys start with "sk-"',
        } satisfies ValidateKeyResponse,
        { status: 400 }
      )
    }

    // --------------------------------------------------
    // OpenAI Key Validation
    // --------------------------------------------------
    try {
      // Create OpenAI provider with the provided key
      const isValid = await validateOpenAIKey(body.apiKey)

      if (!isValid) {
        return NextResponse.json(
          { isValid: false, error: 'INVALID_API_KEY', message: 'Invalid API key provided' },
          { status: 200 }
        )
      }

      // If we reach here, the key is valid
      return NextResponse.json(
        {
          isValid: true,
          message: 'API key is valid and functional',
        } satisfies ValidateKeyResponse,
        { status: 200 }
      )

    } catch (apiError: any) {
      // --------------------------------------------------
      // OpenAI API Error Handling
      // --------------------------------------------------
      
      // Check for specific OpenAI error types
      if (apiError?.status === 401 || apiError?.code === 'invalid_api_key') {
        return NextResponse.json(
          {
            isValid: false,
            error: 'INVALID_API_KEY',
            message: 'Invalid API key provided',
          } satisfies ValidateKeyResponse,
          { status: 200 } // Return 200 since we handled the validation
        )
      }

      if (apiError?.status === 429) {
        return NextResponse.json(
          {
            isValid: false,
            error: 'RATE_LIMITED',
            message: 'API key rate limit exceeded. Please try again later.',
          } satisfies ValidateKeyResponse,
          { status: 200 }
        )
      }

      if (apiError?.status === 402) {
        return NextResponse.json(
          {
            isValid: false,
            error: 'INSUFFICIENT_CREDITS',
            message: 'API key is valid but has insufficient credits',
          } satisfies ValidateKeyResponse,
          { status: 200 }
        )
      }

      // Generic API error
      return NextResponse.json(
        {
          isValid: false,
          error: 'API_ERROR',
          message: 'Failed to validate API key',
        } satisfies ValidateKeyResponse,
        { status: 200 }
      )
    }

  } catch (error: any) {
    // --------------------------------------------------
    // General Error Handling
    // --------------------------------------------------
    console.error('API key validation error:', error)
    
    return NextResponse.json(
      {
        isValid: false,
        error: 'INTERNAL_ERROR',
        message: 'Internal server error during key validation',
      } satisfies ValidateKeyResponse,
      { status: 500 }
    )
  }
}

// --------------------------------------------------
// Method Not Allowed Handler
// --------------------------------------------------
export async function GET() {
  return NextResponse.json(
    {
      error: 'METHOD_NOT_ALLOWED',
      message: 'Only POST method is allowed',
    },
    { status: 405 }
  )
}
