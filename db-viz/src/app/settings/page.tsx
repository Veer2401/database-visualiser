'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Settings as SettingsIcon,
    User,
    Database,
    CreditCard,
    Info,
    LogOut,
    Check,
    Loader2,
    Palette,
    ExternalLink,
    Sparkles,
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged, User as FirebaseUser, updateProfile } from 'firebase/auth';
import { FONT_OPTIONS } from '@/components/common/FontProvider';

type SettingsSection = 'general' | 'account' | 'appearance' | 'database' | 'billing' | 'about';

interface NavItem {
    id: SettingsSection;
    label: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'account', label: 'Account', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'about', label: 'About', icon: Info },
];

export default function SettingsPage() {
    const router = useRouter();
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState<SettingsSection>('general');
    const [displayName, setDisplayName] = useState('');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [autoSave, setAutoSave] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [currentFont, setCurrentFont] = useState('');

    useEffect(() => {
        setCurrentFont(localStorage.getItem('app-font') || '');
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser?.displayName) {
                setDisplayName(currentUser.displayName);
            }
            if (!currentUser) {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleSaveDisplayName = async () => {
        if (!user || !displayName.trim()) return;

        setSaving(true);
        setSaveSuccess(false);

        try {
            await updateProfile(user, {
                displayName: displayName.trim(),
            });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Error updating display name:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleFontChange = (fontValue: string) => {
        setCurrentFont(fontValue);
        if (fontValue) {
            localStorage.setItem('app-font', fontValue);
            document.body.style.setProperty('--font-geist-sans', fontValue);
        } else {
            localStorage.removeItem('app-font');
            document.body.style.removeProperty('--font-geist-sans');
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

    const renderContent = () => {
        switch (activeSection) {
            case 'general':
                return (
                    <div className="space-y-6">
                        {/* Auto Save */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <div className="flex items-center justify-between gap-6">
                                <div className="space-y-1">
                                    <h3 className="text-base font-normal text-black" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Auto Save
                                    </h3>
                                    <p className="text-sm font-light text-gray-500 max-w-md" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Automatically sync and persist changes to your PostgreSQL database schemas in real time.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={autoSave}
                                    onClick={() => setAutoSave(!autoSave)}
                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                                        autoSave ? 'bg-black' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                            autoSave ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Email Notifications */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <div className="flex items-center justify-between gap-6">
                                <div className="space-y-1">
                                    <h3 className="text-base font-normal text-black" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Email Notifications
                                    </h3>
                                    <p className="text-sm font-light text-gray-500 max-w-md" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Receive project updates, shared schema invitations, and account security notifications.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={notificationsEnabled}
                                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                                        notificationsEnabled ? 'bg-black' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                            notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Browser Notifications */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <div className="flex items-center justify-between gap-6">
                                <div className="space-y-1">
                                    <h3 className="text-base font-normal text-black" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Browser Notifications
                                    </h3>
                                    <p className="text-sm font-light text-gray-500 max-w-md" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Get instant desktop alerts when complex SQL executions and schema exports finish.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={false}
                                    disabled
                                    className="relative inline-flex h-6 w-11 shrink-0 cursor-not-allowed rounded-full border-2 border-transparent bg-gray-200 transition-colors opacity-60"
                                >
                                    <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 translate-x-0" />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'account':
                return (
                    <div className="space-y-6">
                        {/* Profile Info */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <h3 className="text-base font-normal text-black mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                Profile
                            </h3>
                            <p className="text-sm font-light text-gray-500 mb-6" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                Your public identification within Schema View.
                            </p>

                            <div className="flex items-center gap-5">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || 'User'}
                                        className="w-16 h-16 rounded-full border border-gray-200 object-cover shadow-sm"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white shadow-sm">
                                        <User className="w-7 h-7" />
                                    </div>
                                )}
                                <div className="space-y-1">
                                    <p className="text-base font-medium text-black" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        {user.displayName || 'User'}
                                    </p>
                                    <p className="text-sm font-light text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Display Name */}
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <div className="p-6 sm:p-7">
                                <h3 className="text-base font-normal text-black mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Display Name
                                </h3>
                                <p className="text-sm font-light text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Your team will see this name across shared schemas and comments.
                                </p>
                                <div className="max-w-md">
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value.slice(0, 32))}
                                        maxLength={32}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-black text-sm placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all hover:border-gray-300"
                                        style={{ fontFamily: 'var(--font-geist-sans)' }}
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>
                            <div className="px-6 sm:px-7 py-3.5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                                <p className="text-xs font-light text-gray-400" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    {displayName.length}/32 characters
                                </p>
                                <button
                                    onClick={handleSaveDisplayName}
                                    disabled={saving || !displayName.trim()}
                                    className={`px-5 py-2 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 ${
                                        saveSuccess
                                            ? 'bg-emerald-600 text-white shadow-sm'
                                            : 'bg-black text-white hover:bg-black/90 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm'
                                    }`}
                                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            Saving...
                                        </>
                                    ) : saveSuccess ? (
                                        <>
                                            <Check className="w-3.5 h-3.5" />
                                            Saved
                                        </>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <h3 className="text-base font-normal text-black mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                Account Email
                            </h3>
                            <p className="text-sm font-light text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                Primary email for login authentication and recovery.
                            </p>
                            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 max-w-md">
                                <span className="text-sm font-light text-gray-800" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    {user.email}
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                                    <Check className="w-3.5 h-3.5" /> Verified
                                </span>
                            </div>
                        </div>

                        {/* Sign Out */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-normal text-black mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Sign Out
                                    </h3>
                                    <p className="text-sm font-light text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        End your active session on this device.
                                    </p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-5 py-2 text-xs font-medium rounded-full border border-black/10 text-black hover:bg-black/5 transition-colors"
                                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'appearance':
                return (
                    <div className="space-y-6">
                        {/* Font Selection */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <h3 className="text-base font-normal text-black mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                Interface Typography
                            </h3>
                            <p className="text-sm font-light text-gray-500 mb-6" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                Select the font family used across the application canvas and controls.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {FONT_OPTIONS.map((font) => {
                                    const isSelected = currentFont === font.value;
                                    return (
                                        <button
                                            key={font.id}
                                            onClick={() => handleFontChange(font.value)}
                                            className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                                                isSelected
                                                    ? 'border-black bg-black/[0.03] ring-1 ring-black shadow-sm'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/80'
                                            }`}
                                        >
                                            <div>
                                                <span
                                                    className="text-sm font-normal text-black block"
                                                    style={{ fontFamily: font.value || 'var(--font-geist-sans)' }}
                                                >
                                                    {font.name}
                                                </span>
                                                <span className="text-xs text-gray-400 font-light block mt-0.5">
                                                    PostgreSQL Schema & Tables
                                                </span>
                                            </div>
                                            {isSelected && (
                                                <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );

            case 'database':
                return (
                    <div className="space-y-6">
                        {/* Export Format */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <h3 className="text-base font-normal text-black mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                Default Export Dialect
                            </h3>
                            <p className="text-sm font-light text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                Target SQL dialect when generating schema DDL exports.
                            </p>
                            <select className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-black text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black hover:border-gray-300 transition-colors w-full max-w-xs">
                                <option value="postgresql">PostgreSQL (Standard)</option>
                            </select>
                        </div>

                        {/* Default Column Type */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <h3 className="text-base font-normal text-black mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                Default Column Type
                            </h3>
                            <p className="text-sm font-light text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                Fallback data type pre-selected when adding new columns to a table.
                            </p>
                            <select className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-black text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black hover:border-gray-300 transition-colors w-full max-w-xs">
                                <option value="VARCHAR">VARCHAR</option>
                                <option value="INT">INT</option>
                                <option value="TEXT">TEXT</option>
                                <option value="BOOLEAN">BOOLEAN</option>
                            </select>
                        </div>
                    </div>
                );

            case 'billing':
                return (
                    <div className="space-y-6">
                        {/* Current Plan Overview Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium border border-gray-200 mb-2">
                                        Active Plan
                                    </span>
                                    <h3 className="text-2xl font-light text-black tracking-tight" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Free Tier
                                    </h3>
                                    <p className="text-sm font-light text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Up to 3 databases, 10 tables each, visual editor & read-only terminal.
                                    </p>
                                </div>
                                <span className="text-3xl font-light text-black">$0<span className="text-sm font-normal text-gray-400">/mo</span></span>
                            </div>
                        </div>

                        {/* Pro Upgrade Banner matching Landing Page Pro card */}
                        <div
                            className="relative p-6 sm:p-7 rounded-2xl text-left overflow-hidden"
                            style={{
                                background: 'linear-gradient(145deg, #262626 0%, #171717 100%)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.45)',
                            }}
                        >
                            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                <div>
                                    <span className="inline-block w-fit mb-3 px-3 py-1 rounded-full bg-white/10 text-gray-200 text-xs font-medium border border-white/20">
                                        Pro Plan
                                    </span>
                                    <h4 className="text-xl font-light text-white mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Unlock Unlimited Scale
                                    </h4>
                                    <p className="text-sm font-light text-gray-400 max-w-lg" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Unlimited databases, read/write SQL terminal, instant DOCX & PDF exports, presentation mode, and priority performance.
                                    </p>
                                </div>
                                <button
                                    onClick={() => router.push('/pricing')}
                                    className="shrink-0 rounded-full !bg-white !text-black hover:!bg-gray-100 px-6 py-2.5 text-xs font-medium transition-all shadow-md"
                                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                                >
                                    View Plans ($12/mo)
                                </button>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <h3 className="text-base font-normal text-black mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                Payment Method
                            </h3>
                            <p className="text-sm font-light text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                No payment method on file. You can attach a credit card when upgrading to Pro.
                            </p>
                        </div>
                    </div>
                );

            case 'about':
                return (
                    <div className="space-y-6">
                        {/* App Info */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center">
                                    <Database className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-base font-normal text-black" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Schema View
                                </span>
                            </div>
                            <p className="text-sm font-light text-gray-500 mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                Modern PostgreSQL schema design, visual table management, and interactive query workbench.
                            </p>
                            <div className="space-y-2 pt-4 border-t border-gray-100 text-xs font-light text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                <p>Version: 1.0.0 (Production Release)</p>
                                <p>Engine: PostgreSQL Visualizer & React Flow</p>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.06)]">
                            <span className="text-xs font-medium uppercase tracking-wider text-gray-400 block mb-4">
                                Documentation & Legal
                            </span>
                            <div className="divide-y divide-gray-100">
                                {[
                                    { name: 'Documentation', href: '/documentation' },
                                    { name: 'Privacy Policy', href: '/privacy-policy' },
                                    { name: 'Terms of Service', href: '/terms-of-service' },
                                ].map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="py-3 flex items-center justify-between text-sm font-light text-gray-700 hover:text-black transition-colors"
                                        style={{ fontFamily: 'var(--font-geist-sans)' }}
                                    >
                                        <span>{link.name}</span>
                                        <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

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
                        <span className="text-sm font-semibold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Schema View
                        </span>
                    </div>

                    <span className="text-gray-300 text-sm hidden sm:inline">/</span>
                    <span className="text-sm font-light text-gray-500 hidden sm:inline" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        Settings
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 hover:bg-black/5 text-xs font-medium text-black transition-colors"
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
                        Preferences
                    </span>
                    <h1 className="text-3xl font-light text-black tracking-tight" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        Settings
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Navigation Sidebar */}
                    <nav className="md:col-span-3 space-y-1">
                        <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm sticky top-24">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all text-sm font-light ${
                                            isActive
                                                ? 'bg-black text-white shadow-sm font-normal'
                                                : 'text-gray-600 hover:text-black hover:bg-gray-100'
                                        }`}
                                        style={{ fontFamily: 'var(--font-geist-sans)' }}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </nav>

                    {/* Active Section Content */}
                    <div className="md:col-span-9">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}
