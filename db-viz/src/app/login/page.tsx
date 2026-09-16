'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, CheckCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import GitHubLoginButton from '@/components/auth/GitHubLoginButton';
import SchemaViewLogo from '@/components/common/SchemaViewLogo';
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
      <div className="min-h-screen flex items-center justify-center bg-[#f3f5f4]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 border-3 border-[#041c15] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const isOtpComplete = otpDigits.every((d) => d !== '');

  // Input style constants for light NexDash theme
  const inputClasses = "w-full pl-10 pr-3.5 py-3.5 bg-[#f5f5f6] border-0 rounded-full text-[13px] text-[#07110b] placeholder:text-[#858b8c] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#38AA78]/20 transition-all sv-body";

  return (
    <div className="h-screen h-svh flex items-center justify-center bg-[#f3f5f4] relative overflow-hidden">
      {/* ── Left Column: Authentication Form ── */}
      <div className="w-full max-w-[680px] flex flex-col items-center px-6 py-10 sm:px-10 sm:py-12 relative z-10">
        {/* Schema View brand */}
        <div className="flex items-center gap-2.5 mb-10 sm:mb-12">
          <SchemaViewLogo size={30} />
          <span className="sv-display text-[18px] font-bold tracking-[-0.02em] text-[#07110b]">SCHEMA VIEW</span>
        </div>

        {/* Center Container: Login Card */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-[520px] mx-auto relative z-10"
        >
          {/* Open form surface */}
          <div className="w-full p-0" style={{ zoom: 0.96 }}>
            {/* ── OAuth buttons ── */}
            {mode !== 'forgot' && mode !== 'verify' && !resetSent && (
              <>
                <h1 className="sv-display text-center text-[26px] sm:text-[30px] text-[#07110b] font-medium mb-10">
                  {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                </h1>
                <div className="space-y-2">
                  <GoogleLoginButton onClick={handleGoogleSignIn} isLoading={isGoogleLoading} />
                  <GitHubLoginButton onClick={handleGithubSignIn} isLoading={isGithubLoading} />
                </div>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-[#e2e6e3]" />
                  <span className="text-[11px] text-[#858b8c] font-medium sv-body">or continue with</span>
                  <div className="flex-1 h-px bg-[#e2e6e3]" />
                </div>
              </>
            )}

            {/* ── Success Banner ── */}
            {mode === 'signin' && verifiedSuccessMessage && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-2.5"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[12px] text-emerald-800">
                  <p className="font-semibold mb-0.5">Success!</p>
                  <p>{verifiedSuccessMessage}</p>
                </div>
              </motion.div>
            )}

            {/* ── 6-Digit Verification Code Screen ── */}
            {mode === 'verify' && (
              <div className="space-y-4">
                <div className="text-center mb-3">
                  <div className="w-10 h-10 bg-[#f0f3f1] border border-[#e2e6e3] rounded-xl flex items-center justify-center mx-auto mb-2.5 text-[#07110b] shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-[#38AA78]" />
                  </div>
                  <h2 className="sv-display text-[16px] text-[#07110b] font-bold mb-1">Verify Your Email</h2>
                  <p className="text-[12px] text-[#565c59] px-1 sv-body">
                    We sent a 6-digit code to <span className="font-semibold text-[#07110b]">{email}</span>.
                  </p>
                </div>

                {devVerificationCodeHint && (
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
                    <p className="text-[12px] text-amber-800 font-mono">
                      [Dev Mode Code]: <strong>{devVerificationCodeHint}</strong>
                    </p>
                  </div>
                )}

                {resendSuccessMessage && (
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                    <p className="text-[12px] text-emerald-700 font-medium">{resendSuccessMessage}</p>
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
                          bg-[#f8faf8] border rounded-xl text-[#07110b] shadow-sm
                          focus:outline-none focus:border-[#38AA78] focus:ring-1 focus:ring-[#38AA78]/20
                          transition-all duration-150
                          ${digit ? 'border-[#38AA78] ring-1 ring-[#38AA78]/20' : 'border-[#dce1de]'}
                        `}
                      />
                    ))}
                  </div>

                  <button
                    id="verifyCodeBtn"
                    type="submit"
                    disabled={isVerifying || !isOtpComplete}
                    className="w-full py-3 bg-[#041c15] text-white text-[13px] font-bold rounded-full hover:bg-[#122b22] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm sv-body"
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

                <div className="flex items-center justify-between pt-3 border-t border-[#eaedeb] text-[12px]">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="text-[#565c59] hover:text-[#07110b] font-medium transition-colors flex items-center gap-1 disabled:opacity-50 sv-body"
                  >
                    <RefreshCw className={`w-3 h-3 ${isResending ? 'animate-spin' : ''}`} />
                    Resend code
                  </button>

                  <button
                    type="button"
                    onClick={() => switchMode('signup')}
                    className="text-[#565c59] hover:text-[#07110b] transition-colors sv-body"
                  >
                    ← Back to Sign Up
                  </button>
                </div>
              </div>
            )}

            {/* ── Forgot-password header ── */}
            {mode === 'forgot' && !resetSent && (
              <div className="text-center mb-4">
                <h2 className="sv-display text-[16px] text-[#07110b] font-bold mb-1">Reset your password</h2>
                <p className="text-[12px] text-[#565c59] sv-body">
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
                  <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-600 mb-1">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <p className="sv-display text-[15px] text-[#07110b] font-bold">Check your inbox</p>
                  <p className="text-[12px] text-[#565c59] sv-body">
                    A reset link was sent to <span className="font-semibold text-[#07110b]">{email}</span>.
                  </p>
                  <button
                    onClick={() => switchMode('signin')}
                    className="mt-3 text-[12px] text-[#07110b] font-medium underline underline-offset-2 hover:no-underline sv-body"
                  >
                    Back to Sign In
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Email / Password Form (Sign In / Sign Up / Forgot) ── */}
            {mode !== 'verify' && !resetSent && (
              <form onSubmit={handleEmailSubmit} className="space-y-2.5">
                {/* Display Name — Sign Up only */}
                {mode === 'signup' && (
                    <div>
                      <div className="relative">
                        <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858b8c]" />
                        <input
                          id="displayName"
                          type="text"
                          placeholder="Display name (optional)"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className={inputClasses}
                        />
                      </div>
                    </div>
                )}

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858b8c]" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClasses}
                  />
                </div>

                {/* Password — hidden in forgot mode */}
                {mode !== 'forgot' && (
                    <div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858b8c]" />
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className={`${inputClasses} !pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#858b8c] hover:text-[#07110b] transition-colors"
                          tabIndex={-1}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                )}

                {/* Confirm Password — Sign Up only */}
                {mode === 'signup' && (
                    <div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858b8c]" />
                        <input
                          id="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className={inputClasses}
                        />
                      </div>
                    </div>
                )}

                {/* Forgot password link */}
                {mode === 'signin' && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-[12px] text-[#565c59] hover:text-[#07110b] transition-colors sv-body"
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
                  className="w-full py-2.5 bg-[#041c15] text-white text-[12px] font-bold rounded-full hover:bg-[#122b22] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm mt-1 sv-body"
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
                    className="w-full text-[12px] text-[#565c59] hover:text-[#07110b] transition-colors text-center pt-1 sv-body"
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
                  className="mt-3 p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl"
                >
                  <p className="text-[12px] text-red-600 text-center sv-body">{authError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Account mode switch */}
            {mode !== 'forgot' && mode !== 'verify' && !resetSent && (
              <p className="mt-8 text-center text-[13px] text-[#858b8c] sv-body">
                {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
                <button
                  onClick={() => switchMode(mode === 'signup' ? 'signin' : 'signup')}
                  className="text-[#07110b] hover:opacity-70 transition-opacity"
                >
                  {mode === 'signup' ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}