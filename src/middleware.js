import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // For now, we'll skip authentication
    // This can be implemented later with JWT or session-based auth
    return NextResponse.next()
  }

  // Protect API routes (optional)
  if (pathname.startsWith('/api/tentang-sekolah')) {
    // For now, allow all API requests
    // This can be enhanced with API key validation
    const response = NextResponse.next()

    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/tentang-sekolah/:path*'
  ]
}
