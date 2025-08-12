import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple middleware that only checks for mock auth token
export async function middleware(request: NextRequest) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Simple auth check using just the cookie (no database calls in middleware)
    const token = request.cookies.get('admin-token')?.value
    
    if (!token || (token !== 'mock-admin-token' && !token.startsWith('eyJ'))) {
      // Redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Let the API routes handle the full auth verification
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}

// Force middleware to run in Node.js runtime instead of edge runtime
export const runtime = 'nodejs'