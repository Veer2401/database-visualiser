'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Database, ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/settings"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-black">Schema View</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 mb-8">Last updated: January 14, 2026</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Agreement to Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By accessing and using Schema View, you agree to be bound by these Terms of Service and all
                  applicable laws and regulations. If you do not agree with any of these terms, you are prohibited
                  from using or accessing this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Use License</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Permission is granted to temporarily use Schema View for personal and commercial purposes.
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose without proper authorization</li>
                  <li>Attempt to reverse engineer any software contained in Schema View</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">User Accounts</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you create an account with us, you must provide accurate, complete, and current information.
                  Failure to do so constitutes a breach of the Terms, which may result in immediate termination of
                  your account.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You are responsible for safeguarding your account and for any activities or actions under your account.
                  You must notify us immediately upon becoming aware of any breach of security or unauthorized use of
                  your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Acceptable Use</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree not to use Schema View:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                  <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  <li>For any obscene or immoral purpose</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The service and its original content, features, and functionality are and will remain the exclusive
                  property of Schema View and its licensors. The service is protected by copyright, trademark, and
                  other laws of both the United States and foreign countries.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">User Content</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You retain all rights to the database designs, schemas, and other content you create using Schema View.
                  By using our service, you grant us a license to store, display, and process your content solely for the
                  purpose of providing the service to you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Service Availability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We strive to provide uninterrupted service, but we do not guarantee that the service will be available
                  at all times. We may experience hardware, software, or other problems or need to perform maintenance
                  related to the service, resulting in interruptions, delays, or errors.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In no event shall Schema View, nor its directors, employees, partners, agents, suppliers, or affiliates,
                  be liable for any indirect, incidental, special, consequential, or punitive damages, including without
                  limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access
                  to or use of or inability to access or use the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Disclaimer</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE"
                  basis. The service is provided without warranties of any kind, whether express or implied, including,
                  but not limited to, implied warranties of merchantability, fitness for a particular purpose,
                  non-infringement, or course of performance.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Termination</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason
                  whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use
                  the service will immediately cease.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will
                  provide notice of any material changes by posting the new Terms on this page and updating the
                  "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Governing Law</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which
                  Schema View operates, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us at{' '}
                  <a href="mailto:legal@schemaview.app" className="text-black underline hover:text-gray-700">
                    legal@schemaview.app
                  </a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black text-gray-500">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">© 2026 Schema View. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
