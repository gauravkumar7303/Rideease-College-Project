// //Path: app/api/vehicles/route.js
// import { NextResponse } from 'next/server';
// import { connectDB } from '@/Src/lib/db';
// import Vehicle from '@/Src/models/Vehicle';

// export async function POST(request) {
//   console.log('🚀 [API] /api/vehicles POST called');
  
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

//     // Create vehicle - timestamps will auto-add createdAt/updatedAt
//     const vehicle = new Vehicle({
//       ...body,
//       isVerified: false // Admin will verify
//     });

//     await vehicle.save();
//     console.log('✅ Vehicle created:', vehicle._id);

//     return NextResponse.json({
//       success: true,
//       message: 'Vehicle listed successfully! It will be verified by our team.',
//       vehicle
//     }, { status: 201 });

//   } catch (error) {
//     console.error('❌ Vehicle creation error:', error);
    
//     // Handle validation errors
//     if (error.name === 'ValidationError') {
//       const messages = Object.values(error.errors).map(err => err.message);
//       return NextResponse.json({
//         success: false,
//         error: messages.join(', ')
//       }, { status: 400 });
//     }

//     return NextResponse.json({
//       success: false,
//       error: error.message || 'Failed to list vehicle'
//     }, { status: 500 });
//   }
// }

// // export async function GET(request) {
// //   console.log('🚀 [API] /api/vehicles GET called');
  
// //   try {
// //     await connectDB();
    
// //     const { searchParams } = new URL(request.url);
// //     const location = searchParams.get('location');
// //     const vehicleType = searchParams.get('type');
// //     const ownerId = searchParams.get('owner');

// //     let query = {};

// //     if (!ownerId) {
// //       query.isVerified = true;
// //       query.isAvailable = true;
// //     }

// //     if (location) query.location = location;
// //     if (vehicleType) query.vehicleType = vehicleType;
// //     if (ownerId) query.owner = ownerId;

// //     console.log('🔍 Query:', JSON.stringify(query));

// //     // ✅ Try with populate, fallback to without
// //     let vehicles;
// //     try {
// //       vehicles = await Vehicle.find(query)
// //         .populate('owner', 'name phone email')
// //         .sort({ createdAt: -1 });
// //     } catch (popError) {
// //       console.log('⚠️ Populate failed, trying without populate');
// //       vehicles = await Vehicle.find(query).sort({ createdAt: -1 });
// //     }

// //     console.log(`✅ Found ${vehicles.length} vehicles`);

// //     return NextResponse.json({
// //       success: true,
// //       count: vehicles.length,
// //       vehicles
// //     });

// //   } catch (error) {
// //     console.error('❌ Fetch vehicles error:', error);
// //     return NextResponse.json({
// //       success: false,
// //       error: error.message
// //     }, { status: 500 });
// //   }
// // }

// export async function GET(request) {
//   console.log('🚀 [API] /api/vehicles GET called');
  
//   try {
//     await connectDB();
    
//     const { searchParams } = new URL(request.url);
//     const location = searchParams.get('location');
//     const vehicleType = searchParams.get('type');
//     const ownerId = searchParams.get('owner');
//     const showAll = searchParams.get('all'); // Add this param

//     let query = {};

//     // ✅ FIX: Agar owner ID hai toh unke saare vehicles dikhao
//     if (ownerId) {
//       query.owner = ownerId;
//     } 
//     // ✅ FIX: Agar showAll=true hai toh saare vehicles dikhao (for development)
//     else if (showAll === 'true') {
//       // No filters - show all vehicles
//       console.log('🔍 Showing all vehicles (including unverified)');
//     }
//     // ✅ FIX: Production mein sirf verified vehicles dikhao
//     else {
//       // In production, uncomment these lines
//       // query.isVerified = true;
//       // query.isAvailable = true;
      
//       // For development, show all vehicles
//       console.log('🔍 Development mode - showing all vehicles');
//     }

//     if (location) query.location = location;
//     if (vehicleType) query.vehicleType = vehicleType;

//     console.log('🔍 Query:', JSON.stringify(query));

//     const vehicles = await Vehicle.find(query)
//       .populate('owner', 'name phone email')
//       .sort({ createdAt: -1 });

//     console.log(`✅ Found ${vehicles.length} vehicles`);

//     return NextResponse.json({
//       success: true,
//       count: vehicles.length,
//       vehicles
//     });

//   } catch (error) {
//     console.error('❌ Fetch vehicles error:', error);
//     return NextResponse.json({
//       success: false,
//       error: error.message
//     }, { status: 500 });
//   }
// }


// Path: app/api/vehicles/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/Src/lib/db';
import Vehicle from '@/Src/models/Vehicle';

export async function POST(request) {
  console.log('🚀 [API] /api/vehicles POST called');
  
  try {
    await connectDB();
    
    const body = await request.json();
    console.log('📦 Creating vehicle for owner:', body.owner);

    const existingVehicle = await Vehicle.findOne({ 
      registrationNumber: body.registrationNumber 
    });
    
    if (existingVehicle) {
      return NextResponse.json({
        success: false,
        error: 'Vehicle with this registration number already exists'
      }, { status: 409 });
    }

    const vehicle = new Vehicle({
      ...body,
      isVerified: false
    });

    await vehicle.save();
    console.log('✅ Vehicle created:', vehicle._id);

    return NextResponse.json({
      success: true,
      message: 'Vehicle listed successfully! It will be verified by our team.',
      vehicle
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Vehicle creation error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({
        success: false,
        error: messages.join(', ')
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to list vehicle'
    }, { status: 500 });
  }
}

export async function GET(request) {
  console.log('🚀 [API] /api/vehicles GET called');
  
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const vehicleType = searchParams.get('type');
    const ownerId = searchParams.get('owner');
    const showAll = searchParams.get('all');

    let query = {};

    if (ownerId) {
      query.owner = ownerId;
    } else if (showAll === 'true') {
      console.log('🔍 Showing all vehicles (including unverified)');
    } else {
      console.log('🔍 Development mode - showing all vehicles');
    }

    if (location) query.location = location;
    if (vehicleType) query.vehicleType = vehicleType;

    console.log('🔍 Query:', JSON.stringify(query));

    // ✅ FIX: _id pe sort karo — indexed hai, memory limit nahi aayegi
    const vehicles = await Vehicle.find(query)
      .populate('owner', 'name phone email')
      .sort({ _id: -1 });  // createdAt ki jagah _id use karo

    console.log(`✅ Found ${vehicles.length} vehicles`);

    return NextResponse.json({
      success: true,
      count: vehicles.length,
      vehicles
    });

  } catch (error) {
    console.error('❌ Fetch vehicles error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}