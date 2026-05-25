//Path: app/api/drivers/available/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/Src/lib/db';
import User from '@/Src/models/User';

export async function GET() {
  try {
    await connectDB();
    
    const drivers = await User.find({
      role: 'driver',
      'driverDetails.isVerified': true,
      'driverDetails.availability': true
    }).select('name phone driverDetails.rating driverDetails.totalTrips');
    
    return NextResponse.json({
      success: true,
      count: drivers.length,
      drivers
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}