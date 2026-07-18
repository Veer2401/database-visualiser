'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function PageLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPathRef = useRef(pathname + searchParams.toString());

  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    if (currentPath !== prevPathRef.current) {
      // Route changed — finish the bar
      setProgress(100);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 300);
      prevPathRef.current = currentPath;
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Expose a way to start loading from link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http')) return;
      if (href === pathname) return;

      setIsLoading(true);
      setProgress(15);

      // Simulate progressive loading
      let current = 15;
      intervalRef.current = setInterval(() => {
        current += Math.random() * 12;
        if (current >= 85) {
          current = 85;
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        setProgress(current);
      }, 150);
    };

    // Also listen for router.push via button clicks that trigger navigation
    const handleRouterPush = () => {
      if (!isLoading) {
        setIsLoading(true);
        setProgress(15);
        let current = 15;
        intervalRef.current = setInterval(() => {
          current += Math.random() * 12;
          if (current >= 85) {
            current = 85;
            if (intervalRef.current) clearInterval(intervalRef.current);
          }
          setProgress(current);
        }, 150);
      }
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('beforeunload', handleRouterPush);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', handleRouterPush);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pathname, isLoading]);

  if (!isLoading && progress === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: '3px',
        background: 'transparent',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #18181b, #52525b)',
          borderRadius: '0 2px 2px 0',
          transition: progress === 100 ? 'width 0.2s ease-out, opacity 0.3s ease' : 'width 0.15s ease-out',
          opacity: progress === 100 ? 0 : 1,
          boxShadow: '0 0 8px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  );
}

export default function PageLoader() {
  return (
    <Suspense fallback={null}>
      <PageLoaderInner />
    </Suspense>
  );
}
