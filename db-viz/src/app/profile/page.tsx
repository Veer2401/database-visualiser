'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  User,
  Mail,
  Crown,
  ArrowUpRight,
  Database,
  LogOut,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Landing-aligned Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/80 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Official Brand Unit */}
          <div
            onClick={() => router.push('/')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center shadow-sm">
              <Database className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-sm font-semibold text-gray-900 tracking-tight"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              Schema View
            </span>
          </div>

          <span className="text-gray-300 text-sm hidden sm:inline">/</span>
          <span
            className="text-sm font-light text-gray-500 hidden sm:inline"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            Profile
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 hover:bg-black/5 text-xs font-medium text-black transition-colors cursor-pointer"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Header title */}
        <div className="mb-8">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1">
            Account & Identity
          </span>
          <h1
            className="text-3xl font-light text-black tracking-tight"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            Profile
          </h1>
        </div>

        {/* Split Layout: User Identity Card on Left, Current Plan on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: User Identity Card */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)] flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-5">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-18 h-18 rounded-2xl border border-gray-200 shadow-sm object-cover"
                    />
                  ) : (
                    <div className="w-18 h-18 rounded-2xl bg-black flex items-center justify-center shadow-sm text-white">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h2
                      className="text-2xl font-light text-black tracking-tight truncate"
                      style={{ fontFamily: 'var(--font-geist-sans)' }}
                    >
                      {user.displayName || 'Database Designer'}
                    </h2>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium"
                        style={{ fontFamily: 'var(--font-geist-sans)' }}
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Schema View Member
                      </span>
                    </div>
                  </div>
                </div>

                {/* Internal Divider */}
                <div className="border-t border-gray-100 my-6" />

                {/* Information Rows */}
                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50/80 border border-gray-200/70">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200/80 flex items-center justify-center text-gray-600 shadow-2xs">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">
                          Full Name
                        </span>
                        <span
                          className="text-xs font-medium text-gray-900"
                          style={{ fontFamily: 'var(--font-geist-sans)' }}
                        >
                          {user.displayName || 'Not specified'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50/80 border border-gray-200/70">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200/80 flex items-center justify-center text-gray-600 shadow-2xs shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">
                          Email Address
                        </span>
                        <span
                          className="text-xs font-medium text-gray-900 truncate block max-w-[200px] sm:max-w-xs"
                          style={{ fontFamily: 'var(--font-geist-sans)' }}
                        >
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium shrink-0">
                      <Check className="w-3.5 h-3.5" /> Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="w-full mt-6 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-black/10 text-black hover:bg-black/5 transition-colors text-xs font-medium cursor-pointer"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Current Plan Card (Shifted in place of Architecture Preview) */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col"
          >
            <div
              className="rounded-2xl p-6 sm:p-7 relative overflow-hidden text-white flex flex-col h-full justify-between"
              style={{
                background: 'linear-gradient(145deg, #262626 0%, #171717 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 40px -12px rgba(0,0,0,0.4)',
              }}
            >
              <div className="relative z-10 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-0.5 rounded-full bg-white/10 text-gray-200 text-xs font-medium border border-white/20">
                    Current Plan
                  </span>
                  <Crown className="w-4 h-4 text-amber-400" />
                </div>

                <h3
                  className="text-2xl font-light text-white mb-1 tracking-tight"
                  style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                  Free Tier
                </h3>
                <div className="flex items-baseline gap-1 mt-1 mb-3">
                  <span className="text-3xl font-light text-white tracking-tight">$0</span>
                  <span className="text-xs text-gray-400 font-light">/ month</span>
                </div>
                <p
                  className="text-xs text-gray-400 font-light leading-relaxed"
                  style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                  Up to 3 databases, 10 tables each with interactive schema modeling, AI assistance, and instant SQL exports.
                </p>

                <div className="border-t border-white/10 my-5" />

                {/* Features List */}
                <div className="space-y-3">
                  <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">
                    Plan Inclusions
                  </span>
                  <ul className="space-y-2.5">
                    {[
                      'Up to 3 PostgreSQL databases',
                      '10 tables per database canvas',
                      'Visual schema builder & relation modeling',
                      'Direct export to SQL, DOCX, and PDF',
                      'DB Composer AI assistant integration',
                    ].map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 text-xs text-gray-300 font-light"
                        style={{ fontFamily: 'var(--font-geist-sans)' }}
                      >
                        <span className="text-white">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Upgrade CTA */}
              <div className="relative z-10 mt-6 pt-2">
                <button
                  onClick={() => router.push('/pricing')}
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full !bg-white !text-black hover:!bg-gray-100 transition-colors text-xs font-medium cursor-pointer shadow-sm"
                  style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                  <span>Upgrade to Pro</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
