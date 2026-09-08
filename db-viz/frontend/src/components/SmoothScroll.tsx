'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Disable smooth scroll on heavy dynamic canvas app pages to ensure max FPS and responsiveness
    if (['/dashboard', '/presentation', '/terminal-mode'].includes(pathname)) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Handle anchor links with smooth scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: -80, // Account for fixed navbar
              duration: 0.8,
            });
          }
        } else if (href === '#') {
          // Scroll to top
          e.preventDefault();
          lenis.scrollTo(0, { duration: 0.8 });
        }
      }
    };

    // Handle hash on page load
    const handleHashOnLoad = () => {
      if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          setTimeout(() => {
            lenis.scrollTo(targetElement, {
              offset: -80,
              duration: 0.8,
            });
          }, 150);
        }
      }
    };

    if (document.readyState === 'complete') {
      handleHashOnLoad();
    } else {
      window.addEventListener('load', handleHashOnLoad);
    }

    document.addEventListener('click', handleAnchorClick);
    lenis.scrollTo(0, { immediate: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', handleHashOnLoad);
    };
  }, [pathname]);

  return <>{children}</>;
}
