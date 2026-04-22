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

// ─── Built-in test harness injected before user code on /api/test ────────────
// Written as plain JS so esbuild/tsx never rejects it for type errors.
const TEST_HARNESS = `;(function () {
  var _results = [];
  function test(name, fn) {
    try { fn(); _results.push({ name: name, passed: true }); }
    catch (e) { _results.push({ name: name, passed: false, error: String(e) }); }
  }
  function expect(actual) {
    return {
      toBe: function (expected) {
        if (actual !== expected)
          throw new Error('Expected ' + JSON.stringify(expected) + ', received ' + JSON.stringify(actual));
      },
      toEqual: function (expected) {
        if (JSON.stringify(actual) !== JSON.stringify(expected))
          throw new Error('Expected ' + JSON.stringify(expected) + ', received ' + JSON.stringify(actual));
      },
      toBeTruthy: function () {
        if (!actual) throw new Error('Expected truthy, received ' + JSON.stringify(actual));
      },
      toBeFalsy: function () {
        if (actual) throw new Error('Expected falsy, received ' + JSON.stringify(actual));
      },
      toBeNull: function () {
        if (actual !== null) throw new Error('Expected null, received ' + JSON.stringify(actual));
      },
      toBeUndefined: function () {
        if (actual !== undefined) throw new Error('Expected undefined, received ' + JSON.stringify(actual));
      },
      toContain: function (item) {
        if (Array.isArray(actual)) {
          if (!actual.includes(item))
            throw new Error('Expected array to contain ' + JSON.stringify(item));
        } else if (typeof actual === 'string') {
          if (!actual.includes(String(item)))
            throw new Error('Expected string to contain ' + JSON.stringify(item));
        } else {
          throw new Error('toContain expects an array or string');
        }
      },
      toThrow: function (substr) {
        if (typeof actual !== 'function') throw new Error('toThrow expects a function');
        var threw = false, errMsg = '';
        try { actual(); } catch (e) { threw = true; errMsg = String(e); }
        if (!threw) throw new Error('Expected function to throw but it did not');
        if (substr && !errMsg.includes(substr))
          throw new Error('Expected error containing "' + substr + '", got "' + errMsg + '"');
      },
      toHaveBeenCalled: function () {
        if (!actual || typeof actual.callCount !== 'function')
          throw new Error('toHaveBeenCalled expects a spy');
        if (actual.callCount() === 0) throw new Error('Expected spy to have been called');
      },
      toHaveBeenCalledWith: function () {
        var args = Array.prototype.slice.call(arguments);
        if (!actual || typeof actual.calledWith !== 'function')
          throw new Error('toHaveBeenCalledWith expects a spy');
        if (!actual.calledWith.apply(null, args))
          throw new Error('Expected spy to have been called with ' + JSON.stringify(args));
      },
      toHaveBeenCalledTimes: function (n) {
        if (!actual || typeof actual.callCount !== 'function')
          throw new Error('toHaveBeenCalledTimes expects a spy');
        var count = actual.callCount();
        if (count !== n)
          throw new Error('Expected spy to have been called ' + n + ' time(s), called ' + count + ' time(s)');
      },
    };
  }
  function spy(impl) {
    var calls = [];
    function mock() {
      var args = Array.prototype.slice.call(arguments);
      calls.push(args);
      return impl ? impl.apply(this, args) : undefined;
    }
    mock.calls = calls;
    mock.callCount = function () { return calls.length; };
    mock.calledWith = function () {
      var args = Array.prototype.slice.call(arguments);
      return calls.some(function (c) { return JSON.stringify(c) === JSON.stringify(args); });
    };
    return mock;
  }
  Object.assign(globalThis, { test: test, expect: expect, spy: spy });
  process.on('exit', function () {
    if (_results.length > 0) {
      process.stdout.write('\\n__TEST_RESULTS__\\n' + JSON.stringify(_results) + '\\n');
    }
  });
})();
// ─────────────────────────────────────────────────────────────────────────────
`

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

app.post('/api/test', async (req, res) => {
  const { code, testCode } = req.body as { code?: string; testCode?: string }
  if (!code || !testCode) {
    res.status(400).json({ error: 'code and testCode are required' }); return
  }
  if (typeof code !== 'string' || code.length > 50_000) {
    res.status(400).json({ error: 'code is too large or invalid' }); return
  }
  if (typeof testCode !== 'string' || testCode.length > 20_000) {
    res.status(400).json({ error: 'testCode is too large or invalid' }); return
  }
  if (DANGEROUS_PATTERNS.some(p => p.test(code))) {
    res.status(400).json({ errors: ['Code contains disallowed patterns.'], success: false }); return
  }

  const bundled = TEST_HARNESS + '\n' + code + '\n' + testCode
  const result = await runTypeScript(bundled)

  // Split test results section from user output
  const MARKER = '\n__TEST_RESULTS__\n'
  const markerIndex = result.output.indexOf(MARKER)

  if (markerIndex === -1) {
    res.json({ ...result, testResults: [] }); return
  }

  const cleanOutput = result.output.slice(0, markerIndex)
  const resultsJson = result.output.slice(markerIndex + MARKER.length).trim()

  type TR = { name: string; passed: boolean; error?: string }
  let testResults: TR[] = []
  try { testResults = JSON.parse(resultsJson) as TR[] } catch { /* ignore */ }

  const allPassed = testResults.length > 0 && testResults.every(r => r.passed)
  res.json({ output: cleanOutput, errors: result.errors, success: allPassed, testResults })
})

app.get('/health', (_req, res) => { res.json({ status: 'ok' }) })

const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => {
  console.log(`TypeScript runner server running on http://localhost:${PORT}`)
})
