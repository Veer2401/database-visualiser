"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeResetToken = storeResetToken;
exports.verifyResetToken = verifyResetToken;
exports.invalidateResetToken = invalidateResetToken;
const crypto_1 = __importDefault(require("crypto"));
const resetTokenStore = new Map();
function storeResetToken(email) {
    const normalizedEmail = email.toLowerCase().trim();
    const token = crypto_1.default.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 30 * 60 * 1000;
    resetTokenStore.set(normalizedEmail, {
        email: normalizedEmail,
        token,
        expiresAt,
    });
    return token;
}
function verifyResetToken(email, token) {
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
function invalidateResetToken(email) {
    resetTokenStore.delete(email.toLowerCase().trim());
}
