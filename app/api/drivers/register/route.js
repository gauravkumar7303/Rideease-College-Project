import { NextResponse } from 'next/server';
import { connectDB } from '@/Src/lib/db';
import Driver from '@/Src/models/Driver';
import User from '@/Src/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    console.log('📦 Driver registration request:', body.email);
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'User with this email already exists' 
      }, { status: 400 });
    }
    
    // Check if driver already registered
    const existingDriver = await Driver.findOne({ email: body.email });
    if (existingDriver) {
      return NextResponse.json({ 
        success: false, 
        error: 'Driver already registered' 
      }, { status: 400 });
    }
    
    // Create User account
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = new User({
      name: body.name,
      email: body.email,
      phone: body.phone,
      password: hashedPassword,
      role: 'driver'
    });
    await user.save();
    console.log('✅ User created:', user._id);
    
    // Create Driver profile
    const driver = new Driver({
      userId: user._id,
      name: body.name,
      email: body.email,
      phone: body.phone,
      licenseNumber: body.licenseNumber,
      experience: body.experience || 0,
      vehicleTypes: body.vehicleTypes || ['car'],
      languages: body.languages || ['hindi', 'english'],
      isAvailable: true,
      isVerified: false,
      status: 'pending'
    });
    
    await driver.save();
    console.log('✅ Driver profile created:', driver._id);
    
    return NextResponse.json({
      success: true,
      message: 'Driver registered successfully! Awaiting verification.',
      driver: {
        id: driver._id,
        name: driver.name,
        email: driver.email,
        status: driver.status
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('❌ Driver registration error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}