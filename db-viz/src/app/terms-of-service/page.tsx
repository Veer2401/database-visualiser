'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, FileText, CheckCircle2, Mail } from 'lucide-react';
import SchemaViewLogo from '@/components/common/SchemaViewLogo';

export default function TermsOfServicePage() {
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
              href="/privacy-policy"
              className="text-xs font-medium text-[#565c59] hover:text-[#38AA78] transition-colors hidden sm:block"
            >
              Privacy Policy
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
              <pattern id="terms-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#terms-grid)" />
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
              <FileText className="w-3.5 h-3.5 text-[#38AA78]" />
              <span>LEGAL AGREEMENT</span>
            </div>
            <h1 className="sv-display text-3xl sm:text-5xl font-bold text-[#07110b] tracking-tight">
              Terms of Service
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
            {/* Agreement to Terms */}
            <section className="space-y-3">
              <h2 className="sv-display text-base sm:text-lg font-bold text-[#07110b] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#f3f5f4] border border-[#dce1de] flex items-center justify-center text-xs font-mono text-[#38AA78]">
                  1
                </span>
                Agreement to Terms
              </h2>
              <p className="sv-body text-xs sm:text-sm text-[#565c59] leading-relaxed">
                By accessing and using Schema View, you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited
                from using or accessing this service.
              </p>
            </section>

            <hr className="border-[#dce1de]" />

            {/* Use License */}
            <section className="space-y-3">
              <h2 className="sv-display text-base sm:text-lg font-bold text-[#07110b] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#f3f5f4] border border-[#dce1de] flex items-center justify-center text-xs font-mono text-[#38AA78]">
                  2
                </span>
                Use License
              </h2>
              <p className="sv-body text-xs sm:text-sm text-[#565c59] leading-relaxed">
                Permission is granted to temporarily use Schema View for personal and commercial purposes.
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#565c59] pl-2">
                {[
                  'Modify, decompile, or copy the underlying proprietary platform binaries.',
                  'Use the materials for any commercial purpose without authorized account tiering.',
                  'Attempt to reverse engineer or scrape any algorithmic schemas or APIs contained in Schema View.',
                  'Remove any copyright, trademark, or proprietary notations from exported artifacts.',
                  'Transfer materials to another person or "mirror" the software infrastructure on another server.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38AA78] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <hr className="border-[#dce1de]" />

            {/* User Accounts */}
            <section className="space-y-3">
              <h2 className="sv-display text-base sm:text-lg font-bold text-[#07110b] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#f3f5f4] border border-[#dce1de] flex items-center justify-center text-xs font-mono text-[#38AA78]">
                  3
                </span>
                User Accounts
              </h2>
              <p className="sv-body text-xs sm:text-sm text-[#565c59] leading-relaxed">
                When you create an account with us, you must provide accurate, complete, and current information.
                Failure to do so constitutes a breach of the Terms, which may result in immediate suspension of
                your database workspace.
              </p>
              <p className="sv-body text-xs sm:text-sm text-[#565c59] leading-relaxed">
                You are responsible for safeguarding your authentication credentials and for any activities executed
                under your session. You must notify us immediately upon becoming aware of any unauthorized access.
              </p>
            </section>

            <hr className="border-[#dce1de]" />

            {/* Acceptable Use */}
            <section className="space-y-3">
              <h2 className="sv-display text-base sm:text-lg font-bold text-[#07110b] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#f3f5f4] border border-[#dce1de] flex items-center justify-center text-xs font-mono text-[#38AA78]">
                  4
                </span>
                Acceptable Use
              </h2>
              <p className="sv-body text-xs sm:text-sm text-[#565c59] leading-relaxed">
                You agree not to use Schema View:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  'For any unlawful purpose or violation of applicable regulations.',
                  'To infringe upon or violate intellectual property rights.',
                  'To transmit viruses, malicious code, or corrupted payload scripts.',
                  'To execute unauthorized network probing, scraping, or spamming.',
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#f3f5f4] border border-[#dce1de] rounded-xl text-xs text-[#565c59] flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38AA78] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-[#dce1de]" />

            {/* User Content & Schemas */}
            <section className="space-y-3">
              <h2 className="sv-display text-base sm:text-lg font-bold text-[#07110b] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#f3f5f4] border border-[#dce1de] flex items-center justify-center text-xs font-mono text-[#38AA78]">
                  5
                </span>
                User Content & Ownership
              </h2>
              <p className="sv-body text-xs sm:text-sm text-[#565c59] leading-relaxed">
                <strong>You retain 100% ownership</strong> of all database designs, table structures, relationships, and queries
                created using Schema View. We do not claim ownership of your intellectual property. By using our service,
                you grant us only the necessary technical permissions to store, synchronize, and display your schemas for you.
              </p>
            </section>

            <hr className="border-[#dce1de]" />

            {/* Service Availability & Disclaimers */}
            <section className="space-y-3">
              <h2 className="sv-display text-base sm:text-lg font-bold text-[#07110b] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#f3f5f4] border border-[#dce1de] flex items-center justify-center text-xs font-mono text-[#38AA78]">
                  6
                </span>
                Availability & Disclaimers
              </h2>
              <p className="sv-body text-xs sm:text-sm text-[#565c59] leading-relaxed">
                The service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind.
                While we maintain high availability and real-time syncing standards, Schema View will not be liable for any
                indirect, incidental, special, or consequential damages resulting from downtime or connection interruptions.
              </p>
            </section>

            <hr className="border-[#dce1de]" />

            {/* Contact Information */}
            <section className="p-4 sm:p-5 bg-[#f3f5f4] border border-[#dce1de] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-[#07110b] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#38AA78]" />
                  Legal Questions?
                </h3>
                <p className="text-xs text-[#858b8c] mt-0.5">
                  Reach out to our legal and compliance desk directly.
                </p>
              </div>
              <a
                href="mailto:legal@schemaview.app"
                className="px-4 py-2 bg-[#041c15] text-white text-xs font-medium rounded-full hover:bg-[#122b22] transition-all text-center shrink-0 shadow-sm"
              >
                legal@schemaview.app
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
            <Link href="/terms-of-service" className="text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="text-white/60 hover:text-white transition-colors">
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
