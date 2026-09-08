'use client';

import { useEffect } from 'react';
import { initializeWebVitalsTracking, logCacheReport } from '@/lib/performance-monitoring';

/**
 * Client-side component for initializing performance monitoring
 * Loads Web Vitals tracking and cache performance analysis
 * 
 * This should be rendered as early as possible in the page lifecycle
 * to capture accurate metrics
 */
export function WebVitalsMonitor() {
  useEffect(() => {
    // Initialize Web Vitals tracking
    initializeWebVitalsTracking();
    
    // Log cache report on page load (development only)
    if (process.env.NODE_ENV === 'development') {
      logCacheReport();
    }
  }, []);

  return null; // This component renders nothing, just sets up monitoring
}
