'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Database, Eye, EyeOff, Mail, Lock, User as UserIcon, CheckCircle, ShieldCheck, RefreshCw, ArrowLeft } from 'lucide-react';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import GitHubLoginButton from '@/components/auth/GitHubLoginButton';
import DatabaseAnimationShowcase from '@/components/auth/DatabaseAnimationShowcase';
import { useAuth } from '@/hooks/useAuth';

type Mode = 'signin' | 'signup' | 'forgot' | 'verify';

/** Map Firebase error codes to human-friendly messages */
function friendlyError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? '';
  const map: Record<string, string> = {
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  };
  return map[code] ?? (err instanceof Error ? err.message : 'Something went wrong. Please try again.');
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, signIn, signInGithub, signInEmail, signUpEmail, logout } = useAuth();

  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  // Email 6-digit verification code state
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [devVerificationCodeHint, setDevVerificationCodeHint] = useState<string | null>(null);
  const [resendSuccessMessage, setResendSuccessMessage] = useState<string | null>(null);
  const [verifiedSuccessMessage, setVerifiedSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check if coming from password reset success
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('reset') === 'success') {
        const resetEmail = params.get('email');
        if (resetEmail) {
          setEmail(resetEmail);
        }
        setVerifiedSuccessMessage('Password updated successfully! Please sign in with your new password.');
        setMode('signin');
      }
    }
  }, []);

  useEffect(() => {
    // Only auto-redirect to dashboard if not currently in verification or sign-in transition
    if (user && !loading && mode !== 'verify') {
      router.push('/dashboard');
    }
  }, [user, loading, router, mode]);

  // Focus first box automatically when entering verify mode
  useEffect(() => {
    if (mode === 'verify') {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }
  }, [mode]);

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
    setOtpDigits(['', '', '', '', '', '']);
    setAuthError(null);
    setResetSent(false);
    setShowPassword(false);
    setDevVerificationCodeHint(null);
    setResendSuccessMessage(null);
  };

  const switchMode = (next: Mode) => {
    clearForm();
    setVerifiedSuccessMessage(null);
    setMode(next);
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otpDigits];
    newOtp[index] = digit;
    setOtpDigits(newOtp);
    setAuthError(null);

    // Auto-advance to next input box if digit entered
    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        // Step back to previous box if current is empty
        otpInputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const digits = pastedData.split('');
      const newOtp = ['', '', '', '', '', ''];
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtpDigits(newOtp);
      setAuthError(null);
      const targetIndex = Math.min(digits.length, 5);
      otpInputRefs.current[targetIndex]?.focus();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setAuthError(null);
      setIsGoogleLoading(true);
      await signIn();
    } catch {
      setAuthError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setAuthError(null);
      setIsGithubLoading(true);
      await signInGithub();
    } catch {
      setAuthError('Failed to sign in with GitHub. Please try again.');
    } finally {
      setIsGithubLoading(false);
    }
  };

  /** Initial Form Submission (Sign In, Sign Up, or Password Reset) */
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setVerifiedSuccessMessage(null);

    // ── Sign Up Flow ──
    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setAuthError("Passwords don't match.");
        return;
      }
      if (password.length < 6) {
        setAuthError('Password must be at least 6 characters.');
        return;
      }

      setIsEmailLoading(true);
      try {
        // Send 6-digit verification code to email from schemaviews@gmail.com
        const res = await fetch('/api/auth/send-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to send verification code.');
        }

        if (data.devCode) {
          setDevVerificationCodeHint(data.devCode);
        }

        // Move user to 6-digit verification code screen
        setMode('verify');
      } catch (err) {
        setAuthError(err instanceof Error ? err.message : 'Failed to send verification code.');
      } finally {
        setIsEmailLoading(false);
      }
      return;
    }

    // ── Sign In or Reset Password ──
    setIsEmailLoading(true);
    try {
      if (mode === 'signin') {
        await signInEmail(email, password);
      } else if (mode === 'forgot') {
        // Send password reset link from schemaviews@gmail.com to user's email
        const res = await fetch('/api/auth/send-reset-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to send password reset email.');
        }

        setResetSent(true);
      }
    } catch (err) {
      setAuthError(friendlyError(err));
    } finally {
      setIsEmailLoading(false);
    }
  };

  /** Handle Verification Code Submission */
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const fullCode = otpDigits.join('');
    if (fullCode.length !== 6) {
      setAuthError('Please fill in all 6 verification code boxes.');
      return;
    }

    setIsVerifying(true);
    try {
      // 1. Verify code via API
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: fullCode }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid verification code.');
      }

      // 2. Create user account in Firebase
      await signUpEmail(email, password, displayName || undefined);

      // 3. Immediately log out user so they are required to sign in again with email & password
      await logout();

      // 4. Redirect to Sign In page with success notification
      const savedEmail = email;
      clearForm();
      setEmail(savedEmail);
      setVerifiedSuccessMessage('Account verified successfully! Please sign in with your password.');
      setMode('signin');
    } catch (err) {
      setAuthError(friendlyError(err));
    } finally {
      setIsVerifying(false);
    }
  };

  /** Resend Verification Code */
  const handleResendCode = async () => {
    setAuthError(null);
    setIsResending(true);
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to resend code.');
      }

      if (data.devCode) {
        setDevVerificationCodeHint(data.devCode);
      }
      setResendSuccessMessage('A new 6-digit verification code has been sent.');
      setTimeout(() => setResendSuccessMessage(null), 5000);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Failed to resend verification code.');
    } finally {
      setIsResending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-black border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const isOtpComplete = otpDigits.every((d) => d !== '');

  return (
    <div className="min-h-screen min-h-svh flex flex-col lg:flex-row bg-white relative overflow-x-hidden items-start">
      {/* ── Left Column: Authentication Form ── */}
      <div className="w-full lg:w-[48%] xl:w-[45%] flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14 relative z-10 min-h-screen">
        {/* Background Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="login-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#login-grid)" />
          </svg>
        </div>

        {/* Top Header: Back to Home link */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 mb-3 relative z-10">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </button>
        </div>

        {/* Center Container: Login Card shifted to left */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 my-auto py-2 relative z-10"
        >
          {/* Brand Header — Logo and Text Schema View on the SAME LINE */}
          <div className="mb-5">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center shadow-sm shrink-0">
                <Database className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-black tracking-tight" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Schema View
              </h1>
            </div>
            <p className="text-xs text-gray-500">
              {mode === 'verify'
                ? 'Verify your email address'
                : mode === 'forgot'
                ? 'Recover your account password'
                : 'Sign in to access your databases'}
            </p>
          </div>

          {/* Card */}
          <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">
            {/* ── Mode Tabs (Sign In / Sign Up) ── */}
            {mode !== 'forgot' && mode !== 'verify' && (
              <div className="flex bg-gray-100 p-1 rounded-xl mb-5">
                {(['signin', 'signup'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => switchMode(m)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      mode === m
                        ? 'bg-white text-black shadow-sm font-semibold'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {m === 'signin' ? 'Sign In' : 'Sign Up'}
                  </button>
                ))}
              </div>
            )}

            {/* ── Success Banner ── */}
            {mode === 'signin' && verifiedSuccessMessage && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-start gap-2.5"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-800">
                  <p className="font-semibold mb-0.5">Success!</p>
                  <p>{verifiedSuccessMessage}</p>
                </div>
              </motion.div>
            )}

            {/* ── 6-Digit Verification Code Screen ── */}
            {mode === 'verify' && (
              <div className="space-y-4">
                <div className="text-center mb-3">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center mx-auto mb-2.5 text-gray-800 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-semibold text-black mb-1">Verify Your Email</h2>
                  <p className="text-xs text-gray-500 px-1">
                    We sent a 6-digit code to <span className="font-semibold text-gray-800">{email}</span>.
                  </p>
                </div>

                {devVerificationCodeHint && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-center">
                    <p className="text-xs text-amber-800 font-mono">
                      [Dev Mode Code]: <strong>{devVerificationCodeHint}</strong>
                    </p>
                  </div>
                )}

                {resendSuccessMessage && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                    <p className="text-xs text-emerald-700 font-medium">{resendSuccessMessage}</p>
                  </div>
                )}

                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div className="flex justify-center items-center gap-2 my-4">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => { otpInputRefs.current[idx] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        onPaste={handleOtpPaste}
                        className={`
                          w-10 h-12 text-lg font-bold font-mono text-center
                          bg-white border rounded-xl text-gray-900 shadow-sm
                          focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                          transition-all duration-150
                          ${digit ? 'border-black ring-1 ring-black' : 'border-gray-200'}
                        `}
                      />
                    ))}
                  </div>

                  <button
                    id="verifyCodeBtn"
                    type="submit"
                    disabled={isVerifying || !isOtpComplete}
                    className="w-full py-2.5 bg-black text-white text-xs font-medium rounded-xl hover:bg-gray-900 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isVerifying ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      'Verify & Complete Sign Up'
                    )}
                  </button>
                </form>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="text-gray-500 hover:text-black font-medium transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isResending ? 'animate-spin' : ''}`} />
                    Resend code
                  </button>

                  <button
                    type="button"
                    onClick={() => switchMode('signup')}
                    className="text-gray-500 hover:text-black transition-colors"
                  >
                    ← Back to Sign Up
                  </button>
                </div>
              </div>
            )}

            {/* ── Forgot-password header ── */}
            {mode === 'forgot' && !resetSent && (
              <div className="text-center mb-4">
                <h2 className="text-base font-semibold text-black mb-1">Reset your password</h2>
                <p className="text-xs text-gray-500">
                  Enter your email address and we will send you a link to reset your password.
                </p>
              </div>
            )}

            {/* ── Reset-sent confirmation ── */}
            <AnimatePresence>
              {resetSent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-2.5 py-4 text-center"
                >
                  <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center text-emerald-600 mb-1">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Check your inbox</p>
                  <p className="text-xs text-gray-500">
                    A reset link was sent to <span className="font-semibold text-gray-800">{email}</span>.
                  </p>
                  <button
                    onClick={() => switchMode('signin')}
                    className="mt-3 text-xs text-black font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Back to Sign In
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Email / Password Form (Sign In / Sign Up / Forgot) ── */}
            {mode !== 'verify' && !resetSent && (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                {/* Display Name — Sign Up only */}
                <AnimatePresence>
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          id="displayName"
                          type="text"
                          placeholder="Display name (optional)"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                </div>

                {/* Password — hidden in forgot mode */}
                <AnimatePresence>
                  {mode !== 'forgot' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full pl-9 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          tabIndex={-1}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Confirm Password — Sign Up only */}
                <AnimatePresence>
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          id="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Forgot password link */}
                {mode === 'signin' && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-xs text-gray-500 hover:text-black transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Submit */}
                <button
                  id="emailSubmitBtn"
                  type="submit"
                  disabled={isEmailLoading}
                  className="w-full py-2.5 bg-black text-white text-xs font-medium rounded-xl hover:bg-gray-900 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm mt-1"
                >
                  {isEmailLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : mode === 'signin' ? (
                    'Sign In'
                  ) : mode === 'signup' ? (
                    'Continue to Verification →'
                  ) : (
                    'Send Reset Link'
                  )}
                </button>

                {/* Back to sign in (forgot mode) */}
                {mode === 'forgot' && (
                  <button
                    type="button"
                    onClick={() => switchMode('signin')}
                    className="w-full text-xs text-gray-500 hover:text-black transition-colors text-center pt-1"
                  >
                    ← Back to Sign In
                  </button>
                )}
              </form>
            )}

            {/* Error message display */}
            <AnimatePresence>
              {authError && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-xl"
                >
                  <p className="text-xs text-red-600 text-center">{authError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Divider + OAuth buttons (not shown on forgot / verify) ── */}
            {mode !== 'forgot' && mode !== 'verify' && !resetSent && (
              <>
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-[11px] text-gray-400 font-medium">or continue with</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="space-y-2">
                  <GoogleLoginButton onClick={handleGoogleSignIn} isLoading={isGoogleLoading} />
                  <GitHubLoginButton onClick={handleGithubSignIn} isLoading={isGithubLoading} />
                </div>
              </>
            )}

            {/* Terms */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-[11px] text-gray-400 text-center">
                By continuing, you agree to our{' '}
                <button onClick={() => router.push('/terms-of-service')} className="text-gray-600 hover:text-black transition-colors underline underline-offset-2">
                  Terms
                </button>{' '}
                and{' '}
                <button onClick={() => router.push('/privacy-policy')} className="text-gray-600 hover:text-black transition-colors underline underline-offset-2">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 pt-3 relative z-10">
          <p className="text-[11px] text-gray-400 text-left">
            © {new Date().getFullYear()} Schema View. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Right Column: Interactive Database Animation Showcase ── */}
      <DatabaseAnimationShowcase />
    </div>
  );
}