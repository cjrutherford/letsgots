import { Link } from 'react-router-dom'
import { modules } from '../lib/content'
import { useProgress } from '../lib/progress'
import { challenges, TOTAL_POINTS } from '../lib/challenges'

export function Home() {
  const { progress, getModuleProgress } = useProgress()

  const completedLessons = Object.values(progress.lessons).filter(l => l.completed).length
  const completedChallenges = Object.values(progress.challenges).filter(Boolean).length
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0)

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Master TypeScript 💙
        </h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Your interactive guide from JavaScript to TypeScript expert
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Score', value: progress.totalScore, max: TOTAL_POINTS, icon: '⭐' },
          { label: 'Lessons Done', value: completedLessons, max: totalLessons, icon: '📖' },
          { label: 'Challenges', value: completedChallenges, max: challenges.length, icon: '🎯' },
          { label: 'Modules', value: modules.filter(m => getModuleProgress(m.id) === 100).length, max: modules.length, icon: '🏆' },
        ].map(stat => (
          <div key={stat.label} className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.375rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ts-blue-light)' }}>
              {stat.value}
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/{stat.max}</span>
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{stat.label}</div>
            <div className="progress-bar" style={{ marginTop: '0.625rem' }}>
              <div className="progress-bar-fill" style={{ width: `${Math.min(100, (stat.value / Math.max(1, stat.max)) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Modules */}
      <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Modules</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {modules.map((mod, idx) => {
          const pct = getModuleProgress(mod.id)
          return (
            <Link
              key={mod.id}
              to={`/module/${mod.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="glass-card" style={{ padding: '1.25rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: 'rgba(49,120,198,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.375rem', flexShrink: 0,
                  }}>{mod.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.125rem' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>#{idx + 1}</span>
                      <span style={{ fontWeight: 600, fontSize: '0.9375rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {mod.title}
                      </span>
                      {pct === 100 && <span style={{ fontSize: '0.75rem', marginLeft: 'auto', color: '#3fb950', fontWeight: 600 }}>✓ Done</span>}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', margin: '0 0 0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {mod.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="progress-bar" style={{ flex: 1 }}>
                        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                        {pct}% · {mod.lessons.length} lessons
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
