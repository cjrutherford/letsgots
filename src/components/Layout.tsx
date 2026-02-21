import { ReactNode, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { useProgress } from '../lib/progress'
import { modules } from '../lib/content'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { getModuleProgress } = useProgress()

  function handleLogout() {
    logout()
    navigate('/')
  }

  const currentModuleId = location.pathname.split('/')[2]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: 260, flexShrink: 0,
        background: 'var(--bg-card)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, bottom: 0, left: 0,
        zIndex: 50, overflowY: 'auto',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease',
      }}
        className="sidebar"
      >
        {/* Logo */}
        <div style={{ padding: '1rem 1rem 0.75rem', borderBottom: '1px solid var(--border-color)' }}>
          <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem' }}>💙</span>
            <span style={{ fontWeight: 700, color: 'var(--ts-blue-light)', fontSize: '1rem' }}>Let's Go TS</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '0.75rem 0.5rem', overflowY: 'auto' }}>
          <Link
            to="/dashboard"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.5rem 0.625rem', borderRadius: 6, textDecoration: 'none',
              color: location.pathname === '/dashboard' ? 'var(--ts-blue-light)' : 'var(--text-secondary)',
              background: location.pathname === '/dashboard' ? 'rgba(49,120,198,0.12)' : 'transparent',
              fontSize: '0.875rem', fontWeight: location.pathname === '/dashboard' ? 600 : 400,
              marginBottom: '0.25rem',
            }}
          >
            🏠 Dashboard
          </Link>

          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary)', padding: '0.75rem 0.625rem 0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Modules
          </div>

          {modules.map(mod => {
            const isActive = currentModuleId === mod.id
            const pct = getModuleProgress(mod.id)
            return (
              <Link
                key={mod.id}
                to={`/module/${mod.id}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.4375rem 0.625rem', borderRadius: 6, textDecoration: 'none',
                  color: isActive ? 'var(--ts-blue-light)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(49,120,198,0.12)' : 'transparent',
                  fontSize: '0.8125rem', fontWeight: isActive ? 600 : 400,
                  marginBottom: '0.125rem', transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '0.875rem' }}>{mod.icon}</span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mod.title}</span>
                {pct === 100 ? (
                  <span style={{ fontSize: '0.625rem', color: '#3fb950' }}>✓</span>
                ) : pct > 0 ? (
                  <span style={{ fontSize: '0.625rem', color: 'var(--ts-blue-light)' }}>{pct}%</span>
                ) : null}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8125rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>@{user.username}</span>
              <button
                onClick={handleLogout}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.75rem' }}
              >Sign out</button>
            </div>
          ) : (
            <Link to="/login" style={{ color: 'var(--ts-blue-light)', textDecoration: 'none' }}>Sign in to save progress</Link>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: 0, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar (mobile) */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 30,
          background: 'rgba(13,17,23,0.9)', backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--border-color)',
          padding: '0 1rem', height: 52,
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem', fontSize: '1.125rem' }}
            aria-label="Toggle navigation"
          >☰</button>
          <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span>💙</span>
            <span style={{ fontWeight: 700, color: 'var(--ts-blue-light)', fontSize: '0.9375rem' }}>Let's Go TS</span>
          </Link>
        </header>

        <main style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </main>
      </div>

      {/* Desktop sidebar always visible */}
      <style>{`
        @media (min-width: 768px) {
          .sidebar {
            transform: translateX(0) !important;
            position: sticky !important;
            height: 100vh !important;
            top: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
