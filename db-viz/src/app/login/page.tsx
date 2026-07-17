'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Database } from 'lucide-react';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import GitHubLoginButton from '@/components/auth/GitHubLoginButton';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, signIn, signInGithub } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    try {
      setAuthError(null);
      setIsGoogleLoading(true);
      await signIn();
    } catch (error) {
      console.error('Sign in error:', error);
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
    } catch (error) {
      console.error('GitHub sign in error:', error);
      setAuthError('Failed to sign in with GitHub. Please try again.');
    } finally {
      setIsGithubLoading(false);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-gray-100/30 via-white/20 to-gray-100/30 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Professional Glass UI Decorative Elements */}
      
      {/* Top-left: Database schema card */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -8 }}
        animate={{ opacity: 1, y: 0, rotate: -8 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="absolute left-[5%] top-[12%] w-44 h-36 bg-white/50 backdrop-blur-2xl rounded-2xl border border-white/60 shadow-xl shadow-gray-200/30"
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

      {/* Top-right: Terminal card */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 6 }}
        animate={{ opacity: 1, y: 0, rotate: 6 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className="absolute right-[6%] top-[15%] w-48 h-32 bg-gray-900/90 backdrop-blur-2xl rounded-2xl border border-gray-700/50 shadow-2xl shadow-gray-900/20 overflow-hidden"
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

      {/* Bottom-left: Relationship connector card */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: -5 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="absolute left-[8%] bottom-[15%] w-40 h-28 bg-white/50 backdrop-blur-2xl rounded-2xl border border-white/60 shadow-xl shadow-gray-200/30"
      >
        <div className="p-3 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-12 h-8 bg-emerald-100 rounded-lg border border-emerald-200 flex items-center justify-center">
              <span className="text-[8px] font-semibold text-emerald-700">Orders</span>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-emerald-400 to-purple-400 mx-2 rounded-full" />
            <div className="w-12 h-8 bg-purple-100 rounded-lg border border-purple-200 flex items-center justify-center">
              <span className="text-[8px] font-semibold text-purple-700">Products</span>
            </div>
          </div>
          <div className="text-[9px] text-gray-500 text-center">Foreign Key Relationship</div>
        </div>
      </motion.div>

      {/* Bottom-right: Stats card */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 8 }}
        animate={{ opacity: 1, y: 0, rotate: 8 }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        className="absolute right-[5%] bottom-[18%] w-36 h-32 bg-white/50 backdrop-blur-2xl rounded-2xl border border-white/60 shadow-xl shadow-gray-200/30"
      >
        <div className="p-3 h-full flex flex-col">
          <div className="text-[10px] font-semibold text-gray-700 mb-2">Database Stats</div>
          <div className="space-y-2 flex-1">
            <div>
              <div className="flex justify-between text-[9px] text-gray-500 mb-0.5">
                <span>Tables</span>
                <span>12</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[9px] text-gray-500 mb-0.5">
                <span>Relations</span>
                <span>8</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating accent elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute left-[18%] top-[45%] w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute right-[15%] top-[52%] w-10 h-10 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 backdrop-blur-xl rounded-xl border border-white/40 shadow-lg rotate-12"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute left-[12%] top-[60%] w-8 h-8 bg-gradient-to-br from-amber-400/20 to-orange-400/20 backdrop-blur-xl rounded-lg border border-white/40 shadow-lg -rotate-6"
      />

      {/* Main Login Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md px-4 relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-lg">
            <Database className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-black">
            Schema View
          </span>
        </div>

        {/* Glass Card */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-gray-200/50 p-8 border border-white/50">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500 text-sm">
              Sign in to continue to your dashboard
            </p>
          </div>

          <div className="space-y-3">
            <GoogleLoginButton onClick={handleGoogleSignIn} isLoading={isGoogleLoading} />
            <GitHubLoginButton onClick={handleGithubSignIn} isLoading={isGithubLoading} />
          </div>

          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl"
            >
              <p className="text-sm text-red-600 text-center">{authError}</p>
            </motion.div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <p className="text-xs text-gray-400 text-center">
              By signing in, you agree to our{' '}
              <button
                onClick={() => router.push('/terms-of-service')}
                className="text-gray-600 hover:text-black transition-colors"
              >
                Terms
              </button>{' '}
              and{' '}
              <button
                onClick={() => router.push('/privacy-policy')}
                className="text-gray-600 hover:text-black transition-colors"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
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