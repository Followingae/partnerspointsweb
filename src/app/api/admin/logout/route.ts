import { NextRequest, NextResponse } from 'next/server'
import { logoutAdmin } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value

    if (token && process.env.DATABASE_URL) {
      // Remove session from database
      await logoutAdmin(token)
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    })

    // Clear the cookie
    response.cookies.set('admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Admin logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}