import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const HERO_CODE = `// TypeScript knows your types at compile time
interface User {
  id: string
  name: string
  role: "admin" | "user"
}

// Generic functions work with any type
function getFirst<T>(items: T[]): T | undefined {
  return items[0]
}

// Async with full type inference
async function fetchUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`)
  return res.json() as Promise<User>
}

const user = getFirst<User>([
  { id: "1", name: "Alice", role: "admin" }
])

console.log(user?.name) // "Alice"`

const features = [
  {
    icon: '⚡',
    title: 'JavaScript to TypeScript',
    description: 'Bring your existing JavaScript knowledge. TypeScript is a superset — everything you know works. Just add types where it matters.',
  },
  {
    icon: '🎯',
    title: 'Interactive Challenges',
    description: 'Write and run real TypeScript in your browser. Get instant feedback. Build intuition through practice, not passive reading.',
  },
  {
    icon: '🧠',
    title: 'Mental Models',
    description: 'Learn the type system deeply: from basic annotations to conditional types, mapped types, and advanced generic patterns.',
  },
]

const previewModules = [
  { id: 'basics', title: 'TypeScript Basics', icon: '🚀', desc: 'Types, functions, control flow', lessons: 5 },
  { id: 'javascript-to-typescript', title: 'JS → TypeScript', icon: '⚡', desc: 'Migration patterns & type inference', lessons: 3 },
  { id: 'type-system', title: 'Type System', icon: '🔷', desc: 'Interfaces, unions, generics', lessons: 3 },
  { id: 'advanced-types', title: 'Advanced Types', icon: '🧠', desc: 'Conditional, mapped, utility types', lessons: 3 },
  { id: 'async', title: 'Async TypeScript', icon: '⏳', desc: 'Promises, async/await, concurrency', lessons: 3 },
  { id: 'frontend', title: 'Frontend & React', icon: '⚛️', desc: 'React hooks, component patterns', lessons: 3 },
]

export function Landing() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 50)
  }, [])

  return (
    <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 1.5rem',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💙</span>
            <span style={{ color: 'var(--ts-blue-light)' }}>Let's Go TS</span>
          </span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/login" style={{
              padding: '0.4rem 1rem', borderRadius: 6,
              border: '1px solid var(--border-color)', color: 'var(--text-secondary)',
              textDecoration: 'none', fontSize: '0.875rem',
            }}>Sign in</Link>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '0.4rem 1rem', borderRadius: 6,
                background: 'var(--ts-blue)', color: '#fff',
                border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600,
              }}
            >Start Learning</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 4rem', textAlign: 'center', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-block', padding: '0.25rem 0.875rem', borderRadius: 9999,
              background: 'rgba(49,120,198,0.12)', color: 'var(--ts-blue-light)',
              border: '1px solid rgba(49,120,198,0.25)', fontSize: '0.8125rem', fontWeight: 600,
            }}>TypeScript 5 · Interactive · Free</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Master TypeScript<br />
            <span className="ts-gradient-text">from JavaScript</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: 580, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            An interactive TypeScript course for JavaScript developers. Write real code, see real results, build real intuition.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '0.75rem 1.75rem', borderRadius: 8,
                background: 'var(--ts-blue)', color: '#fff',
                border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 700,
              }}
            >Start Learning Free →</button>
            <a href="#curriculum"
              style={{
                padding: '0.75rem 1.75rem', borderRadius: 8,
                background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)',
                border: '1px solid var(--border-color)', textDecoration: 'none', fontSize: '1rem',
              }}
            >View Curriculum</a>
          </div>
        </div>

        {/* Code preview */}
        <div style={{
          marginTop: '3rem', maxWidth: 680, marginLeft: 'auto', marginRight: 'auto',
          background: 'var(--bg-card)', border: '1px solid var(--border-color)',
          borderRadius: 12, overflow: 'hidden', textAlign: 'left',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease 0.15s',
        }}>
          <div style={{ background: '#0d1117', padding: '0.625rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
            <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>example.ts</span>
          </div>
          <pre style={{ margin: 0, padding: '1.25rem', fontSize: '0.8125rem', lineHeight: 1.7, overflow: 'auto', background: 'transparent' }}>
            <code style={{ color: 'var(--text-primary)', background: 'none', padding: 0, border: 'none', fontSize: 'inherit' }}>{HERO_CODE}</code>
          </pre>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 1.5rem', background: 'rgba(49,120,198,0.03)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 700, marginBottom: '2.5rem' }}>
            Why <span className="ts-gradient-text">Let's Go TS</span>?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {features.map(f => (
              <div key={f.title} className="glass-card" style={{ padding: '1.5rem', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum preview */}
      <section id="curriculum" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Curriculum</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>11 modules · 34 lessons · 30+ coding challenges</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {previewModules.map((mod, i) => (
              <Link
                key={mod.id}
                to={`/module/${mod.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="glass-card" style={{ padding: '1.25rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: 'rgba(49,120,198,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.25rem', flexShrink: 0,
                  }}>{mod.icon}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--ts-blue-light)', fontWeight: 600 }}>#{i + 1}</span>
                      <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: 0 }}>{mod.title}</h3>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', margin: '0 0 0.5rem' }}>{mod.desc}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{mod.lessons} lessons</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '0.75rem 2rem', borderRadius: 8,
                background: 'var(--ts-blue)', color: '#fff',
                border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 700,
              }}
            >View All Modules →</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', background: 'rgba(49,120,198,0.05)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💙</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Ready to Level Up?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.0625rem' }}>
            Join thousands of JavaScript developers who have made the leap to TypeScript. Start your journey today — it's free.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '0.875rem 2.5rem', borderRadius: 8,
              background: 'var(--ts-blue)', color: '#fff',
              border: 'none', cursor: 'pointer', fontSize: '1.0625rem', fontWeight: 700,
            }}
          >Start Learning Free →</button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem 1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
          💙 Let's Go TS — Master TypeScript from JavaScript &nbsp;·&nbsp; Open Source
        </p>
      </footer>
    </div>
  )
}
