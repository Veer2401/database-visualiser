'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2, Mail, Server } from 'lucide-react';
import SchemaViewLogo from '@/components/common/SchemaViewLogo';

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f3f5f4] text-[#07110b] flex flex-col justify-between" style={{ fontFamily: 'var(--font-geist-sans)' }}>
      {/* ── Fixed Top Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#f3f5f4]/95 backdrop-blur-xl border-b border-[#e2e6e3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-xl text-[#565c59] hover:text-[#07110b] hover:bg-[#e8ebe9] transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <Link href="/" className="flex items-center gap-2.5">
              <SchemaViewLogo size={28} />
              <span className="sv-display text-[17px] font-bold tracking-[-0.02em]">
                SCHEMA VIEW
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/terms-of-service"
              className="text-xs font-medium text-[#565c59] hover:text-[#38AA78] transition-colors hidden sm:block"
            >
              Terms of Service
            </Link>
            <Link
              href="/login"
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#041c15] hover:bg-[#122b22] rounded-full transition-all shadow-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Main Content Container ── */}
      <div className="relative pt-24 pb-16 px-4 flex-1">
        {/* Subtle Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="privacy-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#privacy-grid)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8ebe9] border border-[#dce1de] text-[#565c59] text-xs font-mono font-medium mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#38AA78]" />
              <span>DATA PROTECTION & PRIVACY</span>
            </div>
            <h1 className="sv-display text-3xl sm:text-5xl font-bold text-[#07110b] tracking-tight">
              Privacy Policy
            </h1>
            <p className="sv-body text-xs sm:text-sm text-[#858b8c] mt-1.5">
              Last updated: January 14, 2026 · Effective immediately
            </p>
          </motion.div>

          {/* Document Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
            className="bg-[#e8ebe9] rounded-[22px] border border-[rgba(7,17,11,0.08)] shadow-[0_12px_36px_rgba(7,17,11,0.06)] p-6 sm:p-10 space-y-8"
          >
            {/* Introduction */}
            <section className="space-y-3">
              <h2 className="sv-display text-base sm:text-lg font-bold text-[#07110b] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#f3f5f4] border border-[#dce1de] flex items-center justify-center text-xs font-mono text-[#38AA78]">
                  1
                </span>
                Introduction
              </h2>
              <p className="sv-body text-xs sm:text-sm text-[#565c59] leading-relaxed">
                Welcome to Schema View. We respect your privacy and are committed to protecting your personal data.
                This Privacy Policy describes how we process your information when you access our visual database platform,
                use our web applications, or interact with our services.
              </p>
            </section>

            <hr className="border-[#dce1de]" />

            {/* Information We Collect */}
            <section className="space-y-3">
              <h2 className="sv-display text-base sm:text-lg font-bold text-[#07110b] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#f3f5f4] border border-[#dce1de] flex items-center justify-center text-xs font-mono text-[#38AA78]">
                  2
                </span>
                Information We Collect
              </h2>
              <p className="sv-body text-xs sm:text-sm text-[#565c59] leading-relaxed">
                We collect only the minimum required information to provide a performant visual database design experience:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 bg-[#f3f5f4] border border-[#dce1de] rounded-xl space-y-1.5">
                  <p className="text-xs font-bold text-[#07110b] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#38AA78]" />
                    Account Data
                  </p>
                  <p className="text-[11px] text-[#565c59] leading-relaxed">
                    Name, email address, and OAuth tokens (Google / GitHub) needed for authentication and workspace sessions.
                  </p>
                </div>

                <div className="p-3.5 bg-[#f3f5f4] border border-[#dce1de] rounded-xl space-y-1.5">
                  <p className="text-xs font-bold text-[#07110b] flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-[#38AA78]" />
                    Schema Metadata
                  </p>
                  <p className="text-[11px] text-[#565c59] leading-relaxed">
                    Table definitions, column types, foreign keys, coordinates, and notes stored securely in Firebase.
                  </p>
                </div>

                <div className="p-3.5 bg-[#f3f5f4] border border-[#dce1de] rounded-xl space-y-1.5">
                  <p className="text-xs font-bold text-[#07110b] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#38AA78]" />
                    Telemetry
                  </p>
                  <p className="text-[11px] text-[#565c59] leading-relaxed">
                    Browser type, crash telemetry, and connection status strictly used to ensure schema sync stability.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-[#dce1de]" />

            {/* How We Use Your Information */}
            <section className="space-y-3">
              <h2 className="sv-display text-base sm:text-lg font-bold text-[#07110b] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#f3f5f4] border border-[#dce1de] flex items-center justify-center text-xs font-mono text-[#38AA78]">
                  3
                </span>
                How We Use Your Information
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[#565c59] pl-2">
                {[
                  'Authenticate your account and maintain active workspace sessions.',
                  'Synchronize schemas, layout node positions, and ERD relationships in real time.',
                  'Execute client-side SQL generation and database exports (SQL, PDF, Word).',
                  'Send critical security verification codes and password reset links.',
                  'Comply with security standards and prevent fraudulent abuse.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38AA78] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <hr className="border-[#dce1de]" />

            {/* Data Storage & Security */}
            <section className="space-y-3">
              <h2 className="sv-display text-base sm:text-lg font-bold text-[#07110b] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#f3f5f4] border border-[#dce1de] flex items-center justify-center text-xs font-mono text-[#38AA78]">
                  4
                </span>
                Data Storage & Encryption
              </h2>
              <p className="sv-body text-xs sm:text-sm text-[#565c59] leading-relaxed">
                All workspace data and schema diagrams are stored securely using Google Cloud Platform and Firebase Firestore.
                Data is encrypted both in transit (TLS 1.3) and at rest (AES-256). We never sell, rent, or trade your data
                with third-party advertisers.
              </p>
            </section>

            <hr className="border-[#dce1de]" />

            {/* Your Rights */}
            <section className="space-y-3">
              <h2 className="sv-display text-base sm:text-lg font-bold text-[#07110b] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#f3f5f4] border border-[#dce1de] flex items-center justify-center text-xs font-mono text-[#38AA78]">
                  5
                </span>
                Your Rights & Data Portability
              </h2>
              <p className="sv-body text-xs sm:text-sm text-[#565c59] leading-relaxed">
                Under applicable privacy regulations (including GDPR and CCPA), you have the right to:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  'Export your entire database schema and SQL scripts at any time.',
                  'Request full deletion of your account and all associated schemas.',
                  'Access a complete copy of personal records held in your account.',
                  'Revoke OAuth permissions via Google or GitHub settings.',
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#f3f5f4] border border-[#dce1de] rounded-xl text-xs text-[#565c59] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38AA78] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-[#dce1de]" />

            {/* Contact Information */}
            <section className="p-4 sm:p-5 bg-[#f3f5f4] border border-[#dce1de] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-[#07110b] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#38AA78]" />
                  Privacy Inquiries
                </h3>
                <p className="text-xs text-[#858b8c] mt-0.5">
                  Have questions or requests regarding your data? Contact our Data Protection Officer.
                </p>
              </div>
              <a
                href="mailto:privacy@schemaview.app"
                className="px-4 py-2 bg-[#041c15] text-white text-xs font-medium rounded-full hover:bg-[#122b22] transition-all text-center shrink-0 shadow-sm"
              >
                privacy@schemaview.app
              </a>
            </section>
          </motion.div>
        </div>
      </div>

      {/* ── Footer (Matching Landing Page & Dashboard Dark Theme) ── */}
      <footer className="py-6 px-4 bg-[#041c15] border-t border-white/10 text-white/60 text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <SchemaViewLogo size={24} />
            <span className="font-semibold text-white tracking-tight">SCHEMA VIEW</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-5">
            <Link href="/terms-of-service" className="text-white/60 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/login" className="text-white/60 hover:text-white transition-colors">
              Sign In
            </Link>
            <span className="text-white/40">© {new Date().getFullYear()} Schema View Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
