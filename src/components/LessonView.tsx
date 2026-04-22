import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { modules, lessonContent } from '../lib/content'
import { useProgress } from '../lib/progress'
import { challenges } from '../lib/challenges'
import { ChallengeCard } from './ChallengeCard'
import { SyntaxHighlight } from './SyntaxHighlight'

export function ModuleView() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const mod = modules.find(m => m.id === moduleId)
  const { getModuleProgress, getLessonProgress } = useProgress()

  if (!mod) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <h2>Module not found</h2>
        <Link to="/dashboard" style={{ color: 'var(--ts-blue-light)' }}>← Back to dashboard</Link>
      </div>
    )
  }

  const pct = getModuleProgress(mod.id)
  const moduleChallenges = challenges.filter(c => c.moduleId === moduleId)

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <Link to="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '1.5rem' }}>
        ← Dashboard
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12,
          background: 'rgba(49,120,198,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem',
        }}>{mod.icon}</div>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem' }}>{mod.title}</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9375rem' }}>{mod.description}</p>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>{pct}% complete</span>
          <span style={{ color: 'var(--text-secondary)' }}>{mod.lessons.length} lessons</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Lessons */}
      <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>Lessons</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem' }}>
        {mod.lessons.map((lesson, i) => {
          const lp = getLessonProgress(mod.id, lesson.slug)
          return (
            <Link
              key={lesson.id}
              to={`/module/${mod.id}/${lesson.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="glass-card" style={{ padding: '1rem 1.25rem', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: lp.completed ? 'rgba(63,185,80,0.15)' : 'rgba(49,120,198,0.1)',
                  border: `1px solid ${lp.completed ? 'rgba(63,185,80,0.4)' : 'var(--border-color)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', color: lp.completed ? '#3fb950' : 'var(--text-secondary)',
                  fontWeight: 600,
                }}>
                  {lp.completed ? '✓' : i + 1}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.125rem' }}>{lesson.title}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{lesson.description}</div>
                </div>
                {lp.completed && <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#3fb950', fontWeight: 600 }}>+{lp.score} pts</span>}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Challenges */}
      {moduleChallenges.length > 0 && (
        <>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Coding Challenges ({moduleChallenges.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {moduleChallenges.map(c => <ChallengeCard key={c.id} challenge={c} />)}
          </div>
        </>
      )}
    </div>
  )
}

export function LessonView() {
  const { moduleId, lessonSlug } = useParams<{ moduleId: string; lessonSlug: string }>()
  const mod = modules.find(m => m.id === moduleId)
  const lesson = mod?.lessons.find(l => l.slug === lessonSlug)
  const { markLessonComplete, getLessonProgress } = useProgress()

  if (!mod || !lesson) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <h2>Lesson not found</h2>
        <Link to={`/module/${moduleId}`} style={{ color: 'var(--ts-blue-light)' }}>← Back to module</Link>
      </div>
    )
  }

  const contentKey = `${moduleId}/${lessonSlug}`
  const content = lessonContent[contentKey]
  const lp = getLessonProgress(mod.id, lesson.slug)

  const lessonIndex = mod.lessons.findIndex(l => l.slug === lessonSlug)
  const prevLesson = lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null
  const nextLesson = lessonIndex < mod.lessons.length - 1 ? mod.lessons[lessonIndex + 1] : null
  const lessonChallenges = challenges.filter(c => c.moduleId === moduleId && c.lessonSlug === lessonSlug)

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Dashboard</Link>
        <span>›</span>
        <Link to={`/module/${moduleId}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{mod.title}</Link>
        <span>›</span>
        <span style={{ color: 'var(--text-primary)' }}>{lesson.title}</span>
      </div>

      {/* Complete button */}
      {!lp.completed && (
        <button
          onClick={() => markLessonComplete(mod.id, lesson.slug)}
          style={{
            float: 'right', padding: '0.375rem 0.875rem',
            background: 'rgba(63,185,80,0.15)', color: '#3fb950',
            border: '1px solid rgba(63,185,80,0.3)', borderRadius: 6,
            cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600,
          }}
        >Mark Complete ✓</button>
      )}

      {lp.completed && (
        <div style={{
          float: 'right', padding: '0.375rem 0.875rem',
          background: 'rgba(63,185,80,0.1)', color: '#3fb950',
          border: '1px solid rgba(63,185,80,0.25)', borderRadius: 6,
          fontSize: '0.8125rem', fontWeight: 600,
        }}>✓ Completed +{lp.score} pts</div>
      )}

      {/* Lesson content */}
      {content ? (
        <div className="prose" style={{ maxWidth: '100%' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                const isInline = !match
                if (isInline) {
                  return <code className={className} {...props}>{children}</code>
                }
                return (
                  <SyntaxHighlight language={match[1]} code={String(children).replace(/\n$/, '')} />
                )
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      ) : (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p>Content not found for this lesson.</p>
        </div>
      )}

      {/* Challenges */}
      {lessonChallenges.length > 0 && (
        <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
            Practice Challenges
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {lessonChallenges.map(c => <ChallengeCard key={c.id} challenge={c} />)}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          {prevLesson && (
            <Link to={`/module/${moduleId}/${prevLesson.slug}`} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ padding: '0.875rem 1rem', cursor: 'pointer' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>← Previous</div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{prevLesson.title}</div>
              </div>
            </Link>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {nextLesson && (
            <Link to={`/module/${moduleId}/${nextLesson.slug}`} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ padding: '0.875rem 1rem', cursor: 'pointer', textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Next →</div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{nextLesson.title}</div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
