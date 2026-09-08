'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import Button from '@/components/common/Button';

const PLANS = [
    {
        name: 'Free',
        price: 0,
        tag: null,
        description: 'Perfect for learning and side projects.',
        features: ['Up to 3 databases', '10 tables per database', 'Visual editor & canvas', 'SQL terminal (read-only)', 'Community support'],
        cta: 'Current Plan',
        primary: false,
        isCurrent: true,
    },
    {
        name: 'Pro',
        price: 12,
        tag: 'Popular',
        description: 'For developers and small teams shipping real products.',
        features: ['Unlimited databases & tables', 'Full SQL terminal (read/write)', 'Export to SQL, DOCX, PDF', 'Presentation mode', 'Priority support'],
        cta: 'Upgrade to Pro',
        primary: true,
        isCurrent: false,
    },
    {
        name: 'Team',
        price: 29,
        tag: null,
        description: 'Collaboration and governance for growing teams.',
        features: ['Everything in Pro', 'Team workspace', 'Shared schemas & export', 'Audit log', 'Dedicated support'],
        cta: 'Contact Sales',
        primary: false,
        isCurrent: false,
    },
];

export default function PricingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h1 className="text-lg font-medium text-gray-900" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        Pricing Plans
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Title */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-center mb-12"
                    >
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pricing</span>
                        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-3 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Simple, transparent pricing
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Start free. Upgrade when you need more.
                        </p>
                    </motion.div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {PLANS.map((plan, i) => (
                            <motion.div
                                key={plan.name}
                                initial={{ y: 24, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1, type: 'spring', stiffness: 400, damping: 30 }}
                                whileHover={{ y: -4 }}
                                className={`relative p-6 sm:p-8 rounded-2xl text-left flex flex-col border-2 transition-all ${plan.primary
                                        ? 'border-gray-900 shadow-xl'
                                        : 'border-gray-200 hover:border-gray-300'
                                    } bg-white`}
                            >
                                <div className="relative z-10 flex flex-col h-full">
                                    {plan.tag && (
                                        <span className="inline-block w-fit mb-4 px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-medium">
                                            {plan.tag}
                                        </span>
                                    )}
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        {plan.name}
                                    </h3>
                                    <p className="text-3xl font-light text-gray-900 mt-2">
                                        ${plan.price}<span className="text-base font-normal text-gray-500">/mo</span>
                                    </p>
                                    <p className="text-sm text-gray-600 mt-4 font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        {plan.description}
                                    </p>
                                    <ul className="mt-6 space-y-3 flex-1">
                                        {plan.features.map((f, j) => (
                                            <li key={j} className="flex items-center gap-2 text-sm text-gray-700 font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        variant={plan.primary ? 'primary' : 'secondary'}
                                        size="md"
                                        className={`mt-8 w-full ${plan.isCurrent ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={plan.isCurrent}
                                        onClick={() => {
                                            if (!plan.isCurrent) {
                                                alert(`Upgrade to ${plan.name} plan coming soon!`);
                                            }
                                        }}
                                    >
                                        {plan.cta}
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* FAQ or additional info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 text-center"
                    >
                        <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Need help choosing a plan?{' '}
                            <a href="mailto:support@schemaview.app" className="text-gray-900 font-medium hover:underline">
                                Contact us
                            </a>
                        </p>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
