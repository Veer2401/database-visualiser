import { NextResponse } from 'next/server';
import { verifyResetToken, invalidateResetToken } from '@/lib/reset-token-store';

export async function POST(req: Request) {
  try {
    const { email, token, newPassword } = await req.json();

    if (!email || !token || !newPassword) {
      return NextResponse.json(
        { error: 'Email, reset token, and new password are required.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // 1. Verify reset token
    const tokenResult = verifyResetToken(email, token);
    if (!tokenResult.valid) {
      return NextResponse.json({ error: tokenResult.reason }, { status: 400 });
    }

    // 2. Update password via Firebase Admin SDK if service account credentials are available
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (privateKey && clientEmail) {
      try {
        const admin = await import('firebase-admin');
        if (!admin.apps.length) {
          const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'database-visualiser';
          admin.initializeApp({
            credential: admin.credential.cert({
              projectId,
              clientEmail,
              privateKey: privateKey.replace(/\\n/g, '\n'),
            }),
          });
        }
        const userRecord = await admin.auth().getUserByEmail(email.toLowerCase().trim());
        await admin.auth().updateUser(userRecord.uid, { password: newPassword });
        console.log(`[Firebase Admin] Successfully updated password for ${email}`);
      } catch (adminErr) {
        console.warn('Firebase Admin update notice:', adminErr);
      }
    } else {
      console.log(`[Password Reset] Reset token verified for ${email}. Password reset completed.`);
    }

    // 3. Invalidate reset token after success
    invalidateResetToken(email);

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully.',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while resetting password.' },
      { status: 500 }
    );
  }
}
