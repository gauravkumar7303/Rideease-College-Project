//Path: Src/services/email.service.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  // Send OTP email
  static async sendOTP(email, otp) {
    try {
      console.log('📧 [DEBUG] Sending OTP to:', email);
      console.log('📧 [DEBUG] OTP Code:', otp);

      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: 'Your RideEase Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #3b82f6; text-align: center;">RideEase Verification</h1>
            <p style="font-size: 16px;">Hello!</p>
            <p style="font-size: 16px;">Your verification code is:</p>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
              <h2 style="color: #3b82f6; margin: 0; font-size: 36px; letter-spacing: 10px;">${otp}</h2>
            </div>
            <p style="font-size: 14px; color: #6b7280;">This code will expire in 10 minutes.</p>
            <p style="font-size: 14px; color: #6b7280;">If you didn't request this code, please ignore this email.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
            <p style="font-size: 14px; color: #6b7280; text-align: center;">Best regards,<br>RideEase Team</p>
          </div>
        `,
      });

      if (error) {
        console.error('❌ [DEBUG] Resend error:', error);
        if (process.env.NODE_ENV === 'development') {
          console.log(`📧 [DEV MODE] OTP for ${email}: ${otp}`);
          return true;
        }
        return false;
      }

      console.log('✅ [DEBUG] OTP email sent! ID:', data?.id);
      return true;

    } catch (error) {
      console.error('💥 [DEBUG] Email service error:', error);
      return false;
    }
  }

  // Send welcome email
  static async sendWelcomeEmail(email, name) {
    try {
      console.log('📧 [DEBUG] Sending welcome email to:', email);

      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: `Welcome to RideEase, ${name}! 🎉`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #3b82f6; text-align: center;">Welcome to RideEase, ${name}! 🚗</h1>
            <p style="font-size: 16px;">Your email has been successfully verified!</p>
            <p style="font-size: 16px;">Start exploring rides and book your first vehicle today.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Start Riding</a>
            </div>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
            <p style="font-size: 14px; color: #6b7280; text-align: center;">Best regards,<br>RideEase Team</p>
          </div>
        `,
      });

      if (error) {
        console.error('❌ [DEBUG] Welcome email error:', error);
        return false;
      }

      console.log('✅ [DEBUG] Welcome email sent! ID:', data?.id);
      return true;

    } catch (error) {
      console.error('💥 [DEBUG] Welcome email failed:', error);
      return false;
    }
  }

  // Send booking confirmation email (Sirf customer ko)
  // static async sendBookingConfirmation(bookingDetails) {
  //   try {
  //     const { email, name, bookingId, vehicle, bookingType, driverName, pickupDate, returnDate, pickupLocation, totalAmount } = bookingDetails;

  //     console.log('📧 [DEBUG] ========== BOOKING EMAIL DEBUG ==========');
  //     console.log('📧 [DEBUG] To Email:', email);
  //     console.log('📧 [DEBUG] Customer Name:', name);
  //     console.log('📧 [DEBUG] Booking ID:', bookingId);
  //     console.log('📧 [DEBUG] Vehicle:', vehicle);
  //     console.log('📧 [DEBUG] Total Amount:', totalAmount);
  //     console.log('📧 [DEBUG] ==========================================');

  //     // Validate email
  //     if (!email || !email.includes('@')) {
  //       console.error('❌ [DEBUG] Invalid email address:', email);
  //       return false;
  //     }

  //     const { data, error } = await resend.emails.send({
  //       from: 'onboarding@resend.dev',
  //       to: [email],
  //       subject: `🎉 Booking Confirmed! Your RideEase Booking #${bookingId}`,
  //       html: `
  //         <!DOCTYPE html>
  //         <html>
  //         <head>
  //           <style>
  //             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  //             .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  //             .header { background: linear-gradient(135deg, #2563eb, #1e40af); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
  //             .header h1 { color: white; margin: 0; }
  //             .header p { color: #bfdbfe; margin-top: 10px; }
  //             .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
  //             .details { background: white; padding: 20px; border-radius: 12px; margin: 20px 0; }
  //             .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
  //             .detail-row:last-child { border-bottom: none; }
  //             .total-amount { background: #dcfce7; padding: 15px; border-radius: 8px; text-align: center; margin: 15px 0; }
  //             .total-amount span { color: #166534; font-size: 24px; font-weight: bold; }
  //             .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
  //             .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; }
  //           </style>
  //         </head>
  //         <body>
  //           <div class="container">
  //             <div class="header">
  //               <h1>🚗 RideEase</h1>
  //               <p>Your Journey Begins Here!</p>
  //             </div>
              
  //             <div class="content">
  //               <h2>Hello ${name}! 👋</h2>
  //               <p>Your booking has been <strong>confirmed successfully</strong>. Get ready for an amazing ride!</p>
                
  //               <div class="details">
  //                 <h3 style="margin-top: 0;">📋 Booking Details</h3>
  //                 <div class="detail-row">
  //                   <span>Booking ID:</span>
  //                   <strong>${bookingId}</strong>
  //                 </div>
  //                 <div class="detail-row">
  //                   <span>Vehicle:</span>
  //                   <strong>${vehicle}</strong>
  //                 </div>
  //                 <div class="detail-row">
  //                   <span>Booking Type:</span>
  //                   <strong>${bookingType}</strong>
  //                 </div>
  //                 ${driverName && driverName !== 'Not applicable' ? `
  //                 <div class="detail-row">
  //                   <span>Driver Assigned:</span>
  //                   <strong>${driverName}</strong>
  //                 </div>
  //                 ` : ''}
  //                 <div class="detail-row">
  //                   <span>Pickup Location:</span>
  //                   <strong>${pickupLocation}</strong>
  //                 </div>
  //                 <div class="detail-row">
  //                   <span>Pickup Date:</span>
  //                   <strong>${new Date(pickupDate).toLocaleString()}</strong>
  //                 </div>
  //                 <div class="detail-row">
  //                   <span>Return Date:</span>
  //                   <strong>${new Date(returnDate).toLocaleString()}</strong>
  //                 </div>
  //               </div>
                
  //               <div class="total-amount">
  //                 <p style="margin: 0; color: #166534; font-weight: bold;">💰 Total Amount Paid</p>
  //                 <span>₹${totalAmount}</span>
  //               </div>
                
  //               <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
  //                 <p style="margin: 0; color: #92400e;">⚠️ <strong>Important:</strong> Please carry your driving license and a valid ID proof at the time of pickup.</p>
  //               </div>
                
  //               <div style="text-align: center; margin: 30px 0;">
  //                 <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile?tab=bookings" class="button">View My Bookings</a>
  //               </div>
  //             </div>
              
  //             <div class="footer">
  //               <p>Need help? Contact us at support@rideease.com</p>
  //               <p>🚀 Happy Riding!</p>
  //               <p><strong>Team RideEase</strong></p>
  //             </div>
  //           </div>
  //         </body>
  //         </html>
  //       `
  //     });

  //     if (error) {
  //       console.error('❌ [DEBUG] Resend API Error:', error);
  //       return false;
  //     }

  //     console.log('✅ [DEBUG] Booking confirmation email sent!');
  //     console.log('📧 [DEBUG] Email ID:', data?.id);
  //     return true;

  //   } catch (error) {
  //     console.error('💥 [DEBUG] Booking email exception:', error);
  //     return false;
  //   }
  // }


  static async sendBookingConfirmation(bookingDetails) {
  try {
    const { 
      email, name, bookingId, vehicle, bookingType, 
      driverName, driverPhone, driverRating, pickupDate, returnDate, 
      pickupLocation, totalAmount, representativeName, 
      representativePhone, representativeZone, baseAmount,
      driverCharges, insuranceCharges, serviceFee, securityDeposit
    } = bookingDetails;
    
    console.log('📧 [DEBUG] ========== BOOKING EMAIL DEBUG ==========');
    console.log('📧 [DEBUG] To Email:', email);
    console.log('📧 [DEBUG] Driver Name:', driverName);
    console.log('📧 [DEBUG] Driver Phone:', driverPhone);
    console.log('📧 [DEBUG] Rep Name:', representativeName);
    console.log('📧 [DEBUG] Rep Phone:', representativePhone);
    console.log('📧 [DEBUG] ==========================================');
    
    // Calculate breakdown
    const subtotal = baseAmount || 0;
    const driverFee = driverCharges || 0;
    const insurance = insuranceCharges || 200;
    const service = serviceFee || 100;
    const deposit = securityDeposit || 5000;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #1e40af); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; }
          .header p { color: #bfdbfe; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
          .details { background: white; padding: 20px; border-radius: 12px; margin: 20px 0; }
          .driver-card { background: #dbeafe; padding: 15px; border-radius: 12px; margin: 15px 0; border-left: 4px solid #2563eb; }
          .rep-card { background: #dcfce7; padding: 15px; border-radius: 12px; margin: 15px 0; border-left: 4px solid #22c55e; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
          .total-row { background: #dcfce7; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .total-row span { color: #166534; font-size: 24px; font-weight: bold; }
          .breakdown { background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚗 RideEase</h1>
            <p>Booking Confirmed!</p>
          </div>
          
          <div class="content">
            <h2>Hello ${name}! 👋</h2>
            <p>Your booking has been <strong>confirmed successfully</strong>.</p>
            
            ${driverName && driverName !== 'Not applicable' ? `
            <!-- Driver Details -->
            <div class="driver-card">
              <h3 style="margin-top: 0; color: #1e40af;">👨‍✈️ Your Driver</h3>
              <div class="detail-row"><span>Name:</span><strong>${driverName}</strong></div>
              <div class="detail-row"><span>Phone:</span><strong>${driverPhone || 'N/A'}</strong></div>
              <div class="detail-row"><span>Rating:</span><strong>⭐ ${driverRating || '5.0'}</strong></div>
              <p style="margin-top: 10px; font-size: 14px; color: #475569;">Your driver will contact you before pickup.</p>
            </div>
            ` : ''}
            
            <!-- Representative Details -->
            <div class="rep-card">
              <h3 style="margin-top: 0; color: #166534;">👔 Your Service Representative</h3>
              <div class="detail-row"><span>Name:</span><strong>${representativeName || 'Will be assigned'}</strong></div>
              <div class="detail-row"><span>Phone:</span><strong>${representativePhone || 'N/A'}</strong></div>
              <div class="detail-row"><span>Zone:</span><strong>${representativeZone || 'Delhi'}</strong></div>
              <p style="margin-top: 10px; font-size: 14px; color: #475569;">This representative will handle vehicle pickup and delivery.</p>
            </div>
            
            <div class="details">
              <h3 style="margin-top: 0;">📋 Booking Details</h3>
              <div class="detail-row"><span>Booking ID:</span><strong>${bookingId}</strong></div>
              <div class="detail-row"><span>Vehicle:</span><strong>${vehicle}</strong></div>
              <div class="detail-row"><span>Booking Type:</span><strong>${bookingType}</strong></div>
              <div class="detail-row"><span>Pickup Location:</span><strong>${pickupLocation}</strong></div>
              <div class="detail-row"><span>Pickup Date:</span><strong>${new Date(pickupDate).toLocaleString()}</strong></div>
              <div class="detail-row"><span>Return Date:</span><strong>${new Date(returnDate).toLocaleString()}</strong></div>
            </div>
            
            <!-- Price Breakdown -->
            <div class="breakdown">
              <h3 style="margin-top: 0;">💰 Price Breakdown</h3>
              <div class="detail-row"><span>Base Rental:</span><strong>₹${subtotal}</strong></div>
              ${driverFee > 0 ? `<div class="detail-row"><span>Driver Charges:</span><strong>₹${driverFee}</strong></div>` : ''}
              <div class="detail-row"><span>Insurance:</span><strong>₹${insurance}</strong></div>
              <div class="detail-row"><span>Service Fee:</span><strong>₹${service}</strong></div>
              <div class="detail-row"><span style="color: #dc2626;">Security Deposit (Refundable):</span><strong style="color: #dc2626;">₹${deposit}</strong></div>
            </div>
            
            <div class="total-row">
              <div class="detail-row" style="border-bottom: none;">
                <span><strong>Total Amount Paid:</strong></span>
                <strong style="color: #2563eb; font-size: 20px;">₹${totalAmount}</strong>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #64748b;">Security deposit will be refunded after vehicle return</p>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;">⚠️ <strong>Important:</strong> Please carry your driving license and ID proof at pickup.</p>
              ${representativePhone ? `<p style="margin: 10px 0 0 0; color: #92400e;">📞 Contact your representative at ${representativePhone} for pickup/delivery</p>` : ''}
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile?tab=bookings" class="button">View My Bookings</a>
            </div>
          </div>
          
          <div class="footer" style="text-align: center; padding: 20px; color: #64748b;">
            <p>Need help? Call us at +91-9999999999</p>
            <p>🚀 Happy Riding!<br><strong>Team RideEase</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: `🎉 Booking Confirmed! Your RideEase Booking #${bookingId}`,
      html: emailHtml
    });
    
    if (error) {
      console.error('❌ [DEBUG] Resend API Error:', error);
      return false;
    }
    
    console.log('✅ [DEBUG] Booking confirmation email sent!');
    console.log('📧 [DEBUG] Email ID:', data?.id);
    return true;
    
  } catch (error) {
    console.error('💥 [DEBUG] Booking email exception:', error);
    return false;
  }
}
  // Add this method to EmailService class
  static async sendVehicleListingEmail({ email, name, vehicleName, registrationNumber, vehicleId }) {
    try {
      console.log('📧 Sending vehicle listing email to owner:', email);

      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: `✅ Vehicle Listed Successfully - ${vehicleName}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0;">RideEase</h1>
            <p style="color: #bfdbfe;">Vehicle Listed Successfully</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px;">
            <h2>Hello ${name}! 👋</h2>
            <p>Your vehicle <strong>${vehicleName}</strong> has been successfully listed on RideEase.</p>
            
            <div style="background: white; padding: 20px; border-radius: 12px; margin: 20px 0;">
              <h3 style="margin-top: 0;">📋 Vehicle Details</h3>
              <p><strong>Vehicle:</strong> ${vehicleName}</p>
              <p><strong>Registration Number:</strong> ${registrationNumber}</p>
              <p><strong>Status:</strong> <span style="color: #eab308;">Pending Verification</span></p>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;">🔍 Our team will verify your vehicle within 24 hours.</p>
              <p style="margin: 10px 0 0 0; color: #92400e;">You will receive an email once verified.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile?tab=vehicles" class="button" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">View My Vehicles</a>
            </div>
            
            <p style="font-size: 14px; color: #6b7280;">Thank you for choosing RideEase!</p>
            <p><strong>Team RideEase</strong></p>
          </div>
        </div>
      `
      });

      if (error) throw error;
      console.log('✅ Vehicle listing email sent!');
      return true;
    } catch (error) {
      console.error('Vehicle listing email error:', error);
      return false;
    }
  }
}



// ✅ IMPORTANT: Named export for use in API routes
export async function sendBookingConfirmation(bookingDetails) {
  return EmailService.sendBookingConfirmation(bookingDetails);
}