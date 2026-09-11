'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Database, ArrowLeft, Shield, FileText, CheckCircle2, Mail } from 'lucide-react';

export default function TermsOfServicePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between" style={{ fontFamily: 'var(--font-geist-sans)' }}>
      {/* ── Fixed Top Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-xl text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center shadow-sm">
                <Database className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-black tracking-tight">
                Schema View
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/privacy-policy"
              className="text-xs font-medium text-gray-500 hover:text-black transition-colors hidden sm:block"
            >
              Privacy Policy
            </Link>
            <Link
              href="/login"
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-black hover:bg-gray-900 rounded-xl transition-all shadow-sm"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700 text-xs font-mono font-medium mb-3">
              <FileText className="w-3.5 h-3.5 text-black" />
              <span>LEGAL AGREEMENT</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
              Last updated: January 14, 2026 · Effective immediately
            </p>
          </motion.div>

          {/* Document Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 space-y-8"
          >
            {/* Agreement to Terms */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-mono text-gray-800">
                  1
                </span>
                Agreement to Terms
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                By accessing and using Schema View, you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited
                from using or accessing this service.
              </p>
            </section>

            <hr className="border-gray-100" />

            {/* Use License */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-mono text-gray-800">
                  2
                </span>
                Use License
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Permission is granted to temporarily use Schema View for personal and commercial purposes.
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 pl-2">
                {[
                  'Modify, decompile, or copy the underlying proprietary platform binaries.',
                  'Use the materials for any commercial purpose without authorized account tiering.',
                  'Attempt to reverse engineer or scrape any algorithmic schemas or APIs contained in Schema View.',
                  'Remove any copyright, trademark, or proprietary notations from exported artifacts.',
                  'Transfer materials to another person or "mirror" the software infrastructure on another server.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <hr className="border-gray-100" />

            {/* User Accounts */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-mono text-gray-800">
                  3
                </span>
                User Accounts
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                When you create an account with us, you must provide accurate, complete, and current information.
                Failure to do so constitutes a breach of the Terms, which may result in immediate suspension of
                your database workspace.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                You are responsible for safeguarding your authentication credentials and for any activities executed
                under your session. You must notify us immediately upon becoming aware of any unauthorized access.
              </p>
            </section>

            <hr className="border-gray-100" />

            {/* Acceptable Use */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-mono text-gray-800">
                  4
                </span>
                Acceptable Use
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                You agree not to use Schema View:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  'For any unlawful purpose or violation of applicable regulations.',
                  'To infringe upon or violate intellectual property rights.',
                  'To transmit viruses, malicious code, or corrupted payload scripts.',
                  'To execute unauthorized network probing, scraping, or spamming.',
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* User Content & Schemas */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-mono text-gray-800">
                  5
                </span>
                User Content & Ownership
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <strong>You retain 100% ownership</strong> of all database designs, table structures, relationships, and queries
                created using Schema View. We do not claim ownership of your intellectual property. By using our service,
                you grant us only the necessary technical permissions to store, synchronize, and display your schemas for you.
              </p>
            </section>

            <hr className="border-gray-100" />

            {/* Service Availability & Disclaimers */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-mono text-gray-800">
                  6
                </span>
                Availability & Disclaimers
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                The service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind.
                While we maintain high availability and real-time syncing standards, Schema View will not be liable for any
                indirect, incidental, special, or consequential damages resulting from downtime or connection interruptions.
              </p>
            </section>

            <hr className="border-gray-100" />

            {/* Contact Information */}
            <section className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-black flex items-center gap-2">
                  <Mail className="w-4 h-4 text-black" />
                  Legal Questions?
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Reach out to our legal and compliance desk directly.
                </p>
              </div>
              <a
                href="mailto:legal@schemaview.app"
                className="px-4 py-2 bg-black text-white text-xs font-medium rounded-xl hover:bg-gray-900 transition-all text-center shrink-0 shadow-sm"
              >
                legal@schemaview.app
              </a>
            </section>
          </motion.div>
        </div>
      </div>

      {/* ── Footer (Matching Landing Page & Dashboard Dark Theme) ── */}
      <footer className="py-6 px-4 bg-gray-950 border-t border-gray-800 text-gray-400 text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center shrink-0">
              <Database className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="font-semibold text-white tracking-tight">Schema View</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-5">
            <Link href="/terms-of-service" className="text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <span className="text-gray-500">© {new Date().getFullYear()} Schema View Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
