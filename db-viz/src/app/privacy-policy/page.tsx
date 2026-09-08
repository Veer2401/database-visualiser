'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Database, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-gray-600 mb-8">Last updated: January 14, 2026</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to Schema View. We respect your privacy and are committed to protecting your personal data.
                  This privacy policy will inform you about how we look after your personal data when you visit our
                  website and use our services, and tell you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Information We Collect</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect and process the following information:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>
                    <strong>Account Information:</strong> When you sign in with Google, we collect your name, email
                    address, and profile picture from your Google account.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> We collect information about how you use our service, including
                    databases and tables you create, and interactions with the platform.
                  </li>
                  <li>
                    <strong>Technical Data:</strong> We collect IP addresses, browser type, device information,
                    and other technical data for analytics and security purposes.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>Provide and maintain our service</li>
                  <li>Authenticate your account and ensure security</li>
                  <li>Store and sync your database designs</li>
                  <li>Improve and optimize our service</li>
                  <li>Communicate with you about updates and changes</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Data Storage and Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your data is stored securely using Firebase and Google Cloud Platform. We implement appropriate
                  technical and organizational measures to protect your personal data against unauthorized or
                  unlawful processing, accidental loss, destruction, or damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Data Sharing</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information with:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>Service providers who help us operate our platform (e.g., Firebase, Google Cloud)</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Export your data</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to track activity on our service and store
                  certain information. You can instruct your browser to refuse all cookies or to indicate when
                  a cookie is being sent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Changes to This Policy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by
                  posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:privacy@schemaview.app" className="text-black underline hover:text-gray-700">
                    privacy@schemaview.app
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
