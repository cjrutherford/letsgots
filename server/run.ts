import express from 'express'
import cors from 'cors'
import { exec } from 'child_process'
import { tmpdir } from 'os'
import { join } from 'path'
import { writeFile, unlink } from 'fs/promises'
import { createHash } from 'crypto'

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

async function runTypeScript(code: string): Promise<{ output: string; errors: string[]; success: boolean }> {
  const hash = createHash('sha256').update(code).digest('hex').slice(0, 8)
  const tmpFileName = `ts_run_${hash}.ts`
  const tmpPath = join(tmpdir(), tmpFileName)

  try {
    await writeFile(tmpPath, code, 'utf-8')

    return new Promise((resolve) => {
      exec(
        `npx tsx ${tmpPath}`,
        { timeout: 15000, maxBuffer: 1024 * 1024 },
        async (error, stdout, stderr) => {
          try { await unlink(tmpPath) } catch { /* ignore */ }

          if (error) {
            if (error.killed) {
              resolve({ output: '', errors: ['Execution timed out.'], success: false })
              return
            }
            const errorMsg = stderr || error.message
            const errors = errorMsg
              .split('\n')
              .filter((line: string) => line.trim())
              .map((line: string) => line.replace(tmpPath, 'code.ts'))
            resolve({ output: '', errors, success: false })
            return
          }

          resolve({ output: stdout, errors: [], success: true })
        }
      )
    })
  } catch (err) {
    try { await unlink(tmpPath) } catch { /* ignore */ }
    return {
      output: '',
      errors: [`Failed to write code: ${err instanceof Error ? err.message : 'Unknown error'}`],
      success: false,
    }
  }
}

// Basic input validation — reject obviously dangerous patterns.
// NOTE: For production deployments, run this endpoint inside a sandboxed
// container (e.g. gVisor, Firecracker) or use a managed execution service.
const DANGEROUS_PATTERNS = [
  /require\s*\(\s*['"`]child_process['"`]\s*\)/,
  /require\s*\(\s*['"`]cluster['"`]\s*\)/,
  /process\.exit/,
  /process\.kill/,
  /process\.env\b/,
]

app.post('/api/run', async (req, res) => {
  const { code } = req.body as { code?: string }
  if (!code) { res.status(400).json({ error: 'No code provided' }); return }
  if (typeof code !== 'string' || code.length > 50_000) {
    res.status(400).json({ error: 'Code too large or invalid' })
    return
  }
  if (DANGEROUS_PATTERNS.some(p => p.test(code))) {
    res.status(400).json({ errors: ['Code contains disallowed patterns.'], success: false })
    return
  }
  const result = await runTypeScript(code)
  res.json(result)
})

app.get('/health', (_req, res) => { res.json({ status: 'ok' }) })

const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => {
  console.log(`TypeScript runner server running on http://localhost:${PORT}`)
})
