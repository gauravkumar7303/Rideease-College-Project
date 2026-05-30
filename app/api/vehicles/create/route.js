// import { NextResponse } from 'next/server';
// import { connectDB } from '@/Src/lib/db';
// import Vehicle from '@/Src/models/Vehicle';
// import User from '@/Src/models/User';
// import { EmailService } from '@/Src/services/email.service';

// export async function POST(request) {
//   try {
//     await connectDB();
//     const body = await request.json();
    
//     console.log('📦 Creating vehicle for owner:', body.owner);
    
//     // Check if registration number already exists
//     const existingVehicle = await Vehicle.findOne({ 
//       registrationNumber: body.registrationNumber 
//     });
    
//     if (existingVehicle) {
//       return NextResponse.json({
//         success: false,
//         error: 'Vehicle with this registration number already exists'
//       }, { status: 409 });
//     }
    
//     // Get owner details
//     const owner = await User.findById(body.owner);
    
//     // Create vehicle
//     const vehicle = new Vehicle({
//       ...body,
//       isVerified: false
//     });
    
//     await vehicle.save();
//     console.log('✅ Vehicle created:', vehicle._id);
    
//     // ✅ Send email to owner
//     if (owner && owner.email) {
//       await EmailService.sendVehicleListingEmail({
//         email: owner.email,
//         name: owner.name,
//         vehicleName: `${body.brand} ${body.model}`,
//         registrationNumber: body.registrationNumber,
//         vehicleId: vehicle._id
//       });
//       console.log('✅ Listing email sent to owner');
//     }
    
//     return NextResponse.json({
//       success: true,
//       message: 'Vehicle listed successfully! Verification email sent.',
//       vehicle
//     }, { status: 201 });
    
//   } catch (error) {
//     console.error('❌ Vehicle creation error:', error);
//     return NextResponse.json({
//       success: false,
//       error: error.message
//     }, { status: 500 });
//   }
// }


//Path: app/api/vehicles/create/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/Src/lib/db';
import Vehicle from '@/Src/models/Vehicle';
import User from '@/Src/models/User';
import { sendVehicleListingEmail } from '@/Src/services/email.service';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    console.log('========================================');
    console.log('📦 [VEHICLE CREATE] Received request');
    console.log('📦 [VEHICLE CREATE] Body:', JSON.stringify(body, null, 2));
    console.log('📦 [VEHICLE CREATE] Owner ID from body:', body.owner);
    console.log('========================================');
    
    // ✅ STEP 1: Fetch owner details from database using the ID
    const owner = await User.findById(body.owner);
    
    console.log('🔍 [VEHICLE CREATE] User.findById result:', owner);
    
    if (!owner) {
      console.log('❌ [VEHICLE CREATE] Owner NOT found with ID:', body.owner);
      console.log('❌ [VEHICLE CREATE] Please check if this ID exists in users collection');
      
      // List all users for debugging
      const allUsers = await User.find({}).select('_id name email role');
      console.log('📋 All users in database:', JSON.stringify(allUsers, null, 2));
      
      return NextResponse.json({
        success: false,
        error: 'Owner not found. Please login again.',
        debug: { ownerId: body.owner, message: 'ID not found in users collection' }
      }, { status: 404 });
    }
    
    console.log('✅ [VEHICLE CREATE] Owner found:');
    console.log('   - Name:', owner.name);
    console.log('   - Email:', owner.email);
    console.log('   - Phone:', owner.phone);
    console.log('   - Role:', owner.role);
    
    // ✅ STEP 2: Check if registration number already exists
    const existingVehicle = await Vehicle.findOne({ 
      registrationNumber: body.registrationNumber 
    });
    
    if (existingVehicle) {
      console.log('❌ [VEHICLE CREATE] Registration number already exists:', body.registrationNumber);
      return NextResponse.json({
        success: false,
        error: 'Vehicle with this registration number already exists'
      }, { status: 409 });
    }
    
    // ✅ STEP 3: Create vehicle
    const vehicle = new Vehicle({
      owner: owner._id,
      vehicleType: body.vehicleType,
      brand: body.brand,
      model: body.model,
      year: body.year,
      registrationNumber: body.registrationNumber,
      fuelType: body.fuelType,
      transmission: body.transmission,
      seats: body.seats,
      features: body.features || [],
      images: body.images || [],
      location: body.location,
      pricePerDay: body.pricePerDay,
      securityDeposit: body.securityDeposit || 5000,
      isVerified: false,
      description: body.description || ''
    });
    
    await vehicle.save();
    
    console.log('✅ [VEHICLE CREATE] Vehicle created successfully!');
    console.log('   - Vehicle ID:', vehicle._id);
    
    // ✅ STEP 4: SEND EMAIL TO OWNER
    let emailSent = false;
    
    if (owner.email) {
      console.log('📧 [VEHICLE CREATE] Attempting to send email to:', owner.email);
      console.log('📧 [VEHICLE CREATE] Owner name:', owner.name);
      console.log('📧 [VEHICLE CREATE] Vehicle name:', `${body.brand} ${body.model}`);
      
      try {
        console.log('📧 [VEHICLE CREATE] Calling sendVehicleListingEmail...');
        
        emailSent = await sendVehicleListingEmail({
          email: owner.email,
          name: owner.name,
          vehicleName: `${body.brand} ${body.model}`,
          registrationNumber: body.registrationNumber,
          vehicleId: vehicle._id.toString()
        });
        
        console.log('📧 [VEHICLE CREATE] sendVehicleListingEmail returned:', emailSent);
        
        if (emailSent) {
          console.log('✅ [VEHICLE CREATE] Listing email sent successfully to:', owner.email);
        } else {
          console.log('⚠️ [VEHICLE CREATE] Email service returned false');
        }
      } catch (emailError) {
        console.error('❌ [VEHICLE CREATE] Email sending error:', emailError);
        console.error('❌ [VEHICLE CREATE] Error message:', emailError.message);
      }
    } else {
      console.log('⚠️ [VEHICLE CREATE] Owner has NO email address in database!');
    }
    
    console.log('========================================');
    console.log('✅ [VEHICLE CREATE] Request completed');
    console.log('========================================');
    
    return NextResponse.json({
      success: true,
      message: 'Vehicle listed successfully!',
      vehicle: {
        _id: vehicle._id,
        brand: vehicle.brand,
        model: vehicle.model,
        registrationNumber: vehicle.registrationNumber,
        ownerEmail: owner.email,
        emailSent: emailSent
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('❌ [VEHICLE CREATE] Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}