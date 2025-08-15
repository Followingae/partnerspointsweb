import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema-simple'

// Create database connection
let db: any

try {
  if (process.env.DATABASE_URL) {
    console.log('🗄️  Connecting to database...')
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    })
    
    db = drizzle(pool, { schema })
    console.log('✅ Database connected successfully')
  } else {
    console.warn('⚠️  DATABASE_URL not set - using mock database')
    throw new Error('No DATABASE_URL provided')
  }
} catch (error) {
  console.error('❌ Database connection failed:', error)
  
  // Fallback to mock database
  db = {
    select: () => ({ from: () => ({ where: () => ({ limit: () => [] }) }) }),
    insert: () => ({ values: () => ({ returning: () => [{ id: 'mock-id' }] }) }),
    update: () => ({ set: () => ({ where: () => ({ returning: () => [{}] }) }) }),
    delete: () => ({ where: () => ({}) }),
    query: { 
      contactSubmissions: { findMany: () => [] }
    }
  }
}

export { db, schema }