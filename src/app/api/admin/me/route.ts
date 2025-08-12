import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest, mockAdminAuth } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    let user
    if (process.env.DATABASE_URL) {
      user = await getAdminFromRequest(request)
    } else {
      user = await mockAdminAuth.getAdminFromRequest(request)
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Get admin user error:', error)
    return NextResponse.json(
      { error: 'Failed to get user info' },
      { status: 500 }
    )
  }
}