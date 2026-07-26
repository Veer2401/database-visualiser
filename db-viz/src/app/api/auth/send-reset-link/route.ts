import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { storeResetToken } from '@/lib/reset-token-store';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const token = storeResetToken(email);

    // Determine domain origin dynamically from request headers
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const origin = req.headers.get('origin') || `${protocol}://${host}`;

    const resetUrl = `${origin}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    const emailUser = process.env.EMAIL_USER || 'schemaviews@gmail.com';
    const emailPass = process.env.EMAIL_PASS;

    console.log(`\n=================================================`);
    console.log(`🔑 PASSWORD RESET LINK FOR ${email}:`);
    console.log(`   ${resetUrl}`);
    console.log(`=================================================\n`);

    if (!emailPass) {
      return NextResponse.json({
        success: true,
        message: 'Password reset link generated! Check server terminal console or set EMAIL_PASS in .env.local to send live email.',
        devResetUrl: process.env.NODE_ENV === 'development' ? resetUrl : undefined,
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"Schema View" <${emailUser}>`,
      to: email,
      subject: `Reset your Schema View password`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 32px 24px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; margin-bottom: 28px;">
            <div style="display: inline-block; width: 44px; height: 44px; background-color: #000000; border-radius: 12px; line-height: 44px; color: #ffffff; font-weight: bold; font-size: 20px;">S</div>
            <h2 style="font-size: 22px; font-weight: 800; color: #111827; margin: 12px 0 4px 0;">Schema View</h2>
            <p style="font-size: 14px; color: #6b7280; margin: 0;">Password Reset Request</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 24px; border-radius: 16px; border: 1px solid #f3f4f6; text-align: center;">
            <p style="font-size: 14px; color: #374151; margin-top: 0; margin-bottom: 20px; line-height: 1.5;">We received a request to reset the password for your account (<strong style="color: #111827;">${email}</strong>). Click the button below to choose a new password:</p>
            
            <a href="${resetUrl}" target="_blank" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
              Reset Password
            </a>

            <p style="font-size: 12px; color: #9ca3af; margin-top: 20px; margin-bottom: 0;">This password reset link will expire in 30 minutes.</p>
          </div>

          <div style="margin-top: 24px; padding-top: 20px; border-t: 1px solid #f3f4f6; text-align: center;">
            <p style="font-size: 11px; color: #9ca3af; margin: 0; word-break: break-all;">
              If the button doesn't work, copy and paste this link into your browser:<br/>
              <a href="${resetUrl}" style="color: #2563eb;">${resetUrl}</a>
            </p>
            <p style="font-size: 11px; color: #d1d5db; margin-top: 12px;">Sent from <strong>${emailUser}</strong>. If you did not request a password reset, you can safely ignore this email.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: `Password reset link sent to ${email}`,
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return NextResponse.json(
      { error: 'Failed to send password reset email. Please try again.' },
      { status: 500 }
    );
  }
}
