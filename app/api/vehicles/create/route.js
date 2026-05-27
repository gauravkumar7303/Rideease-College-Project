import { NextResponse } from 'next/server';
import { connectDB } from '@/Src/lib/db';
import Vehicle from '@/Src/models/Vehicle';
import User from '@/Src/models/User';
import { EmailService } from '@/Src/services/email.service';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    console.log('📦 Creating vehicle for owner:', body.owner);
    
    // Check if registration number already exists
    const existingVehicle = await Vehicle.findOne({ 
      registrationNumber: body.registrationNumber 
    });
    
    if (existingVehicle) {
      return NextResponse.json({
        success: false,
        error: 'Vehicle with this registration number already exists'
      }, { status: 409 });
    }
    
    // Get owner details
    const owner = await User.findById(body.owner);
    
    // Create vehicle
    const vehicle = new Vehicle({
      ...body,
      isVerified: false
    });
    
    await vehicle.save();
    console.log('✅ Vehicle created:', vehicle._id);
    
    // ✅ Send email to owner
    if (owner && owner.email) {
      await EmailService.sendVehicleListingEmail({
        email: owner.email,
        name: owner.name,
        vehicleName: `${body.brand} ${body.model}`,
        registrationNumber: body.registrationNumber,
        vehicleId: vehicle._id
      });
      console.log('✅ Listing email sent to owner');
    }
    
    return NextResponse.json({
      success: true,
      message: 'Vehicle listed successfully! Verification email sent.',
      vehicle
    }, { status: 201 });
    
  } catch (error) {
    console.error('❌ Vehicle creation error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}