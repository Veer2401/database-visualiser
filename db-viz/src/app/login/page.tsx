'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Database, Eye, EyeOff, Mail, Lock, User as UserIcon, CheckCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import GitHubLoginButton from '@/components/auth/GitHubLoginButton';
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
              <span className="text-[10px] text-gray-600">email</span>
              <span className="text-[9px] text-gray-400 ml-auto">VARCHAR</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <span className="text-[10px] text-gray-600">name</span>
              <span className="text-[9px] text-gray-400 ml-auto">VARCHAR</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 6 }}
        animate={{ opacity: 1, y: 0, rotate: 6 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className="absolute right-[6%] top-[15%] w-48 h-32 bg-gray-900/90 backdrop-blur-2xl rounded-2xl border border-gray-700/50 shadow-2xl shadow-gray-900/20 overflow-hidden hidden xl:block pointer-events-none"
      >
        <div className="p-3 h-full flex flex-col">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
            <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
            <span className="text-[9px] text-gray-500 ml-2">terminal</span>
          </div>
          <div className="space-y-1 font-mono text-[9px]">
            <div className="text-green-400">$ <span className="text-gray-300">SELECT * FROM users;</span></div>
            <div className="text-gray-500">→ 3 rows returned</div>
            <div className="text-green-400">$ <span className="text-gray-400 animate-pulse">_</span></div>
          </div>
        </div>
      </motion.div>

      {/* ── Main Login Card ── */}
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

          {/* ── Mode Tabs (Sign In / Sign Up) ── */}
          {mode !== 'forgot' && mode !== 'verify' && (
            <div className="flex bg-gray-100/80 rounded-2xl p-1 mb-5">
              {(['signin', 'signup'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    mode === m
                      ? 'bg-white text-black shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
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
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5"
            >
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-800">
                <p className="font-semibold mb-0.5">Success!</p>
                <p>{verifiedSuccessMessage}</p>
              </div>
            </motion.div>
          )}

          {/* ── 6-Digit Verification Code Screen ── */}
          {mode === 'verify' && (
            <div className="space-y-4">
              <div className="text-center mb-2">
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-blue-600 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-black mb-1">Verify Your Email</h2>
                <p className="text-xs sm:text-sm text-gray-500 px-2">
                  We sent a 6-digit code to <span className="font-semibold text-gray-800">{email}</span> from <span className="font-medium text-gray-700">schemaviews@gmail.com</span>.
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
                {/* 6 Individual Code Boxes */}
                <div className="flex justify-center items-center gap-2 sm:gap-2.5 my-4">
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
                        w-10 h-12 sm:w-12 sm:h-14
                        text-xl sm:text-2xl font-bold font-mono text-center
                        bg-gray-50/90 border rounded-xl sm:rounded-2xl
                        text-gray-900 shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-black/15 focus:bg-white focus:border-black
                        transition-all duration-150
                        ${digit ? 'border-black bg-white ring-1 ring-black/10' : 'border-gray-200'}
                      `}
                    />
                  ))}
                </div>

                <button
                  id="verifyCodeBtn"
                  type="submit"
                  disabled={isVerifying || !isOtpComplete}
                  className="w-full py-2.5 sm:py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
                >
                  {isVerifying ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    'Verify & Complete Sign Up'
                  )}
                </button>
              </form>

              <div className="flex items-center justify-between pt-2 border-t border-gray-200/50 text-xs">
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
            <div className="text-center mb-5">
              <h2 className="text-xl font-bold text-black mb-1">Reset your password</h2>
              <p className="text-gray-500 text-sm">
                Enter your email and we'll send a password reset link.
              </p>
            </div>
          )}

          {/* ── Reset-sent confirmation ── */}
          <AnimatePresence>
            {resetSent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 py-4 text-center"
              >
                <CheckCircle className="w-12 h-12 text-emerald-500" />
                <p className="text-sm font-semibold text-gray-900">Check your inbox!</p>
                <p className="text-xs text-gray-600">
                  A password reset link was sent to <span className="font-semibold text-gray-800">{email}</span> from <span className="font-medium text-gray-700">schemaviews@gmail.com</span>.
                </p>
                <p className="text-[11px] text-gray-400">
                  Click the link in the email to set your new password on our website.
                </p>
                <button
                  onClick={() => switchMode('signin')}
                  className="mt-2 text-sm text-black font-medium underline underline-offset-2 hover:no-underline"
                >
                  Back to Sign In
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Email / Password Form (Sign In / Sign Up / Forgot) ── */}
          {mode !== 'verify' && !resetSent && (
            <form onSubmit={handleEmailSubmit} className="space-y-2.5 sm:space-y-3">

              {/* Display Name — Sign Up only */}
              <AnimatePresence>
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
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
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-all"
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
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-all"
                />
              </div>

              {/* Password — hidden in forgot mode */}
              <AnimatePresence>
                {mode !== 'forgot' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
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
                    transition={{ duration: 0.2 }}
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
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-all"
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
                className="w-full py-2.5 sm:py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isEmailLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
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
                  className="w-full text-sm text-gray-500 hover:text-black transition-colors text-center"
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
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-3 p-3 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl"
              >
                <p className="text-sm text-red-600 text-center">{authError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Divider + OAuth buttons (not shown on forgot / verify) ── */}
          {mode !== 'forgot' && mode !== 'verify' && !resetSent && (
            <>
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-200/70" />
                <span className="text-xs text-gray-400 font-medium">or continue with</span>
                <div className="flex-1 h-px bg-gray-200/70" />
              </div>

              <div className="space-y-2.5">
                <GoogleLoginButton onClick={handleGoogleSignIn} isLoading={isGoogleLoading} />
                <GitHubLoginButton onClick={handleGithubSignIn} isLoading={isGithubLoading} />
              </div>
            </>
          )}

          {/* Terms */}
          <div className="mt-5 pt-4 border-t border-gray-200/50">
            <p className="text-xs text-gray-400 text-center">
              By signing in, you agree to our{' '}
              <button onClick={() => router.push('/terms-of-service')} className="text-gray-600 hover:text-black transition-colors">
                Terms
              </button>{' '}
              and{' '}
              <button onClick={() => router.push('/privacy-policy')} className="text-gray-600 hover:text-black transition-colors">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-5 text-center"
        >
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}