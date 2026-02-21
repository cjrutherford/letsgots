import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'

export function Login() {
  const navigate = useNavigate()
  const { login, signup } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (mode === 'login') {
      const ok = login({ username: form.username, password: form.password })
      if (!ok) { setError('Invalid username or password'); return }
    } else {
      if (!form.email.includes('@')) { setError('Please enter a valid email'); return }
      if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
      const ok = signup({ username: form.username, email: form.email, password: form.password })
      if (!ok) { setError('Username already exists'); return }
    }
    navigate('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-dark)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '2rem' }}>💙</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ts-blue-light)', marginTop: '0.5rem' }}>
              Let's Go TS
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          {/* Tab switch */}
          <div style={{
            display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 8,
            padding: '0.25rem', marginBottom: '1.5rem',
          }}>
            {(['login', 'signup'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError('') }}
                style={{
                  flex: 1, padding: '0.5rem', borderRadius: 6, border: 'none', cursor: 'pointer',
                  background: mode === m ? 'var(--ts-blue)' : 'transparent',
                  color: mode === m ? '#fff' : 'var(--text-secondary)',
                  fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.2s',
                }}
              >{m === 'login' ? 'Sign In' : 'Sign Up'}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Username */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.375rem' }}>
                Username
              </label>
              <input
                type="text"
                required
                value={form.username}
                onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                placeholder="your_username"
                style={{
                  width: '100%', padding: '0.625rem 0.875rem',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)',
                  borderRadius: 6, color: 'var(--text-primary)', fontSize: '0.9375rem',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Email (signup only) */}
            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.375rem' }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="you@example.com"
                  style={{
                    width: '100%', padding: '0.625rem 0.875rem',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)',
                    borderRadius: 6, color: 'var(--text-primary)', fontSize: '0.9375rem',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.375rem' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '0.625rem 0.875rem',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)',
                  borderRadius: 6, color: 'var(--text-primary)', fontSize: '0.9375rem',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{
                padding: '0.625rem 0.875rem', borderRadius: 6,
                background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)',
                color: '#f85149', fontSize: '0.875rem',
              }}>{error}</div>
            )}

            <button
              type="submit"
              style={{
                padding: '0.75rem', borderRadius: 6,
                background: 'var(--ts-blue)', color: '#fff',
                border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1rem',
                marginTop: '0.25rem',
              }}
            >{mode === 'login' ? 'Sign In' : 'Create Account'}</button>
          </form>

          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8125rem', marginTop: '1.25rem', marginBottom: 0 }}>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
              style={{ background: 'none', border: 'none', color: 'var(--ts-blue-light)', cursor: 'pointer', fontSize: 'inherit', fontWeight: 600 }}
            >{mode === 'login' ? 'Sign up' : 'Sign in'}</button>
          </p>
        </div>

        {/* Guest link */}
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8125rem', marginTop: '1rem' }}>
          <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>Continue without account →</Link>
        </p>
      </div>
    </div>
  )
}
