'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Settings as SettingsIcon,
    User,
    Shield,
    Database,
    Bell,
    CreditCard,
    Info,
    LogOut,
    Check,
    Loader2
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged, User as FirebaseUser, updateProfile } from 'firebase/auth';
import Button from '@/components/common/Button';

type SettingsSection = 'general' | 'account' | 'security' | 'database' | 'notifications' | 'billing' | 'about';

interface NavItem {
    id: SettingsSection;
    label: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Bell },
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
                displayName: displayName.trim()
            });
            setSaveSuccess(true);
            // Reset success message after 3 seconds
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

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
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
                    <div className="space-y-8">
                        {/* Display Name */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Display Name
                                </h3>
                                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    This is your visible name within Schema View.
                                </p>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value.slice(0, 32))}
                                    maxLength={32}
                                    className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                                <p className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    {displayName.length}/32 characters
                                </p>
                                <button
                                    onClick={handleSaveDisplayName}
                                    disabled={saving || !displayName.trim()}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${saveSuccess
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed'
                                        }`}
                                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                            Saving...
                                        </>
                                    ) : saveSuccess ? (
                                        <>
                                            <Check className="w-3 h-3" />
                                            Saved!
                                        </>
                                    ) : (
                                        'Save'
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Auto Save */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Auto Save
                                </h3>
                                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Automatically save changes to your database schemas.
                                </p>
                                <button
                                    onClick={() => setAutoSave(!autoSave)}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${autoSave ? 'bg-gray-900' : 'bg-gray-300'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${autoSave ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'account':
                return (
                    <div className="space-y-8">
                        {/* Profile Info */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Profile Information
                                </h3>
                                <p className="text-sm text-gray-500 mb-6" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Your account details and profile picture.
                                </p>

                                <div className="flex items-center gap-6">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || 'User'}
                                            className="w-20 h-20 rounded-full border-4 border-gray-100 shadow-md"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center">
                                            <User className="w-8 h-8 text-white" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-lg font-medium text-gray-900" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                            {user.displayName || 'User'}
                                        </p>
                                        <p className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Email Address
                                </h3>
                                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    The email address associated with your account.
                                </p>
                                <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 border border-gray-200 max-w-md">
                                    <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        {user.email}
                                    </span>
                                    <Check className="w-4 h-4 text-green-500 ml-auto" />
                                </div>
                            </div>
                        </div>

                        {/* Current Plan */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Current Plan
                                </h3>
                                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    You are currently on the Free plan.
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 rounded-full bg-gray-900 text-white text-sm font-medium">
                                        Free Plan
                                    </span>
                                    <span className="text-sm text-gray-500">Up to 3 databases, 10 tables each</span>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <button
                                    onClick={() => router.push('/pricing')}
                                    className="px-3 py-1.5 text-xs font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                                >
                                    Upgrade Plan
                                </button>
                            </div>
                        </div>

                        {/* Logout */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Sign Out
                                </h3>
                                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Sign out of your account on this device.
                                </p>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-8">
                        {/* Authentication */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Authentication
                                </h3>
                                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    You are signed in with Google authentication.
                                </p>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 max-w-md">
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Google Account Connected
                                    </span>
                                    <Check className="w-4 h-4 text-green-500 ml-auto" />
                                </div>
                            </div>
                        </div>

                        {/* Data Privacy */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Data Privacy
                                </h3>
                                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Your database schemas are stored securely and only accessible by you.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        End-to-end encrypted storage
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Data never shared with third parties
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Secure Firebase authentication
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );

            case 'database':
                return (
                    <div className="space-y-8">
                        {/* Export Settings */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Export Format
                                </h3>
                                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Default format for exporting SQL scripts.
                                </p>
                                <select className="px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
                                    <option value="postgresql">PostgreSQL</option>
                                </select>
                            </div>
                        </div>

                        {/* Default Data Types */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Default Column Type
                                </h3>
                                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Default data type when creating new columns.
                                </p>
                                <select className="px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
                                    <option value="VARCHAR">VARCHAR</option>
                                    <option value="INT">INT</option>
                                    <option value="TEXT">TEXT</option>
                                    <option value="BOOLEAN">BOOLEAN</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="space-y-8">
                        {/* Email Notifications */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                            Email Notifications
                                        </h3>
                                        <p className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                            Receive updates about your account and databases.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${notificationsEnabled ? 'bg-gray-900' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notificationsEnabled ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Browser Notifications */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                            Browser Notifications
                                        </h3>
                                        <p className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                            Get notified in your browser when operations complete.
                                        </p>
                                    </div>
                                    <button className="relative w-12 h-6 rounded-full transition-colors bg-gray-300">
                                        <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'billing':
                return (
                    <div className="space-y-8">
                        {/* Current Plan */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Current Plan
                                </h3>
                                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    You are currently on the Free plan.
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 rounded-full bg-gray-900 text-white text-sm font-medium">
                                        Free Plan
                                    </span>
                                    <span className="text-sm text-gray-500">Up to 3 databases, 10 tables each</span>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <button
                                    onClick={() => router.push('/pricing')}
                                    className="px-3 py-1.5 text-xs font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                                >
                                    Upgrade Plan
                                </button>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Payment Method
                                </h3>
                                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    No payment method on file. Add one when you upgrade.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case 'about':
                return (
                    <div className="space-y-8">
                        {/* App Info */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Schema View
                                </h3>
                                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    A modern database schema design and visualization tool.
                                </p>
                                <div className="space-y-2 text-sm" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    <p className="text-gray-600">Version: 1.0.0</p>
                                    <p className="text-gray-600">Built with Next.js & React</p>
                                </div>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    Resources
                                </h3>
                                <div className="space-y-3">
                                    <a href="/documentation" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Documentation
                                    </a>
                                    <a href="/privacy-policy" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Privacy Policy
                                    </a>
                                    <a href="/terms-of-service" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Terms of Service
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-4">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all shadow-sm border border-gray-200 hover:border-gray-300"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        Settings
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Navigation */}
                    <motion.nav
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-56 flex-shrink-0"
                    >
                        <div className="sticky top-8 space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all ${isActive
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                        style={{ fontFamily: 'var(--font-geist-sans)' }}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm">{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.nav>

                    {/* Content Area */}
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 max-w-3xl"
                    >
                        {renderContent()}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
