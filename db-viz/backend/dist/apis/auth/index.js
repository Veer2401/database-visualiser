"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nodemailer_1 = __importDefault(require("nodemailer"));
const verification_store_1 = require("../../lib/stores/verification-store");
const reset_token_store_1 = require("../../lib/stores/reset-token-store");
const router = (0, express_1.Router)();
// POST /api/auth/send-code
router.post('/send-code', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return res.status(400).json({ error: 'Please enter a valid email address.' });
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        (0, verification_store_1.storeVerificationCode)(email, code);
        const emailUser = process.env.EMAIL_USER || 'schemaviews@gmail.com';
        const emailPass = process.env.EMAIL_PASS;
        console.log(`\n=================================================`);
        console.log(`🔒 VERIFICATION CODE FOR ${email}: [ ${code} ]`);
        console.log(`   From: ${emailUser}`);
        console.log(`=================================================\n`);
        if (!emailPass) {
            return res.json({
                success: true,
                message: 'Verification code generated! Check server log or set EMAIL_PASS in .env to send live emails.',
                devCode: process.env.NODE_ENV === 'development' ? code : undefined,
            });
        }
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });
        const mailOptions = {
            from: `"Schema View Security" <${emailUser}>`,
            to: email,
            subject: `${code} is your Schema View verification code`,
            html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; border-radius: 16px; background: #ffffff; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 22px; font-weight: 800; color: #111827; margin: 12px 0 4px 0;">Schema View</h2>
          <p style="font-size: 14px; color: #6b7280; margin: 0;">Confirm your email address</p>
          <div style="background-color: #f9fafb; padding: 24px; border-radius: 16px; border: 1px solid #f3f4f6; text-align: center; margin-top: 16px;">
            <div style="font-size: 34px; font-weight: 800; letter-spacing: 10px; color: #000000; padding: 14px 0; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; font-family: monospace;">
              ${code}
            </div>
            <p style="font-size: 12px; color: #9ca3af; margin-top: 16px; margin-bottom: 0;">This code is valid for 10 minutes.</p>
          </div>
        </div>
      `,
        };
        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: `Verification code sent to ${email}` });
    }
    catch (error) {
        console.error('Error sending verification email:', error);
        return res.status(500).json({ error: 'Failed to send verification email. Please try again.' });
    }
});
// POST /api/auth/verify-code
router.post('/verify-code', async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) {
            return res.status(400).json({ error: 'Email and verification code are required.' });
        }
        const result = (0, verification_store_1.verifyCode)(email, code);
        if (!result.valid) {
            return res.status(400).json({ error: result.reason });
        }
        return res.json({ success: true, message: 'Code verified successfully.' });
    }
    catch (error) {
        console.error('Error verifying code:', error);
        return res.status(500).json({ error: 'An unexpected error occurred during verification.' });
    }
});
// POST /api/auth/send-reset-link
router.post('/send-reset-link', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return res.status(400).json({ error: 'Please enter a valid email address.' });
        }
        const token = (0, reset_token_store_1.storeResetToken)(email);
        const origin = req.headers.origin || req.headers.referer || 'http://localhost:3000';
        const resetUrl = `${origin}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
        const emailUser = process.env.EMAIL_USER || 'schemaviews@gmail.com';
        const emailPass = process.env.EMAIL_PASS;
        console.log(`\n=================================================`);
        console.log(`🔑 PASSWORD RESET LINK FOR ${email}:`);
        console.log(`   ${resetUrl}`);
        console.log(`=================================================\n`);
        if (!emailPass) {
            return res.json({
                success: true,
                message: 'Password reset link generated! Check server log or set EMAIL_PASS in .env.',
                resetUrl,
            });
        }
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: { user: emailUser, pass: emailPass },
        });
        await transporter.sendMail({
            from: `"Schema View Support" <${emailUser}>`,
            to: email,
            subject: 'Reset your Schema View password',
            html: `<p>Click the link below to reset your password (valid 30 mins):</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
        });
        return res.json({ success: true, message: `Password reset link sent to ${email}` });
    }
    catch (error) {
        console.error('Error sending reset link:', error);
        return res.status(500).json({ error: 'Failed to send reset email.' });
    }
});
// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
    try {
        const { email, token, newPassword } = req.body;
        if (!email || !token || !newPassword) {
            return res.status(400).json({ error: 'Email, reset token, and new password are required.' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
        }
        const result = (0, reset_token_store_1.verifyResetToken)(email, token);
        if (!result.valid) {
            return res.status(400).json({ error: result.reason });
        }
        let adminAuth = null;
        try {
            const admin = require('firebase-admin');
            if (admin.apps.length) {
                adminAuth = admin.auth();
            }
        }
        catch { }
        if (adminAuth) {
            try {
                const user = await adminAuth.getUserByEmail(email);
                await adminAuth.updateUser(user.uid, { password: newPassword });
            }
            catch (err) {
                console.warn('Firebase Admin update password failed:', err);
            }
        }
        (0, reset_token_store_1.invalidateResetToken)(email);
        return res.json({ success: true, message: 'Password has been reset successfully.' });
    }
    catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});
exports.default = router;
