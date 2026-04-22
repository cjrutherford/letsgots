import { useState, useEffect } from 'react'

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function handleInstall() {
    if (!deferredPrompt) return
    const promptEvent = deferredPrompt as unknown as { prompt: () => void; userChoice: Promise<{ outcome: string }> }
    promptEvent.prompt()
    const { outcome } = await promptEvent.userChoice
    if (outcome === 'accepted') setShowPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showPrompt) return null

  return (
    <div style={{
      position: 'fixed', bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)',
      zIndex: 100, display: 'flex', alignItems: 'center', gap: '0.875rem',
      padding: '0.875rem 1.25rem', borderRadius: 12,
      background: 'var(--bg-card)', border: '1px solid rgba(49,120,198,0.3)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      maxWidth: 'calc(100vw - 2rem)',
    }}>
      <span style={{ fontSize: '1.5rem' }}>💙</span>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.125rem' }}>
          Install Let's Go TS
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
          Add to your home screen for offline access
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
        <button
          onClick={handleInstall}
          style={{
            padding: '0.375rem 0.875rem', borderRadius: 6,
            background: 'var(--ts-blue)', color: '#fff',
            border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8125rem',
          }}
        >Install</button>
        <button
          onClick={() => setShowPrompt(false)}
          style={{
            padding: '0.375rem 0.625rem', borderRadius: 6,
            background: 'transparent', color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)', cursor: 'pointer', fontSize: '0.8125rem',
          }}
        >✕</button>
      </div>
    </div>
  )
}
