(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/performance-monitoring.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PERFORMANCE_CONFIG",
    ()=>PERFORMANCE_CONFIG,
    "analyzeResourceTiming",
    ()=>analyzeResourceTiming,
    "initializeWebVitalsTracking",
    ()=>initializeWebVitalsTracking,
    "logCacheReport",
    ()=>logCacheReport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Performance Monitoring & Web Vitals Configuration
 * Tracks cache effectiveness and Core Web Vitals metrics
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web$2d$vitals$2f$dist$2f$web$2d$vitals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/web-vitals/dist/web-vitals.js [app-client] (ecmascript)");
;
function initializeWebVitalsTracking() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Largest Contentful Paint - how quickly main content loads (target: < 2.5s)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web$2d$vitals$2f$dist$2f$web$2d$vitals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onLCP"])((metric)=>{
        logWebVital('LCP', metric);
        if (metric.value > 2500) {
            console.warn('⚠️ LCP exceeds 2.5s:', metric.value);
        }
    });
    // Interaction to Next Paint - responsiveness (target: < 200ms)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web$2d$vitals$2f$dist$2f$web$2d$vitals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onINP"])((metric)=>{
        logWebVital('INP', metric);
        if (metric.value > 200) {
            console.warn('⚠️ INP exceeds 200ms:', metric.value);
        }
    });
    // Cumulative Layout Shift - visual stability (target: < 0.1)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web$2d$vitals$2f$dist$2f$web$2d$vitals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onCLS"])((metric)=>{
        logWebVital('CLS', metric);
        if (metric.value > 0.1) {
            console.warn('⚠️ CLS exceeds 0.1:', metric.value);
        }
    });
    // First Contentful Paint - when first content appears (target: < 1.8s)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web$2d$vitals$2f$dist$2f$web$2d$vitals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onFCP"])((metric)=>{
        logWebVital('FCP', metric);
        if (metric.value > 1800) {
            console.warn('⚠️ FCP exceeds 1.8s:', metric.value);
        }
    });
    // Time to First Byte - server response time (target: < 600ms)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web$2d$vitals$2f$dist$2f$web$2d$vitals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onTTFB"])((metric)=>{
        logWebVital('TTFB', metric);
        if (metric.value > 600) {
            console.warn('⚠️ TTFB exceeds 600ms:', metric.value);
        }
    });
}
/**
 * Log web vital metrics
 * In production, send to analytics service
 */ function logWebVital(metric, data) {
    const vitalsData = {
        metric,
        value: Math.round(data.value),
        rating: data.rating,
        timestamp: new Date().toISOString(),
        url: ("TURBOPACK compile-time truthy", 1) ? window.location.href : "TURBOPACK unreachable"
    };
    // Send to analytics (Vercel Web Analytics, Google Analytics, etc.)
    if (("TURBOPACK compile-time value", "object") !== 'undefined' && 'sendBeacon' in navigator) {
    // Example: Send to custom analytics endpoint
    // navigator.sendBeacon('/api/analytics', JSON.stringify(vitalsData));
    }
    console.log(`[${metric}]`, vitalsData);
}
const PERFORMANCE_CONFIG = {
    // Enable performance monitoring
    enableMonitoring: ("TURBOPACK compile-time value", "development") === 'production',
    // Web Vitals thresholds (milliseconds for timing, unitless for others)
    thresholds: {
        LCP: 2500,
        INP: 200,
        CLS: 0.1,
        FCP: 1800,
        TTFB: 600
    },
    // Cache monitoring settings
    cacheMonitoring: {
        trackCacheHeaders: true,
        trackResponseTimes: true,
        logToConsole: ("TURBOPACK compile-time value", "development") === 'development',
        endpointForMetrics: '/api/metrics'
    },
    // Performance budgets
    budgets: {
        totalBundleSize: 500,
        mainBundleSize: 250,
        vendorBundleSize: 200,
        cssSize: 50
    },
    // Error tracking
    errorTracking: {
        enabled: true,
        endpoint: '/api/errors',
        logNetworkErrors: true,
        logRuntimeErrors: true
    }
};
function analyzeResourceTiming() {
    if (("TURBOPACK compile-time value", "object") === 'undefined' || !('performance' in window) || !('PerformanceResourceTiming' in window)) {
        return null;
    }
    const resources = performance.getEntriesByType('resource');
    const metrics = {
        cached: 0,
        network: 0,
        totalSize: 0,
        totalTime: 0
    };
    resources.forEach((resource)=>{
        const timing = resource;
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
        averageResourceTime: metrics.totalTime / resources.length
    };
}
function logCacheReport() {
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
if ("TURBOPACK compile-time truthy", 1) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', logCacheReport);
    } else {
        logCacheReport();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/WebVitalsMonitor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebVitalsMonitor",
    ()=>WebVitalsMonitor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2d$monitoring$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/performance-monitoring.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function WebVitalsMonitor() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WebVitalsMonitor.useEffect": ()=>{
            // Initialize Web Vitals tracking
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2d$monitoring$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeWebVitalsTracking"])();
            // Log cache report on page load (development only)
            if ("TURBOPACK compile-time truthy", 1) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2d$monitoring$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logCacheReport"])();
            }
        }
    }["WebVitalsMonitor.useEffect"], []);
    return null; // This component renders nothing, just sets up monitoring
}
_s(WebVitalsMonitor, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = WebVitalsMonitor;
var _c;
__turbopack_context__.k.register(_c, "WebVitalsMonitor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PageLoader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function PageLoaderInner() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const prevPathRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(pathname + searchParams.toString());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageLoaderInner.useEffect": ()=>{
            const currentPath = pathname + searchParams.toString();
            if (currentPath !== prevPathRef.current) {
                // Route changed — finish the bar fast
                setProgress(100);
                const timer = setTimeout({
                    "PageLoaderInner.useEffect.timer": ()=>{
                        setIsLoading(false);
                        setProgress(0);
                    }
                }["PageLoaderInner.useEffect.timer"], 150);
                prevPathRef.current = currentPath;
                return ({
                    "PageLoaderInner.useEffect": ()=>clearTimeout(timer)
                })["PageLoaderInner.useEffect"];
            }
        }
    }["PageLoaderInner.useEffect"], [
        pathname,
        searchParams
    ]);
    // Instant navigation feedback
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageLoaderInner.useEffect": ()=>{
            const handleClick = {
                "PageLoaderInner.useEffect.handleClick": (e)=>{
                    const target = e.target.closest('a');
                    if (!target) return;
                    const href = target.getAttribute('href');
                    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http') || href === pathname) return;
                    setIsLoading(true);
                    setProgress(70);
                }
            }["PageLoaderInner.useEffect.handleClick"];
            document.addEventListener('click', handleClick);
            return ({
                "PageLoaderInner.useEffect": ()=>{
                    document.removeEventListener('click', handleClick);
                    if (intervalRef.current) clearInterval(intervalRef.current);
                }
            })["PageLoaderInner.useEffect"];
        }
    }["PageLoaderInner.useEffect"], [
        pathname
    ]);
    if (!isLoading && progress === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: '3px',
            background: 'transparent',
            pointerEvents: 'none'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #18181b, #6366f1, #3b82f6)',
                borderRadius: '0 2px 2px 0',
                transition: progress === 100 ? 'width 0.1s ease-out, opacity 0.15s ease' : 'width 0.08s ease-out',
                opacity: progress === 100 ? 0 : 1,
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
            }
        }, void 0, false, {
            fileName: "[project]/src/components/PageLoader.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/PageLoader.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(PageLoaderInner, "nBsN7TfzFjYy/lfFVN79WC3XDSE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = PageLoaderInner;
function PageLoader() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: null,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageLoaderInner, {}, void 0, false, {
            fileName: "[project]/src/components/PageLoader.tsx",
            lineNumber: 80,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/PageLoader.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_c1 = PageLoader;
var _c, _c1;
__turbopack_context__.k.register(_c, "PageLoaderInner");
__turbopack_context__.k.register(_c1, "PageLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/common/FontProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FONT_OPTIONS",
    ()=>FONT_OPTIONS,
    "default",
    ()=>FontProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const FONT_OPTIONS = [
    {
        id: 'geist',
        name: 'Default (Geist)',
        value: ''
    },
    {
        id: 'inter',
        name: 'Inter',
        value: "'Inter', sans-serif"
    },
    {
        id: 'jetbrains',
        name: 'JetBrains Mono',
        value: "'JetBrains Mono', monospace"
    },
    {
        id: 'playfair',
        name: 'Playfair Display',
        value: "'Playfair Display', serif"
    }
];
function FontProvider({ children }) {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FontProvider.useEffect": ()=>{
            setMounted(true);
        }
    }["FontProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FontProvider.useEffect": ()=>{
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
        }
    }["FontProvider.useEffect"], [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(FontProvider, "OSZuXbADPaNGKKEvOUx0z6eLBbQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = FontProvider;
var _c;
__turbopack_context__.k.register(_c, "FontProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/web-vitals/dist/web-vitals.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLSThresholds",
    ()=>L,
    "FCPThresholds",
    ()=>b,
    "FIDThresholds",
    ()=>$,
    "INPThresholds",
    ()=>N,
    "LCPThresholds",
    ()=>_,
    "TTFBThresholds",
    ()=>J,
    "onCLS",
    ()=>w,
    "onFCP",
    ()=>S,
    "onFID",
    ()=>ee,
    "onINP",
    ()=>j,
    "onLCP",
    ()=>G,
    "onTTFB",
    ()=>Q
]);
var e, n, t, r, i, o = -1, a = function(e) {
    addEventListener("pageshow", function(n) {
        n.persisted && (o = n.timeStamp, e(n));
    }, !0);
}, c = function() {
    var e = self.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    if (e && e.responseStart > 0 && e.responseStart < performance.now()) return e;
}, u = function() {
    var e = c();
    return e && e.activationStart || 0;
}, f = function(e, n) {
    var t = c(), r = "navigate";
    o >= 0 ? r = "back-forward-cache" : t && (document.prerendering || u() > 0 ? r = "prerender" : document.wasDiscarded ? r = "restore" : t.type && (r = t.type.replace(/_/g, "-")));
    return {
        name: e,
        value: void 0 === n ? -1 : n,
        rating: "good",
        delta: 0,
        entries: [],
        id: "v4-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
        navigationType: r
    };
}, s = function(e, n, t) {
    try {
        if (PerformanceObserver.supportedEntryTypes.includes(e)) {
            var r = new PerformanceObserver(function(e) {
                Promise.resolve().then(function() {
                    n(e.getEntries());
                });
            });
            return r.observe(Object.assign({
                type: e,
                buffered: !0
            }, t || {})), r;
        }
    } catch (e) {}
}, d = function(e, n, t, r) {
    var i, o;
    return function(a) {
        n.value >= 0 && (a || r) && ((o = n.value - (i || 0)) || void 0 === i) && (i = n.value, n.delta = o, n.rating = function(e, n) {
            return e > n[1] ? "poor" : e > n[0] ? "needs-improvement" : "good";
        }(n.value, t), e(n));
    };
}, l = function(e) {
    requestAnimationFrame(function() {
        return requestAnimationFrame(function() {
            return e();
        });
    });
}, p = function(e) {
    document.addEventListener("visibilitychange", function() {
        "hidden" === document.visibilityState && e();
    });
}, v = function(e) {
    var n = !1;
    return function() {
        n || (e(), n = !0);
    };
}, m = -1, h = function() {
    return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0;
}, g = function(e) {
    "hidden" === document.visibilityState && m > -1 && (m = "visibilitychange" === e.type ? e.timeStamp : 0, T());
}, y = function() {
    addEventListener("visibilitychange", g, !0), addEventListener("prerenderingchange", g, !0);
}, T = function() {
    removeEventListener("visibilitychange", g, !0), removeEventListener("prerenderingchange", g, !0);
}, E = function() {
    return m < 0 && (m = h(), y(), a(function() {
        setTimeout(function() {
            m = h(), y();
        }, 0);
    })), {
        get firstHiddenTime () {
            return m;
        }
    };
}, C = function(e) {
    document.prerendering ? addEventListener("prerenderingchange", function() {
        return e();
    }, !0) : e();
}, b = [
    1800,
    3e3
], S = function(e, n) {
    n = n || {}, C(function() {
        var t, r = E(), i = f("FCP"), o = s("paint", function(e) {
            e.forEach(function(e) {
                "first-contentful-paint" === e.name && (o.disconnect(), e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - u(), 0), i.entries.push(e), t(!0)));
            });
        });
        o && (t = d(e, i, b, n.reportAllChanges), a(function(r) {
            i = f("FCP"), t = d(e, i, b, n.reportAllChanges), l(function() {
                i.value = performance.now() - r.timeStamp, t(!0);
            });
        }));
    });
}, L = [
    .1,
    .25
], w = function(e, n) {
    n = n || {}, S(v(function() {
        var t, r = f("CLS", 0), i = 0, o = [], c = function(e) {
            e.forEach(function(e) {
                if (!e.hadRecentInput) {
                    var n = o[0], t = o[o.length - 1];
                    i && e.startTime - t.startTime < 1e3 && e.startTime - n.startTime < 5e3 ? (i += e.value, o.push(e)) : (i = e.value, o = [
                        e
                    ]);
                }
            }), i > r.value && (r.value = i, r.entries = o, t());
        }, u = s("layout-shift", c);
        u && (t = d(e, r, L, n.reportAllChanges), p(function() {
            c(u.takeRecords()), t(!0);
        }), a(function() {
            i = 0, r = f("CLS", 0), t = d(e, r, L, n.reportAllChanges), l(function() {
                return t();
            });
        }), setTimeout(t, 0));
    }));
}, A = 0, I = 1 / 0, P = 0, M = function(e) {
    e.forEach(function(e) {
        e.interactionId && (I = Math.min(I, e.interactionId), P = Math.max(P, e.interactionId), A = P ? (P - I) / 7 + 1 : 0);
    });
}, k = function() {
    return e ? A : performance.interactionCount || 0;
}, F = function() {
    "interactionCount" in performance || e || (e = s("event", M, {
        type: "event",
        buffered: !0,
        durationThreshold: 0
    }));
}, D = [], x = new Map, R = 0, B = function() {
    var e = Math.min(D.length - 1, Math.floor((k() - R) / 50));
    return D[e];
}, H = [], q = function(e) {
    if (H.forEach(function(n) {
        return n(e);
    }), e.interactionId || "first-input" === e.entryType) {
        var n = D[D.length - 1], t = x.get(e.interactionId);
        if (t || D.length < 10 || e.duration > n.latency) {
            if (t) e.duration > t.latency ? (t.entries = [
                e
            ], t.latency = e.duration) : e.duration === t.latency && e.startTime === t.entries[0].startTime && t.entries.push(e);
            else {
                var r = {
                    id: e.interactionId,
                    latency: e.duration,
                    entries: [
                        e
                    ]
                };
                x.set(r.id, r), D.push(r);
            }
            D.sort(function(e, n) {
                return n.latency - e.latency;
            }), D.length > 10 && D.splice(10).forEach(function(e) {
                return x.delete(e.id);
            });
        }
    }
}, O = function(e) {
    var n = self.requestIdleCallback || self.setTimeout, t = -1;
    return e = v(e), "hidden" === document.visibilityState ? e() : (t = n(e), p(e)), t;
}, N = [
    200,
    500
], j = function(e, n) {
    "PerformanceEventTiming" in self && "interactionId" in PerformanceEventTiming.prototype && (n = n || {}, C(function() {
        var t;
        F();
        var r, i = f("INP"), o = function(e) {
            O(function() {
                e.forEach(q);
                var n = B();
                n && n.latency !== i.value && (i.value = n.latency, i.entries = n.entries, r());
            });
        }, c = s("event", o, {
            durationThreshold: null !== (t = n.durationThreshold) && void 0 !== t ? t : 40
        });
        r = d(e, i, N, n.reportAllChanges), c && (c.observe({
            type: "first-input",
            buffered: !0
        }), p(function() {
            o(c.takeRecords()), r(!0);
        }), a(function() {
            R = k(), D.length = 0, x.clear(), i = f("INP"), r = d(e, i, N, n.reportAllChanges);
        }));
    }));
}, _ = [
    2500,
    4e3
], z = {}, G = function(e, n) {
    n = n || {}, C(function() {
        var t, r = E(), i = f("LCP"), o = function(e) {
            n.reportAllChanges || (e = e.slice(-1)), e.forEach(function(e) {
                e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - u(), 0), i.entries = [
                    e
                ], t());
            });
        }, c = s("largest-contentful-paint", o);
        if (c) {
            t = d(e, i, _, n.reportAllChanges);
            var m = v(function() {
                z[i.id] || (o(c.takeRecords()), c.disconnect(), z[i.id] = !0, t(!0));
            });
            [
                "keydown",
                "click"
            ].forEach(function(e) {
                addEventListener(e, function() {
                    return O(m);
                }, {
                    once: !0,
                    capture: !0
                });
            }), p(m), a(function(r) {
                i = f("LCP"), t = d(e, i, _, n.reportAllChanges), l(function() {
                    i.value = performance.now() - r.timeStamp, z[i.id] = !0, t(!0);
                });
            });
        }
    });
}, J = [
    800,
    1800
], K = function e(n) {
    document.prerendering ? C(function() {
        return e(n);
    }) : "complete" !== document.readyState ? addEventListener("load", function() {
        return e(n);
    }, !0) : setTimeout(n, 0);
}, Q = function(e, n) {
    n = n || {};
    var t = f("TTFB"), r = d(e, t, J, n.reportAllChanges);
    K(function() {
        var i = c();
        i && (t.value = Math.max(i.responseStart - u(), 0), t.entries = [
            i
        ], r(!0), a(function() {
            t = f("TTFB", 0), (r = d(e, t, J, n.reportAllChanges))(!0);
        }));
    });
}, U = {
    passive: !0,
    capture: !0
}, V = new Date, W = function(e, i) {
    n || (n = i, t = e, r = new Date, Z(removeEventListener), X());
}, X = function() {
    if (t >= 0 && t < r - V) {
        var e = {
            entryType: "first-input",
            name: n.type,
            target: n.target,
            cancelable: n.cancelable,
            startTime: n.timeStamp,
            processingStart: n.timeStamp + t
        };
        i.forEach(function(n) {
            n(e);
        }), i = [];
    }
}, Y = function(e) {
    if (e.cancelable) {
        var n = (e.timeStamp > 1e12 ? new Date : performance.now()) - e.timeStamp;
        "pointerdown" == e.type ? function(e, n) {
            var t = function() {
                W(e, n), i();
            }, r = function() {
                i();
            }, i = function() {
                removeEventListener("pointerup", t, U), removeEventListener("pointercancel", r, U);
            };
            addEventListener("pointerup", t, U), addEventListener("pointercancel", r, U);
        }(n, e) : W(n, e);
    }
}, Z = function(e) {
    [
        "mousedown",
        "keydown",
        "touchstart",
        "pointerdown"
    ].forEach(function(n) {
        return e(n, Y, U);
    });
}, $ = [
    100,
    300
], ee = function(e, r) {
    r = r || {}, C(function() {
        var o, c = E(), u = f("FID"), l = function(e) {
            e.startTime < c.firstHiddenTime && (u.value = e.processingStart - e.startTime, u.entries.push(e), o(!0));
        }, m = function(e) {
            e.forEach(l);
        }, h = s("first-input", m);
        o = d(e, u, $, r.reportAllChanges), h && (p(v(function() {
            m(h.takeRecords()), h.disconnect();
        })), a(function() {
            var a;
            u = f("FID"), o = d(e, u, $, r.reportAllChanges), i = [], t = -1, n = null, Z(addEventListener), a = l, i.push(a), X();
        }));
    });
};
;
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_567d4bc6._.js.map