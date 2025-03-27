import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login'

  // Define admin paths that require authentication
  const isAdminPath = path.startsWith('/admin')

  // Get the token from the cookies
  const token = request.cookies.get('adminToken')?.value

  // If trying to access admin routes without a token, redirect to login
  if (isAdminPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If trying to access login page while already authenticated, redirect to admin dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // If accessing admin routes, verify the token
  if (isAdminPath && token) {
    try {
      // Verify the JWT token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')
      await jwtVerify(token, secret)
      
      // Token is valid, allow the request to proceed
      return NextResponse.next()
    } catch (error) {
      // Token is invalid or expired, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url))
      // Clear the invalid token
      response.cookies.delete('adminToken')
      return response
    }
  }

  // Allow all other requests to proceed
  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/api/admin/:path*'
  ]
}
