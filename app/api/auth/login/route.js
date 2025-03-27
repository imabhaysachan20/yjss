import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// In a real application, these would be stored securely in environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const JWT_SECRET = process.env.JWT_SECRET || 'thisisthesecret'

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = jwt.sign(
      { username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Set HTTP-only cookie with the token
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    )

    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 