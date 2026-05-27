import { NextResponse } from 'next/server';
import { connectDB } from '@/Src/lib/db';
import Driver from '@/Src/models/Driver';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const driver = await Driver.findOne({ userId });
    
    if (!driver) {
      return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, driver });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}