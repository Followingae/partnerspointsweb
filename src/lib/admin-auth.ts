import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from './db'
import { adminUsers, adminSessions } from './schema-minimal'
import { eq, and, gt } from 'drizzle-orm'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'your-super-secret-admin-key-change-in-production'
const TOKEN_EXPIRES_IN = '7d' // 7 days

export interface AdminUser {
  id: string
  username: string
  email: string
  role: string
  isActive: boolean
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Generate JWT token
export function generateToken(user: AdminUser): string {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES_IN }
  )
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Authenticate admin user
export async function authenticateAdmin(username: string, password: string): Promise<AdminUser | null> {
  try {
    // Find user by username or email
    const user = await db.query.adminUsers.findFirst({
      where: and(
        eq(adminUsers.isActive, true),
        // Check both username and email
        eq(adminUsers.username, username)
      )
    })

    if (!user) {
      // Try with email
      const userByEmail = await db.query.adminUsers.findFirst({
        where: and(
          eq(adminUsers.isActive, true),
          eq(adminUsers.email, username)
        )
      })
      
      if (!userByEmail) {
        return null
      }
      
      const isValidPassword = await verifyPassword(password, userByEmail.passwordHash)
      if (!isValidPassword) {
        return null
      }

      // Update last login
      await db.update(adminUsers)
        .set({ lastLogin: new Date() })
        .where(eq(adminUsers.id, userByEmail.id))

      return {
        id: userByEmail.id,
        username: userByEmail.username,
        email: userByEmail.email,
        role: userByEmail.role,
        isActive: userByEmail.isActive,
      }
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash)
    if (!isValidPassword) {
      return null
    }

    // Update last login
    await db.update(adminUsers)
      .set({ lastLogin: new Date() })
      .where(eq(adminUsers.id, user.id))

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

// Create admin session
export async function createAdminSession(
  userId: string, 
  token: string, 
  ipAddress?: string, 
  userAgent?: string
): Promise<void> {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 days

  await db.insert(adminSessions).values({
    userId,
    token,
    ipAddress,
    userAgent,
    expiresAt,
  })
}

// Get admin user from request
export async function getAdminFromRequest(request: NextRequest): Promise<AdminUser | null> {
  try {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return null
    }

    // Verify JWT token
    const decoded = verifyToken(token)
    if (!decoded || !decoded.userId) {
      return null
    }

    // Check if session exists and is valid
    const session = await db.query.adminSessions.findFirst({
      where: and(
        eq(adminSessions.token, token),
        gt(adminSessions.expiresAt, new Date())
      ),
      with: {
        user: true,
      },
    })

    if (!session || !session.user.isActive) {
      return null
    }

    return {
      id: session.user.id,
      username: session.user.username,
      email: session.user.email,
      role: session.user.role,
      isActive: session.user.isActive,
    }
  } catch (error) {
    console.error('Get admin from request error:', error)
    return null
  }
}

// Logout admin (invalidate session)
export async function logoutAdmin(token: string): Promise<void> {
  try {
    await db.delete(adminSessions)
      .where(eq(adminSessions.token, token))
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Create first admin user (for initial setup)
export async function createFirstAdmin(
  username: string, 
  email: string, 
  password: string
): Promise<AdminUser> {
  const passwordHash = await hashPassword(password)
  
  const [newAdmin] = await db.insert(adminUsers).values({
    username,
    email,
    passwordHash,
    role: 'superadmin',
    isActive: true,
  }).returning()

  return {
    id: newAdmin.id,
    username: newAdmin.username,
    email: newAdmin.email,
    role: newAdmin.role,
    isActive: newAdmin.isActive,
  }
}

// Check if user is superadmin
export function isSuperAdmin(user: AdminUser): boolean {
  return user.role === 'superadmin'
}

// Mock functions for development (when no database)
export const mockAdminAuth = {
  authenticateAdmin: async (username: string, password: string) => {
    // Development mock - use these credentials: admin / admin123
    if (username === 'admin' && password === 'admin123') {
      return {
        id: 'mock-admin-id',
        username: 'admin',
        email: 'admin@partnerspoints.com',
        role: 'superadmin',
        isActive: true,
      }
    }
    return null
  },
  createAdminSession: async () => {},
  getAdminFromRequest: async (request: NextRequest) => {
    const token = request.cookies.get('admin-token')?.value
    if (token === 'mock-admin-token') {
      return {
        id: 'mock-admin-id',
        username: 'admin',
        email: 'admin@partnerspoints.com',
        role: 'superadmin',
        isActive: true,
      }
    }
    return null
  }
}