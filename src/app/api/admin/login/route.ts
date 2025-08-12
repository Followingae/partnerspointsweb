import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { authenticateAdmin, generateToken, createAdminSession, mockAdminAuth } from '@/lib/admin-auth'

const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const { username, password } = LoginSchema.parse(body)

    // Get IP and User Agent for session tracking
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Check if we have a database connection
    const hasDatabase = process.env.DATABASE_URL

    let user
    if (hasDatabase) {
      // Real authentication with database
      user = await authenticateAdmin(username, password)
    } else {
      // Mock authentication for development
      user = await mockAdminAuth.authenticateAdmin(username, password)
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    let token
    if (hasDatabase) {
      token = generateToken(user)
      // Create session in database
      await createAdminSession(user.id, token, ipAddress, userAgent)
    } else {
      // Mock token for development
      token = 'mock-admin-token'
    }

    // Create response with secure cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })

    // Set HTTP-only cookie for security
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Admin login error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid login data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Admin Login API',
    endpoints: {
      'POST /api/admin/login': 'Admin login',
    },
    devCredentials: process.env.NODE_ENV === 'development' ? {
      username: 'admin',
      password: 'admin123'
    } : 'Set in production'
  })
}