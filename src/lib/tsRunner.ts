export interface TestResult {
  name: string
  passed: boolean
  error?: string
}

export interface RunResult {
  output: string
  errors: string[]
  success: boolean
  testResults?: TestResult[]
}

const API_URL = import.meta.env.DEV ? 'http://localhost:3001' : '/api'

export async function runTypeScript(code: string): Promise<RunResult> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 20000)

    const response = await fetch(`${API_URL}/api/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return { output: '', errors: [`Server error: ${response.status}`], success: false }
    }

    const data = await response.json() as { output?: string; errors?: string[] }

    if (data.errors && data.errors.length > 0) {
      return { output: '', errors: data.errors, success: false }
    }

    return { output: data.output || '', errors: [], success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (message.includes('abort')) {
      return { output: '', errors: ['Request timed out. Make sure the TypeScript runner server is running.'], success: false }
    }
    return { output: '', errors: [`Failed to run: ${message}. Is the TypeScript runner server running?`], success: false }
  }
}

export async function runTest(code: string, testCode: string): Promise<RunResult> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 20000)

    const response = await fetch(`${API_URL}/api/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, testCode }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return { output: '', errors: [`Server error: ${response.status}`], success: false }
    }

    const data = await response.json() as {
      output?: string
      errors?: string[]
      testResults?: TestResult[]
    }

    if (data.errors && data.errors.length > 0) {
      return { output: '', errors: data.errors, success: false, testResults: data.testResults }
    }

    const allPassed = !!data.testResults?.length && data.testResults.every(r => r.passed)
    return { output: data.output || '', errors: [], success: allPassed, testResults: data.testResults }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (message.includes('abort')) {
      return { output: '', errors: ['Request timed out. Make sure the TypeScript runner server is running.'], success: false }
    }
    return { output: '', errors: [`Failed to run: ${message}. Is the TypeScript runner server running?`], success: false }
  }
}
