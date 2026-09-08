'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Mail, Crown, ArrowUpRight, Database, Table, Key, Link2, LogOut } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import Button from '@/components/common/Button';

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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all shadow-sm border border-gray-200 hover:border-gray-300"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        Profile
                    </h1>
                </div>
            </header>

            {/* Main Content - Split Layout */}
            <main className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* Left Side - Profile Info */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Profile Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Profile Header */}
                                <div className="p-8 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                                    <div className="flex items-center gap-6">
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName || 'User'}
                                                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center shadow-lg">
                                                <User className="w-8 h-8 text-white" />
                                            </div>
                                        )}
                                        <div>
                                            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                                {user.displayName || 'User'}
                                            </h2>
                                            <p className="text-gray-500 mt-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                                Schema View Member
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Profile Details */}
                                <div className="p-8 space-y-6">
                                    {/* Name */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                            <User className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                                Name
                                            </p>
                                            <p className="text-gray-900 font-medium" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                                {user.displayName || 'Not set'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                                Email
                                            </p>
                                            <p className="text-gray-900 font-medium" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Current Plan */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                            <Crown className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                                Current Plan
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-900 text-white text-sm font-medium">
                                                    Free Plan
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                                Up to 3 databases, 10 tables each
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Upgrade Section */}
                                <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                                Upgrade your plan
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                                Get unlimited databases and advanced features
                                            </p>
                                        </div>
                                        <Button
                                            variant="primary"
                                            onClick={() => router.push('/pricing')}
                                            className="flex items-center gap-2"
                                        >
                                            Upgrade
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Sign Out Section */}
                                <div className="p-8 border-t border-gray-200">
                                    <button
                                        onClick={async () => {
                                            await signOut(auth);
                                            router.push('/');
                                        }}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 transition-all font-medium text-sm"
                                        style={{ fontFamily: 'var(--font-geist-sans)' }}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side - Database Schema Visualization */}
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="hidden lg:block"
                        >
                            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                                {/* Header */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Your Database Workflow
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                        Visualize, design, and manage your database schemas
                                    </p>
                                </div>

                                {/* Schema Diagram */}
                                <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-6 min-h-[400px]">
                                    {/* Grid Background */}
                                    <div className="absolute inset-0 opacity-30"
                                        style={{
                                            backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
                                            backgroundSize: '20px 20px'
                                        }}
                                    />

                                    {/* Database Node */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="absolute top-6 left-1/2 -translate-x-1/2"
                                    >
                                        <div className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
                                            <Database className="w-5 h-5" />
                                            <span className="font-medium text-sm">my_database</span>
                                        </div>
                                    </motion.div>

                                    {/* Connection Lines */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                                        {/* Line to Users table */}
                                        <motion.path
                                            d="M 200 70 L 100 140"
                                            stroke="#9ca3af"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeDasharray="6 4"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 0.6, duration: 0.5 }}
                                        />
                                        {/* Line to Products table */}
                                        <motion.path
                                            d="M 200 70 L 300 140"
                                            stroke="#9ca3af"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeDasharray="6 4"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 0.7, duration: 0.5 }}
                                        />
                                        {/* Line to Orders table */}
                                        <motion.path
                                            d="M 200 70 L 200 230"
                                            stroke="#9ca3af"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeDasharray="6 4"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 0.8, duration: 0.5 }}
                                        />
                                        {/* FK Line: Users to Orders */}
                                        <motion.path
                                            d="M 100 200 L 155 260"
                                            stroke="#3b82f6"
                                            strokeWidth="2"
                                            fill="none"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 1.2, duration: 0.5 }}
                                        />
                                        {/* FK Line: Products to Orders */}
                                        <motion.path
                                            d="M 300 200 L 245 260"
                                            stroke="#3b82f6"
                                            strokeWidth="2"
                                            fill="none"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 1.3, duration: 0.5 }}
                                        />
                                    </svg>

                                    {/* Users Table */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="absolute top-[130px] left-4"
                                        style={{ zIndex: 2 }}
                                    >
                                        <div className="bg-white rounded-lg shadow-md border border-gray-200 w-[150px] overflow-hidden">
                                            <div className="bg-blue-500 text-white px-3 py-2 flex items-center gap-2">
                                                <Table className="w-4 h-4" />
                                                <span className="font-medium text-xs">users</span>
                                            </div>
                                            <div className="p-2 text-xs space-y-1">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Key className="w-3 h-3 text-yellow-500" />
                                                    <span>id</span>
                                                    <span className="text-gray-400 ml-auto">INT</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <span className="w-3" />
                                                    <span>name</span>
                                                    <span className="text-gray-400 ml-auto">VARCHAR</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <span className="w-3" />
                                                    <span>email</span>
                                                    <span className="text-gray-400 ml-auto">VARCHAR</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Products Table */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="absolute top-[130px] right-4"
                                        style={{ zIndex: 2 }}
                                    >
                                        <div className="bg-white rounded-lg shadow-md border border-gray-200 w-[150px] overflow-hidden">
                                            <div className="bg-green-500 text-white px-3 py-2 flex items-center gap-2">
                                                <Table className="w-4 h-4" />
                                                <span className="font-medium text-xs">products</span>
                                            </div>
                                            <div className="p-2 text-xs space-y-1">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Key className="w-3 h-3 text-yellow-500" />
                                                    <span>id</span>
                                                    <span className="text-gray-400 ml-auto">INT</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <span className="w-3" />
                                                    <span>name</span>
                                                    <span className="text-gray-400 ml-auto">VARCHAR</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <span className="w-3" />
                                                    <span>price</span>
                                                    <span className="text-gray-400 ml-auto">DECIMAL</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Orders Table */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="absolute bottom-6 left-1/2 -translate-x-1/2"
                                        style={{ zIndex: 2 }}
                                    >
                                        <div className="bg-white rounded-lg shadow-md border border-gray-200 w-[180px] overflow-hidden">
                                            <div className="bg-purple-500 text-white px-3 py-2 flex items-center gap-2">
                                                <Table className="w-4 h-4" />
                                                <span className="font-medium text-xs">orders</span>
                                            </div>
                                            <div className="p-2 text-xs space-y-1">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Key className="w-3 h-3 text-yellow-500" />
                                                    <span>id</span>
                                                    <span className="text-gray-400 ml-auto">INT</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Link2 className="w-3 h-3 text-blue-500" />
                                                    <span>user_id</span>
                                                    <span className="text-gray-400 ml-auto">INT</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Link2 className="w-3 h-3 text-blue-500" />
                                                    <span>product_id</span>
                                                    <span className="text-gray-400 ml-auto">INT</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <span className="w-3" />
                                                    <span>quantity</span>
                                                    <span className="text-gray-400 ml-auto">INT</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Legend */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.5 }}
                                        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200 shadow-sm"
                                        style={{ zIndex: 3 }}
                                    >
                                        <div className="flex items-center gap-4 text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <Key className="w-3 h-3 text-yellow-500" />
                                                <span className="text-gray-600">Primary Key</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Link2 className="w-3 h-3 text-blue-500" />
                                                <span className="text-gray-600">Foreign Key</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
