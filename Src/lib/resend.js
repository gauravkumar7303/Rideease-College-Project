// rideease/Src/lib/resend.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to, subject, html) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'RideEase <onboarding@resend.dev>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Resend Error:', error);
      throw error;
    }

    console.log('✅ Email sent:', data?.id);
    return data;
  } catch (error) {
    console.error('Email sending failed:', error);
    // Fallback for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[EMAIL DEMO] To: ${to}, Subject: ${subject}`);
    }
    return null;
  }
}