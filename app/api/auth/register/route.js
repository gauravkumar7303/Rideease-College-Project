import { NextResponse } from 'next/server';
import { AuthService } from '@/Src/services/auth.service';

export async function POST(request) {
  console.log('🚀 [API] /api/auth/register called');
  
  try {
    const body = await request.json();
    const { name, email, phone, password, confirmPassword, userType } = body;

    // Validation
    if (!email || !password || !name || !phone) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
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

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit Indian phone number' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const result = await AuthService.registerUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password,
      userType: userType || 'customer'
    });

    return NextResponse.json(result, { status: 201 });
    
  } catch (error) {
    console.error('💥 Registration API error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { success: false, error: `This ${field} is already registered` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Registration failed' },
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