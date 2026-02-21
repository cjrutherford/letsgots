import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  username: string
  email: string
  avatar?: string
}

interface Credentials {
  username: string
  password: string
}

interface AuthContextType {
  user: User | null
  login: (credentials: Credentials) => boolean
  signup: (credentials: Credentials & { email: string }) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const STORAGE_KEY = 'tslearn_user'
const CREDENTIALS_KEY = 'tslearn_credentials'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const login = (credentials: Credentials): boolean => {
    const stored = localStorage.getItem(CREDENTIALS_KEY)
    if (!stored) return false
    try {
      const allCredentials: Record<string, Credentials & { email: string }> = JSON.parse(stored)
      const userCreds = allCredentials[credentials.username]
      if (!userCreds || userCreds.password !== credentials.password) return false
      const userData: User = {
        username: credentials.username,
        email: userCreds.email,
      }
      setUser(userData)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      return true
    } catch {
      return false
    }
  }

  const signup = (credentials: Credentials & { email: string }): boolean => {
    try {
      const stored = localStorage.getItem(CREDENTIALS_KEY)
      const allCredentials: Record<string, Credentials & { email: string }> = stored
        ? JSON.parse(stored)
        : {}
      if (allCredentials[credentials.username]) return false
      allCredentials[credentials.username] = credentials
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(allCredentials))
      const userData: User = { username: credentials.username, email: credentials.email }
      setUser(userData)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      return true
    } catch {
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
