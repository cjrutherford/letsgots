import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { modules } from './content'

interface LessonProgress {
  completed: boolean
  score: number
  completedAt?: string
}

interface ProgressState {
  lessons: Record<string, LessonProgress>
  challenges: Record<string, boolean>
  totalScore: number
}

interface ProgressContextType {
  progress: ProgressState
  markLessonComplete: (moduleId: string, lessonSlug: string) => void
  markChallengeComplete: (challengeId: string, points: number) => void
  getModuleProgress: (moduleId: string) => number
  getLessonProgress: (moduleId: string, lessonSlug: string) => LessonProgress
  resetProgress: () => void
}

const STORAGE_KEY = 'lets-go-ts-progress'

const defaultProgress: ProgressState = {
  lessons: {},
  challenges: {},
  totalScore: 0,
}

const ProgressContext = createContext<ProgressContextType | null>(null)

function loadFromStorage(): ProgressState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultProgress
    return JSON.parse(stored) as ProgressState
  } catch {
    return defaultProgress
  }
}

function saveToStorage(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore storage errors
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(defaultProgress)

  useEffect(() => {
    setProgress(loadFromStorage())
  }, [])

  const markLessonComplete = useCallback((moduleId: string, lessonSlug: string) => {
    const key = `${moduleId}/${lessonSlug}`
    setProgress(prev => {
      if (prev.lessons[key]?.completed) return prev
      const next: ProgressState = {
        ...prev,
        lessons: {
          ...prev.lessons,
          [key]: { completed: true, score: 10, completedAt: new Date().toISOString() },
        },
        totalScore: prev.totalScore + 10,
      }
      saveToStorage(next)
      return next
    })
  }, [])

  const markChallengeComplete = useCallback((challengeId: string, points: number) => {
    setProgress(prev => {
      if (prev.challenges[challengeId]) return prev
      const next: ProgressState = {
        ...prev,
        challenges: { ...prev.challenges, [challengeId]: true },
        totalScore: prev.totalScore + points,
      }
      saveToStorage(next)
      return next
    })
  }, [])

  const getModuleProgress = useCallback((moduleId: string): number => {
    const mod = modules.find(m => m.id === moduleId)
    if (!mod) return 0
    const total = mod.lessons.length
    if (total === 0) return 0
    const completed = mod.lessons.filter(l => progress.lessons[`${moduleId}/${l.slug}`]?.completed).length
    return Math.round((completed / total) * 100)
  }, [progress.lessons])

  const getLessonProgress = useCallback((moduleId: string, lessonSlug: string): LessonProgress => {
    return progress.lessons[`${moduleId}/${lessonSlug}`] ?? { completed: false, score: 0 }
  }, [progress.lessons])

  const resetProgress = useCallback(() => {
    const fresh = { ...defaultProgress }
    setProgress(fresh)
    saveToStorage(fresh)
  }, [])

  return (
    <ProgressContext.Provider value={{
      progress,
      markLessonComplete,
      markChallengeComplete,
      getModuleProgress,
      getLessonProgress,
      resetProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
