import ReactMarkdownComponent from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMemo } from "react";
import { Text } from "@/components/text";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";


export function ReactMarkdown({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme()

  // --------------------------------------------------
  // Markdown Components
  // --------------------------------------------------
  const markdownComponents_heading1 = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <Text variant="heading2xl" degree="100" className="mb-4 mt-6 first:mt-0">
        {children}
      </Text>
    ), []
  )

  const markdownComponents_heading2 = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <Text variant="headingXl" degree="100" className="mb-3 mt-5 first:mt-0">
        {children}
      </Text>
    ), []
  )

  const markdownComponents_heading3 = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <Text variant="headingLg" degree="100" className="mb-3 mt-4 first:mt-0">
        {children}
      </Text>
    ), []
  )

  const markdownComponents_heading4 = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <Text variant="headingMd" degree="100" className="mb-2 mt-3 first:mt-0">
        {children}
      </Text>
    ), []
  )

  const markdownComponents_heading5 = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <Text variant="headingSm" degree="100" className="mb-2 mt-3 first:mt-0">
        {children}
      </Text>
    ), []
  )

  const markdownComponents_heading6 = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <Text variant="headingXs" degree="100" className="mb-2 mt-2 first:mt-0">
        {children}
      </Text>
    ), []
  )

  const markdownComponents_paragraph = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <Text variant="bodyMd" degree="100" className="mb-4 leading-relaxed last:mb-0">
        {children}
      </Text>
    ), []
  )

  const markdownComponents_blockquote = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <div className="border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-950 pl-4 py-2 my-4">
        <div className="italic">
          {children}
        </div>
      </div>
    ), []
  )

  const markdownComponents_orderedList = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 ml-4">
        {children}
      </ol>
    ), []
  )

  const markdownComponents_unorderedList = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-1 ml-4">
        {children}
      </ul>
    ), []
  )

  const markdownComponents_listItem = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <li className="text-foreground-700 dark:text-foreground-300">
        <Text variant="bodyMd" degree="100" className="inline">
          {children}
        </Text>
      </li>
    ), []
  )

  const markdownComponents_link = useMemo(() => 
    ({ href, children }: { href: string; children: React.ReactNode }) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ), []
  )

  const markdownComponents_horizontalRule = useMemo(() => 
    () => (
      <hr className="border-divider my-6" />
    ), []
  )

  const markdownComponents_table = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border border-divider rounded-lg">
          {children}
        </table>
      </div>
    ), []
  )

  const markdownComponents_tableHead = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <thead className="bg-default-100 dark:bg-default-200">
        {children}
      </thead>
    ), []
  )

  const markdownComponents_tableBody = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <tbody>
        {children}
      </tbody>
    ), []
  )

  const markdownComponents_tableRow = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <tr className="border-b border-divider last:border-b-0">
        {children}
      </tr>
    ), []
  )

  const markdownComponents_tableHeader = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <th className="px-4 py-2 text-left">
        <Text variant="bodySm" degree="100" className="font-semibold">
          {children}
        </Text>
      </th>
    ), []
  )

  const markdownComponents_tableCell = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <td className="px-4 py-2">
        <Text variant="bodySm" degree="100">
          {children}
        </Text>
      </td>
    ), []
  )

  const markdownComponents_inlineCode = useMemo(() => 
    ({ children }: { children: React.ReactNode }) => (
      <code className="bg-default-200 dark:bg-default-700 text-primary-600 dark:text-primary-400 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ), []
  )

  const markdownComponents_codeBlock = useMemo(() => 
    ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''
      
      if (!inline && match) {
        return (
          <div className="my-4">
            <SyntaxHighlighter
              style={theme === 'dark' ? oneDark : oneLight}
              language={language}
              PreTag="div"
              className="rounded-lg !bg-default-100 dark:!bg-default-800"
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
    }, [theme, markdownComponents_inlineCode]
  )

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
  const markdown_config = useMemo(() => ({
    remarkPlugins: [remarkGfm],
    components: markdownComponents,
  }), [markdownComponents])

    return <ReactMarkdownComponent
    {...markdown_config as any}
    >
        {children}
    </ReactMarkdownComponent>
}
