//Path:app/api/bookings/route.js
// import { NextResponse } from 'next/server';
// import { connectDB } from '@/Src/lib/db';
// import Booking from '@/Src/models/Booking';
// import Vehicle from '@/Src/models/Vehicle';
// import User from '@/Src/models/User';
// import { sendBookingConfirmation } from '@/Src/services/email.service';

// export async function POST(request) {
//   try {
//     await connectDB();
//     const body = await request.json();
    
//     console.log('📦 New booking request:', body.bookingType);
    
//     // ========== 1. FIND AVAILABLE DRIVER (if with_driver) ==========
//     let assignedDriver = null;
//     let driverId = null;
    
//     if (body.bookingType === 'with_driver') {
//       assignedDriver = await User.findOne({
//         role: 'driver',
//         'driverDetails.isVerified': true,
//         'driverDetails.availability': true
//       }).select('_id name phone driverDetails');
      
//       if (assignedDriver) {
//         driverId = assignedDriver._id;
//         console.log(`✅ Driver assigned: ${assignedDriver.name}`);
        
//         // Mark driver as busy
//         await User.findByIdAndUpdate(driverId, {
//           'driverDetails.availability': false
//         });
//       } else {
//         return NextResponse.json({
//           success: false,
//           error: 'No drivers available. Please try self-drive option.'
//         }, { status: 400 });
//       }
//     }
    
//     // ========== 2. FIND AVAILABLE REP (based on location) ==========
//     let assignedRep = null;
//     let repId = null;
    
//     const zone = body.pickupLocation?.includes('Gurugram') ? 'Gurugram' : 'Delhi';
    
//     assignedRep = await User.findOne({
//       role: 'rep',
//       'repDetails.isActive': true,
//       'repDetails.zone': zone
//     }).select('_id name phone repDetails');
    
//     if (!assignedRep) {
//       // Fallback - any active rep
//       assignedRep = await User.findOne({
//         role: 'rep',
//         'repDetails.isActive': true
//       }).select('_id name phone repDetails');
//     }
    
//     if (assignedRep) {
//       repId = assignedRep._id;
//       console.log(`✅ Representative assigned: ${assignedRep.name} (Zone: ${zone})`);
//     }
    
//     // ========== 3. GENERATE UNIQUE BOOKING ID ==========
//     const bookingId = `RE${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 1000)}`;
    
//     // ========== 4. CREATE BOOKING ==========
//     const booking = new Booking({
//       bookingId: bookingId,
//       customer: body.customerId,
//       vehicle: body.vehicleId,
//       owner: body.ownerId,
//       bookingType: body.bookingType,
//       driver: driverId,
//       driverStatus: driverId ? 'accepted' : 'pending',
//       driverAssignedAt: driverId ? new Date() : null,
      
//       pickupDate: new Date(body.pickupDate),
//       returnDate: new Date(body.returnDate),
//       pickupLocation: body.pickupLocation,
//       returnLocation: body.returnLocation || body.pickupLocation,
//       deliveryAddress: body.deliveryAddress,
      
//       totalDays: body.totalDays,
//       baseAmount: body.baseAmount,
//       driverCharges: body.driverCharges || 0,
//       insuranceCharges: body.insuranceCharges || 200,
//       serviceFee: body.serviceFee || 100,
//       deliveryCharges: body.deliveryCharges || 0,
//       totalAmount: body.totalAmount,
//       securityDeposit: body.securityDeposit,
      
//       paymentMethod: body.paymentMethod,
//       paymentStatus: 'paid',
//       paymentId: `PAY${Date.now()}`,
//       paidAt: new Date(),
      
//       status: 'confirmed',
      
//       // ✅ REP ACTIONS initialized
//       repActions: {
//         pickupFromOwner: {
//           status: repId ? 'pending' : 'pending',
//           repId: repId,
//           scheduledTime: new Date()
//         },
//         deliverToUser: { status: 'pending' },
//         collectFromUser: { status: 'pending' },
//         returnToOwner: { status: 'pending' }
//       },
      
//       customerDetails: body.customerDetails
//     });
    
//     await booking.save();
//     console.log(`✅ Booking saved: ${bookingId}`);
    
//     // ========== 5. UPDATE VEHICLE AVAILABILITY ==========
//     await Vehicle.findByIdAndUpdate(body.vehicleId, { isAvailable: false });
    
//     // ========== 6. SEND EMAIL TO CUSTOMER ONLY ==========
//     try {
//       await sendBookingConfirmation({
//         email: body.customerDetails.email,
//         name: body.customerDetails.name,
//         bookingId: bookingId,
//         vehicle: `${body.vehicleDetails?.brand || ''} ${body.vehicleDetails?.model || ''}`,
//         bookingType: body.bookingType === 'with_driver' ? 'With Professional Driver' : 'Self Drive',
//         driverName: assignedDriver?.name || 'Not applicable',
//         pickupDate: body.pickupDate,
//         returnDate: body.returnDate,
//         pickupLocation: body.pickupLocation,
//         totalAmount: body.totalAmount
//       });
//       console.log('✅ Email sent to customer');
//     } catch (emailError) {
//       console.error('Email error:', emailError);
//       // Don't fail booking if email fails
//     }
    
//     return NextResponse.json({
//       success: true,
//       message: 'Booking confirmed successfully!',
//       booking: {
//         id: bookingId,
//         bookingType: body.bookingType,
//         driver: assignedDriver ? {
//           name: assignedDriver.name,
//           phone: assignedDriver.phone
//         } : null,
//         representative: assignedRep ? {
//           name: assignedRep.name,
//           phone: assignedRep.phone,
//           zone: zone
//         } : null
//       }
//     });
    
//   } catch (error) {
//     console.error('❌ Booking error:', error);
//     return NextResponse.json({
//       success: false,
//       error: error.message
//     }, { status: 500 });
//   }
// }

// // GET: Fetch customer's bookings
// export async function GET(request) {
//   try {
//     await connectDB();
//     const { searchParams } = new URL(request.url);
//     const customerId = searchParams.get('customerId');
    
//     if (!customerId) {
//       return NextResponse.json({ error: 'Customer ID required' }, { status: 400 });
//     }
    
//     const bookings = await Booking.find({ customer: customerId })
//       .populate('vehicle', 'brand model images pricePerDay')
//       .populate('driver', 'name phone')
//       .sort({ createdAt: -1 });
    
//     return NextResponse.json({ success: true, bookings });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

//Path: app/api/bookings/route.js
// import { NextResponse } from 'next/server';
// import { connectDB } from '@/Src/lib/db';
// import Booking from '@/Src/models/Booking';
// import Vehicle from '@/Src/models/Vehicle';
// import User from '@/Src/models/User';
// import { sendBookingConfirmation } from '@/Src/services/email.service';

// export async function POST(request) {
//   try {
//     await connectDB();
//     console.log('✅ [DEBUG] Database connected');
    
//     const body = await request.json();
//     console.log('📦 [DEBUG] Received booking data:', JSON.stringify(body, null, 2));
    
//     // ========== 1. VALIDATE REQUIRED FIELDS ==========
//     if (!body.vehicleId || !body.customerId || !body.pickupDate || !body.returnDate) {
//       console.error('❌ [DEBUG] Missing required fields');
//       return NextResponse.json({
//         success: false,
//         error: 'Missing required fields: vehicleId, customerId, pickupDate, returnDate'
//       }, { status: 400 });
//     }
    
//     // ========== 2. CHECK IF VEHICLE EXISTS ==========
//     const vehicle = await Vehicle.findById(body.vehicleId);
//     if (!vehicle) {
//       console.error('❌ [DEBUG] Vehicle not found:', body.vehicleId);
//       return NextResponse.json({
//         success: false,
//         error: 'Vehicle not found'
//       }, { status: 404 });
//     }
//     console.log('✅ [DEBUG] Vehicle found:', vehicle.brand, vehicle.model);
    
//     // ========== 3. CHECK IF CUSTOMER EXISTS ==========
//     const customer = await User.findById(body.customerId);
//     if (!customer) {
//       console.error('❌ [DEBUG] Customer not found:', body.customerId);
//       return NextResponse.json({
//         success: false,
//         error: 'Customer not found'
//       }, { status: 404 });
//     }
//     console.log('✅ [DEBUG] Customer found:', customer.name);
    
//     // ========== 4. FIND AVAILABLE DRIVER (if with_driver) ==========
//     let assignedDriver = null;
//     let driverId = null;
    
//     if (body.bookingType === 'with_driver') {
//       assignedDriver = await User.findOne({
//         role: 'driver',
//         'driverDetails.isVerified': true,
//         'driverDetails.availability': true
//       }).select('_id name phone driverDetails');
      
//       if (assignedDriver) {
//         driverId = assignedDriver._id;
//         console.log(`✅ [DEBUG] Driver assigned: ${assignedDriver.name}`);
        
//         // Mark driver as busy
//         await User.findByIdAndUpdate(driverId, {
//           'driverDetails.availability': false
//         });
//       } else {
//         console.log('⚠️ [DEBUG] No drivers available');
//       }
//     }
    
//     // ========== 5. FIND AVAILABLE REP ==========
//     let assignedRep = null;
//     let repId = null;
    
//     const zone = body.pickupLocation?.includes('Gurugram') ? 'Gurugram' : 'Delhi';
    
//     assignedRep = await User.findOne({
//       role: 'rep',
//       'repDetails.isActive': true,
//       'repDetails.zone': zone
//     }).select('_id name phone repDetails');
    
//     if (!assignedRep) {
//       assignedRep = await User.findOne({
//         role: 'rep',
//         'repDetails.isActive': true
//       }).select('_id name phone repDetails');
//     }
    
//     if (assignedRep) {
//       repId = assignedRep._id;
//       console.log(`✅ [DEBUG] Representative assigned: ${assignedRep.name} (Zone: ${zone})`);
//     }
    
//     // ========== 6. GENERATE UNIQUE BOOKING ID ==========
//     const bookingId = `RE${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 1000)}`;
//     console.log('📝 [DEBUG] Generated Booking ID:', bookingId);
    
//     // ========== 7. CREATE BOOKING IN DATABASE ==========
//     const booking = new Booking({
//       bookingId: bookingId,
//       customer: body.customerId,
//       vehicle: body.vehicleId,
//       owner: body.ownerId,
//       bookingType: body.bookingType,
//       driver: driverId,
//       driverStatus: driverId ? 'accepted' : 'pending',
//       driverAssignedAt: driverId ? new Date() : null,
      
//       pickupDate: new Date(body.pickupDate),
//       returnDate: new Date(body.returnDate),
//       pickupLocation: body.pickupLocation,
//       returnLocation: body.returnLocation || body.pickupLocation,
//       deliveryAddress: body.deliveryAddress,
      
//       totalDays: body.totalDays,
//       baseAmount: body.baseAmount,
//       driverCharges: body.driverCharges || 0,
//       insuranceCharges: body.insuranceCharges || 200,
//       serviceFee: body.serviceFee || 100,
//       deliveryCharges: body.deliveryCharges || 0,
//       totalAmount: body.totalAmount,
//       securityDeposit: body.securityDeposit,
      
//       paymentMethod: body.paymentMethod,
//       paymentStatus: 'paid',
//       paymentId: `PAY${Date.now()}`,
//       paidAt: new Date(),
      
//       status: 'confirmed',
      
//       repActions: {
//         pickupFromOwner: {
//           status: repId ? 'pending' : 'pending',
//           repId: repId,
//           scheduledTime: new Date()
//         },
//         deliverToUser: { status: 'pending' },
//         collectFromUser: { status: 'pending' },
//         returnToOwner: { status: 'pending' }
//       },
      
//       customerDetails: body.customerDetails
//     });
    
//     await booking.save();
//     console.log('✅ [DEBUG] Booking saved to DATABASE!');
//     console.log('📊 [DEBUG] Booking ID:', booking._id);
//     console.log('💰 [DEBUG] Total Amount:', body.totalAmount);
    
//     // ========== 8. UPDATE VEHICLE AVAILABILITY ==========
//     await Vehicle.findByIdAndUpdate(body.vehicleId, { isAvailable: false });
//     console.log('✅ [DEBUG] Vehicle marked as unavailable');
    
//     // ========== 9. SEND EMAIL TO CUSTOMER ==========
//     let emailSent = false;
//     try {
//       emailSent = await sendBookingConfirmation({
//         email: body.customerDetails.email,
//         name: body.customerDetails.name,
//         bookingId: bookingId,
//         vehicle: `${body.vehicleDetails?.brand || vehicle.brand} ${body.vehicleDetails?.model || vehicle.model}`,
//         bookingType: body.bookingType === 'with_driver' ? 'With Professional Driver' : 'Self Drive',
//         driverName: assignedDriver?.name || 'Not applicable',
//         pickupDate: body.pickupDate,
//         returnDate: body.returnDate,
//         pickupLocation: body.pickupLocation,
//         totalAmount: body.totalAmount
//       });
      
//       if (emailSent) {
//         console.log('✅ [DEBUG] Email sent successfully to:', body.customerDetails.email);
//       } else {
//         console.log('⚠️ [DEBUG] Email sending failed');
//       }
//     } catch (emailError) {
//       console.error('❌ [DEBUG] Email error:', emailError);
//     }
    
//     return NextResponse.json({
//       success: true,
//       message: 'Booking confirmed successfully!',
//       booking: {
//         id: bookingId,
//         databaseId: booking._id,
//         totalAmount: body.totalAmount,
//         bookingType: body.bookingType,
//         driver: assignedDriver ? {
//           name: assignedDriver.name,
//           phone: assignedDriver.phone
//         } : null,
//         representative: assignedRep ? {
//           name: assignedRep.name,
//           phone: assignedRep.phone,
//           zone: zone
//         } : null,
//         emailSent: emailSent
//       }
//     });
    
//   } catch (error) {
//     console.error('❌ [DEBUG] Booking error:', error);
//     return NextResponse.json({
//       success: false,
//       error: error.message
//     }, { status: 500 });
//   }
// }

// // GET: Fetch customer's bookings from DATABASE
// export async function GET(request) {
//   try {
//     await connectDB();
//     console.log('✅ [DEBUG] Fetching bookings from database');
    
//     const { searchParams } = new URL(request.url);
//     const customerId = searchParams.get('customerId');
    
//     if (!customerId) {
//       return NextResponse.json({ error: 'Customer ID required' }, { status: 400 });
//     }
    
//     const bookings = await Booking.find({ customer: customerId })
//       .populate('vehicle', 'brand model images pricePerDay')
//       .populate('driver', 'name phone')
//       .sort({ createdAt: -1 });
    
//     console.log(`✅ [DEBUG] Found ${bookings.length} bookings for customer`);
    
//     return NextResponse.json({ 
//       success: true, 
//       count: bookings.length,
//       bookings 
//     });
//   } catch (error) {
//     console.error('❌ [DEBUG] GET bookings error:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { connectDB } from '@/Src/lib/db';
import Booking from '@/Src/models/Booking';
import Vehicle from '@/Src/models/Vehicle';
import User from '@/Src/models/User';
import Driver from '@/Src/models/Driver';  // ✅ Add this import
import { sendBookingConfirmation } from '@/Src/services/email.service';

export async function POST(request) {
  try {
    await connectDB();
    console.log('✅ [DEBUG] Database connected');
    
    const body = await request.json();
    console.log('📦 [DEBUG] Received booking data:', JSON.stringify(body, null, 2));
    
    // ========== 1. VALIDATE REQUIRED FIELDS ==========
    if (!body.vehicleId || !body.customerId || !body.pickupDate || !body.returnDate) {
      console.error('❌ [DEBUG] Missing required fields');
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: vehicleId, customerId, pickupDate, returnDate'
      }, { status: 400 });
    }
    
    // ========== 2. CHECK IF VEHICLE EXISTS ==========
    const vehicle = await Vehicle.findById(body.vehicleId);
    if (!vehicle) {
      console.error('❌ [DEBUG] Vehicle not found:', body.vehicleId);
      return NextResponse.json({
        success: false,
        error: 'Vehicle not found'
      }, { status: 404 });
    }
    console.log('✅ [DEBUG] Vehicle found:', vehicle.brand, vehicle.model);
    
    // ========== 3. CHECK IF CUSTOMER EXISTS ==========
    const customer = await User.findById(body.customerId);
    if (!customer) {
      console.error('❌ [DEBUG] Customer not found:', body.customerId);
      return NextResponse.json({
        success: false,
        error: 'Customer not found'
      }, { status: 404 });
    }
    console.log('✅ [DEBUG] Customer found:', customer.name);
    
    // ========== 4. FIND AVAILABLE DRIVER FROM DRIVER COLLECTION ==========
    let assignedDriver = null;
    let driverId = null;
    let driverUserId = null;
    let driverDetailsForEmail = null;
    
    if (body.bookingType === 'with_driver') {
      // ✅ Fetch from Driver collection (new table)
      const availableDriver = await Driver.findOne({
        isAvailable: true,
        isVerified: true,
        status: 'active',
        vehicleTypes: { $in: [vehicle.vehicleType] }  // Match vehicle type
      });
      
      if (availableDriver) {
        driverId = availableDriver._id;
        driverUserId = availableDriver.userId;
        driverDetailsForEmail = availableDriver;
        
        console.log(`✅ [DEBUG] Driver assigned from Driver collection: ${availableDriver.name}`);
        console.log(`📧 [DEBUG] Driver phone: ${availableDriver.phone}`);
        console.log(`📧 [DEBUG] Driver rating: ${availableDriver.rating}`);
        
        // Mark driver as busy
        await Driver.findByIdAndUpdate(availableDriver._id, {
          isAvailable: false,
          currentBookingId: null,  // Will be updated after booking creation
          updatedAt: new Date()
        });
      } else {
        console.log('⚠️ [DEBUG] No drivers available in Driver collection');
        return NextResponse.json({
          success: false,
          error: 'No drivers available at the moment. Please try self-drive option.'
        }, { status: 400 });
      }
    }
    
    // ========== 5. FIND AVAILABLE REP ==========
    let assignedRep = null;
    let repId = null;
    
    const zone = body.pickupLocation?.includes('Gurugram') ? 'Gurugram' : 'Delhi';
    
    assignedRep = await User.findOne({
      role: 'rep',
      'repDetails.isActive': true,
      'repDetails.zone': zone
    }).select('_id name phone repDetails');
    
    if (!assignedRep) {
      assignedRep = await User.findOne({
        role: 'rep',
        'repDetails.isActive': true
      }).select('_id name phone repDetails');
    }
    
    if (assignedRep) {
      repId = assignedRep._id;
      console.log(`✅ [DEBUG] Representative assigned: ${assignedRep.name} (Zone: ${zone})`);
    }
    
    // ========== 6. GENERATE UNIQUE BOOKING ID ==========
    const bookingId = `RE${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 1000)}`;
    console.log('📝 [DEBUG] Generated Booking ID:', bookingId);
    
    // ========== 7. CREATE BOOKING IN DATABASE ==========
    const booking = new Booking({
      bookingId: bookingId,
      customer: body.customerId,
      vehicle: body.vehicleId,
      owner: body.ownerId,
      bookingType: body.bookingType,
      driver: driverUserId,  // Store User ID reference
      driverStatus: driverId ? 'accepted' : 'pending',
      driverAssignedAt: driverId ? new Date() : null,
      
      pickupDate: new Date(body.pickupDate),
      returnDate: new Date(body.returnDate),
      pickupLocation: body.pickupLocation,
      returnLocation: body.returnLocation || body.pickupLocation,
      deliveryAddress: body.deliveryAddress,
      
      totalDays: body.totalDays,
      baseAmount: body.baseAmount,
      driverCharges: body.driverCharges || 0,
      insuranceCharges: body.insuranceCharges || 200,
      serviceFee: body.serviceFee || 100,
      deliveryCharges: body.deliveryCharges || 0,
      totalAmount: body.totalAmount,
      securityDeposit: body.securityDeposit,
      
      paymentMethod: body.paymentMethod,
      paymentStatus: 'paid',
      paymentId: `PAY${Date.now()}`,
      paidAt: new Date(),
      
      status: 'confirmed',
      
      repActions: {
        pickupFromOwner: {
          status: repId ? 'pending' : 'pending',
          repId: repId,
          scheduledTime: new Date()
        },
        deliverToUser: { status: 'pending' },
        collectFromUser: { status: 'pending' },
        returnToOwner: { status: 'pending' }
      },
      
      customerDetails: body.customerDetails
    });
    
    await booking.save();
    console.log('✅ [DEBUG] Booking saved to DATABASE!');
    console.log('📊 [DEBUG] Booking ID:', booking._id);
    console.log('💰 [DEBUG] Total Amount:', body.totalAmount);
    
    // ✅ Update driver's current booking ID
    if (driverId) {
      await Driver.findByIdAndUpdate(driverId, {
        currentBookingId: booking._id
      });
      console.log('✅ [DEBUG] Driver updated with current booking');
    }
    
    // ========== 8. UPDATE VEHICLE AVAILABILITY ==========
    await Vehicle.findByIdAndUpdate(body.vehicleId, { isAvailable: false });
    console.log('✅ [DEBUG] Vehicle marked as unavailable');
    
    // ========== 9. SEND EMAIL TO CUSTOMER WITH DRIVER DETAILS ==========
    let emailSent = false;
    try {
      emailSent = await sendBookingConfirmation({
        email: body.customerDetails.email,
        name: body.customerDetails.name,
        bookingId: bookingId,
        vehicle: `${body.vehicleDetails?.brand || vehicle.brand} ${body.vehicleDetails?.model || vehicle.model}`,
        bookingType: body.bookingType === 'with_driver' ? 'With Professional Driver' : 'Self Drive',
        driverName: driverDetailsForEmail?.name || 'Not applicable',
        driverPhone: driverDetailsForEmail?.phone || 'N/A',
        driverRating: driverDetailsForEmail?.rating || 'N/A',
        pickupDate: body.pickupDate,
        returnDate: body.returnDate,
        pickupLocation: body.pickupLocation,
        totalAmount: body.totalAmount,
        representativeName: assignedRep?.name || 'Will be assigned',
        representativePhone: assignedRep?.phone || 'N/A',
        representativeZone: zone,
        baseAmount: body.baseAmount,
        driverCharges: body.driverCharges || 0,
        insuranceCharges: body.insuranceCharges || 200,
        serviceFee: body.serviceFee || 100,
        securityDeposit: body.securityDeposit
      });
      
      if (emailSent) {
        console.log('✅ [DEBUG] Email sent successfully to:', body.customerDetails.email);
        console.log('✅ [DEBUG] Driver details included in email:', driverDetailsForEmail?.name);
      } else {
        console.log('⚠️ [DEBUG] Email sending failed');
      }
    } catch (emailError) {
      console.error('❌ [DEBUG] Email error:', emailError);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Booking confirmed successfully!',
      booking: {
        id: bookingId,
        databaseId: booking._id,
        totalAmount: body.totalAmount,
        bookingType: body.bookingType,
        driver: driverDetailsForEmail ? {
          id: driverDetailsForEmail._id,
          name: driverDetailsForEmail.name,
          phone: driverDetailsForEmail.phone,
          rating: driverDetailsForEmail.rating
        } : null,
        representative: assignedRep ? {
          name: assignedRep.name,
          phone: assignedRep.phone,
          zone: zone
        } : null,
        emailSent: emailSent
      }
    });
    
  } catch (error) {
    console.error('❌ [DEBUG] Booking error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// GET: Fetch customer's bookings from DATABASE
export async function GET(request) {
  try {
    await connectDB();
    console.log('✅ [DEBUG] Fetching bookings from database');
    
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    
    if (!customerId) {
      return NextResponse.json({ error: 'Customer ID required' }, { status: 400 });
    }
    
    const bookings = await Booking.find({ customer: customerId })
      .populate('vehicle', 'brand model images pricePerDay')
      .populate('driver', 'name phone email')  // ✅ Populate from User (driver's User account)
      .sort({ createdAt: -1 });
    
    console.log(`✅ [DEBUG] Found ${bookings.length} bookings for customer`);
    
    return NextResponse.json({ 
      success: true, 
      count: bookings.length,
      bookings 
    });
  } catch (error) {
    console.error('❌ [DEBUG] GET bookings error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}