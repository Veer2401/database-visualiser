'use client';

import React, { useEffect, useState } from 'react';

export const FONT_OPTIONS = [
  { id: 'geist', name: 'Default (Geist)', value: '' },
  { id: 'inter', name: 'Inter', value: "'Inter', sans-serif" },
  { id: 'jetbrains', name: 'JetBrains Mono', value: "'JetBrains Mono', monospace" },
  { id: 'playfair', name: 'Playfair Display', value: "'Playfair Display', serif" },
];

export default function FontProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedFont = localStorage.getItem('app-font');
    if (savedFont) {
      document.body.style.setProperty('--font-geist-sans', savedFont);
    }
  }, []);

  // To prevent hydration mismatch, we still render children immediately,
  // but the font is applied in the useEffect on client side.
  // Alternatively, we could inject a script in layout, but this is cleaner.
  return <>{children}</>;
}
