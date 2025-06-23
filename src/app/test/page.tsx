  'use client'
import { Button } from '@/components/button'
import { Text } from '@/components/text'
import { ThemeChange } from '@/services/components/themes/ThemeChange'
import { Logo } from '@/components/logo'
import { useState } from 'react'

function ButtonExamples() {
  return (
    <div className='flex flex-row gap-4'>
      <Button color='primary' variant='solid'>
        Solid
      </Button>
      <Button color='primary' variant='faded'>
        Faded
      </Button>
      <Button color='primary' variant='bordered'>
        Bordered
      </Button>
      <Button color='primary' variant='light'>
        Light
      </Button>
      <Button color='primary' variant='flat'>
        Flat
      </Button>
      <Button color='primary' variant='ghost'>
        Ghost
      </Button>
      <Button color='primary' variant='shadow'>
        Shadow
      </Button>
    </div>
  )
}

export function TextExamples() {
  return (
    <div className='space-y-4'>
      {/* Basic heading usage - automatically renders as h1 */}
      <Text variant='heading3xl' fontWeight='bold'>
        Welcome to Hypeo
      </Text>

      {/* Medium heading with custom color degree */}
      <Text variant='headingLg' fontWeight='semibold' degree='200'>
        Section Title
      </Text>

      {/* Body text with different alignment */}
      <Text variant='bodyMd' alignment='center' degree='300'>
        Centered paragraph text with medium opacity
      </Text>

      {/* Custom element override */}
      <Text as='span' variant='bodySm' fontWeight='medium'>
        Inline text element
      </Text>

      {/* Text with word breaking */}
      <Text variant='bodyLg' breakWord={true}>
        This is a very long text that will break words when necessary to fit
        within containers
      </Text>

      {/* Truncated text */}
      <Text variant='bodyMd' truncate={true} className='max-w-xs'>
        This text will be truncated with ellipsis when it overflows its
        container
      </Text>

      {/* All variants showcase */}
      <div className='space-y-2'>
        <Text variant='bodyLg'>Test Text Variant</Text>
        <Text variant='heading3xl'>Heading 3XL</Text>
        <Text variant='heading2xl'>Heading 2XL</Text>
        <Text variant='headingXl'>Heading XL</Text>
        <Text variant='headingLg'>Heading Large</Text>
        <Text variant='headingMd'>Heading Medium</Text>
        <Text variant='headingSm'>Heading Small</Text>
        <Text variant='headingXs'>Heading XS</Text>
        <Text variant='bodyLg'>Body Large</Text>
        <Text variant='bodyMd'>Body Medium (default)</Text>
        <Text variant='bodySm'>Body Small</Text>
        <Text variant='bodyXs'>Body XS</Text>
      </div>

      {/* Different color degrees */}
      <div className='space-y-1'>
        <Text degree='100'>Primary text (highest contrast)</Text>
        <Text degree='200'>Secondary text</Text>
        <Text degree='300'>Tertiary text</Text>
        <Text degree='400'>Quaternary text (lowest contrast)</Text>
      </div>

      {/* Font weights */}
      <div className='space-y-1'>
        <Text fontWeight='regular'>Regular weight</Text>
        <Text fontWeight='medium'>Medium weight</Text>
        <Text fontWeight='semibold'>Semibold weight</Text>
        <Text fontWeight='bold'>Bold weight</Text>
      </div>

      {/* Text alignments */}
      <div className='space-y-1'>
        <Text alignment='start'>Left aligned text</Text>
        <Text alignment='center'>Center aligned text</Text>
        <Text alignment='end'>Right aligned text</Text>
        <Text alignment='justify'>
          Justified text that will spread across the full width of its container
          when the content is long enough to wrap to multiple lines.
        </Text>
      </div>
    </div>
  )
}

function LogoExamples() {
  const [showText, setShowText] = useState(true)
  return (
    <div className='space-y-4'>
      <button onClick={() => setShowText(!showText)}>Toggle Text</button>
      <Logo
        hasText={!showText}
        size={showText ? 'md' : 'sm'}
        variant='default'
        href='/'
      />
      <Logo hasText={!showText} size='md' variant='compact' />
      <Logo hasText={true} size='lg' variant='stacked' />
    </div>
  )
}

export default function TestPage() {
  return (
    <div className='space-y-8 p-12'>
      <ThemeChange />
      
      
      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
      
      {/* Original Tests */}
      <h1>Color palette</h1>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row gap-2'>
          <div className='size-32 bg-background-level-1'></div>
          <div className='size-32 bg-background-level-2'></div>
          <div className='size-32 bg-background-level-3'></div>
          <div className='size-32 bg-background-level-4'></div>
        </div>
        <div className='flex flex-row gap-2'>
          <div className='size-32 bg-foreground-level-1'></div>
          <div className='size-32 bg-foreground-level-2'></div>
          <div className='size-32 bg-foreground-level-3'></div>
          <div className='size-32 bg-foreground-level-4'></div>
        </div>
      </div>
      <TextExamples />
      <LogoExamples />
      <ButtonExamples />
    </div>
  )
}