import crypto from 'crypto';

interface ResetTokenEntry {
  email: string;
  token: string;
  expiresAt: number;
}

// In-memory store for password reset tokens (valid for 30 minutes)
const resetTokenStore = new Map<string, ResetTokenEntry>();

/** Generate and store a secure password reset token for an email */
export function storeResetToken(email: string): string {
  const normalizedEmail = email.toLowerCase().trim();
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes validity

  resetTokenStore.set(normalizedEmail, {
    email: normalizedEmail,
    token,
    expiresAt,
  });

  return token;
}

/** Verify a password reset token for an email */
export function verifyResetToken(email: string, token: string): { valid: boolean; reason?: string } {
  const normalizedEmail = email.toLowerCase().trim();
  const entry = resetTokenStore.get(normalizedEmail);

  if (!entry) {
    return { valid: false, reason: 'Invalid or expired reset link. Please request a new password reset.' };
  }

  if (Date.now() > entry.expiresAt) {
    resetTokenStore.delete(normalizedEmail);
    return { valid: false, reason: 'Password reset link has expired (valid for 30 mins). Please request a new link.' };
  }

  if (entry.token !== token.trim()) {
    return { valid: false, reason: 'Invalid reset token. Please use the exact link sent to your email.' };
  }

  return { valid: true };
}

/** Invalidate/consume token after password is reset */
export function invalidateResetToken(email: string): void {
  resetTokenStore.delete(email.toLowerCase().trim());
}
