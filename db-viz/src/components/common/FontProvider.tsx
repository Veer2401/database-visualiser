'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const FONT_OPTIONS = [
  { id: 'geist', name: 'Default (Geist)', value: '' },
  { id: 'inter', name: 'Inter', value: "'Inter', sans-serif" },
  { id: 'jetbrains', name: 'JetBrains Mono', value: "'JetBrains Mono', monospace" },
  { id: 'playfair', name: 'Playfair Display', value: "'Playfair Display', serif" },
];

export default function FontProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Exclude public/marketing pages from the custom font
    const excludedPaths = [
      '/',
      '/login',
      '/pricing',
      '/documentation',
      '/privacy-policy',
      '/terms-of-service'
    ];
    const isExcludedPage = excludedPaths.includes(pathname);
    
    if (isExcludedPage) {
      document.body.style.removeProperty('--font-geist-sans');
    } else {
      const savedFont = localStorage.getItem('app-font');
      if (savedFont) {
        document.body.style.setProperty('--font-geist-sans', savedFont);
      } else {
        document.body.style.removeProperty('--font-geist-sans');
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
