import ReactMarkdownComponent from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Text } from '@/components/text'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneDark
} from 'react-syntax-highlighter/dist/cjs/styles/prism'

const markdownComponents_heading1 = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <Text variant='heading2xl' degree='100' className='mb-4 mt-6 first:mt-0'>
    {children}
  </Text>
)

const markdownComponents_heading2 = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <Text variant='headingXl' degree='100' className='mb-3 mt-5 first:mt-0'>
    {children}
  </Text>
)

const markdownComponents_heading3 = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <Text variant='headingLg' degree='100' className='mb-3 mt-4 first:mt-0'>
    {children}
  </Text>
)

const markdownComponents_heading4 = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <Text variant='headingMd' degree='100' className='mb-2 mt-3 first:mt-0'>
    {children}
  </Text>
)

const markdownComponents_heading5 = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <Text variant='headingSm' degree='100' className='mb-2 mt-3 first:mt-0'>
    {children}
  </Text>
)

const markdownComponents_heading6 = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <Text variant='headingXs' degree='100' className='mb-2 mt-2 first:mt-0'>
    {children}
  </Text>
)

const markdownComponents_paragraph = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <Text
    variant='bodyMd'
    degree='100'
    className='mb-4 leading-relaxed last:mb-0'
  >
    {children}
  </Text>
)

const markdownComponents_blockquote = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div className='dark:bg-primary-950 my-4 border-l-4 border-primary-500 bg-primary-50 py-2 pl-4'>
    <div className='italic'>{children}</div>
  </div>
)

const markdownComponents_orderedList = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <ol className='mb-4 ml-4 list-inside list-decimal space-y-1'>{children}</ol>
)

const markdownComponents_unorderedList = ({
  children,
}: {
  children: React.ReactNode
}) => <ul className='mb-4 ml-4 list-inside list-disc space-y-1'>{children}</ul>

const markdownComponents_listItem = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <li className='text-foreground-700 dark:text-foreground-300'>{children}</li>
)

const markdownComponents_link = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='text-primary-600 underline underline-offset-2 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300'
  >
    {children}
  </a>
)

const markdownComponents_horizontalRule = () => (
  <hr className='my-6 border-divider' />
)

const markdownComponents_table = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div className='my-4 overflow-x-auto'>
    <table className='min-w-full rounded-lg border border-divider'>
      {children}
    </table>
  </div>
)

const markdownComponents_tableHead = ({
  children,
}: {
  children: React.ReactNode
}) => <thead className='bg-default-100 dark:bg-default-200'>{children}</thead>

const markdownComponents_tableBody = ({
  children,
}: {
  children: React.ReactNode
}) => <tbody>{children}</tbody>

const markdownComponents_tableRow = ({
  children,
}: {
  children: React.ReactNode
}) => <tr className='border-b border-divider last:border-b-0'>{children}</tr>

const markdownComponents_tableHeader = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <th className='px-4 py-2 text-left'>
    <Text variant='bodySm' degree='100' className='font-semibold'>
      {children}
    </Text>
  </th>
)

const markdownComponents_tableCell = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <td className='px-4 py-2'>
    <Text variant='bodySm' degree='100'>
      {children}
    </Text>
  </td>
)

const markdownComponents_inlineCode = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <code className='rounded bg-default-200 px-1.5 py-0.5 font-mono text-sm text-primary-600 dark:bg-default-700 dark:text-primary-400'>
    {children}
  </code>
)

const markdownComponents_codeBlock = ({
  inline,
  className,
  children,
  ...props
}: {
  inline: boolean
  className: string
  children: React.ReactNode
  props: Record<string, unknown>
}) => {
  // --------------------------------------------------
  // Theme
  // --------------------------------------------------
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : ''

  if (!inline && match) {
    return (
      <div className='my-4'>
        <SyntaxHighlighter
          style={oneDark}
          language={language}
          PreTag='div'
          className='rounded-lg !bg-default-100 dark:!bg-default-800'
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    )
  }

  return markdownComponents_inlineCode({ children })
}

export function ReactMarkdown({ children }: { children: React.ReactNode }) {
  const markdownComponents = {
    h1: markdownComponents_heading1,
    h2: markdownComponents_heading2,
    h3: markdownComponents_heading3,
    h4: markdownComponents_heading4,
    h5: markdownComponents_heading5,
    h6: markdownComponents_heading6,
    p: markdownComponents_paragraph,
    blockquote: markdownComponents_blockquote,
    ol: markdownComponents_orderedList,
    ul: markdownComponents_unorderedList,
    li: markdownComponents_listItem,
    a: markdownComponents_link,
    hr: markdownComponents_horizontalRule,
    table: markdownComponents_table,
    thead: markdownComponents_tableHead,
    tbody: markdownComponents_tableBody,
    tr: markdownComponents_tableRow,
    th: markdownComponents_tableHeader,
    td: markdownComponents_tableCell,
    code: markdownComponents_codeBlock,
  }

  // --------------------------------------------------
  // Markdown Configuration
  // --------------------------------------------------
  const markdown_config = () => ({
    remarkPlugins: [remarkGfm],
    components: markdownComponents,
  })

  return (
    <ReactMarkdownComponent {...markdown_config}>
      {children as string}
    </ReactMarkdownComponent>
  )
}
