import { useState, useRef } from 'react'
import Editor from '@monaco-editor/react'
import type { TestResult } from '../lib/tsRunner'
import { runTypeScript, runTest } from '../lib/tsRunner'

interface CodePlaygroundProps {
  initialCode?: string
  expectedOutput?: string
  testCode?: string
  onSuccess?: () => void
  height?: number
}

export function CodePlayground({
  initialCode = '// Write your TypeScript here\nconsole.log("Hello, TypeScript!")\n',
  expectedOutput,
  testCode,
  onSuccess,
  height = 320,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [running, setRunning] = useState(false)
  const [success, setSuccess] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[] | undefined>(undefined)
  const runningRef = useRef(false)

  async function handleRun() {
    if (runningRef.current) return
    runningRef.current = true
    setRunning(true)
    setOutput('')
    setErrors([])
    setSuccess(false)
    setTestResults(undefined)

    try {
      if (testCode) {
        // Use the test harness endpoint
        const result = await runTest(code, testCode)
        setTestResults(result.testResults)
        if (result.output) setOutput(result.output)
        if (result.errors.length > 0) {
          setErrors(result.errors)
        } else if (result.success) {
          setSuccess(true)
          if (onSuccess) onSuccess()
        }
      } else {
        const result = await runTypeScript(code)
        if (result.success) {
          setOutput(result.output)
          if (expectedOutput) {
            const matches = result.output.trim() === expectedOutput.trim()
            setSuccess(matches)
            if (matches && onSuccess) onSuccess()
          }
        } else {
          setErrors(result.errors)
        }
      }
    } finally {
      setRunning(false)
      runningRef.current = false
    }
  }

  function handleReset() {
    setCode(initialCode)
    setOutput('')
    setErrors([])
    setSuccess(false)
    setTestResults(undefined)
  }

  const passCount = testResults?.filter(r => r.passed).length ?? 0
  const totalCount = testResults?.length ?? 0

  return (
    <div style={{ borderTop: '1px solid var(--border-color)' }}>
      {/* Editor */}
      <div style={{ position: 'relative' }}>
        <Editor
          height={height}
          defaultLanguage="typescript"
          value={code}
          onChange={v => setCode(v ?? '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            tabSize: 2,
            renderLineHighlight: 'line',
            padding: { top: 12, bottom: 12 },
            fontFamily: "'Fira Code', 'SF Mono', 'Monaco', monospace",
            fontLigatures: true,
          }}
        />
      </div>

      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.625rem 1rem',
        background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border-color)',
      }}>
        <button
          onClick={handleRun}
          disabled={running}
          style={{
            padding: '0.4rem 1rem', borderRadius: 6,
            background: running ? 'rgba(49,120,198,0.4)' : 'var(--ts-blue)',
            color: '#fff', border: 'none', cursor: running ? 'not-allowed' : 'pointer',
            fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem',
          }}
        >
          {running ? '⏳ Running...' : testCode ? '▶ Run Tests' : '▶ Run'}
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '0.4rem 0.875rem', borderRadius: 6,
            background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)', cursor: 'pointer', fontSize: '0.875rem',
          }}
        >↺ Reset</button>
        {success && (
          <div style={{
            marginLeft: 'auto', padding: '0.25rem 0.75rem', borderRadius: 9999,
            background: 'rgba(63,185,80,0.15)', color: '#3fb950',
            border: '1px solid rgba(63,185,80,0.3)', fontSize: '0.8125rem', fontWeight: 600,
          }}>🎉 {testCode ? `All ${totalCount} tests passed!` : 'Correct!'}</div>
        )}
        {testResults && !success && !running && (
          <div style={{
            marginLeft: 'auto', padding: '0.25rem 0.75rem', borderRadius: 9999,
            background: 'rgba(248,81,73,0.1)', color: '#f85149',
            border: '1px solid rgba(248,81,73,0.25)', fontSize: '0.8125rem', fontWeight: 600,
          }}>{passCount}/{totalCount} tests passed</div>
        )}
      </div>

      {/* Test results panel */}
      {testResults && testResults.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border-color)', padding: '0.75rem 1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
            Test Results ({passCount}/{totalCount})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {testResults.map((tr, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                padding: '0.5rem 0.75rem', borderRadius: 6, fontSize: '0.8125rem',
                background: tr.passed ? 'rgba(63,185,80,0.06)' : 'rgba(248,81,73,0.06)',
                border: `1px solid ${tr.passed ? 'rgba(63,185,80,0.2)' : 'rgba(248,81,73,0.2)'}`,
              }}>
                <span style={{ flexShrink: 0, marginTop: 1 }}>{tr.passed ? '✅' : '❌'}</span>
                <div>
                  <span style={{ color: tr.passed ? '#3fb950' : '#f85149', fontWeight: 500 }}>{tr.name}</span>
                  {tr.error && (
                    <div style={{ marginTop: '0.25rem', color: '#f85149', fontFamily: 'monospace', fontSize: '0.75rem', opacity: 0.85 }}>
                      {tr.error}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Console output (when present alongside tests, or for plain run) */}
      {(output || errors.length > 0) && (
        <div style={{ borderTop: '1px solid var(--border-color)', padding: '0.75rem 1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
            {errors.length > 0 ? 'Error' : 'Console Output'}
          </div>
          {errors.length > 0 ? (
            <pre style={{
              margin: 0, padding: '0.625rem 0.875rem', borderRadius: 6,
              background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.2)',
              color: '#f85149', fontSize: '0.8125rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            }}>
              {errors.join('\n')}
            </pre>
          ) : (
            <pre style={{
              margin: 0, padding: '0.625rem 0.875rem', borderRadius: 6,
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)',
              color: 'var(--text-primary)', fontSize: '0.8125rem', whiteSpace: 'pre-wrap',
            }}>
              {output || '(no output)'}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}
