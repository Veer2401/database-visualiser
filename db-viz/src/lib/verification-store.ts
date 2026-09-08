interface CodeEntry {
  code: string;
  expiresAt: number;
}

// In-memory store for verification codes
const store = new Map<string, CodeEntry>();

/** Store a 6-digit verification code for an email (valid for 10 minutes) */
export function storeVerificationCode(email: string, code: string): void {
  const expiresAt = Date.now() + 10 * 60 * 1000;
  store.set(email.toLowerCase().trim(), { code: code.trim(), expiresAt });
}

/** Verify code for a given email */
export function verifyCode(email: string, code: string): { valid: boolean; reason?: string } {
  const key = email.toLowerCase().trim();
  const entry = store.get(key);

  if (!entry) {
    return { valid: false, reason: 'No verification code found for this email. Please request a new one.' };
  }

  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return { valid: false, reason: 'Verification code has expired. Please request a new code.' };
  }

  if (entry.code !== code.trim()) {
    return { valid: false, reason: 'Incorrect verification code. Please check and try again.' };
  }

  // Code is valid - clear entry to prevent re-use
  store.delete(key);
  return { valid: true };
}
