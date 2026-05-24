import { NextResponse } from 'next/server';
import { AuthService } from '@/Src/services/auth.service';

export async function POST(request) {
  console.log('🚀 [API] /api/auth/verify-email called');
  
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 6-digit OTP' },
        { status: 400 }
      );
    }

    const result = await AuthService.verifyEmail(email, otp);
    
    return NextResponse.json(result, { status: 200 });
    
  } catch (error) {
    console.error('💥 Verify email error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Verification failed' },
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