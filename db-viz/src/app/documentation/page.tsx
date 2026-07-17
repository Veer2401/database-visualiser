'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Database, ArrowLeft, Book, Table, Link2, Download, Lightbulb, Keyboard } from 'lucide-react';

export default function DocumentationPage() {
    const sections = [
        {
            id: 'getting-started',
            title: 'Getting Started',
            icon: Lightbulb,
            content: [
                {
                    subtitle: 'Creating Your First Database',
                    text: 'To create a new database, click the "New Database" button on the dashboard. Give your database a name and optionally add a description. Your database will be saved automatically as you work.'
                },
                {
                    subtitle: 'Navigating the Interface',
                    text: 'The main dashboard shows all your databases. Click on any database to open it in the visual editor. Use the sidebar to switch between different views and access settings.'
                }
            ]
        },
        {
            id: 'tables',
            title: 'Working with Tables',
            icon: Table,
            content: [
                {
                    subtitle: 'Creating Tables',
                    text: 'Click the "Add Table" button in the visual editor to create a new table. You can drag tables around the canvas to organize your schema visually.'
                },
                {
                    subtitle: 'Adding Columns',
                    text: 'Click on a table to expand it, then use the "Add Column" button to add new fields. You can specify the data type, constraints, and whether the column can be null.'
                },
                {
                    subtitle: 'Primary Keys',
                    text: 'Mark a column as a primary key by clicking the key icon next to it. Primary keys uniquely identify each row in your table.'
                }
            ]
        },
        {
            id: 'relationships',
            title: 'Table Relationships',
            icon: Link2,
            content: [
                {
                    subtitle: 'Creating Relationships',
                    text: 'To create a relationship between tables, click and drag from a column in one table to a column in another. This creates a foreign key relationship.'
                },
                {
                    subtitle: 'Relationship Types',
                    text: 'Schema View supports one-to-one, one-to-many, and many-to-many relationships. The relationship type is determined by your column constraints.'
                },
                {
                    subtitle: 'Viewing Relationships',
                    text: 'Relationships are displayed as connecting lines between tables. Hover over a line to see details about the relationship.'
                }
            ]
        },
        {
            id: 'export',
            title: 'Exporting SQL',
            icon: Download,
            content: [
                {
                    subtitle: 'Export Options',
                    text: 'Click the "Export SQL" button to generate SQL scripts for your schema in PostgreSQL format.'
                },
                {
                    subtitle: 'Customizing Output',
                    text: 'In the export dialog, you can customize table names, include or exclude certain tables, and add custom SQL statements to the output.'
                }
            ]
        },
        {
            id: 'shortcuts',
            title: 'Keyboard Shortcuts',
            icon: Keyboard,
            content: [
                {
                    subtitle: 'Navigation',
                    text: 'Use arrow keys to pan around the canvas. Hold Ctrl/Cmd and scroll to zoom in and out.'
                },
                {
                    subtitle: 'Common Actions',
                    text: 'Ctrl/Cmd + S: Save • Ctrl/Cmd + Z: Undo • Ctrl/Cmd + Shift + Z: Redo • Delete: Remove selected item • Escape: Deselect'
                }
            ]
        }
    ];

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
                                <span className="text-xl font-bold text-black" style={{ fontFamily: 'var(--font-geist-sans)' }}>Schema View</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
                            <Book className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-geist-sans)' }}>Documentation</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Learn Schema View
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Everything you need to know to design beautiful database schemas with our visual editor.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="px-4 py-8 border-b border-gray-200">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                                style={{ fontFamily: 'var(--font-geist-sans)' }}
                            >
                                <section.icon className="w-4 h-4" />
                                {section.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {sections.map((section, index) => (
                        <motion.section
                            key={section.id}
                            id={section.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="py-12 border-b border-gray-100 last:border-b-0"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                    <section.icon className="w-5 h-5 text-gray-700" />
                                </div>
                                <h2 className="text-2xl font-bold text-black" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                    {section.title}
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {section.content.map((item, itemIndex) => (
                                    <div key={itemIndex} className="pl-13">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                            {item.subtitle}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>
            </div>

            {/* Help Section */}
            <div className="px-4 py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        Need More Help?
                    </h2>
                    <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        Can&apos;t find what you&apos;re looking for? Reach out to our support team.
                    </p>
                    <a
                        href="mailto:support@schemaview.app"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        style={{ fontFamily: 'var(--font-geist-sans)' }}
                    >
                        Contact Support
                    </a>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 px-4 bg-black text-gray-500">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-sm" style={{ fontFamily: 'var(--font-geist-sans)' }}>© 2026 Schema View. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
