import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { storeVerificationCode } from '@/lib/verification-store';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // Generate random 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    storeVerificationCode(email, code);

    const emailUser = process.env.EMAIL_USER || 'schemaviews@gmail.com';
    const emailPass = process.env.EMAIL_PASS;

    // Log to console for development visibility
    console.log(`\n=================================================`);
    console.log(`🔒 VERIFICATION CODE FOR ${email}: [ ${code} ]`);
    console.log(`   From: ${emailUser}`);
    console.log(`=================================================\n`);

    if (!emailPass) {
      // If Gmail app password isn't set yet, return successful response with helpful message
      return NextResponse.json({
        success: true,
        message: 'Verification code generated! Check server log or set EMAIL_PASS in .env.local to send live emails.',
        devCode: process.env.NODE_ENV === 'development' ? code : undefined,
      });
    }

    // Create Gmail transporter
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
      subject: `${code} is your Schema View verification code`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; margin-bottom: 28px;">
            <div style="display: inline-block; width: 44px; height: 44px; background-color: #000000; border-radius: 12px; line-height: 44px; color: #ffffff; font-weight: bold; font-size: 20px;">S</div>
            <h2 style="font-size: 22px; font-weight: 800; color: #111827; margin: 12px 0 4px 0;">Schema View</h2>
            <p style="font-size: 14px; color: #6b7280; margin: 0;">Confirm your email address</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 24px; border-radius: 16px; border: 1px solid #f3f4f6; text-align: center;">
            <p style="font-size: 14px; color: #374151; margin-top: 0; margin-bottom: 16px; font-weight: 500;">Enter the following 6-digit verification code to complete your registration:</p>
            <div style="font-size: 34px; font-weight: 800; letter-spacing: 10px; color: #000000; padding: 14px 0; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; font-family: monospace; display: block; margin: 0 auto;">
              ${code}
            </div>
            <p style="font-size: 12px; color: #9ca3af; margin-top: 16px; margin-bottom: 0;">This security code is valid for 10 minutes.</p>
          </div>

          <div style="margin-top: 28px; text-align: center; border-t: 1px solid #f3f4f6; padding-top: 20px;">
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">Sent automatically from <strong style="color: #6b7280;">${emailUser}</strong></p>
            <p style="font-size: 11px; color: #d1d5db; margin-top: 6px;">If you did not attempt to sign up for Schema View, please ignore this email.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: `Verification code sent to ${email}`,
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    return NextResponse.json(
      { error: 'Failed to send verification email. Please try again.' },
      { status: 500 }
    );
  }
}
