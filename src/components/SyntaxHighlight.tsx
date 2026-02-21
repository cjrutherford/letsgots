import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface SyntaxHighlightProps {
  code: string
  language?: string
}

export function SyntaxHighlight({ code, language = 'typescript' }: SyntaxHighlightProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        margin: '0.75rem 0',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.08)',
        fontSize: '0.8125rem',
        lineHeight: 1.7,
      }}
      codeTagProps={{
        style: {
          fontFamily: "'Fira Code', 'SF Mono', 'Monaco', monospace",
        },
      }}
    >
      {code}
    </SyntaxHighlighter>
  )
}
