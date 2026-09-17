'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Database, Table, GitBranch, Terminal, ArrowRight, X, Presentation, FileOutput, ChevronDown } from 'lucide-react';
import SchemaViewLogo from '@/components/common/SchemaViewLogo';

/* ─── Scroll-reveal wrapper ─── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */
const features = [
  {
    icon: Database,
    title: 'Create Databases',
    description: 'Design and manage multiple databases with visual tools',
    detailedDescription: 'Create and manage multiple PostgreSQL databases with our intuitive visual interface. Each database is stored securely in Firebase with real-time synchronization. You can create, rename, and delete databases with just a few clicks. All your databases are organized in a clean sidebar for easy navigation.',
  },
  {
    icon: Table,
    title: 'Visual Tables',
    description: 'Build tables with columns, types, and constraints visually',
    detailedDescription: 'Design tables visually without writing SQL. Add columns with various data types (INT, VARCHAR, TEXT, DATE, etc.), set primary keys, define NOT NULL constraints, and specify default values. Tables are displayed as interactive nodes that you can drag and position anywhere on the canvas.',
  },
  {
    icon: GitBranch,
    title: 'Relationships',
    description: 'Define primary and foreign keys with visual connectors',
    detailedDescription: 'Create relationships between tables by defining foreign keys. Visual connectors automatically appear between related tables, showing the relationship direction. The system validates your relationships to ensure referential integrity and prevents invalid configurations.',
  },
  {
    icon: Terminal,
    title: 'SQL Terminal',
    description: 'Interactive terminal with SQL syntax highlighting',
    detailedDescription: 'Execute SQL commands directly with our built-in terminal. Features include syntax highlighting, command history, and real-time query results. Quick action buttons for common operations like CREATE, SELECT, UPDATE, and DELETE help you work faster.',
  },
  {
    icon: Presentation,
    title: 'Presentation Mode',
    description: 'Share your schema in a clean, fullscreen view',
    detailedDescription: 'Present your database schema to stakeholders without distractions. Fullscreen canvas, hide UI, and focus on tables and relationships. Perfect for demos and team reviews.',
  },
  {
    icon: FileOutput,
    title: 'Export & Docs',
    description: 'Export schema to SQL, DOCX, or PDF',
    detailedDescription: 'Export your database structure as SQL scripts, Word documents, or PDF diagrams. Keep your team and docs in sync with one click.',
  },
];

const faqItems = [
  { q: 'Do I need to know SQL?', a: 'No. You can create databases, tables, and relationships entirely by point-and-click. SQL is optional for when you want to run custom queries or export.' },
  { q: 'Is my data stored in Schema View?', a: "Schema and structure are stored so you can edit and sync. You connect your own PostgreSQL for live data; we don't store your actual database contents." },
  { q: 'Can I export my schema?', a: 'Yes. Export to SQL scripts, Word (DOCX), or PDF so you can use the schema in other tools or share with your team.' },
  { q: "What\u2019s the difference between Dashboard and Terminal mode?", a: 'Dashboard is the visual canvas for designing. Terminal mode focuses on running SQL and viewing results\u2014same project, different view.' },
];

/* ═══════ Color tokens (NexDash-exact) ═══════ */
const C = {
  bg: '#f3f5f4',          // NexDash hero panel background
  panel: '#eaedeb',       // Slightly darker panel
  text: '#07110b',        // NexDash primary text
  textMid: '#565c59',     // Mid text
  textDim: '#858b8c',     // Dim text
  band: '#041c15',        // NexDash dark band / button fill
  card: '#e8ebe9',        // Card background
  cardDark: '#0d1f17',    // Dark card
  accent: '#38AA78',      // Green accent
  accentBright: '#57C258',
};

export default function LandingPage() {
  const router = useRouter();
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  useEffect(() => {
    router.prefetch('/dashboard');
    router.prefetch('/login');
    router.prefetch('/pricing');
    router.prefetch('/presentation');
  }, [router]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: C.bg, color: C.text }}>

      {/* ═══════ Sticky Navbar ═══════ */}
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300" style={{ backgroundColor: C.bg }}>
        <div className="w-full pt-4 max-md:pt-3">
          <div className="px-5 md:px-10 lg:px-[max(54px,3.75vw)]">
            <nav className="flex h-[72px] items-center justify-between gap-6 max-md:h-14">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2.5 shrink-0 outline-none transition-opacity duration-200 hover:opacity-70">
                <SchemaViewLogo size={28} />
                <span className="sv-display text-[17px] font-bold tracking-[-0.02em]" style={{ color: C.text }}>SCHEMA VIEW</span>
              </a>

              {/* Desktop Nav Links */}
              <div className="hidden items-center gap-10 lg:flex">
                {['Home', 'Features', 'Pricing'].map((label) => (
                  <a
                    key={label}
                    href={label === 'Home' ? '#' : label === 'Pricing' ? '/pricing' : '#features'}
                    className="sv-label text-[13px] tracking-[0.04em] transition-opacity duration-200 hover:opacity-60 normal-case font-medium"
                    style={{ color: C.text }}
                  >
                    {label}
                  </a>
                ))}
              </div>

              {/* CTA */}
              <div className="hidden items-center gap-4 lg:flex">
                <button
                  onClick={() => router.push('/login')}
                  className="inline-flex items-center rounded-full px-6 py-2.5 sv-label text-[13px] tracking-[0.04em] text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97] normal-case font-semibold"
                  style={{ backgroundColor: C.band }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="sv-label text-[13px] tracking-[0.04em] font-semibold transition-opacity duration-200 hover:opacity-70 normal-case"
                  style={{ color: C.text }}
                >
                  Try Demo
                </button>
              </div>

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label="Menu"
                className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
                onClick={() => {
                  const menu = document.getElementById('mobile-menu');
                  if (menu) menu.classList.toggle('hidden');
                }}
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M3 6h14M3 10h14M3 14h14" />
                </svg>
              </button>
            </nav>

            {/* Mobile menu */}
            <div id="mobile-menu" className="hidden lg:hidden pb-4 pt-2 space-y-1">
              <a href="#" className="block py-2 text-sm transition-colors" style={{ color: C.textMid }}>Home</a>
              <a href="#features" className="block py-2 text-sm transition-colors" style={{ color: C.textMid }}>Features</a>
              <a href="/pricing" className="block py-2 text-sm transition-colors" style={{ color: C.textMid }}>Pricing</a>
              <button
                onClick={() => router.push('/login')}
                className="mt-2 w-full rounded-full py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: C.band }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════ Hero Section ═══════ */}
      <section className="relative min-h-svh overflow-hidden pt-[68px] lg:pt-[88px] lg:min-h-[max(680px,100svh)]" style={{ backgroundColor: C.bg }}>
        <div className="px-5 md:px-7 lg:px-[max(34px,2.361vw)] pb-8 pt-4 sm:pt-5 lg:pt-7 relative">

          {/* Mega Display Title — expanded width, strictly in One Line */}
          <div className="w-full flex justify-center overflow-hidden">
            <h1
              className="sv-display z-0 text-center font-extrabold tracking-[-0.04em] whitespace-nowrap select-none text-[clamp(20px,7.4vw,44px)] sm:text-[clamp(44px,9.5vw,80px)] md:text-[clamp(76px,11vw,128px)] lg:text-[clamp(120px,12.2vw,188px)] leading-[0.9] w-full"
              style={{ color: C.text }}
            >
              SCHEMA VIEW
            </h1>
          </div>

          {/* Hero Content Area: Left Text + Right Database Illustration */}
          <div className="relative z-10 mt-3 sm:mt-4 lg:mt-6">
            {/* Database illustration aligned to reach up into the right portion of the title */}
            <div className="lg:absolute lg:-top-[2vw] xl:-top-[3vw] lg:-right-[1%] lg:w-[62%] lg:max-w-[900px] max-md:mt-6 max-md:mb-6 max-md:w-full max-md:overflow-hidden pointer-events-none">
              <Image
                src="/LandingImage-transparent.webp"
                alt="Isometric database infrastructure illustration"
                width={1428}
                height={736}
                priority
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="h-auto w-full"
              />
            </div>

            {/* Text content — left side (shifted comfortably above the fold closer to Schema View) */}
            <div className="relative z-20 w-full max-w-[440px] pt-2 sm:pt-3 lg:pt-4 xl:pt-5">
              <div>
                <p className="sv-display text-[23px] sm:text-[29px] lg:text-[32px] font-bold leading-[1.18] tracking-[-0.03em]" style={{ color: C.text }}>
                  Schema View is your visual database engine.
                </p>
              </div>

              <div>
                <p className="sv-body mt-3 text-[15px] sm:text-[15.5px] leading-[1.5] max-md:text-[14px]" style={{ color: C.textMid }}>
                  Design, visualize, and deploy PostgreSQL schemas with a clean drag-and-drop canvas. Turn complex relational models into production-ready SQL in seconds.
                </p>
              </div>

              {/* Action buttons positioned comfortably above the fold */}
              <div className="mt-6 sm:mt-7 lg:mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
                <button
                  onClick={() => router.push('/login')}
                  className="inline-flex items-center justify-center rounded-full font-bold tracking-[0.02em] transition-all duration-200 active:scale-[0.98] px-7 sm:px-8 py-3.5 sv-label text-[14px] text-white hover:opacity-90 normal-case shadow-sm"
                  style={{ backgroundColor: C.band }}
                >
                  Start Building
                </button>
                <a
                  href="#features"
                  className="group inline-flex items-center gap-1.5 px-1 sv-label text-[14px] tracking-[0.04em] transition-all duration-200 hover:opacity-70 active:scale-[0.97] normal-case font-bold"
                  style={{ color: C.text }}
                >
                  See how it works
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Features Section ═══════ */}
      <section id="features" className="scroll-mt-20" style={{ backgroundColor: C.panel }}>
        <div className="px-6 md:px-10 lg:px-[max(54px,3.75vw)] py-16 md:py-24 lg:py-[100px]">
          <Reveal className="text-center mb-12 lg:mb-16">
            <span className="sv-eyebrow" style={{ color: C.textDim }}>Features</span>
            <h2 className="sv-display sv-h2 mt-4" style={{ color: C.text }}>Everything you need.</h2>
            <p className="sv-sub max-w-[600px] mx-auto mt-4" style={{ color: C.textMid }}>
              Powerful tools to design, visualize, and manage your databases
            </p>
          </Reveal>

          <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.06} className="h-full">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedFeature(feature)}
                  className="group relative h-full p-6 lg:p-7 rounded-[22px] border transition-all duration-300 cursor-pointer overflow-hidden bg-white hover:shadow-[0_8px_28px_rgba(7,17,11,0.07)] active:scale-[0.98]"
                  style={{ borderColor: 'rgba(7,17,11,0.06)' }}
                >
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 border" style={{ backgroundColor: C.card, borderColor: 'rgba(7,17,11,0.06)' }}>
                    <feature.icon className="w-5 h-5 transition-colors duration-300" style={{ color: C.textMid }} />
                  </div>
                  <h3 className="sv-display text-[18px] mb-2" style={{ color: C.text }}>{feature.title}</h3>
                  <p className="sv-body text-[14px] leading-relaxed" style={{ color: C.textMid }}>{feature.description}</p>

                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="w-4 h-4" style={{ color: C.textDim }} />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ What Sets Schema View Apart ═══════ */}
      <section style={{ backgroundColor: C.bg }}>
        <div className="px-6 md:px-10 lg:px-[max(54px,3.75vw)] pb-10 pt-16 md:pt-24 lg:pb-16 lg:pt-[100px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-14">
            <div className="lg:flex lg:h-full lg:flex-col">
              <Reveal>
                <h2 className="sv-display sv-h2" style={{ color: C.text }}>What sets Schema View apart.</h2>
              </Reveal>
              <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden lg:min-h-0 lg:flex-1 lg:aspect-auto">
                <Image
                  src="/Database.webp"
                  alt="Abstract database illustration"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-10 lg:pt-2">
              {[
                { title: 'Visual-first design', desc: 'Drag-and-drop canvas, interactive table nodes, and visual connectors. No SQL required to design\u2014point, click, and build your schema in minutes.' },
                { title: 'SQL terminal built in', desc: 'Built-in SQL terminal with syntax highlighting, real-time query results, and quick action buttons for CREATE, SELECT, UPDATE, and DELETE.' },
                { title: 'Export everything', desc: 'One-click export to SQL scripts, Word documents, or PDF diagrams. Keep your team and documentation in sync effortlessly.' },
                { title: 'Built for collaboration', desc: 'Presentation mode for stakeholder demos, real-time Firebase sync, and a clean interface that makes database design approachable for the whole team.' },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <h3 className="sv-display sv-h3" style={{ color: C.text }}>{item.title}</h3>
                  <p className="sv-body mt-2" style={{ color: C.textMid }}>{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Step Cards ═══════ */}
      <section style={{ backgroundColor: C.bg }}>
        <div className="px-6 md:px-10 lg:px-[max(54px,3.75vw)] pb-16 md:pb-24 lg:pb-[60px]">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: '01', title: 'Create database', desc: 'Name your project and create a new PostgreSQL database in one click.' },
              { step: '02', title: 'Add tables', desc: 'Define tables and columns with types, keys, and constraints visually.' },
              { step: '03', title: 'Connect relations', desc: 'Link tables with foreign keys. See relationships on the canvas.' },
              { step: '04', title: 'Run or export', desc: 'Execute SQL in the terminal or export schema to SQL, DOCX, or PDF.' },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.08} className="h-full">
                <article
                  className="relative flex h-full flex-col overflow-hidden rounded-[22px] px-7 pt-8 pb-8 lg:px-8 lg:pt-10 lg:pb-10 border transition-all duration-300 hover:shadow-[0_8px_28px_rgba(7,17,11,0.07)]"
                  style={{ backgroundColor: C.card, borderColor: 'rgba(7,17,11,0.06)' }}
                >
                  <span className="sv-mono text-[13px] tracking-[0.02em]" style={{ color: C.textDim }}>{item.step}</span>
                  <h3 className="sv-display sv-h3 mt-5" style={{ color: C.text }}>{item.title}</h3>
                  <p className="sv-body mt-3 text-[15px]" style={{ color: C.textMid }}>{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ Section ═══════ */}
      <section id="faq" className="scroll-mt-20" style={{ backgroundColor: C.bg }}>
        <div className="px-6 md:px-10 lg:px-[max(54px,3.75vw)] py-16 md:py-24 lg:py-[100px]">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center mb-12 lg:mb-14">
              <span className="sv-eyebrow" style={{ color: C.textDim }}>FAQ</span>
              <h2 className="sv-display sv-h2 mt-4" style={{ color: C.text }}>Common questions</h2>
            </Reveal>

            <div className="space-y-3">
              {faqItems.map((item, i) => {
                const isOpen = expandedFaq === i;
                return (
                  <Reveal key={item.q} delay={i * 0.04}>
                    <div
                      className="rounded-[16px] border bg-white overflow-hidden transition-all hover:shadow-[0_8px_28px_rgba(7,17,11,0.07)]"
                      style={{ borderColor: '#e6e8e7' }}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-4 text-left p-5 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-[16px]"
                        aria-expanded={isOpen}
                      >
                        <h3 className="sv-display text-[16px] pr-2 font-medium" style={{ color: C.text }}>{item.q}</h3>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          style={{ color: C.textDim }}
                          aria-hidden
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="sv-body text-[14px] px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t" style={{ color: C.textMid, borderColor: '#f0f1f0' }}>
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA Section ═══════ */}
      <section className="relative overflow-hidden text-white" style={{ backgroundColor: C.band }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(56,170,120,0.15),transparent)]" />
        <div className="px-6 md:px-10 lg:px-[max(54px,3.75vw)] py-20 md:py-28 lg:py-[120px]">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="sv-display sv-h2 text-white">Ready to build your database?</h2>
              <p className="sv-sub text-white/50 mt-5 max-w-[500px] mx-auto">
                Join thousands of developers who design their databases visually.
              </p>
              <div className="mt-10">
                <button
                  onClick={() => router.push('/login')}
                  className="inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-[0.02em] transition-all duration-200 active:scale-[0.98] px-8 py-3.5 sv-label text-[14px] bg-white hover:bg-white/90 normal-case"
                  style={{ color: C.text }}
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════ Footer ═══════ */}
      <footer className="border-t" style={{ backgroundColor: C.band, borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="px-6 md:px-10 lg:px-[max(54px,3.75vw)] py-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <SchemaViewLogo size={24} />
              <span className="sv-body text-[14px] text-white/60">Schema View</span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
              <button onClick={() => router.push('/terms-of-service')} className="text-[12px] text-white/30 hover:text-white transition-colors">Terms</button>
              <button onClick={() => router.push('/privacy-policy')} className="text-[12px] text-white/30 hover:text-white transition-colors">Privacy</button>
              <span className="text-[12px] text-white/30">© 2026</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════ Feature Detail Modal ═══════ */}
      <AnimatePresence>
        {selectedFeature && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setSelectedFeature(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 sm:inset-6 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[560px] md:max-h-[80vh] bg-white border rounded-[22px] shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
              style={{ borderColor: '#e6e8e7' }}
            >
              <div className="flex items-center justify-between p-5 sm:p-6 border-b shrink-0" style={{ borderColor: '#e6e8e7' }}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: C.card }}>
                    <selectedFeature.icon className="w-5 h-5" style={{ color: C.textMid }} />
                  </div>
                  <h3 className="sv-display text-[18px] truncate" style={{ color: C.text }}>{selectedFeature.title}</h3>
                </div>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSelectedFeature(null)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0" aria-label="Close">
                  <X className="w-5 h-5" style={{ color: C.textDim }} />
                </motion.button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 min-h-0">
                <p className="sv-body leading-relaxed" style={{ color: C.textMid }}>{selectedFeature.detailedDescription}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
