
// Path: app/api/vehicles/create/route.js
// FIXED: Direct Resend call — no service layer dependency

import { NextResponse } from 'next/server';
import { connectDB } from '@/Src/lib/db';
import Vehicle from '@/Src/models/Vehicle';
import User from '@/Src/models/User';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Listing notification always goes to this admin email
const ADMIN_EMAIL = 'gaurav.k7303@gmail.com';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    console.log('📦 [VEHICLE CREATE] Owner ID:', body.owner);

    // STEP 1: Fetch owner
    const owner = await User.findById(body.owner);
    if (!owner) {
      console.log('❌ Owner not found:', body.owner);
      return NextResponse.json({
        success: false,
        error: 'Owner not found. Please login again.',
      }, { status: 404 });
    }

    console.log('✅ Owner found:', owner.name, owner.email);

    // STEP 2: Check duplicate registration
    const existingVehicle = await Vehicle.findOne({
      registrationNumber: body.registrationNumber,
    });
    if (existingVehicle) {
      return NextResponse.json({
        success: false,
        error: 'Vehicle with this registration number already exists',
      }, { status: 409 });
    }

    // STEP 3: Create vehicle
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
      description: body.description || '',
    });

    await vehicle.save();
    console.log('✅ Vehicle saved:', vehicle._id);

    // STEP 4: Send emails via Resend directly
    const vehicleName = `${body.brand} ${body.model}`;
    const vehicleYear = body.year || '';
    const pricePerDay = body.pricePerDay || 'N/A';
    const location = body.location || 'N/A';
    const regNo = body.registrationNumber || 'N/A';
    const vehicleType = body.vehicleType || 'vehicle';

    // ── Email 1: Admin/Gaurav ko notification ──
    try {
      await resend.emails.send({
        from: 'RideEase Listings <onboarding@resend.dev>',
        to: ADMIN_EMAIL,
        subject: `🚗 New Vehicle Listed: ${vehicleName}`,
        html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff">
  <div style="background:#1d4ed8;padding:24px;border-radius:12px 12px 0 0">
    <h1 style="color:white;margin:0;font-size:20px">🚗 New Vehicle Listed on RideEase</h1>
  </div>
  <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
    <p style="color:#374151;margin-top:0">A new vehicle has been submitted for listing. Details below:</p>
    
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr style="background:#f9fafb">
        <td style="padding:10px 12px;color:#6b7280;width:40%">Vehicle</td>
        <td style="padding:10px 12px;font-weight:bold;color:#111827">${vehicleName} ${vehicleYear}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;color:#6b7280">Type</td>
        <td style="padding:10px 12px;font-weight:bold;color:#111827;text-transform:capitalize">${vehicleType}</td>
      </tr>
      <tr style="background:#f9fafb">
        <td style="padding:10px 12px;color:#6b7280">Registration No.</td>
        <td style="padding:10px 12px;font-weight:bold;color:#111827">${regNo}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;color:#6b7280">Location</td>
        <td style="padding:10px 12px;font-weight:bold;color:#111827">${location}</td>
      </tr>
      <tr style="background:#f9fafb">
        <td style="padding:10px 12px;color:#6b7280">Price/Day</td>
        <td style="padding:10px 12px;font-weight:bold;color:#1d4ed8;font-size:16px">₹${pricePerDay}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;color:#6b7280">Fuel Type</td>
        <td style="padding:10px 12px;font-weight:bold;color:#111827;text-transform:capitalize">${body.fuelType || 'N/A'}</td>
      </tr>
      <tr style="background:#f9fafb">
        <td style="padding:10px 12px;color:#6b7280">Transmission</td>
        <td style="padding:10px 12px;font-weight:bold;color:#111827;text-transform:capitalize">${body.transmission || 'N/A'}</td>
      </tr>
    </table>

    <div style="margin-top:20px;padding:16px;background:#f0f9ff;border-left:4px solid #1d4ed8;border-radius:4px">
      <p style="margin:0;color:#1e40af;font-size:14px"><strong>Owner Details</strong></p>
      <p style="margin:4px 0 0;color:#374151;font-size:14px">
        👤 ${owner.name}<br/>
        📧 ${owner.email}<br/>
        📱 ${owner.phone || 'N/A'}
      </p>
    </div>

    <div style="margin-top:20px;padding:16px;background:#fef9c3;border-left:4px solid #eab308;border-radius:4px">
      <p style="margin:0;color:#854d0e;font-size:13px">
        ⏳ <strong>Action Required:</strong> Vehicle is pending verification. 
        Please inspect and approve/reject from admin panel.
      </p>
    </div>

    <p style="color:#9ca3af;font-size:12px;margin-top:24px">
      Vehicle ID: ${vehicle._id}<br/>
      Listed at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
    </p>
  </div>
</div>`,
      });
      console.log('✅ Admin notification sent to', ADMIN_EMAIL);
    } catch (adminEmailErr) {
      console.error('❌ Admin email failed:', adminEmailErr.message);
    }

    // ── Email 2: Owner ko confirmation ──
    if (owner.email) {
      try {
        await resend.emails.send({
          from: 'RideEase <onboarding@resend.dev>',
          to: owner.email,
          subject: `✅ Your ${vehicleName} has been listed on RideEase!`,
          html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff">
  <div style="background:#059669;padding:24px;border-radius:12px 12px 0 0">
    <h1 style="color:white;margin:0;font-size:20px">✅ Vehicle Listed Successfully!</h1>
  </div>
  <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
    <p style="color:#374151;margin-top:0">Hi <strong>${owner.name}</strong>,</p>
    <p style="color:#374151">Your vehicle has been submitted for listing on RideEase. Here's a summary:</p>

    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:16px 0">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr>
          <td style="padding:6px 0;color:#6b7280">Vehicle</td>
          <td style="padding:6px 0;font-weight:bold;color:#111827">${vehicleName} ${vehicleYear}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280">Registration</td>
          <td style="padding:6px 0;font-weight:bold;color:#111827">${regNo}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280">Location</td>
          <td style="padding:6px 0;font-weight:bold;color:#111827">${location}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280">Daily Rate</td>
          <td style="padding:6px 0;font-weight:bold;color:#059669;font-size:16px">₹${pricePerDay}/day</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280">Status</td>
          <td style="padding:6px 0">
            <span style="background:#fef3c7;color:#92400e;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:bold">
              ⏳ Pending Verification
            </span>
          </td>
        </tr>
      </table>
    </div>

    <div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:12px;border-radius:4px;margin:16px 0">
      <p style="margin:0;color:#1e40af;font-size:13px">
        📋 <strong>What happens next?</strong><br/>
        Our team will physically inspect your vehicle within 24-48 hours.
        You'll receive another email once it's verified and live for renters to book.
      </p>
    </div>

    <p style="color:#6b7280;font-size:12px;margin-top:20px">— Team RideEase | support@rideease.com</p>
  </div>
</div>`,
        });
        console.log('✅ Owner confirmation sent to', owner.email);
      } catch (ownerEmailErr) {
        console.error('❌ Owner email failed:', ownerEmailErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Vehicle listed successfully! Verification pending.',
      vehicle: {
        _id: vehicle._id,
        brand: vehicle.brand,
        model: vehicle.model,
        registrationNumber: vehicle.registrationNumber,
        ownerEmail: owner.email,
        adminNotified: true,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('❌ [VEHICLE CREATE] Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}