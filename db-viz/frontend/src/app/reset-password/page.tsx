'use client';

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Database, Lock, Eye, EyeOff, CheckCircle, ShieldAlert, ArrowLeft } from 'lucide-react';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '@/lib/firebase';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';
  const oobCode = searchParams.get('oobCode') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token && !oobCode) {
      setError('Invalid or missing password reset link. Please request a new password reset link.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setIsLoading(true);

    try {
      if (oobCode) {
        // Direct Firebase Client Auth reset if oobCode is present
        await confirmPasswordReset(auth, oobCode, password);
      } else {
        // Custom token verification API reset
        const res = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, token, newPassword: password }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to reset password.');
        }
      }

      setSuccess(true);

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push(`/login?reset=success&email=${encodeURIComponent(email)}`);
      }, 2000);
    } catch (err: any) {
      console.error('Password reset error:', err);
      const msg = err?.message || 'An error occurred while resetting password.';
      setError(msg.includes('auth/invalid-action-code') ? 'Password reset link has expired or has already been used.' : msg);
    } finally {
      setIsLoading(false);
    }
  };

  const isInvalidLink = !token && !oobCode;

  return (
    <div className="min-h-screen min-h-svh flex flex-col items-center justify-center py-6 sm:py-8 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-y-auto">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-gray-100/30 via-white/20 to-gray-100/30 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative floating cards */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -8 }}
        animate={{ opacity: 1, y: 0, rotate: -8 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="absolute left-[5%] top-[12%] w-44 h-36 bg-white/50 backdrop-blur-2xl rounded-2xl border border-white/60 shadow-xl shadow-gray-200/30 hidden xl:block pointer-events-none"
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Database className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="text-xs font-semibold text-gray-700">Users Table</div>
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-400 rounded text-[6px] font-bold text-amber-900 flex items-center justify-center">PK</div>
              <span className="text-[10px] text-gray-600">id</span>
              <span className="text-[9px] text-gray-400 ml-auto">INT</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <span className="text-[10px] text-gray-600">password_hash</span>
              <span className="text-[9px] text-gray-400 ml-auto">VARCHAR</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Main Reset Password Card ── */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md my-auto relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-2xl flex items-center justify-center shadow-lg">
            <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-black">Schema View</span>
        </div>

        {/* Glass Card */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-gray-200/50 p-6 sm:p-7 border border-white/50">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-black mb-1">Set New Password</h2>
            {email ? (
              <p className="text-xs sm:text-sm text-gray-500">
                Enter your new password for <span className="font-medium text-gray-800">{email}</span>
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-gray-500">
                Choose a strong password to secure your account.
              </p>
            )}
          </div>

          {/* Invalid Link Warning */}
          {isInvalidLink && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-3">
              <ShieldAlert className="w-10 h-10 text-amber-600 mx-auto" />
              <p className="text-sm font-semibold text-amber-900">Invalid Reset Link</p>
              <p className="text-xs text-amber-700">
                This password reset link is invalid or missing required parameters.
              </p>
              <button
                onClick={() => router.push('/login')}
                className="inline-flex items-center gap-2 text-xs font-medium text-black bg-white border border-gray-300 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Sign In
              </button>
            </div>
          )}

          {/* Success State */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-6 text-center"
            >
              <CheckCircle className="w-12 h-12 text-emerald-500" />
              <p className="text-base font-bold text-gray-900">Password Reset Complete!</p>
              <p className="text-xs text-gray-500">Your password has been successfully updated.</p>
              <p className="text-xs text-black font-medium animate-pulse mt-2">Redirecting to Sign In...</p>
            </motion.div>
          )}

          {/* Reset Password Form */}
          {!isInvalidLink && !success && (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* New Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Confirm New Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="confirmNewPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-all"
                />
              </div>

              {/* Error Alert */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-3 bg-red-50/80 border border-red-200 rounded-xl text-center"
                  >
                    <p className="text-xs text-red-600 font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                id="resetPasswordBtn"
                type="submit"
                disabled={isLoading || !password || !confirmPassword}
                className="w-full py-2.5 sm:py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md mt-4"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          )}

          {/* Footer Back to Sign In link */}
          <div className="mt-5 pt-4 border-t border-gray-200/50 text-center">
            <button
              onClick={() => router.push('/login')}
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Sign In
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
