import { NextResponse } from 'next/server';
import { AuthService } from '@/Src/services/auth.service';

export async function POST(request) {
  console.log('🚀 [API] /api/auth/resend-otp called');
  
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const result = await AuthService.resendOTP(email);
    
    return NextResponse.json(result, { status: 200 });
    
  } catch (error) {
    console.error('💥 Resend OTP error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to resend OTP' },
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