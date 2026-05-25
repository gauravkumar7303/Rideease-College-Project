//Path: Src/services/email.service.js
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export class EmailService {
//   // Send OTP email
//   static async sendOTP(email, otp) {
//     try {
//       console.log('📧 Sending OTP to:', email);
      
//       const { data, error } = await resend.emails.send({
//         from: 'onboarding@resend.dev',
//         to: [email],
//         subject: 'Your RideEase Verification Code',
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//             <h1 style="color: #3b82f6; text-align: center;">RideEase Verification</h1>
//             <p style="font-size: 16px;">Hello!</p>
//             <p style="font-size: 16px;">Your verification code is:</p>
//             <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
//               <h2 style="color: #3b82f6; margin: 0; font-size: 36px; letter-spacing: 10px;">${otp}</h2>
//             </div>
//             <p style="font-size: 14px; color: #6b7280;">This code will expire in 10 minutes.</p>
//             <p style="font-size: 14px; color: #6b7280;">If you didn't request this code, please ignore this email.</p>
//             <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
//             <p style="font-size: 14px; color: #6b7280; text-align: center;">Best regards,<br>RideEase Team</p>
//           </div>
//         `,
//       });

//       if (error) {
//         console.error('❌ Email error:', error);
//         if (process.env.NODE_ENV === 'development') {
//           console.log(`[DEV] OTP for ${email}: ${otp}`);
//           return true;
//         }
//         throw error;
//       }

//       console.log('✅ Email sent! ID:', data?.id);
//       return true;
      
//     } catch (error) {
//       console.error('💥 Email service error:', error);
//       return false;
//     }
//   }

//   // Send welcome email
//   static async sendWelcomeEmail(email, name) {
//     try {
//       const { data, error } = await resend.emails.send({
//         from: 'onboarding@resend.dev',
//         to: [email],
//         subject: `Welcome to RideEase, ${name}! 🎉`,
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//             <h1 style="color: #3b82f6; text-align: center;">Welcome to RideEase, ${name}! 🚗</h1>
//             <p style="font-size: 16px;">Your email has been successfully verified!</p>
//             <p style="font-size: 16px;">Start exploring rides and book your first vehicle today.</p>
//             <div style="text-align: center; margin: 30px 0;">
//               <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Start Riding</a>
//             </div>
//             <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
//             <p style="font-size: 14px; color: #6b7280; text-align: center;">Best regards,<br>RideEase Team</p>
//           </div>
//         `,
//       });

//       if (error) {
//         console.error('Welcome email error:', error);
//         return false;
//       }
      
//       console.log('✅ Welcome email sent to:', email);
//       return true;
      
//     } catch (error) {
//       console.error('Welcome email failed:', error);
//       return false;
//     }
//   }

//   // ✅ NEW: Send booking confirmation email (Sirf customer ko)
//   static async sendBookingConfirmation(bookingDetails) {
//     try {
//       const { email, name, bookingId, vehicle, bookingType, driverName, pickupDate, returnDate, pickupLocation, totalAmount } = bookingDetails;
      
//       console.log('📧 Sending booking confirmation to:', email);
      
//       const { data, error } = await resend.emails.send({
//         from: 'onboarding@resend.dev',
//         to: [email],
//         subject: `🎉 Booking Confirmed! Your RideEase Booking #${bookingId}`,
//         html: `
//           <!DOCTYPE html>
//           <html>
//           <head>
//             <style>
//               body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//               .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//               .header { background: linear-gradient(135deg, #2563eb, #1e40af); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
//               .header h1 { color: white; margin: 0; }
//               .header p { color: #bfdbfe; margin-top: 10px; }
//               .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
//               .details { background: white; padding: 20px; border-radius: 12px; margin: 20px 0; }
//               .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
//               .detail-row:last-child { border-bottom: none; }
//               .success-badge { background: #dcfce7; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
//               .success-badge p { color: #166534; margin: 0; font-weight: bold; }
//               .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
//               .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <div class="header">
//                 <h1>🚗 RideEase</h1>
//                 <p>Your Journey Begins Here!</p>
//               </div>
              
//               <div class="content">
//                 <h2>Hello ${name}! 👋</h2>
//                 <p>Your booking has been <strong>confirmed successfully</strong>. Get ready for an amazing ride!</p>
                
//                 <div class="details">
//                   <h3 style="margin-top: 0;">📋 Booking Details</h3>
//                   <div class="detail-row">
//                     <span>Booking ID:</span>
//                     <strong>${bookingId}</strong>
//                   </div>
//                   <div class="detail-row">
//                     <span>Vehicle:</span>
//                     <strong>${vehicle}</strong>
//                   </div>
//                   <div class="detail-row">
//                     <span>Booking Type:</span>
//                     <strong>${bookingType}</strong>
//                   </div>
//                   ${driverName && driverName !== 'Not applicable' ? `
//                   <div class="detail-row">
//                     <span>Driver Assigned:</span>
//                     <strong>${driverName}</strong>
//                   </div>
//                   ` : ''}
//                   <div class="detail-row">
//                     <span>Pickup Location:</span>
//                     <strong>${pickupLocation}</strong>
//                   </div>
//                   <div class="detail-row">
//                     <span>Pickup Date:</span>
//                     <strong>${new Date(pickupDate).toLocaleString()}</strong>
//                   </div>
//                   <div class="detail-row">
//                     <span>Return Date:</span>
//                     <strong>${new Date(returnDate).toLocaleString()}</strong>
//                   </div>
//                   <div class="detail-row">
//                     <span>Total Amount:</span>
//                     <strong style="color: #2563eb; font-size: 18px;">₹${totalAmount}</strong>
//                   </div>
//                 </div>
                
//                 <div class="success-badge">
//                   <p>✅ Payment Successful</p>
//                   <p style="font-size: 12px; margin-top: 5px;">Your security deposit is secured</p>
//                 </div>
                
//                 <div style="text-align: center; margin: 30px 0;">
//                   <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile?tab=bookings" class="button">View My Bookings</a>
//                 </div>
//               </div>
              
//               <div class="footer">
//                 <p>Need help? Contact us at support@rideease.com</p>
//                 <p>🚀 Happy Riding!</p>
//                 <p><strong>Team RideEase</strong></p>
//               </div>
//             </div>
//           </body>
//           </html>
//         `
//       });

//       if (error) {
//         console.error('Booking email error:', error);
//         return false;
//       }
      
//       console.log('✅ Booking confirmation email sent to:', email);
//       return true;
      
//     } catch (error) {
//       console.error('Booking email failed:', error);
//       return false;
//     }
//   }
// }



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
  static async sendBookingConfirmation(bookingDetails) {
    try {
      const { email, name, bookingId, vehicle, bookingType, driverName, pickupDate, returnDate, pickupLocation, totalAmount } = bookingDetails;
      
      console.log('📧 [DEBUG] ========== BOOKING EMAIL DEBUG ==========');
      console.log('📧 [DEBUG] To Email:', email);
      console.log('📧 [DEBUG] Customer Name:', name);
      console.log('📧 [DEBUG] Booking ID:', bookingId);
      console.log('📧 [DEBUG] Vehicle:', vehicle);
      console.log('📧 [DEBUG] Total Amount:', totalAmount);
      console.log('📧 [DEBUG] ==========================================');
      
      // Validate email
      if (!email || !email.includes('@')) {
        console.error('❌ [DEBUG] Invalid email address:', email);
        return false;
      }
      
      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: `🎉 Booking Confirmed! Your RideEase Booking #${bookingId}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2563eb, #1e40af); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
              .header h1 { color: white; margin: 0; }
              .header p { color: #bfdbfe; margin-top: 10px; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
              .details { background: white; padding: 20px; border-radius: 12px; margin: 20px 0; }
              .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
              .detail-row:last-child { border-bottom: none; }
              .total-amount { background: #dcfce7; padding: 15px; border-radius: 8px; text-align: center; margin: 15px 0; }
              .total-amount span { color: #166534; font-size: 24px; font-weight: bold; }
              .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
              .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🚗 RideEase</h1>
                <p>Your Journey Begins Here!</p>
              </div>
              
              <div class="content">
                <h2>Hello ${name}! 👋</h2>
                <p>Your booking has been <strong>confirmed successfully</strong>. Get ready for an amazing ride!</p>
                
                <div class="details">
                  <h3 style="margin-top: 0;">📋 Booking Details</h3>
                  <div class="detail-row">
                    <span>Booking ID:</span>
                    <strong>${bookingId}</strong>
                  </div>
                  <div class="detail-row">
                    <span>Vehicle:</span>
                    <strong>${vehicle}</strong>
                  </div>
                  <div class="detail-row">
                    <span>Booking Type:</span>
                    <strong>${bookingType}</strong>
                  </div>
                  ${driverName && driverName !== 'Not applicable' ? `
                  <div class="detail-row">
                    <span>Driver Assigned:</span>
                    <strong>${driverName}</strong>
                  </div>
                  ` : ''}
                  <div class="detail-row">
                    <span>Pickup Location:</span>
                    <strong>${pickupLocation}</strong>
                  </div>
                  <div class="detail-row">
                    <span>Pickup Date:</span>
                    <strong>${new Date(pickupDate).toLocaleString()}</strong>
                  </div>
                  <div class="detail-row">
                    <span>Return Date:</span>
                    <strong>${new Date(returnDate).toLocaleString()}</strong>
                  </div>
                </div>
                
                <div class="total-amount">
                  <p style="margin: 0; color: #166534; font-weight: bold;">💰 Total Amount Paid</p>
                  <span>₹${totalAmount}</span>
                </div>
                
                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #92400e;">⚠️ <strong>Important:</strong> Please carry your driving license and a valid ID proof at the time of pickup.</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile?tab=bookings" class="button">View My Bookings</a>
                </div>
              </div>
              
              <div class="footer">
                <p>Need help? Contact us at support@rideease.com</p>
                <p>🚀 Happy Riding!</p>
                <p><strong>Team RideEase</strong></p>
              </div>
            </div>
          </body>
          </html>
        `
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
}

// ✅ IMPORTANT: Named export for use in API routes
export async function sendBookingConfirmation(bookingDetails) {
  return EmailService.sendBookingConfirmation(bookingDetails);
}