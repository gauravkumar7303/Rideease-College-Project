//Path: app/api/drivers/available/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/Src/lib/db';
import Driver from '@/Src/models/Driver';  // ✅ New Driver model

export async function GET() {
  try {
    await connectDB();
    
    // ✅ Fetch from Driver collection, not User
    const drivers = await Driver.find({
      isAvailable: true,
      isVerified: true,
      status: 'active'
    }).select('name email phone rating totalTrips vehicleTypes languages currentLocation');
    
    return NextResponse.json({
      success: true,
      count: drivers.length,
      drivers
    });
  } catch (error) {
    console.error('❌ Error fetching drivers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}