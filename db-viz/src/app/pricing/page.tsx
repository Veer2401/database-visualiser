'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import Button from '@/components/common/Button';
import SchemaViewLogo from '@/components/common/SchemaViewLogo';

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
        <div className="min-h-screen bg-[#f3f5f4] text-[#07110b]">
            {/* Header */}
            <header className="border-b border-[#e2e6e3] bg-[#f3f5f4]/95 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-xl text-[#565c59] hover:bg-[#e8ebe9] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <Link href="/" className="flex items-center gap-2.5">
                        <SchemaViewLogo size={28} />
                        <span className="sv-display text-[17px] font-bold tracking-[-0.02em]">SCHEMA VIEW</span>
                    </Link>
                    </div>
                    <button onClick={() => router.push('/login')} className="rounded-full bg-[#041c15] px-5 py-2.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity">
                        Sign In
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Title */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-center mb-12"
                    >
                        <h2 className="sv-display text-3xl md:text-5xl font-bold text-[#07110b] mb-4">
                            Pricing
                        </h2>
                        <p className="sv-body text-[#565c59] max-w-2xl mx-auto">
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
                                className={`relative p-6 sm:p-8 rounded-[22px] text-left flex flex-col border transition-all ${plan.primary
                                        ? 'border-[#041c15] shadow-[0_12px_36px_rgba(7,17,11,0.1)]'
                                        : 'border-[rgba(7,17,11,0.08)] hover:border-[#38AA78]'
                                    } bg-[#e8ebe9]`}
                            >
                                <div className="relative z-10 flex flex-col h-full">
                                    {plan.tag && (
                                        <span className="inline-block w-fit mb-4 px-3 py-1 rounded-full bg-[#041c15] text-white text-xs font-medium">
                                            {plan.tag}
                                        </span>
                                    )}
                                    <h3 className="sv-display text-xl font-semibold text-[#07110b] mb-1">
                                        {plan.name}
                                    </h3>
                                    <p className="sv-display text-4xl font-bold text-[#07110b] mt-2">
                                        ${plan.price}<span className="text-base font-normal text-[#858b8c]">/mo</span>
                                    </p>
                                    <p className="sv-body text-sm text-[#565c59] mt-4">
                                        {plan.description}
                                    </p>
                                    <ul className="mt-6 space-y-3 flex-1">
                                        {plan.features.map((f, j) => (
                                            <li key={j} className="flex items-center gap-2 text-sm text-[#565c59]">
                                                <Check className="w-4 h-4 text-[#38AA78] flex-shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        variant={plan.primary ? 'primary' : 'secondary'}
                                        size="md"
                                        className={`mt-8 w-full !rounded-full ${plan.primary ? '!bg-[#041c15] !text-white hover:!bg-[#122b22]' : '!bg-[#f3f5f4] !text-[#07110b] hover:!bg-white !border-[#dce1de]'} ${plan.isCurrent ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                        <p className="sv-body text-[#858b8c] text-sm">
                            Need help choosing a plan?{' '}
                            <a href="mailto:support@schemaview.app" className="text-[#07110b] font-medium hover:text-[#38AA78] hover:underline">
                                Contact us
                            </a>
                        </p>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
