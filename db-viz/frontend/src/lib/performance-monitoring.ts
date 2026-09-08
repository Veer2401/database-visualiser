/**
 * Performance Monitoring & Web Vitals Configuration
 * Tracks cache effectiveness and Core Web Vitals metrics
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

// Initialize web vitals tracking
export function initializeWebVitalsTracking() {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint - how quickly main content loads (target: < 2.5s)
  onLCP((metric) => {
    logWebVital('LCP', metric);
    if (metric.value > 2500) {
      console.warn('⚠️ LCP exceeds 2.5s:', metric.value);
    }
  });

  // Interaction to Next Paint - responsiveness (target: < 200ms)
  onINP((metric) => {
    logWebVital('INP', metric);
    if (metric.value > 200) {
      console.warn('⚠️ INP exceeds 200ms:', metric.value);
    }
  });

  // Cumulative Layout Shift - visual stability (target: < 0.1)
  onCLS((metric) => {
    logWebVital('CLS', metric);
    if (metric.value > 0.1) {
      console.warn('⚠️ CLS exceeds 0.1:', metric.value);
    }
  });

  // First Contentful Paint - when first content appears (target: < 1.8s)
  onFCP((metric) => {
    logWebVital('FCP', metric);
    if (metric.value > 1800) {
      console.warn('⚠️ FCP exceeds 1.8s:', metric.value);
    }
  });

  // Time to First Byte - server response time (target: < 600ms)
  onTTFB((metric) => {
    logWebVital('TTFB', metric);
    if (metric.value > 600) {
      console.warn('⚠️ TTFB exceeds 600ms:', metric.value);
    }
  });
}

/**
 * Log web vital metrics
 * In production, send to analytics service
 */
function logWebVital(
  metric: string,
  data: {
    value: number;
    id: string;
    rating?: 'good' | 'needs-improvement' | 'poor';
    delta?: number;
    entries?: PerformanceEntry[];
    attribution?: Record<string, unknown>;
  }
) {
  const vitalsData = {
    metric,
    value: Math.round(data.value),
    rating: data.rating,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : '',
  };

  // Send to analytics (Vercel Web Analytics, Google Analytics, etc.)
  if (typeof window !== 'undefined' && 'sendBeacon' in navigator) {
    // Example: Send to custom analytics endpoint
    // navigator.sendBeacon('/api/analytics', JSON.stringify(vitalsData));
  }

  console.log(`[${metric}]`, vitalsData);
}

/**
 * Cache Performance Metrics
 * Monitor how effective caching strategy is
 */
export interface CacheMetrics {
  cacheHitRate: number; // Percentage of requests served from cache
  averageResponseTime: number; // ms
  cachedBytes: number; // Total cached content size
  uncacheableRequests: number; // User-specific requests
  networkRequests: number; // Full network requests
}

/**
 * Performance Monitoring Configuration
 * Define what metrics to track
 */
export const PERFORMANCE_CONFIG = {
  // Enable performance monitoring
  enableMonitoring: process.env.NODE_ENV === 'production',
  
  // Web Vitals thresholds (milliseconds for timing, unitless for others)
  thresholds: {
    LCP: 2500,      // Largest Contentful Paint
    INP: 200,       // Interaction to Next Paint (replaces FID)
    CLS: 0.1,       // Cumulative Layout Shift
    FCP: 1800,      // First Contentful Paint
    TTFB: 600,      // Time to First Byte
  },
  
  // Cache monitoring settings
  cacheMonitoring: {
    trackCacheHeaders: true,
    trackResponseTimes: true,
    logToConsole: process.env.NODE_ENV === 'development',
    endpointForMetrics: '/api/metrics',
  },
  
  // Performance budgets
  budgets: {
    totalBundleSize: 500, // KB
    mainBundleSize: 250, // KB
    vendorBundleSize: 200, // KB
    cssSize: 50, // KB
  },
  
  // Error tracking
  errorTracking: {
    enabled: true,
    endpoint: '/api/errors',
    logNetworkErrors: true,
    logRuntimeErrors: true,
  }
};

/**
 * Measure resource timing and cache performance
 * Shows cache hits vs network requests
 */
export function analyzeResourceTiming() {
  if (
    typeof window === 'undefined' ||
    !('performance' in window) ||
    !('PerformanceResourceTiming' in window)
  ) {
    return null;
  }

  const resources = performance.getEntriesByType('resource');
  const metrics = {
    cached: 0,
    network: 0,
    totalSize: 0,
    totalTime: 0,
  };

  resources.forEach((resource: PerformanceEntry) => {
    const timing = resource as PerformanceResourceTiming;
    
    // Check if served from cache (no transfer time)
    if (timing.transferSize === 0) {
      metrics.cached++;
    } else {
      metrics.network++;
      metrics.totalSize += timing.transferSize;
    }
    
    metrics.totalTime += timing.duration;
  });

  return {
    ...metrics,
    cacheHitRate: metrics.cached / (metrics.cached + metrics.network),
    averageResourceTime: metrics.totalTime / resources.length,
  };
}

/**
 * Log cache effectiveness report
 * Useful for debugging cache issues
 */
export function logCacheReport() {
  const timing = analyzeResourceTiming();
  
  if (!timing) {
    console.log('Performance timing API not available');
    return;
  }

  console.group('📊 Cache Performance Report');
  console.log(`Cached Resources: ${timing.cached}`);
  console.log(`Network Requests: ${timing.network}`);
  console.log(`Cache Hit Rate: ${(timing.cacheHitRate * 100).toFixed(1)}%`);
  console.log(`Total Data Transferred: ${(timing.totalSize / 1024).toFixed(2)} KB`);
  console.log(`Average Resource Time: ${timing.averageResourceTime.toFixed(0)} ms`);
  console.groupEnd();
}

// Auto-log cache report on page load (development only)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', logCacheReport);
  } else {
    logCacheReport();
  }
}
