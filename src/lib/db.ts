import { createClient } from '@libsql/client'

const url = import.meta.env.VITE_TURSO_DATABASE_URL as string | undefined
const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN as string | undefined

export const db = url
  ? createClient({ url, authToken })
  : null

export async function initDb() {
  if (!db) return
  await db.execute(`
    CREATE TABLE IF NOT EXISTS progress (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      lesson_slug TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      score INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)
}
