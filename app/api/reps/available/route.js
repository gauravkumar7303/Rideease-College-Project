import { NextResponse } from 'next/server';
import { connectDB } from '@/Src/lib/db';
import User from '@/Src/models/User';

export async function GET() {
  try {
    await connectDB();
    
    const reps = await User.find({
      role: 'rep',
      'repDetails.isActive': true
    }).select('name phone repDetails.zone repDetails.employeeId');
    
    return NextResponse.json({
      success: true,
      count: reps.length,
      reps
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}