import { NextResponse } from 'next/server';
import { connectDB } from '@/Src/lib/db';
import Vehicle from '@/Src/models/Vehicle';

export async function GET(request, { params }) {
  // ✅ FIX: Properly await and extract id
  const { id } = await params;
  
  console.log(`🚀 [API] /api/vehicles/${id} GET called`);
  
  try {
    await connectDB();
    
    // ✅ Validate if id is valid MongoDB ObjectId
    if (!id || id.length !== 24) {
      console.log('❌ Invalid vehicle ID format:', id);
      return NextResponse.json({
        success: false,
        error: 'Invalid vehicle ID format'
      }, { status: 400 });
    }

    const vehicle = await Vehicle.findById(id)
      .populate('owner', 'name phone email rating');

    if (!vehicle) {
      return NextResponse.json({
        success: false,
        error: 'Vehicle not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      vehicle
    });

  } catch (error) {
    console.error('❌ Fetch vehicle error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  // ✅ FIX: Properly await and extract id
  const { id } = await params;
  
  console.log(`🚀 [API] /api/vehicles/${id} PUT called`);
  
  try {
    await connectDB();
    
    if (!id || id.length !== 24) {
      return NextResponse.json({
        success: false,
        error: 'Invalid vehicle ID format'
      }, { status: 400 });
    }
    
    const body = await request.json();
    
    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { 
        ...body, 
        updatedAt: new Date() 
      },
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!vehicle) {
      return NextResponse.json({
        success: false,
        error: 'Vehicle not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Vehicle updated successfully',
      vehicle
    });

  } catch (error) {
    console.error('❌ Update vehicle error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  // ✅ FIX: Properly await and extract id
  const { id } = await params;
  
  console.log(`🚀 [API] /api/vehicles/${id} DELETE called`);
  
  try {
    await connectDB();
    
    if (!id || id.length !== 24) {
      return NextResponse.json({
        success: false,
        error: 'Invalid vehicle ID format'
      }, { status: 400 });
    }
    
    const vehicle = await Vehicle.findByIdAndDelete(id);

    if (!vehicle) {
      return NextResponse.json({
        success: false,
        error: 'Vehicle not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Vehicle deleted successfully'
    });

  } catch (error) {
    console.error('❌ Delete vehicle error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}