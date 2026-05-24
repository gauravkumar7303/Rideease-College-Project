// // Src/services/email.service.js - SIMPLE WORKING VERSION
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
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <h1 style="color: #3b82f6;">RideEase Verification</h1>
//             <p>Hello!</p>
//             <p>Your verification code is:</p>
//             <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
//               <h2 style="color: #3b82f6; margin: 0; font-size: 32px; letter-spacing: 5px;">${otp}</h2>
//             </div>
//             <p>This code will expire in 10 minutes.</p>
//             <p>If you didn't request this code, please ignore this email.</p>
//             <p>Best regards,<br>RideEase Team</p>
//           </div>
//         `,
//       });

//       if (error) {
//         console.error('❌ Email error:', error);
//         // For development, log and continue
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
//       // Don't crash the app if email fails
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
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <h1 style="color: #3b82f6;">Welcome to RideEase, ${name}! 🚗</h1>
//             <p>Your email has been successfully verified!</p>
//             <p>Start exploring rides and book your first vehicle today.</p>
//             <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Start Riding</a>
//             <p>Best regards,<br>RideEase Team</p>
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
// }

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  // Send OTP email
  static async sendOTP(email, otp) {
    try {
      console.log('📧 Sending OTP to:', email);
      
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
        console.error('❌ Email error:', error);
        if (process.env.NODE_ENV === 'development') {
          console.log(`[DEV] OTP for ${email}: ${otp}`);
          return true;
        }
        throw error;
      }

      console.log('✅ Email sent! ID:', data?.id);
      return true;
      
    } catch (error) {
      console.error('💥 Email service error:', error);
      return false;
    }
  }

  // Send welcome email
  static async sendWelcomeEmail(email, name) {
    try {
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
              <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Start Riding</a>
            </div>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
            <p style="font-size: 14px; color: #6b7280; text-align: center;">Best regards,<br>RideEase Team</p>
          </div>
        `,
      });

      if (error) {
        console.error('Welcome email error:', error);
        return false;
      }
      
      console.log('✅ Welcome email sent to:', email);
      return true;
      
    } catch (error) {
      console.error('Welcome email failed:', error);
      return false;
    }
  }
}