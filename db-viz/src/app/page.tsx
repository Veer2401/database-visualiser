'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Database, Table, GitBranch, Terminal, ArrowRight, X, Presentation, FileOutput, ChevronDown } from 'lucide-react';
import Button from '@/components/common/Button';
import { Navbar as LandingNavbar, NavBody, NavItems, NavbarButton } from '@/components/ui/landing-navbar';
import SmoothScroll from '@/components/SmoothScroll';
import screenshotImg from '../../public/screenshot.png';

function CountUp({ value, suffix = '', duration = 1.5, decimals = 0 }: { value: number; suffix?: string; duration?: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(decimals ? Math.round(v * 10) / 10 : Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals]);

  return <span ref={ref}>{decimals ? display.toFixed(1) : display}{suffix}</span>;
}

const features = [
  {
    icon: Database,
    title: 'Create Databases',
    description: 'Design and manage multiple databases with visual tools',
    color: 'text-black',
    bg: 'bg-gray-100',
    detailedDescription: 'Create and manage multiple PostgreSQL databases with our intuitive visual interface. Each database is stored securely in Firebase with real-time synchronization. You can create, rename, and delete databases with just a few clicks. All your databases are organized in a clean sidebar for easy navigation.',
    image: '/database-feature.svg',
  },
  {
    icon: Table,
    title: 'Visual Tables',
    description: 'Build tables with columns, types, and constraints visually',
    color: 'text-black',
    bg: 'bg-gray-100',
    detailedDescription: 'Design tables visually without writing SQL. Add columns with various data types (INT, VARCHAR, TEXT, DATE, etc.), set primary keys, define NOT NULL constraints, and specify default values. Tables are displayed as interactive nodes that you can drag and position anywhere on the canvas.',
    image: '/table-feature.svg',
  },
  {
    icon: GitBranch,
    title: 'Relationships',
    description: 'Define primary and foreign keys with visual connectors',
    color: 'text-black',
    bg: 'bg-gray-100',
    detailedDescription: 'Create relationships between tables by defining foreign keys. Visual connectors automatically appear between related tables, showing the relationship direction. The system validates your relationships to ensure referential integrity and prevents invalid configurations.',
    image: '/relationship-feature.svg',
  },
  {
    icon: Terminal,
    title: 'SQL Terminal',
    description: 'Interactive terminal with SQL syntax highlighting',
    color: 'text-black',
    bg: 'bg-gray-100',
    detailedDescription: 'Execute SQL commands directly with our built-in terminal. Features include syntax highlighting, command history, and real-time query results. Quick action buttons for common operations like CREATE, SELECT, UPDATE, and DELETE help you work faster.',
    image: '/terminal-feature.svg',
  },
  {
    icon: Presentation,
    title: 'Presentation Mode',
    description: 'Share your schema in a clean, fullscreen view',
    color: 'text-black',
    bg: 'bg-gray-100',
    detailedDescription: 'Present your database schema to stakeholders without distractions. Fullscreen canvas, hide UI, and focus on tables and relationships. Perfect for demos and team reviews.',
    image: '/presentation-feature.svg',
  },
  {
    icon: FileOutput,
    title: 'Export & Docs',
    description: 'Export schema to SQL, DOCX, or PDF',
    color: 'text-black',
    bg: 'bg-gray-100',
    detailedDescription: 'Export your database structure as SQL scripts, Word documents, or PDF diagrams. Keep your team and docs in sync with one click.',
    image: '/export-feature.svg',
  },
];

const databaseTables = [
  {
    id: 1,
    name: "Users",
    color: "#3b82f6",
    columns: [
      { name: "id", type: "INT", isPrimary: true },
      { name: "name", type: "VARCHAR(255)" },
      { name: "email", type: "VARCHAR(255)" },
      { name: "created_at", type: "TIMESTAMP" },
    ],
  },
  {
    id: 2,
    name: "Orders",
    color: "#8b5cf6",
    columns: [
      { name: "id", type: "INT", isPrimary: true },
      { name: "user_id", type: "INT", isForeign: true },
      { name: "total", type: "DECIMAL(10,2)" },
      { name: "status", type: "ENUM" },
    ],
  },
  {
    id: 3,
    name: "Products",
    color: "#10b981",
    columns: [
      { name: "id", type: "INT", isPrimary: true },
      { name: "name", type: "VARCHAR(255)" },
      { name: "price", type: "DECIMAL(10,2)" },
      { name: "stock", type: "INT" },
    ],
  },
  {
    id: 4,
    name: "Categories",
    color: "#f59e0b",
    columns: [
      { name: "id", type: "INT", isPrimary: true },
      { name: "name", type: "VARCHAR(100)" },
      { name: "parent_id", type: "INT", isForeign: true },
    ],
  },
  {
    id: 5,
    name: "Reviews",
    color: "#ef4444",
    columns: [
      { name: "id", type: "INT", isPrimary: true },
      { name: "product_id", type: "INT", isForeign: true },
      { name: "user_id", type: "INT", isForeign: true },
      { name: "rating", type: "TINYINT" },
      { name: "comment", type: "TEXT" },
    ],
  },
  {
    id: 6,
    name: "Inventory",
    color: "#06b6d4",
    columns: [
      { name: "id", type: "INT", isPrimary: true },
      { name: "product_id", type: "INT", isForeign: true },
      { name: "quantity", type: "INT" },
      { name: "warehouse", type: "VARCHAR(50)" },
    ],
  },
  {
    id: 7,
    name: "Payments",
    color: "#ec4899",
    columns: [
      { name: "id", type: "INT", isPrimary: true },
      { name: "order_id", type: "INT", isForeign: true },
      { name: "amount", type: "DECIMAL(10,2)" },
      { name: "method", type: "VARCHAR(50)" },
    ],
  },
  {
    id: 8,
    name: "Addresses",
    color: "#84cc16",
    columns: [
      { name: "id", type: "INT", isPrimary: true },
      { name: "user_id", type: "INT", isForeign: true },
      { name: "street", type: "VARCHAR(255)" },
      { name: "city", type: "VARCHAR(100)" },
      { name: "zip", type: "VARCHAR(20)" },
    ],
  },
  {
    id: 9,
    name: "Sessions",
    color: "#6366f1",
    columns: [
      { name: "id", type: "INT", isPrimary: true },
      { name: "user_id", type: "INT", isForeign: true },
      { name: "token", type: "VARCHAR(255)" },
      { name: "expires_at", type: "DATETIME" },
    ],
  },
  {
    id: 10,
    name: "Logs",
    color: "#78716c",
    columns: [
      { name: "id", type: "INT", isPrimary: true },
      { name: "action", type: "VARCHAR(100)" },
      { name: "user_id", type: "INT", isForeign: true },
      { name: "timestamp", type: "TIMESTAMP" },
    ],
  },
  {
    id: 11,
    name: "Settings",
    color: "#0ea5e9",
    columns: [
      { name: "id", type: "INT", isPrimary: true },
      { name: "key", type: "VARCHAR(100)" },
      { name: "value", type: "TEXT" },
    ],
  },
  {
    id: 12,
    name: "Tags",
    color: "#a855f7",
    columns: [
      { name: "id", type: "INT", isPrimary: true },
      { name: "name", type: "VARCHAR(50)" },
      { name: "color", type: "VARCHAR(7)" },
    ],
  },
];

const terminalQueries = [
  {
    id: 1,
    command: "CREATE TABLE users",
    lines: [
      { prefix: "postgres>", text: "CREATE TABLE users (", color: "text-gray-200" },
      { prefix: "", text: "  id SERIAL PRIMARY KEY,", color: "text-gray-200" },
      { prefix: "", text: "  name VARCHAR(255) NOT NULL,", color: "text-gray-200" },
      { prefix: "", text: "  email VARCHAR(255) UNIQUE", color: "text-gray-200" },
      { prefix: "", text: ");", color: "text-gray-200" },
      { prefix: "", text: "Query OK, 0 rows affected (0.02 sec)", color: "text-green-500" },
    ],
  },
  {
    id: 2,
    command: "SELECT * FROM users",
    lines: [
      { prefix: "postgres>", text: "SELECT * FROM users WHERE status = 'active';", color: "text-gray-200" },
      { prefix: "", text: "+----+----------+------------------+--------+", color: "text-gray-400" },
      { prefix: "", text: "| id | name     | email            | status |", color: "text-gray-400" },
      { prefix: "", text: "+----+----------+------------------+--------+", color: "text-gray-400" },
      { prefix: "", text: "|  1 | John Doe | john@example.com | active |", color: "text-gray-200" },
      { prefix: "", text: "+----+----------+------------------+--------+", color: "text-gray-400" },
      { prefix: "", text: "1 row in set (0.00 sec)", color: "text-green-500" },
    ],
  },
  {
    id: 3,
    command: "INSERT INTO orders",
    lines: [
      { prefix: "postgres>", text: "INSERT INTO orders (user_id, product_id, total)", color: "text-gray-200" },
      { prefix: "", text: "VALUES (1, 42, 299.99);", color: "text-gray-200" },
      { prefix: "", text: "", color: "text-gray-200" },
      { prefix: "", text: "Query OK, 1 row affected (0.01 sec)", color: "text-green-500" },
    ],
  },
  {
    id: 4,
    command: "ALTER TABLE products",
    lines: [
      { prefix: "postgres>", text: "ALTER TABLE products", color: "text-gray-200" },
      { prefix: "", text: "ADD COLUMN stock INT DEFAULT 0,", color: "text-gray-200" },
      { prefix: "", text: "ADD INDEX idx_stock (stock);", color: "text-gray-200" },
      { prefix: "", text: "", color: "text-gray-200" },
      { prefix: "", text: "Query OK, 0 rows affected (0.05 sec)", color: "text-green-500" },
    ],
  },
  {
    id: 5,
    command: "JOIN query",
    lines: [
      { prefix: "postgres>", text: "SELECT u.name, COUNT(o.id) as orders", color: "text-gray-200" },
      { prefix: "", text: "FROM users u", color: "text-gray-200" },
      { prefix: "", text: "LEFT JOIN orders o ON u.id = o.user_id", color: "text-gray-200" },
      { prefix: "", text: "GROUP BY u.id;", color: "text-gray-200" },
      { prefix: "", text: "3 rows in set (0.01 sec)", color: "text-green-500" },
    ],
  },
  {
    id: 6,
    command: "CREATE INDEX",
    lines: [
      { prefix: "postgres>", text: "CREATE INDEX idx_email", color: "text-gray-200" },
      { prefix: "", text: "ON users (email);", color: "text-gray-200" },
      { prefix: "", text: "", color: "text-gray-200" },
      { prefix: "", text: "Query OK, 0 rows affected (0.03 sec)", color: "text-green-500" },
    ],
  },
  {
    id: 7,
    command: "UPDATE records",
    lines: [
      { prefix: "postgres=>", text: "UPDATE products SET", color: "text-gray-200" },
      { prefix: "", text: "price = price * 1.1", color: "text-gray-200" },
      { prefix: "", text: "WHERE category = 'electronics';", color: "text-gray-200" },
      { prefix: "", text: "Query OK, 23 rows affected (0.04 sec)", color: "text-green-500" },
    ],
  },
  {
    id: 8,
    command: "DESCRIBE table",
    lines: [
      { prefix: "postgres=>", text: "DESCRIBE orders;", color: "text-gray-200" },
      { prefix: "", text: "+----------+--------------+------+-----+", color: "text-gray-400" },
      { prefix: "", text: "| Field    | Type         | Null | Key |", color: "text-gray-400" },
      { prefix: "", text: "+----------+--------------+------+-----+", color: "text-gray-400" },
      { prefix: "", text: "| id       | int          | NO   | PRI |", color: "text-gray-200" },
      { prefix: "", text: "+----------+--------------+------+-----+", color: "text-gray-400" },
    ],
  },
  {
    id: 9,
    command: "DELETE query",
    lines: [
      { prefix: "postgres=>", text: "DELETE FROM sessions", color: "text-gray-200" },
      { prefix: "", text: "WHERE expires_at < NOW();", color: "text-gray-200" },
      { prefix: "", text: "", color: "text-gray-200" },
      { prefix: "", text: "Query OK, 156 rows affected (0.08 sec)", color: "text-green-500" },
    ],
  },
  {
    id: 10,
    command: "FOREIGN KEY",
    lines: [
      { prefix: "postgres=>", text: "ALTER TABLE orders ADD CONSTRAINT", color: "text-gray-200" },
      { prefix: "", text: "fk_user FOREIGN KEY (user_id)", color: "text-gray-200" },
      { prefix: "", text: "REFERENCES users(id);", color: "text-gray-200" },
      { prefix: "", text: "Query OK, 0 rows affected (0.06 sec)", color: "text-green-500" },
    ],
  },
  {
    id: 11,
    command: "SHOW TABLES",
    lines: [
      { prefix: "postgres=>", text: "SHOW TABLES;", color: "text-gray-200" },
      { prefix: "", text: "+------------------+", color: "text-gray-400" },
      { prefix: "", text: "| Tables_in_mydb   |", color: "text-gray-400" },
      { prefix: "", text: "+------------------+", color: "text-gray-400" },
      { prefix: "", text: "| users            |", color: "text-gray-200" },
      { prefix: "", text: "| orders           |", color: "text-gray-200" },
      { prefix: "", text: "+------------------+", color: "text-gray-400" },
    ],
  },
  {
    id: 12,
    command: "COUNT query",
    lines: [
      { prefix: "postgres=>", text: "SELECT COUNT(*) as total,", color: "text-gray-200" },
      { prefix: "", text: "status FROM orders", color: "text-gray-200" },
      { prefix: "", text: "GROUP BY status;", color: "text-gray-200" },
      { prefix: "", text: "3 rows in set (0.01 sec)", color: "text-green-500" },
    ],
  },
];

const faqItems = [
  { q: 'Do I need to know SQL?', a: 'No. You can create databases, tables, and relationships entirely by point-and-click. SQL is optional for when you want to run custom queries or export.' },
  { q: 'Is my data stored in Schema View?', a: "Schema and structure are stored so you can edit and sync. You connect your own PostgreSQL for live data; we don't store your actual database contents." },
  { q: 'Can I export my schema?', a: 'Yes. Export to SQL scripts, Word (DOCX), or PDF so you can use the schema in other tools or share with your team.' },
  { q: 'What’s the difference between Dashboard and Terminal mode?', a: 'Dashboard is the visual canvas for designing. Terminal mode focuses on running SQL and viewing results—same project, different view.' },
];

export default function LandingPage() {
  const router = useRouter();
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  useEffect(() => {
    router.prefetch('/login');
    router.prefetch('/pricing');
    router.prefetch('/presentation');
  }, [router]);


  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white">
      <LandingNavbar
        navItems={[
          { name: 'Home', link: '#' },
          { name: 'Features', link: '#features' },
          { name: 'Pricing', link: '#pricing' },
        ]}
        onSignIn={() => router.push('/login')}
        logo={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">
              Schema View
            </span>
          </div>
        }
      >
        <NavBody>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">
              Schema View
            </span>
          </div>

          <div className="flex items-center gap-4">
            <NavItems
              items={[
                { name: 'Home', link: '#' },
                { name: 'Features', link: '#features' },
                { name: 'Pricing', link: '#pricing' },
              ]}
              className="max-w-xs"
              onItemClick={() => {}}
            />
            <NavbarButton onClick={() => router.push('/login')}>
              Sign In
            </NavbarButton>
          </div>
        </NavBody>
      </LandingNavbar>

      {/* Hero + Numbers */}
      <section className="relative overflow-hidden bg-white bg-[url('/background.png')] bg-cover bg-center bg-no-repeat">

        {/* Hero Section */}
        <div className="pt-44 sm:pt-52 pb-12 sm:pb-14 px-4 relative z-10">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-6">
                <motion.h1
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.08 }}
                  className="text-left"
                >
                  <div className="font-sans font-normal text-black tracking-tight leading-[1.02] text-3xl sm:text-4xl md:text-5xl">
                    <div>Modern Database Design</div>
                    <div>for Modern Teams </div>
                    
                  </div>
                </motion.h1>

                <motion.div
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.16 }}
                  className="mt-6 flex items-center gap-3"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => router.push('/login')}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="rounded-full !bg-black !text-white hover:!bg-black/90 focus:!ring-black px-6 sm:px-7"
                  >
                    Start Building
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => router.push('/presentation')}
                    className="rounded-full !bg-white/80 !text-black hover:!bg-white border border-black/10 px-6 sm:px-7"
                  >
                    Signup
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.14 }}
                className="lg:col-span-6 lg:pt-3"
              >
                <p className="text-left font-sans font-normal text-gray-700 tracking-tight leading-[1.35] text-base sm:text-lg">
                  Design, visualize, and manage PostgreSQL schemas with a clean drag-and-drop canvas.
                  Export SQL instantly and present your database structure with confidence.
                </p>
              </motion.div>
            </div>

            {/* Product preview */}
            <motion.div
              initial={{ y: 22, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="mt-10 sm:mt-12"
            >
              <div className="rounded-[28px] overflow-hidden shadow-[0_30px_90px_-60px_rgba(0,0,0,0.45)]">
                <Image
                  src={screenshotImg}
                  alt="Schema View canvas preview"
                  priority
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Numbers */}
        <div className="relative z-10 px-4 pb-14 sm:pb-20 -mt-4 sm:-mt-6">
          <div className="max-w-4xl mx-auto rounded-2xl bg-white/55 backdrop-blur-md border border-white/40 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.45)] py-6 sm:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { value: 10, suffix: 'K+', label: 'Schemas designed' },
              { unlimited: true, label: 'Tables & relations' },
              { value: 50, suffix: '+', label: 'Data types' },
              { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ y: 28, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center"
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-light text-black" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                  {'unlimited' in item && item.unlimited ? 'Unlimited' : <CountUp value={(item as { value: number }).value} suffix={(item as { suffix?: string }).suffix ?? ''} duration={1.8} decimals={(item as { decimals?: number }).decimals} />}
                </p>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
                  className="text-sm text-gray-500 mt-1 font-light"
                >
                  {item.label}
                </motion.p>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - dark */}
      <section id="pricing" className="py-16 sm:py-24 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Pricing</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mt-3 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Simple, transparent pricing
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-light px-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Start free. Upgrade when you need more.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Free',
                price: 0,
                tag: null,
                description: 'Perfect for learning and side projects.',
                features: ['Up to 3 databases', '10 tables per database', 'Visual editor & canvas', 'SQL terminal (read-only)', 'Community support'],
                cta: 'Get started',
                primary: false,
              },
              {
                name: 'Pro',
                price: 12,
                tag: 'Popular',
                description: 'For developers and small teams shipping real products.',
                features: ['Unlimited databases & tables', 'Full SQL terminal (read/write)', 'Export to SQL, DOCX, PDF', 'Presentation mode', 'Priority support'],
                cta: 'Start free trial',
                primary: true,
              },
              {
                name: 'Team',
                price: 29,
                tag: null,
                description: 'Collaboration and governance for growing teams.',
                features: ['Everything in Pro', 'Team workspace', 'Shared schemas & export', 'Audit log', 'Dedicated support'],
                cta: 'Contact sales',
                primary: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 400, damping: 30 }}
                whileHover={{ y: -6 }}
                className="relative p-5 sm:p-8 rounded-2xl text-left min-h-0 sm:min-h-[380px] flex flex-col cursor-default"
              >
                <div
                  className="absolute inset-0 rounded-2xl transition-all duration-300 ease-out"
                  style={{
                    background: plan.primary ? 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)' : 'linear-gradient(145deg, #262626 0%, #171717 100%)',
                    border: plan.primary ? '2px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: plan.primary
                      ? '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'
                      : '0 20px 40px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)',
                  }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  {plan.tag && (
                    <span className="inline-block w-fit mb-4 px-3 py-1 rounded-full bg-white/10 text-gray-200 text-xs font-medium border border-white/20">
                      {plan.tag}
                    </span>
                  )}
                  <h3 className="text-xl font-medium text-white mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>{plan.name}</h3>
                  <p className="text-3xl font-light text-white mt-2">${plan.price}<span className="text-base font-normal text-gray-400">/mo</span></p>
                  <p className="text-sm text-gray-400 mt-4 font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>{plan.description}</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-300 font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        <span className="text-white">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.primary ? 'primary' : 'secondary'}
                    size="md"
                    className={plan.primary ? 'mt-8 w-full !bg-white !text-gray-950 hover:!bg-gray-100 border-0' : 'mt-8 w-full'}
                    onClick={() => router.push('/login')}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">How it works</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-black mt-3 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              From idea to database in minutes
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto font-light px-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              No SQL required. Drag, connect, and go.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line - horizontal on lg, vertical on small */}
            <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 lg:left-0 lg:right-0 lg:top-5 lg:h-px lg:w-full lg:bg-gradient-to-r" />

            <div className="relative flex flex-col lg:flex-row lg:justify-between lg:gap-4 gap-6 sm:gap-8">
              {[
                { step: '1', title: 'Create database', desc: 'Name your project and create a new PostgreSQL database in one click.' },
                { step: '2', title: 'Add tables', desc: 'Define tables and columns with types, keys, and constraints visually.' },
                { step: '3', title: 'Connect relations', desc: 'Link tables with foreign keys. See relationships on the canvas.' },
                { step: '4', title: 'Run or export', desc: 'Execute SQL in the terminal or export schema to SQL, DOCX, or PDF.' },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ y: 16, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-4 lg:flex-1 lg:flex-col lg:items-center lg:text-center"
                >
                  <div className="relative z-10 flex shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-sm font-medium text-black" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      {item.step}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 lg:mt-4 lg:px-2">
                    <h3 className="text-base sm:text-lg font-medium text-black mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>{item.title}</h3>
                    <p className="text-sm text-gray-500 font-light leading-snug" style={{ fontFamily: 'var(--font-geist-sans)' }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - dark, same as pricing */}
      <section id="features" className="py-16 sm:py-24 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Features</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mt-3 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Everything you need
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-light px-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Powerful tools to design, visualize, and manage your databases
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setSelectedFeature(feature)}
                className="group relative p-5 sm:p-6 rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 cursor-pointer overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #262626 0%, #171717 100%)',
                  boxShadow: '0 20px 40px -12px rgba(0,0,0,0.4)',
                }}
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gray-800 group-hover:bg-white/10 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 border border-gray-700/50 group-hover:border-white/20">
                    <feature.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-light text-white mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                    {feature.description}
                  </p>
                </div>
                
                {/* Arrow indicator */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - accordion */}
      <section id="faq" className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">FAQ</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-black mt-3 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Common questions
            </h2>
          </motion.div>
          <div className="space-y-2">
            {faqItems.map((item, i) => {
              const isOpen = expandedFaq === i;
              return (
                <motion.div
                  key={item.q}
                  initial={{ y: 12, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-colors hover:border-gray-300"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left p-4 sm:p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-xl"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    <h3 className="font-medium text-black text-sm sm:text-base pr-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      {item.q}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </button>
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-gray-600 font-light px-4 sm:px-5 pb-4 sm:pb-5 pt-0 border-t border-gray-100" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      {item.a}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 bg-black relative overflow-hidden">
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10 px-1">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Ready to build your database?
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Join thousands of developers who design their databases visually.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push('/login')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="bg-white text-black hover:bg-gray-100"
            >
              Get Started Free
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer - same dark as pricing */}
      <footer className="py-5 sm:py-6 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center shrink-0">
              <Database className="w-3 h-3 text-black" />
            </div>
            <span className="text-sm text-white font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>Schema View</span>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <button
              onClick={() => router.push('/terms-of-service')}
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              Terms
            </button>
            <button
              onClick={() => router.push('/privacy-policy')}
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              Privacy
            </button>
            <span className="text-xs text-gray-500">© 2026</span>
          </div>
        </div>
      </footer>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setSelectedFeature(null)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 sm:inset-6 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] md:max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 shrink-0">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                    <selectedFeature.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-light text-black truncate" style={{ fontFamily: 'var(--font-geist-sans)' }}>{selectedFeature.title}</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedFeature(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>
              
              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
                {/* Feature Illustration */}
                <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mb-6 flex items-center justify-center border border-gray-100">
                  {selectedFeature.title === 'Create Databases' && (
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Database className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-32 h-4 bg-blue-200 rounded" />
                        <div className="w-24 h-3 bg-blue-100 rounded" />
                        <div className="w-28 h-3 bg-blue-100 rounded" />
                      </div>
                    </div>
                  )}
                  {selectedFeature.title === 'Visual Tables' && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                      <div className="bg-emerald-500 px-4 py-2 text-white text-sm font-semibold">Users Table</div>
                      <div className="p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-amber-400 rounded" />
                          <span className="text-xs text-gray-700">id (INT)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-200 rounded" />
                          <span className="text-xs text-gray-700">name (VARCHAR)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-200 rounded" />
                          <span className="text-xs text-gray-700">email (VARCHAR)</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedFeature.title === 'Relationships' && (
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-semibold shadow-lg">Users</div>
                      <svg width="60" height="20">
                        <line x1="0" y1="10" x2="60" y2="10" stroke="#3B82F6" strokeWidth="2" />
                        <circle cx="55" cy="10" r="4" fill="#3B82F6" />
                      </svg>
                      <div className="w-20 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-semibold shadow-lg">Orders</div>
                    </div>
                  )}
                  {selectedFeature.title === 'SQL Terminal' && (
                    <div className="bg-gray-900 rounded-lg p-4 shadow-lg w-64">
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                        <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                      </div>
                      <div className="font-mono text-xs">
                        <p className="text-gray-500">postgres&gt; <span className="text-green-400">SELECT * FROM users;</span></p>
                        <p className="text-gray-400 mt-1">3 rows returned</p>
                      </div>
                    </div>
                  )}
                  {selectedFeature.title === 'Presentation Mode' && (
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 rounded-lg bg-gray-800 flex items-center justify-center">
                        <Presentation className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="w-24 h-3 bg-gray-200 rounded mb-2" />
                        <div className="w-32 h-2 bg-gray-100 rounded" />
                      </div>
                    </div>
                  )}
                  {selectedFeature.title === 'Export & Docs' && (
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-2 rounded bg-gray-100 border border-gray-200 text-xs font-mono">.sql</div>
                      <div className="px-3 py-2 rounded bg-gray-100 border border-gray-200 text-xs font-mono">.docx</div>
                      <div className="px-3 py-2 rounded bg-gray-100 border border-gray-200 text-xs font-mono">.pdf</div>
                    </div>
                  )}
                </div>
                
                {/* Description */}
                <p className="font-light text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                  {selectedFeature.detailedDescription}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}
