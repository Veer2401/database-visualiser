"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeVerificationCode = storeVerificationCode;
exports.verifyCode = verifyCode;
const store = new Map();
function storeVerificationCode(email, code) {
    const expiresAt = Date.now() + 10 * 60 * 1000;
    store.set(email.toLowerCase().trim(), { code: code.trim(), expiresAt });
}
function verifyCode(email, code) {
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
    store.delete(key);
    return { valid: true };
}
