import { NextResponse } from 'next/server';
import { AuthService } from '@/Src/services/auth.service';

export async function POST(request) {
  console.log('🚀 [API] /api/auth/login called');
  
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Login user
    console.log('🔐 Attempting login for:', email);
    const result = await AuthService.loginUser(email, password);

    console.log('✅ Login successful for:', email);
    
    return NextResponse.json(result, { status: 200 });
    
  } catch (error) {
    console.error('💥 Login API error:', error);
    
    if (error.message === 'Invalid email or password') {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    if (error.message.includes('verify your email')) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Login failed' },
      { status: 400 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}