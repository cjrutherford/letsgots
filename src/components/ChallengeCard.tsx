import { useState } from 'react'
import type { Challenge } from '../lib/challenges'
import { useProgress } from '../lib/progress'
import { CodePlayground } from './CodePlayground'

interface ChallengeCardProps {
  challenge: Challenge
}

const difficultyColor: Record<string, string> = {
  easy: '#3fb950',
  medium: '#f0883e',
  hard: '#f85149',
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const { progress, markChallengeComplete } = useProgress()
  const [expanded, setExpanded] = useState(false)
  const [showHint, setShowHint] = useState(0)

  const completed = progress.challenges[challenge.id] === true

  function handleSuccess() {
    markChallengeComplete(challenge.id, challenge.points)
  }

  return (
    <div className="glass-card" style={{ overflow: 'hidden', transition: 'all 0.2s' }}>
      {/* Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '1rem 1.25rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: completed ? 'rgba(63,185,80,0.15)' : 'rgba(49,120,198,0.1)',
          border: `1px solid ${completed ? 'rgba(63,185,80,0.4)' : 'var(--border-color)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem',
        }}>
          {completed ? '✅' : '🎯'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{challenge.title}</span>
            <span style={{
              fontSize: '0.6875rem', padding: '0.125rem 0.5rem', borderRadius: 9999, fontWeight: 600,
              background: `${difficultyColor[challenge.difficulty]}20`,
              color: difficultyColor[challenge.difficulty],
              border: `1px solid ${difficultyColor[challenge.difficulty]}40`,
            }}>{challenge.difficulty}</span>
            <span style={{
              fontSize: '0.6875rem', padding: '0.125rem 0.5rem', borderRadius: 9999, fontWeight: 600,
              marginLeft: 'auto',
              background: 'rgba(49,120,198,0.1)', color: 'var(--ts-blue-light)',
              border: '1px solid rgba(49,120,198,0.2)',
            }}>+{challenge.points} pts</span>
          </div>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {challenge.description}
          </p>
        </div>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', flexShrink: 0 }}>
          {expanded ? '▲' : '▼'}
        </span>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--border-color)' }}>
          <div style={{ padding: '1rem 1.25rem 0.75rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', margin: '0 0 1rem', lineHeight: 1.6 }}>
              {challenge.description}
            </p>

            {/* Expected output */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Expected Output
              </div>
              <pre style={{ margin: 0, padding: '0.75rem 1rem', fontSize: '0.8125rem', background: 'rgba(49,120,198,0.05)', border: '1px solid rgba(49,120,198,0.15)', borderRadius: 6, color: 'var(--ts-blue-light)' }}>
                {challenge.expectedOutput}
              </pre>
            </div>
          </div>

          {/* Code playground */}
          <CodePlayground
            initialCode={challenge.starterCode}
            expectedOutput={challenge.expectedOutput}
            onSuccess={handleSuccess}
          />

          {/* Hints */}
          {challenge.hints.length > 0 && (
            <div style={{ padding: '0.75rem 1.25rem 1rem' }}>
              {showHint < challenge.hints.length && (
                <button
                  onClick={() => setShowHint(h => h + 1)}
                  style={{
                    background: 'rgba(240,136,62,0.1)', color: '#f0883e',
                    border: '1px solid rgba(240,136,62,0.25)', borderRadius: 6,
                    padding: '0.375rem 0.875rem', cursor: 'pointer',
                    fontSize: '0.8125rem', fontWeight: 600,
                  }}
                >💡 Show hint ({showHint}/{challenge.hints.length})</button>
              )}
              {showHint > 0 && challenge.hints.slice(0, showHint).map((hint, i) => (
                <div key={i} style={{
                  marginTop: '0.5rem', padding: '0.5rem 0.875rem',
                  background: 'rgba(240,136,62,0.05)', border: '1px solid rgba(240,136,62,0.15)',
                  borderRadius: 6, fontSize: '0.875rem', color: '#f0883e',
                }}>💡 {hint}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
