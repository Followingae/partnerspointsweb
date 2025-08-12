import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

// For development, we'll create a mock database if no URL is provided
let db: any

if (process.env.DATABASE_URL) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  })
  
  db = drizzle(pool, { schema })
} else {
  // Mock database for development without connection
  console.warn('⚠️  DATABASE_URL not set - using mock database (frontend will work, backend APIs will not)')
  
  db = {
    select: () => ({ from: () => ({ where: () => ({ limit: () => [] }) }) }),
    insert: () => ({ values: () => ({ returning: () => [{ id: 'mock-id' }] }) }),
    update: () => ({ set: () => ({ where: () => ({ returning: () => [{}] }) }) }),
    delete: () => ({ where: () => ({}) }),
    query: { 
      merchants: { findFirst: () => null },
      blogPosts: { findFirst: () => null }
    }
  }
}

export { db, schema }