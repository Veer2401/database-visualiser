module.exports = [
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/src/lib/firebase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "app",
    ()=>app,
    "auth",
    ()=>auth,
    "db",
    ()=>db,
    "githubProvider",
    ()=>githubProvider,
    "googleProvider",
    ()=>googleProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/node-esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
;
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyBchWXd3CdQSsYueSmMTmiWnZVGPndQIh0"),
    authDomain: ("TURBOPACK compile-time value", "database-visualiser.firebaseapp.com"),
    projectId: ("TURBOPACK compile-time value", "database-visualiser"),
    storageBucket: ("TURBOPACK compile-time value", "database-visualiser.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "429260141783"),
    appId: ("TURBOPACK compile-time value", "1:429260141783:web:15e2f103a44e7e67606c92"),
    measurementId: ("TURBOPACK compile-time value", "G-GV6DMJTHY1")
};
function assertFirebaseConfig() {
    const missing = [];
    if (!firebaseConfig.apiKey) missing.push('NEXT_PUBLIC_FIREBASE_API_KEY');
    if (!firebaseConfig.authDomain) missing.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
    if (!firebaseConfig.projectId) missing.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
    if (!firebaseConfig.storageBucket) missing.push('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
    if (!firebaseConfig.messagingSenderId) missing.push('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID');
    if (!firebaseConfig.appId) missing.push('NEXT_PUBLIC_FIREBASE_APP_ID');
    if (missing.length > 0) {
        throw new Error(`Missing Firebase environment variables: ${missing.join(', ')}`);
    }
}
assertFirebaseConfig();
// Initialize Firebase
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApps"])().length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApp"])() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuth"])(app);
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirestore"])(app);
const googleProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GoogleAuthProvider"]();
const githubProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GithubAuthProvider"]();
;
}),
"[project]/src/components/layout/Navbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$presentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Presentation$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/presentation.js [app-ssr] (ecmascript) <export default as Presentation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/terminal.js [app-ssr] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wand-sparkles.js [app-ssr] (ecmascript) <export default as Wand2>");
'use client';
;
;
;
;
function Navbar({ onPresentationMode, onTerminalMode, onComposerToggle, isComposerOpen, showModeButtons = false, theme, onMobileMenuToggle, selectedDatabaseName }) {
    const initialHeight = 64; // px (h-16)
    const maxExtra = 24; // max extra px to expand
    const expandScrollRange = 300; // px of scroll after which nav reaches full expansion
    const [height, setHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialHeight);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let lastHeight = initialHeight;
        function onScroll() {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(()=>{
                const y = window.scrollY || window.pageYOffset;
                const extra = Math.min(y, expandScrollRange) / expandScrollRange * maxExtra;
                const newHeight = Math.round(initialHeight + extra);
                if (newHeight !== lastHeight) {
                    lastHeight = newHeight;
                    setHeight(newHeight);
                }
            });
        }
        onScroll();
        window.addEventListener('scroll', onScroll, {
            passive: true
        });
        return ()=>{
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);
    const extra = Math.max(0, height - initialHeight);
    const basePaddingTop = 12; // px
    const paddingTop = Math.round(basePaddingTop + extra * 0.6);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].nav, {
        initial: {
            y: -20,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        },
        transition: {
            duration: 0.4
        },
        style: {
            height: `${height}px`,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `12px`
        },
        className: `${theme?.navbar || 'bg-white/95 border-gray-200/50'} backdrop-blur-2xl border-b px-4 sm:px-6 flex items-start justify-between shadow-lg shadow-gray-200/20 z-50 transition-[height,padding] duration-200 ease-out relative`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    x: -10
                },
                animate: {
                    opacity: 1,
                    x: 0
                },
                transition: {
                    delay: 0.1
                },
                className: "flex items-center gap-2 sm:gap-3 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-gray-900 to-black rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-5 sm:w-6 h-5 sm:h-6 text-white",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Navbar.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Navbar.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: `text-lg sm:text-xl font-light truncate ${theme?.text || 'text-gray-900'}`,
                                style: {
                                    fontFamily: 'var(--font-geist-sans)'
                                },
                                children: "Schema View"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-[10px] sm:text-xs font-light hidden sm:block ${theme?.textSecondary || 'text-gray-500'}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Navbar.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Navbar.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            selectedDatabaseName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -10
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "absolute left-1/2 -translate-x-1/2 hidden md:flex items-center",
                style: {
                    top: `${paddingTop}px`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `px-4 py-1.5 rounded-full ${theme?.buttonSecondary || 'bg-gray-100'} border ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'} shadow-sm flex items-center gap-2`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-2 h-2 rounded-full ${theme?.navbar?.includes('slate') ? 'bg-emerald-400' : 'bg-emerald-500'}`
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Navbar.tsx",
                            lineNumber: 112,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `text-sm font-medium ${theme?.text || 'text-gray-900'} truncate max-w-[200px] lg:max-w-[300px]`,
                            style: {
                                fontFamily: 'var(--font-geist-sans)'
                            },
                            children: selectedDatabaseName
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Navbar.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Navbar.tsx",
                    lineNumber: 111,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Navbar.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    x: 10
                },
                animate: {
                    opacity: 1,
                    x: 0
                },
                transition: {
                    delay: 0.15
                },
                className: "flex items-center gap-3",
                children: [
                    onMobileMenuToggle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                        whileHover: {
                            scale: 1.05
                        },
                        whileTap: {
                            scale: 0.95
                        },
                        onClick: onMobileMenuToggle,
                        className: `md:hidden p-2.5 rounded-lg ${theme?.buttonSecondary || 'bg-white hover:bg-gray-50 border-gray-200/80'} border transition-all`,
                        "aria-label": "Toggle menu",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            className: `w-5 h-5 ${theme?.text || 'text-gray-900'}`
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Navbar.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Navbar.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    onComposerToggle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                        whileHover: {
                            scale: 1.05,
                            y: -1
                        },
                        whileTap: {
                            scale: 0.95
                        },
                        onClick: onComposerToggle,
                        className: `relative p-2.5 rounded-xl border shadow-md transition-all group ${isComposerOpen ? theme?.navbar?.includes('slate') ? 'bg-slate-800 border-slate-600 text-white shadow-slate-900/50' : 'bg-gray-900 border-gray-800 text-white shadow-gray-900/20' : `${theme?.buttonSecondary || 'bg-white hover:bg-gray-50 border-gray-200/80 hover:border-gray-300'}`}`,
                        "aria-label": "Toggle DB Composer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__["Wand2"], {
                                className: `w-5 h-5 ${isComposerOpen ? 'text-white' : `${theme?.text || 'text-gray-600'} group-hover:text-gray-900 transition-colors`}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-50",
                                children: [
                                    isComposerOpen ? 'Close' : 'Open',
                                    " DB Composer",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-slate-900"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Navbar.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Navbar.tsx",
                        lineNumber: 142,
                        columnNumber: 11
                    }, this),
                    showModeButtons && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileHover: {
                                    scale: 1.05,
                                    y: -1
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                onClick: onTerminalMode,
                                className: `relative p-2.5 rounded-xl ${theme?.buttonSecondary || 'bg-white hover:bg-green-50 border-gray-200/80 hover:border-green-300'} border shadow-md shadow-gray-200/30 transition-all group`,
                                "aria-label": "Terminal Mode",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"], {
                                        className: `w-5 h-5 ${theme?.text || 'text-gray-600'} group-hover:text-green-600 transition-colors`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Navbar.tsx",
                                        lineNumber: 179,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-50",
                                        children: [
                                            "Switch to Terminal Mode",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-slate-900"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                                lineNumber: 183,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/Navbar.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileHover: {
                                    scale: 1.05,
                                    y: -1
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                onClick: onPresentationMode,
                                className: `relative p-2.5 rounded-xl ${theme?.buttonSecondary || 'bg-white hover:bg-blue-50 border-gray-200/80 hover:border-blue-300'} border shadow-md shadow-gray-200/30 transition-all group`,
                                "aria-label": "Presentation Mode",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$presentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Presentation$3e$__["Presentation"], {
                                        className: `w-5 h-5 ${theme?.text || 'text-gray-600'} group-hover:text-blue-600 transition-colors`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Navbar.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-50",
                                        children: [
                                            "Switch to Presentation Mode",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-slate-900"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                                lineNumber: 199,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/Navbar.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Navbar.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Navbar.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Navbar.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/Sidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.js [app-ssr] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table.js [app-ssr] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-plus.js [app-ssr] (ecmascript) <export default as FolderPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen-line.js [app-ssr] (ecmascript) <export default as Edit3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-plus.js [app-ssr] (ecmascript) <export default as PlusCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link.js [app-ssr] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/terminal.js [app-ssr] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$presentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Presentation$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/presentation.js [app-ssr] (ecmascript) <export default as Presentation>");
'use client';
;
;
;
;
;
function Sidebar({ databases, tables, allTables, selectedDatabaseId, selectedTableId, user, onSelectDatabase, onSelectTable, onCreateDatabase, onCreateTable, onDeleteDatabase, onDeleteTable, onQuickSQL, onEditTable, onManageForeignKeys, onOpenSettings, onViewProfile, onTerminalMode, onPresentationMode, showModeButtons, onLogout, theme, isCollapsed = false }) {
    const [expandedDatabases, setExpandedDatabases] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const toggleDatabase = (dbId)=>{
        setExpandedDatabases((prev)=>{
            const next = new Set(prev);
            if (next.has(dbId)) {
                next.delete(dbId);
            } else {
                next.add(dbId);
            }
            return next;
        });
    };
    // Memoize table counts using allTables (all tables across all databases)
    const tableCountsByDatabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const counts = {};
        databases.forEach((db)=>{
            counts[db.id] = allTables.filter((t)=>t.databaseId === db.id).length;
        });
        return counts;
    }, [
        databases,
        allTables
    ]);
    const getTablesForDatabase = (databaseId)=>{
        // Use allTables which contains tables from all databases
        // The dashboard filters 'tables' by selectedDatabaseId, but Sidebar needs to show
        // tables for any database being viewed, not just the currently selected one
        return allTables.filter((t)=>t.databaseId === databaseId);
    };
    const sqlButtons = [
        {
            type: 'CREATE',
            color: 'bg-black hover:bg-gray-900',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"]
        },
        {
            type: 'INSERT',
            color: 'bg-black hover:bg-gray-900',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"]
        },
        {
            type: 'SELECT',
            color: 'bg-black hover:bg-gray-900',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
        },
        {
            type: 'UPDATE',
            color: 'bg-black hover:bg-gray-900',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__["Edit3"]
        },
        {
            type: 'DELETE',
            color: 'bg-black hover:bg-gray-900',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"]
        },
        {
            type: 'DROP',
            color: 'bg-black hover:bg-gray-900',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].aside, {
        initial: false,
        animate: {
            width: isCollapsed ? 72 : ("TURBOPACK compile-time value", "undefined") !== 'undefined' && window.innerWidth >= 1024 ? "TURBOPACK unreachable" : 240,
            opacity: 1
        },
        transition: {
            duration: 0.3,
            ease: 'easeInOut'
        },
        className: `hidden md:flex ${theme?.sidebar || 'bg-white/95 border-gray-200'} border-r flex-col h-full backdrop-blur-xl shadow-lg shadow-gray-200/10 overflow-hidden shrink-0`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `p-4 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700 bg-slate-800' : 'border-gray-200/80 bg-gray-50/80'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} ${isCollapsed ? 'mb-0' : 'mb-3'}`,
                        children: [
                            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: `text-base font-medium ${theme?.text || 'text-gray-900'} tracking-tight`,
                                style: {
                                    fontFamily: 'var(--font-geist-sans)'
                                },
                                children: "Databases"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileHover: {
                                    scale: 1.03,
                                    y: -1
                                },
                                whileTap: {
                                    scale: 0.97
                                },
                                onClick: onCreateDatabase,
                                className: `rounded-lg ${theme?.button || 'bg-black text-white hover:bg-gray-900'} transition-colors ${isCollapsed ? 'p-2' : 'p-1.5'}`,
                                title: "Create Database",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderPlus$3e$__["FolderPlus"], {
                                    className: isCollapsed ? "w-5 h-5" : "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-1.5 mb-3",
                        children: sqlButtons.map(({ type, color }, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: index * 0.02
                                },
                                whileHover: {
                                    scale: 1.02,
                                    y: -1
                                },
                                whileTap: {
                                    scale: 0.98
                                },
                                onClick: ()=>onQuickSQL(type),
                                className: `${color} text-white text-xs py-2.5 px-2 rounded-md flex items-center justify-center transition-colors touch-target`,
                                style: {
                                    fontFamily: 'var(--font-geist-sans)'
                                },
                                title: type,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: type
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 164,
                                    columnNumber: 17
                                }, this)
                            }, type, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 152,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this),
                    selectedDatabaseId && !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: 0.1
                        },
                        className: `pt-3 border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200/80'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                            whileHover: {
                                scale: 1.01,
                                y: -1
                            },
                            whileTap: {
                                scale: 0.99
                            },
                            onClick: onManageForeignKeys,
                            className: `w-full flex items-center justify-center gap-2 py-2 px-3 ${theme?.buttonSecondary || 'bg-black hover:bg-gray-900 text-white'} rounded-lg text-sm transition-colors`,
                            style: {
                                fontFamily: 'var(--font-geist-sans)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 185,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Foreign Keys"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 178,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Sidebar.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-3",
                children: databases.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    className: "text-center py-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-14 h-14 mx-auto ${theme?.buttonSecondary || 'bg-gray-100'} rounded-lg flex items-center justify-center mb-3 border ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                                className: `w-7 h-7 ${theme?.textSecondary || 'text-gray-500'}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 201,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 200,
                            columnNumber: 13
                        }, this),
                        !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `text-sm ${theme?.textSecondary || 'text-gray-600'} mb-3`,
                                    style: {
                                        fontFamily: 'var(--font-geist-sans)'
                                    },
                                    children: "No databases yet"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 205,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                    whileHover: {
                                        scale: 1.02,
                                        y: -1
                                    },
                                    whileTap: {
                                        scale: 0.98
                                    },
                                    onClick: onCreateDatabase,
                                    className: `text-sm ${theme?.button || 'bg-black text-white hover:bg-gray-900'} px-4 py-2 rounded-lg transition-colors`,
                                    style: {
                                        fontFamily: 'var(--font-geist-sans)'
                                    },
                                    children: "Create database"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 208,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                    lineNumber: 195,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: databases.map((db)=>{
                        const isExpanded = expandedDatabases.has(db.id);
                        const isSelected = selectedDatabaseId === db.id;
                        const dbTables = getTablesForDatabase(db.id);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `
                      flex items-center gap-2 rounded-lg cursor-pointer group transition-colors
                      ${isCollapsed ? 'justify-center p-2' : 'px-3 py-2.5'}
                      ${isSelected ? theme?.buttonSecondary || 'bg-gray-100 border border-gray-200' : theme?.navbar?.includes('slate') ? 'hover:bg-slate-800' : 'hover:bg-gray-50'}
                    `,
                                    onClick: ()=>{
                                        onSelectDatabase(db.id);
                                        if (!isCollapsed) {
                                            toggleDatabase(db.id);
                                        }
                                    },
                                    title: isCollapsed ? db.name : undefined,
                                    children: [
                                        !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            animate: {
                                                rotate: isExpanded ? 90 : 0
                                            },
                                            transition: {
                                                duration: 0.15
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: `w-3.5 h-3.5 ${theme?.textSecondary || 'text-gray-500'}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 249,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 245,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                                            className: `${isCollapsed ? 'w-6 h-6' : 'w-3.5 h-3.5'} ${isSelected ? theme?.text || 'text-gray-900' : theme?.textSecondary || 'text-gray-600'}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 252,
                                            columnNumber: 21
                                        }, this),
                                        !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `flex-1 text-sm truncate ${isSelected ? theme?.text || 'text-gray-900' : theme?.text || 'text-gray-800'}`,
                                                    style: {
                                                        fontFamily: 'var(--font-geist-sans)'
                                                    },
                                                    children: db.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-xs ${theme?.textSecondary || 'text-gray-600'} ${theme?.buttonSecondary || 'bg-gray-200/60'} px-2 py-0.5 rounded-md`,
                                                    children: tableCountsByDatabase[db.id] || 0
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                    whileHover: {
                                                        scale: 1.1
                                                    },
                                                    whileTap: {
                                                        scale: 0.95
                                                    },
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        onDeleteDatabase(db.id);
                                                    },
                                                    className: "opacity-0 group-hover:opacity-100 p-1 rounded bg-white text-gray-700 hover:bg-gray-100 transition-all border border-gray-200",
                                                    title: "Delete Database",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 230,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: isExpanded && !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        animate: {
                                            height: 'auto',
                                            opacity: 1
                                        },
                                        exit: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        transition: {
                                            duration: 0.2
                                        },
                                        className: `ml-4 pl-3 border-l ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'} overflow-hidden mt-1`,
                                        children: [
                                            dbTables.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `py-2 text-xs ${theme?.textSecondary || 'text-gray-500'}`,
                                                style: {
                                                    fontFamily: 'var(--font-geist-sans)'
                                                },
                                                children: "No tables"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 288,
                                                columnNumber: 27
                                            }, this) : dbTables.map((table)=>{
                                                const isTableSelected = selectedTableId === table.id;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>onSelectTable(table.id),
                                                    className: `
                                  flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer transition-colors group
                                  ${isTableSelected ? theme?.buttonSecondary || 'bg-gray-100' : theme?.navbar?.includes('slate') ? 'hover:bg-slate-800' : 'hover:bg-gray-50'}
                                `,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                                                            className: `w-3 h-3 ${isTableSelected ? theme?.text || 'text-gray-900' : theme?.textSecondary || 'text-gray-500'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                            lineNumber: 303,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `flex-1 text-sm truncate ${isTableSelected ? theme?.text || 'text-gray-900' : theme?.text || 'text-gray-700'}`,
                                                            style: {
                                                                fontFamily: 'var(--font-geist-sans)'
                                                            },
                                                            children: table.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                            lineNumber: 304,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-[11px] ${theme?.textSecondary || 'text-gray-500'} ${theme?.buttonSecondary || 'bg-gray-100'} px-1.5 py-0.5 rounded`,
                                                            children: table.columns.length
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                            lineNumber: 307,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                            whileHover: {
                                                                scale: 1.1
                                                            },
                                                            whileTap: {
                                                                scale: 0.95
                                                            },
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                onEditTable(table.id);
                                                            },
                                                            className: "opacity-0 group-hover:opacity-100 p-1 rounded bg-white text-gray-700 hover:bg-gray-100 transition-all border border-gray-200",
                                                            title: "Edit Table",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__["Edit3"], {
                                                                className: "w-2.5 h-2.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                                lineNumber: 320,
                                                                columnNumber: 35
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                            lineNumber: 310,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                            whileHover: {
                                                                scale: 1.1
                                                            },
                                                            whileTap: {
                                                                scale: 0.95
                                                            },
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                onDeleteTable(table.id);
                                                            },
                                                            className: "opacity-0 group-hover:opacity-100 p-1 rounded bg-white text-gray-700 hover:bg-gray-100 transition-all border border-gray-200",
                                                            title: "Delete Table",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                className: "w-2.5 h-2.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                                lineNumber: 332,
                                                                columnNumber: 35
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                            lineNumber: 322,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, table.id, true, {
                                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 31
                                                }, this);
                                            }),
                                            isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                whileHover: {
                                                    scale: 1.01
                                                },
                                                whileTap: {
                                                    scale: 0.99
                                                },
                                                onClick: onCreateTable,
                                                className: `flex items-center gap-2 w-full px-2 py-1.5 mt-1 rounded-md ${theme?.navbar?.includes('slate') ? 'text-slate-400 hover:bg-slate-800 border-slate-600' : 'text-gray-500 hover:bg-gray-50 border-gray-300'} transition-colors border border-dashed text-xs`,
                                                style: {
                                                    fontFamily: 'var(--font-geist-sans)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                        lineNumber: 348,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: 'var(--font-geist-sans)'
                                                        },
                                                        children: "Add table"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                        lineNumber: 349,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 341,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 280,
                                        columnNumber: 23
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 278,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, db.id, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 228,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                    lineNumber: 221,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Sidebar.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-auto border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200/80'}`,
                children: [
                    showModeButtons && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onTerminalMode,
                        className: `w-full flex items-center ${isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'} ${theme?.navbar?.includes('slate') ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-gray-50 text-gray-700'} transition-colors text-sm`,
                        style: {
                            fontFamily: 'var(--font-geist-sans)'
                        },
                        title: isCollapsed ? "Terminal Mode" : undefined,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"], {
                                className: isCollapsed ? "w-5 h-5" : "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this),
                            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Terminal Mode"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 373,
                                columnNumber: 30
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 366,
                        columnNumber: 11
                    }, this),
                    showModeButtons && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onPresentationMode,
                        className: `w-full flex items-center ${isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'} ${theme?.navbar?.includes('slate') ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-gray-50 text-gray-700'} transition-colors text-sm`,
                        style: {
                            fontFamily: 'var(--font-geist-sans)'
                        },
                        title: isCollapsed ? "Presentation Mode" : undefined,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$presentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Presentation$3e$__["Presentation"], {
                                className: isCollapsed ? "w-5 h-5" : "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 385,
                                columnNumber: 13
                            }, this),
                            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Presentation Mode"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 386,
                                columnNumber: 30
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onOpenSettings,
                        className: `w-full flex items-center ${isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'} ${theme?.navbar?.includes('slate') ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-gray-50 text-gray-700'} transition-colors text-sm`,
                        style: {
                            fontFamily: 'var(--font-geist-sans)'
                        },
                        title: isCollapsed ? "Settings" : undefined,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                className: isCollapsed ? "w-5 h-5" : "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 397,
                                columnNumber: 11
                            }, this),
                            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Settings"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 398,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 391,
                        columnNumber: 9
                    }, this),
                    user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200/80'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onViewProfile,
                            className: `w-full flex items-center ${isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'} ${theme?.navbar?.includes('slate') ? 'hover:bg-slate-800' : 'hover:bg-gray-50'} transition-colors`,
                            title: isCollapsed ? "Profile" : undefined,
                            children: [
                                user.photoURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: user.photoURL,
                                    alt: user.displayName || 'User',
                                    width: isCollapsed ? 24 : 32,
                                    height: isCollapsed ? 24 : 32,
                                    className: `${isCollapsed ? 'w-6 h-6' : 'w-8 h-8'} rounded-full`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 410,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `rounded-full ${theme?.button || 'bg-gray-900'} flex items-center justify-center ${isCollapsed ? 'w-6 h-6' : 'w-8 h-8'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        className: `${isCollapsed ? 'w-3 h-3' : 'w-4 h-4'} text-white`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 419,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 418,
                                    columnNumber: 17
                                }, this),
                                !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-sm truncate flex-1 text-left ${theme?.text || 'text-gray-900'}`,
                                            style: {
                                                fontFamily: 'var(--font-geist-sans)'
                                            },
                                            children: user.displayName || user.email?.split('@')[0] || 'User'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 424,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: `w-4 h-4 ${theme?.textSecondary || 'text-gray-400'}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 427,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 404,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 403,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Sidebar.tsx",
                lineNumber: 363,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Sidebar.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/Terminal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Terminal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/terminal.js [app-ssr] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
'use client';
;
;
;
;
function Terminal({ logs, onCommand, isMinimized, onToggleMinimize }) {
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [commandHistory, setCommandHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [historyIndex, setHistoryIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(-1);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const logsEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (logs.length > 0) {
            logsEndRef.current?.scrollIntoView({
                behavior: 'auto'
            });
        }
    }, [
        logs.length
    ]);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (input.trim()) {
            onCommand(input.trim());
            setCommandHistory((prev)=>[
                    ...prev,
                    input.trim()
                ]);
            setInput('');
            setHistoryIndex(-1);
        }
    };
    const handleKeyDown = (e)=>{
        // Handle command history navigation
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        } else if (e.key === 'Enter') {
            const currentInput = input.trim();
            // Auto-execute if input ends with semicolon
            if (currentInput.endsWith(';')) {
                e.preventDefault();
                // Remove trailing semicolon and execute
                const queryToExecute = currentInput.slice(0, -1).trim();
                if (queryToExecute) {
                    onCommand(queryToExecute);
                    setCommandHistory((prev)=>[
                            ...prev,
                            currentInput
                        ]);
                    setInput('');
                    setHistoryIndex(-1);
                }
            }
        // Otherwise, let the form handle it normally (for single-line Enter behavior)
        }
    };
    const getLogColor = (type)=>{
        switch(type){
            case 'success':
                return 'text-green-400';
            case 'error':
                return 'text-red-400';
            case 'warning':
                return 'text-yellow-400';
            default:
                return 'text-gray-400';
        }
    };
    const formatTimestamp = (date)=>{
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            y: 20,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        },
        transition: {
            duration: 0.4,
            delay: 0.15
        },
        className: "bg-gray-900/95 backdrop-blur-2xl border-t border-gray-700/50 flex flex-col shadow-2xl shadow-gray-900/20",
        style: {
            height: isMinimized ? '48px' : '220px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "flex items-center justify-between px-4 py-2.5 bg-gray-800/90 backdrop-blur-xl border-b border-gray-700/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"], {
                                    className: "w-4 h-4 text-gray-400"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Terminal.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-300",
                                    style: {
                                        fontFamily: 'var(--font-geist-sans)'
                                    },
                                    children: "SQL Terminal"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Terminal.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400 bg-gray-700/60 px-2 py-0.5 rounded-md",
                                    style: {
                                        fontFamily: 'var(--font-geist-sans)'
                                    },
                                    children: "PostgreSQL"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Terminal.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Terminal.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Terminal.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                            whileHover: {
                                scale: 1.05,
                                backgroundColor: 'rgba(55, 65, 81, 0.8)'
                            },
                            whileTap: {
                                scale: 0.95
                            },
                            onClick: onToggleMinimize,
                            className: "p-1.5 rounded-md text-gray-400 hover:text-white transition-colors",
                            children: isMinimized ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Terminal.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Terminal.tsx",
                                lineNumber: 135,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Terminal.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Terminal.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Terminal.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: !isMinimized && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        height: 0,
                        opacity: 0
                    },
                    animate: {
                        height: 'auto',
                        opacity: 1
                    },
                    exit: {
                        height: 0,
                        opacity: 0
                    },
                    transition: {
                        duration: 0.25,
                        ease: "easeInOut"
                    },
                    className: "flex-1 overflow-hidden flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-4 font-mono text-sm",
                            onClick: ()=>inputRef.current?.focus(),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    transition: {
                                        delay: 0.1
                                    },
                                    className: "text-white mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-300 text-sm",
                                            children: "Connected to PostgreSQL"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Terminal.tsx",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 text-xs mt-1",
                                            children: "Type SQL or 'help'"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Terminal.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Terminal.tsx",
                                    lineNumber: 157,
                                    columnNumber: 15
                                }, this),
                                logs.map((log, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: -10
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        transition: {
                                            delay: index * 0.02
                                        },
                                        className: "flex gap-2 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-600",
                                                children: [
                                                    "[",
                                                    formatTimestamp(log.timestamp),
                                                    "]"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/Terminal.tsx",
                                                lineNumber: 176,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: getLogColor(log.type),
                                                children: log.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Terminal.tsx",
                                                lineNumber: 177,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, log.id, true, {
                                        fileName: "[project]/src/components/layout/Terminal.tsx",
                                        lineNumber: 169,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: logsEndRef
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Terminal.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Terminal.tsx",
                            lineNumber: 152,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "flex items-center px-4 pb-3 gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-400 font-mono text-sm",
                                    children: "$"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Terminal.tsx",
                                    lineNumber: 185,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: inputRef,
                                    type: "text",
                                    value: input,
                                    onChange: (e)=>setInput(e.target.value),
                                    onKeyDown: handleKeyDown,
                                    className: "flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-gray-600",
                                    placeholder: "enter SQL command",
                                    autoComplete: "off",
                                    spellCheck: false
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Terminal.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Terminal.tsx",
                            lineNumber: 184,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Terminal.tsx",
                    lineNumber: 144,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Terminal.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Terminal.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/api-client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiDelete",
    ()=>apiDelete,
    "apiGet",
    ()=>apiGet,
    "apiPatch",
    ()=>apiPatch,
    "apiPost",
    ()=>apiPost,
    "apiPublicGet",
    ()=>apiPublicGet,
    "apiPut",
    ()=>apiPut,
    "authFetch",
    ()=>authFetch,
    "getAuthToken",
    ()=>getAuthToken,
    "getCurrentUserId",
    ()=>getCurrentUserId,
    "isAuthenticated",
    ()=>isAuthenticated
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-ssr] (ecmascript)");
;
/**
 * Authenticated fetch wrapper
 * Automatically adds Firebase ID token to all requests
 * This ensures the backend can verify the user's identity
 */ async function authenticatedFetch(url, options) {
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"].currentUser;
    if (!user) {
        throw new Error('User not authenticated. Please log in.');
    }
    // Get Firebase ID token
    const token = await user.getIdToken();
    // Prepare headers with authorization
    const headers = new Headers(options?.headers || {});
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');
    return fetch(url, {
        ...options,
        headers
    });
}
async function apiGet(url) {
    const response = await authenticatedFetch(url, {
        method: 'GET'
    });
    if (!response.ok) {
        const error = await response.json().catch(()=>({}));
        throw new Error(error.error || `API error: ${response.status}`);
    }
    return response.json();
}
async function apiPost(url, data) {
    const response = await authenticatedFetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const error = await response.json().catch(()=>({}));
        throw new Error(error.error || `API error: ${response.status}`);
    }
    return response.json();
}
async function apiPut(url, data) {
    const response = await authenticatedFetch(url, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const error = await response.json().catch(()=>({}));
        throw new Error(error.error || `API error: ${response.status}`);
    }
    return response.json();
}
async function apiDelete(url) {
    const response = await authenticatedFetch(url, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const error = await response.json().catch(()=>({}));
        throw new Error(error.error || `API error: ${response.status}`);
    }
    return response.json();
}
async function apiPatch(url, data) {
    const response = await authenticatedFetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const error = await response.json().catch(()=>({}));
        throw new Error(error.error || `API error: ${response.status}`);
    }
    return response.json();
}
async function apiPublicGet(url) {
    const response = await fetch(url, {
        method: 'GET'
    });
    if (!response.ok) {
        const error = await response.json().catch(()=>({}));
        throw new Error(error.error || `API error: ${response.status}`);
    }
    return response.json();
}
async function authFetch(url, options) {
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"].currentUser;
    if (!user) {
        throw new Error('User not authenticated. Please log in.');
    }
    const token = await user.getIdToken();
    const headers = new Headers(options?.headers || {});
    headers.set('Authorization', `Bearer ${token}`);
    return fetch(url, {
        ...options,
        headers
    });
}
function isAuthenticated() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"].currentUser !== null;
}
async function getAuthToken() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"].currentUser) return null;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"].currentUser.getIdToken();
}
function getCurrentUserId() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"].currentUser?.uid || null;
}
}),
"[project]/src/hooks/useComposerActions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useComposerActions",
    ()=>useComposerActions
]);
/**
 * useComposerActions — Action Executor Hook
 *
 * Translates ComposerAction[] into concrete mutations on:
 *   1. PostgreSQL (via /api endpoints)
 *   2. Firebase (Firestore docs for tables/databases)
 *   3. React Flow canvas (nodes/edges are rebuilt reactively via onSnapshot)
 *
 * It re-uses the same API surface the dashboard already uses
 * (authFetch → /api/database/create, /api/table/create, /api/query/execute).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist-node/v4.js [app-ssr] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
// ─── Identifier Sanitizer ─────────────────────────────────────────────
// Normalizes database/table/column names to valid PostgreSQL identifiers (lowercase, alphanumeric + underscore)
function sanitizeIdentifier(name) {
    if (!name) return 'unnamed';
    let cleaned = name.toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '');
    if (!cleaned || /^[0-9]/.test(cleaned)) {
        cleaned = 'db_' + cleaned;
    }
    return cleaned;
}
// ─── Convert ColumnDef (from AI) → Column (app type) ──────────────────────
function columnDefToColumn(colDef, tables) {
    const sanitizedColName = sanitizeIdentifier(colDef.name);
    // Resolve FK references by name → id
    let foreignKeyReference;
    if (colDef.isForeign && colDef.references) {
        const refTableName = sanitizeIdentifier(colDef.references.table);
        const refColName = sanitizeIdentifier(colDef.references.column || 'id');
        const refTable = tables.find((t)=>sanitizeIdentifier(t.name) === refTableName);
        if (refTable) {
            const refCol = refTable.columns.find((c)=>sanitizeIdentifier(c.name) === refColName);
            if (refCol) {
                foreignKeyReference = {
                    tableId: refTable.id,
                    columnId: refCol.id
                };
            }
        }
    }
    const col = {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        name: sanitizedColName,
        dataType: colDef.type?.toUpperCase().replace(/\(.*\)/, '').trim() || 'VARCHAR',
        isPrimaryKey: !!colDef.isPrimary,
        isForeignKey: !!colDef.isForeign,
        isNotNull: !!colDef.isNotNull || !!colDef.isPrimary,
        isUnique: !!colDef.isUnique,
        isAutoIncrement: !!colDef.isPrimary
    };
    // Only attach optional fields if defined (Firebase setDoc rejects undefined)
    if (foreignKeyReference) {
        col.foreignKeyReference = foreignKeyReference;
    }
    if (colDef.defaultValue !== undefined && colDef.defaultValue !== null && colDef.defaultValue !== '') {
        col.defaultValue = String(colDef.defaultValue);
    }
    return col;
}
// ─── Build the PG column definition for the /api/table/create body ────────
function columnDefToPgColumn(colDef, tables) {
    const sanitizedColName = sanitizeIdentifier(colDef.name);
    const pgCol = {
        name: sanitizedColName,
        dataType: colDef.type?.toUpperCase() || 'VARCHAR',
        isPrimaryKey: !!colDef.isPrimary,
        isNotNull: !!colDef.isNotNull || !!colDef.isPrimary,
        isUnique: !!colDef.isUnique,
        isAutoIncrement: !!colDef.isPrimary,
        isForeignKey: !!colDef.isForeign
    };
    if (colDef.defaultValue !== undefined && colDef.defaultValue !== null && colDef.defaultValue !== '') {
        pgCol.defaultValue = String(colDef.defaultValue);
    }
    if (colDef.isForeign && colDef.references) {
        pgCol.foreignKeyReference = {
            tableName: sanitizeIdentifier(colDef.references.table),
            columnName: sanitizeIdentifier(colDef.references.column || 'id')
        };
    }
    return pgCol;
}
// ─── Grid position calculator ─────────────────────────────────────────────
function calcPosition(existingCount, index, viewportCenter) {
    const COLS = 3;
    const TABLE_W = 320;
    const SPACING = 60;
    const ROW_H = 380;
    const i = existingCount + index;
    const baseX = viewportCenter ? viewportCenter.x : 100;
    const baseY = viewportCenter ? viewportCenter.y : 100;
    return {
        x: Math.round(baseX + i % COLS * (TABLE_W + SPACING)),
        y: Math.round(baseY + Math.floor(i / COLS) * ROW_H)
    };
}
function useComposerActions(params) {
    const { userId, databases, tables, selectedDatabaseId, setSelectedDatabaseId, addLog, viewportCenter, onActionsExecuted } = params;
    const executeActions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (actions)=>{
        if (!userId) return {
            success: false,
            summary: 'Not authenticated.',
            actionResults: []
        };
        const results = [];
        let anyFailure = false;
        // Track the most recently created/used database within this batch of actions.
        // React state (selectedDatabaseId) won't update mid-loop, so EXECUTE_SQL
        // needs this local reference to target the right database.
        let lastCreatedDb = null;
        for (const action of actions){
            try {
                switch(action.type){
                    // ────────── CREATE_DATABASE ──────────────────────────────
                    case 'CREATE_DATABASE':
                        {
                            const sanitizedDbName = sanitizeIdentifier(action.databaseName);
                            let dbId;
                            // Check if database already exists in Firebase
                            const existingDb = databases.find((d)=>sanitizeIdentifier(d.name) === sanitizedDbName);
                            if (existingDb) {
                                dbId = existingDb.id;
                                setSelectedDatabaseId(dbId);
                                lastCreatedDb = {
                                    id: dbId,
                                    name: existingDb.name
                                };
                                addLog('info', `Using existing database '${sanitizedDbName}'`);
                            } else {
                                // 1. Create PG schema
                                const pgRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/database/create', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        name: sanitizedDbName
                                    })
                                });
                                const pgResult = await pgRes.json();
                                if (!pgResult.success && !pgResult.error?.toLowerCase().includes('already exists')) {
                                    results.push({
                                        action: `CREATE_DATABASE ${sanitizedDbName}`,
                                        success: false,
                                        detail: pgResult.error
                                    });
                                    anyFailure = true;
                                    addLog('error', `DB creation failed: ${pgResult.error}`);
                                    break;
                                }
                                // 2. Save to Firebase
                                dbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'databases', dbId), {
                                    name: sanitizedDbName,
                                    userId,
                                    db_password_hash: '',
                                    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                                    updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                                });
                                addLog('success', `Database '${sanitizedDbName}' created`);
                                setSelectedDatabaseId(dbId);
                                lastCreatedDb = {
                                    id: dbId,
                                    name: sanitizedDbName
                                };
                            }
                            // 3. Topological sort: tables referenced by FKs come first
                            const inputTables = action.tables || [];
                            const tableNamesSet = new Set(inputTables.map((t)=>sanitizeIdentifier(t.name)));
                            const sortedTables = [
                                ...inputTables
                            ].sort((a, b)=>{
                                const aName = sanitizeIdentifier(a.name);
                                const bName = sanitizeIdentifier(b.name);
                                // Check if a references b
                                const aRefsB = a.columns.some((c)=>c.isForeign && c.references && sanitizeIdentifier(c.references.table) === bName);
                                // Check if b references a
                                const bRefsA = b.columns.some((c)=>c.isForeign && c.references && sanitizeIdentifier(c.references.table) === aName);
                                if (aRefsB && !bRefsA) return 1;
                                if (!aRefsB && bRefsA) return -1;
                                return 0;
                            });
                            const createdTables = [];
                            for(let i = 0; i < sortedTables.length; i++){
                                const tableDef = sortedTables[i];
                                const sanitizedTableName = sanitizeIdentifier(tableDef.name);
                                try {
                                    const allTables = [
                                        ...tables,
                                        ...createdTables
                                    ];
                                    const pgCols = tableDef.columns.map((c)=>columnDefToPgColumn(c, allTables));
                                    // Create table in PostgreSQL
                                    const tblRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/table/create', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            database: sanitizedDbName,
                                            tableName: sanitizedTableName,
                                            columns: pgCols
                                        })
                                    });
                                    const tblResult = await tblRes.json();
                                    if (!tblResult.success && !tblResult.error?.toLowerCase().includes('already exists')) {
                                        results.push({
                                            action: `ADD_TABLE ${sanitizedTableName}`,
                                            success: false,
                                            detail: tblResult.error
                                        });
                                        anyFailure = true;
                                        addLog('warning', `Table '${sanitizedTableName}': ${tblResult.error}`);
                                        continue;
                                    }
                                    const columns = tableDef.columns.map((c)=>columnDefToColumn(c, [
                                            ...tables,
                                            ...createdTables
                                        ]));
                                    // Check if table doc ALREADY exists in Firebase for this database
                                    const existingTableDoc = tables.find((t)=>t.databaseId === dbId && sanitizeIdentifier(t.name) === sanitizedTableName);
                                    if (existingTableDoc) {
                                        // Update existing table in Firebase
                                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', existingTableDoc.id), {
                                            columns,
                                            updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                                        });
                                        createdTables.push({
                                            id: existingTableDoc.id,
                                            name: sanitizedTableName,
                                            databaseId: dbId,
                                            columns
                                        });
                                        results.push({
                                            action: `ADD_TABLE ${sanitizedTableName}`,
                                            success: true,
                                            detail: `Updated (${columns.length} cols)`
                                        });
                                        addLog('success', `Table '${sanitizedTableName}' updated on canvas`);
                                    } else {
                                        // Create new table doc in Firebase
                                        const tableId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
                                        const position = calcPosition(0, createdTables.length, viewportCenter);
                                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', tableId), {
                                            name: sanitizedTableName,
                                            databaseId: dbId,
                                            columns,
                                            position,
                                            createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                                            updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                                        });
                                        createdTables.push({
                                            id: tableId,
                                            name: sanitizedTableName,
                                            databaseId: dbId,
                                            columns
                                        });
                                        results.push({
                                            action: `ADD_TABLE ${sanitizedTableName}`,
                                            success: true,
                                            detail: `${columns.length} columns`
                                        });
                                        addLog('success', `Table '${sanitizedTableName}' created (${columns.length} cols)`);
                                    }
                                } catch (err) {
                                    results.push({
                                        action: `ADD_TABLE ${sanitizedTableName}`,
                                        success: false,
                                        detail: err.message
                                    });
                                    anyFailure = true;
                                }
                            }
                            results.push({
                                action: `CREATE_DATABASE ${sanitizedDbName}`,
                                success: true,
                                detail: `${sortedTables.length} tables`
                            });
                            break;
                        }
                    // ────────── ADD_TABLE ────────────────────────────────────
                    case 'ADD_TABLE':
                        {
                            const sanitizedTableName = sanitizeIdentifier(action.tableName);
                            let targetDbId = null;
                            let targetDb;
                            // Prefer database created in this same batch
                            if (lastCreatedDb) {
                                targetDbId = lastCreatedDb.id;
                                targetDb = lastCreatedDb;
                            } else {
                                targetDbId = selectedDatabaseId;
                                targetDb = databases.find((d)=>d.id === targetDbId);
                            }
                            // Auto-fallback: if no database selected, pick first or create default
                            if (!targetDbId || !targetDb) {
                                if (databases.length > 0) {
                                    targetDb = databases[0];
                                    targetDbId = targetDb.id;
                                    setSelectedDatabaseId(targetDbId);
                                } else {
                                    const defaultDbName = 'my_database';
                                    const pgRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/database/create', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            name: defaultDbName
                                        })
                                    });
                                    const newDbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'databases', newDbId), {
                                        name: defaultDbName,
                                        userId,
                                        db_password_hash: '',
                                        createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                                        updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                                    });
                                    targetDbId = newDbId;
                                    targetDb = {
                                        id: newDbId,
                                        name: defaultDbName
                                    };
                                    setSelectedDatabaseId(targetDbId);
                                    lastCreatedDb = targetDb;
                                    addLog('info', `Created database '${defaultDbName}'`);
                                }
                            }
                            const pgCols = action.columns.map((c)=>columnDefToPgColumn(c, tables));
                            const tblRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/table/create', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    database: sanitizeIdentifier(targetDb.name),
                                    tableName: sanitizedTableName,
                                    columns: pgCols
                                })
                            });
                            const tblResult = await tblRes.json();
                            if (!tblResult.success && !tblResult.error?.toLowerCase().includes('already exists')) {
                                results.push({
                                    action: `ADD_TABLE ${sanitizedTableName}`,
                                    success: false,
                                    detail: tblResult.error
                                });
                                anyFailure = true;
                                addLog('error', `Table creation failed: ${tblResult.error}`);
                                break;
                            }
                            const tableId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
                            const columns = action.columns.map((c)=>columnDefToColumn(c, tables));
                            const existingInDb = tables.filter((t)=>t.databaseId === targetDbId).length;
                            const position = calcPosition(0, existingInDb, viewportCenter);
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', tableId), {
                                name: sanitizedTableName,
                                databaseId: targetDbId,
                                columns,
                                position,
                                createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                            });
                            results.push({
                                action: `ADD_TABLE ${sanitizedTableName}`,
                                success: true,
                                detail: `${columns.length} columns`
                            });
                            addLog('success', `Table '${sanitizedTableName}' created (${columns.length} cols)`);
                            break;
                        }
                    // ────────── ADD_COLUMN ──────────────────────────────────
                    case 'ADD_COLUMN':
                        {
                            const table = tables.find((t)=>t.name.toLowerCase() === action.tableName.toLowerCase());
                            if (!table) {
                                results.push({
                                    action: `ADD_COLUMN to ${action.tableName}`,
                                    success: false,
                                    detail: 'Table not found on canvas'
                                });
                                anyFailure = true;
                                break;
                            }
                            const dbForTable = databases.find((d)=>d.id === table.databaseId);
                            if (!dbForTable) {
                                results.push({
                                    action: `ADD_COLUMN to ${action.tableName}`,
                                    success: false,
                                    detail: 'Database not found'
                                });
                                anyFailure = true;
                                break;
                            }
                            // ALTER TABLE in PG
                            let colType = action.column.type?.toUpperCase() || 'VARCHAR';
                            if (colType === 'VARCHAR' && action.column.length) {
                                colType = `VARCHAR(${action.column.length})`;
                            }
                            const alterSQL = `ALTER TABLE "${action.tableName.toLowerCase()}" ADD COLUMN "${action.column.name}" ${colType}${action.column.isNotNull ? ' NOT NULL' : ''}${action.column.defaultValue ? ` DEFAULT '${action.column.defaultValue}'` : ''}`;
                            const alterRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    database: dbForTable.name,
                                    query: alterSQL
                                })
                            });
                            const alterResult = await alterRes.json();
                            if (!alterResult.success) {
                                results.push({
                                    action: `ADD_COLUMN ${action.column.name}`,
                                    success: false,
                                    detail: alterResult.error
                                });
                                anyFailure = true;
                                break;
                            }
                            // Update Firebase table doc
                            const newCol = columnDefToColumn(action.column, tables);
                            const updatedColumns = [
                                ...table.columns,
                                newCol
                            ];
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', table.id), {
                                columns: updatedColumns,
                                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                            });
                            results.push({
                                action: `ADD_COLUMN ${action.column.name} to ${action.tableName}`,
                                success: true,
                                detail: colType
                            });
                            addLog('success', `Column '${action.column.name}' added to '${action.tableName}'`);
                            break;
                        }
                    // ────────── ADD_RELATIONSHIP ────────────────────────────
                    case 'ADD_RELATIONSHIP':
                        {
                            // This is handled implicitly by FK columns — edges are rebuilt from column data.
                            // If the FK column doesn't exist yet, we add it.
                            const fromTable = tables.find((t)=>t.name.toLowerCase() === action.fromTable.toLowerCase());
                            const toTable = tables.find((t)=>t.name.toLowerCase() === action.toTable.toLowerCase());
                            if (!fromTable || !toTable) {
                                results.push({
                                    action: `ADD_RELATIONSHIP`,
                                    success: false,
                                    detail: `Table not found: ${!fromTable ? action.fromTable : action.toTable}`
                                });
                                anyFailure = true;
                                break;
                            }
                            // Check if fromColumn already exists
                            const existingCol = fromTable.columns.find((c)=>c.name.toLowerCase() === action.fromColumn.toLowerCase());
                            if (existingCol) {
                                // Update to mark as FK
                                const updatedCols = fromTable.columns.map((c)=>{
                                    if (c.id === existingCol.id) {
                                        const targetCol = toTable.columns.find((tc)=>tc.name.toLowerCase() === action.toColumn.toLowerCase());
                                        return {
                                            ...c,
                                            isForeignKey: true,
                                            foreignKeyReference: targetCol ? {
                                                tableId: toTable.id,
                                                columnId: targetCol.id
                                            } : undefined
                                        };
                                    }
                                    return c;
                                });
                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', fromTable.id), {
                                    columns: updatedCols,
                                    updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                                });
                            }
                            results.push({
                                action: `ADD_RELATIONSHIP ${action.fromTable}.${action.fromColumn} → ${action.toTable}.${action.toColumn}`,
                                success: true,
                                detail: 'FK link created'
                            });
                            addLog('info', `FK: ${action.fromTable}.${action.fromColumn} → ${action.toTable}.${action.toColumn}`);
                            break;
                        }
                    // ────────── DELETE_TABLE ─────────────────────────────────
                    case 'DELETE_TABLE':
                        {
                            const table = tables.find((t)=>t.name.toLowerCase() === action.tableName.toLowerCase());
                            if (!table) {
                                results.push({
                                    action: `DELETE_TABLE ${action.tableName}`,
                                    success: false,
                                    detail: 'Table not found'
                                });
                                anyFailure = true;
                                break;
                            }
                            const dbForTable = databases.find((d)=>d.id === table.databaseId);
                            if (dbForTable) {
                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        database: dbForTable.name,
                                        query: `DROP TABLE IF EXISTS "${action.tableName.toLowerCase()}"`
                                    })
                                });
                            }
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', table.id));
                            results.push({
                                action: `DELETE_TABLE ${action.tableName}`,
                                success: true,
                                detail: 'Dropped'
                            });
                            addLog('success', `Table '${action.tableName}' dropped`);
                            break;
                        }
                    // ────────── RENAME_TABLE ─────────────────────────────────
                    case 'RENAME_TABLE':
                        {
                            const table = tables.find((t)=>t.name.toLowerCase() === action.oldName.toLowerCase());
                            if (!table) {
                                results.push({
                                    action: `RENAME_TABLE`,
                                    success: false,
                                    detail: `Table '${action.oldName}' not found`
                                });
                                anyFailure = true;
                                break;
                            }
                            const dbForTable = databases.find((d)=>d.id === table.databaseId);
                            if (dbForTable) {
                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        database: dbForTable.name,
                                        query: `ALTER TABLE "${action.oldName.toLowerCase()}" RENAME TO "${action.newName.toLowerCase()}"`
                                    })
                                });
                            }
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', table.id), {
                                name: action.newName.toLowerCase(),
                                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                            });
                            results.push({
                                action: `RENAME_TABLE ${action.oldName} → ${action.newName}`,
                                success: true,
                                detail: 'Renamed'
                            });
                            addLog('success', `Table renamed: '${action.oldName}' → '${action.newName}'`);
                            break;
                        }
                    // ────────── EXECUTE_SQL ──────────────────────────────────
                    case 'EXECUTE_SQL':
                        {
                            let targetDb;
                            // 1. Explicit databaseName specified on the action
                            if (action.databaseName) {
                                const sanitizedActionDb = sanitizeIdentifier(action.databaseName);
                                const matched = databases.find((d)=>sanitizeIdentifier(d.name) === sanitizedActionDb);
                                if (matched) {
                                    targetDb = matched;
                                } else {
                                    targetDb = {
                                        id: sanitizedActionDb,
                                        name: sanitizedActionDb
                                    };
                                }
                            }
                            // 2. Database created/used in this same action batch
                            if (!targetDb && lastCreatedDb) {
                                targetDb = lastCreatedDb;
                            }
                            // 3. Currently selected database in React state
                            if (!targetDb) {
                                const foundDb = databases.find((d)=>d.id === selectedDatabaseId);
                                if (foundDb) {
                                    targetDb = foundDb;
                                } else if (databases.length > 0) {
                                    targetDb = databases[0];
                                    setSelectedDatabaseId(targetDb.id);
                                }
                            }
                            if (!targetDb) {
                                results.push({
                                    action: 'EXECUTE_SQL',
                                    success: false,
                                    detail: 'No database found'
                                });
                                anyFailure = true;
                                break;
                            }
                            const sqlStatements = action.sql || [];
                            let executedCount = 0;
                            let execSuccess = true;
                            for (const sql of sqlStatements){
                                try {
                                    const queryRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            database: sanitizeIdentifier(targetDb.name),
                                            query: sql
                                        })
                                    });
                                    const queryData = await queryRes.json();
                                    if (queryData.success) {
                                        executedCount++;
                                    } else {
                                        execSuccess = false;
                                        addLog('warning', `SQL Execution: ${queryData.error || 'Failed query'}`);
                                    }
                                } catch (err) {
                                    execSuccess = false;
                                    addLog('error', `SQL Execution error: ${err.message}`);
                                }
                            }
                            if (!execSuccess && executedCount === 0) {
                                anyFailure = true;
                            }
                            results.push({
                                action: `EXECUTE_SQL`,
                                success: executedCount > 0,
                                detail: `Executed ${executedCount}/${sqlStatements.length} queries in '${targetDb.name}'`
                            });
                            addLog('success', `Executed ${executedCount} SQL statements in database '${targetDb.name}'`);
                            break;
                        }
                    // ────────── EXPLAIN ──────────────────────────────────────
                    case 'EXPLAIN':
                        {
                            results.push({
                                action: 'EXPLAIN',
                                success: true,
                                detail: action.message
                            });
                            break;
                        }
                }
            } catch (err) {
                results.push({
                    action: action.type,
                    success: false,
                    detail: err.message || 'Unknown error'
                });
                anyFailure = true;
                addLog('error', `Action ${action.type} failed: ${err.message}`);
            }
        }
        const tableActions = results.filter((r)=>r.action.startsWith('ADD_TABLE'));
        let summaryText = '';
        if (tableActions.length > 0) {
            const successfulTables = tableActions.filter((r)=>r.success).length;
            summaryText = `${successfulTables}/${tableActions.length} tables created successfully.`;
        } else {
            const successCount = results.filter((r)=>r.success).length;
            summaryText = `${successCount}/${results.length} actions completed successfully.`;
        }
        if (onActionsExecuted) {
            setTimeout(()=>{
                onActionsExecuted();
            }, 150);
        }
        return {
            success: !anyFailure,
            summary: summaryText,
            actionResults: results
        };
    }, [
        userId,
        databases,
        tables,
        selectedDatabaseId,
        setSelectedDatabaseId,
        addLog,
        viewportCenter,
        onActionsExecuted
    ]);
    return {
        executeActions
    };
}
}),
"[project]/src/hooks/useComposerSessions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useComposerSessions",
    ()=>useComposerSessions
]);
/**
 * useComposerSessions — Hook to manage Firestore-persisted multi-session chat history
 * for DB Composer (Schema Pilot).
 *
 * Features:
 * - Real-time synchronization via onSnapshot
 * - Creates, appends, updates, deletes chat sessions per user
 * - Atomic message persistence (appendMessages) to eliminate race conditions
 * - Automatically derives session title from the first user prompt
 * - Firestore safe: strips undefined values to prevent serialization errors
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist-node/v4.js [app-ssr] (ecmascript) <export default as v4>");
'use client';
;
;
;
;
// ─── Helpers ──────────────────────────────────────────────────────────────────
function sanitizeMessageForFirestore(msg) {
    const clean = {
        id: msg.id,
        role: msg.role,
        content: msg.content || '',
        timestamp: typeof msg.timestamp === 'number' ? msg.timestamp : Date.now(),
        status: msg.status || 'done'
    };
    if (msg.actions && msg.actions.length > 0) {
        clean.actions = JSON.parse(JSON.stringify(msg.actions));
    }
    return clean;
}
function sanitizeSessionForFirestore(session) {
    return {
        id: session.id,
        userId: session.userId || 'anonymous',
        databaseId: session.databaseId || 'default',
        title: session.title || 'New Chat',
        createdAt: session.createdAt || Date.now(),
        updatedAt: session.updatedAt || Date.now(),
        messages: (session.messages || []).map(sanitizeMessageForFirestore)
    };
}
function useComposerSessions(userId, databaseId) {
    const [sessions, setSessions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeSessionId, setActiveSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const effectiveUserId = userId || 'anonymous';
    const effectiveDbId = databaseId || 'default';
    const activeSessionIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(activeSessionId);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        activeSessionIdRef.current = activeSessionId;
    }, [
        activeSessionId
    ]);
    // Listen to Firestore composer_sessions in real-time by userId
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        setIsLoading(true);
        const colRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'composer_sessions');
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(colRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])('userId', '==', effectiveUserId));
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snapshot)=>{
            const list = [];
            snapshot.forEach((docSnap)=>{
                const data = docSnap.data();
                list.push({
                    id: docSnap.id,
                    userId: data.userId || effectiveUserId,
                    databaseId: data.databaseId || effectiveDbId,
                    title: data.title || 'New Chat',
                    createdAt: typeof data.createdAt === 'number' ? data.createdAt : Date.now(),
                    updatedAt: typeof data.updatedAt === 'number' ? data.updatedAt : Date.now(),
                    messages: Array.isArray(data.messages) ? data.messages.map((m)=>({
                            id: m.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                            role: m.role || 'user',
                            content: m.content || '',
                            actions: m.actions || undefined,
                            timestamp: typeof m.timestamp === 'number' ? m.timestamp : Date.now(),
                            status: m.status || 'done'
                        })) : []
                });
            });
            // Sort by updatedAt descending (newest first)
            list.sort((a, b)=>b.updatedAt - a.updatedAt);
            setSessions(list);
            setIsLoading(false);
            // Keep active session in sync if not set or invalid
            if (list.length > 0) {
                const current = activeSessionIdRef.current;
                if (!current || !list.some((s)=>s.id === current)) {
                    setActiveSessionId(list[0].id);
                }
            }
        }, (err)=>{
            console.error('[useComposerSessions] Firestore listener error:', err);
            setIsLoading(false);
        });
        return ()=>unsubscribe();
    }, [
        effectiveUserId,
        effectiveDbId
    ]);
    // Active session object
    const activeSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!activeSessionId) return sessions[0] || null;
        return sessions.find((s)=>s.id === activeSessionId) || sessions[0] || null;
    }, [
        sessions,
        activeSessionId
    ]);
    // ── Create a new session ────────────────────────────────────────────────────
    const createNewSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (customTitle)=>{
        const newId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
        const now = Date.now();
        const newSession = {
            id: newId,
            userId: effectiveUserId,
            databaseId: effectiveDbId,
            title: customTitle || 'New Chat',
            createdAt: now,
            updatedAt: now,
            messages: []
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'composer_sessions', newId), sanitizeSessionForFirestore(newSession));
        setActiveSessionId(newId);
        return newId;
    }, [
        effectiveUserId,
        effectiveDbId
    ]);
    // Auto-create a first session if none exist after loading
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoading && sessions.length === 0 && effectiveUserId !== 'anonymous') {
            createNewSession();
        }
    }, [
        isLoading,
        sessions.length,
        effectiveUserId,
        createNewSession
    ]);
    // ── Append multiple messages atomically ────────────────────────────────────
    const appendMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (sessionId, newMessages)=>{
        if (!sessionId || newMessages.length === 0) return;
        const targetDoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'composer_sessions', sessionId);
        const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(targetDoc);
        const now = Date.now();
        let currentMessages = [];
        let currentTitle = 'New Chat';
        if (docSnap.exists()) {
            const data = docSnap.data();
            currentMessages = Array.isArray(data.messages) ? data.messages : [];
            currentTitle = data.title || 'New Chat';
        }
        // If this session is named "New Chat", auto-generate title from first user message
        let newTitle = currentTitle;
        const firstUserMsg = newMessages.find((m)=>m.role === 'user' && m.content);
        if ((currentTitle === 'New Chat' || !currentTitle) && firstUserMsg) {
            newTitle = firstUserMsg.content.slice(0, 36) + (firstUserMsg.content.length > 36 ? '…' : '');
        }
        const updatedMessages = [
            ...currentMessages,
            ...newMessages
        ];
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(targetDoc, {
            userId: effectiveUserId,
            databaseId: effectiveDbId,
            title: newTitle,
            updatedAt: now,
            messages: updatedMessages.map(sanitizeMessageForFirestore)
        }, {
            merge: true
        });
    }, [
        effectiveUserId,
        effectiveDbId
    ]);
    // ── Append a single message ─────────────────────────────────────────────────
    const appendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (sessionId, message)=>{
        await appendMessages(sessionId, [
            message
        ]);
    }, [
        appendMessages
    ]);
    // ── Update a specific message ─────────────────────────────────────────────
    const updateMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (sessionId, messageId, update)=>{
        if (!sessionId || !messageId) return;
        const targetDoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'composer_sessions', sessionId);
        const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(targetDoc);
        if (!docSnap.exists()) return;
        const data = docSnap.data();
        const currentMessages = Array.isArray(data.messages) ? data.messages : [];
        const updatedMessages = currentMessages.map((m)=>m.id === messageId ? {
                ...m,
                ...update
            } : m);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])(targetDoc, {
            updatedAt: Date.now(),
            messages: updatedMessages.map(sanitizeMessageForFirestore)
        });
    }, []);
    // ── Delete a session ──────────────────────────────────────────────────────
    const deleteSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (sessionId)=>{
        if (!sessionId) return;
        const remaining = sessions.filter((s)=>s.id !== sessionId);
        // If active session is deleted, switch to the next most recent
        if (sessionId === activeSessionId) {
            if (remaining.length > 0) {
                setActiveSessionId(remaining[0].id);
            } else {
                // If it was the last session, create a new one
                const newId = await createNewSession();
                setActiveSessionId(newId);
            }
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'composer_sessions', sessionId));
    }, [
        sessions,
        activeSessionId,
        createNewSession
    ]);
    return {
        sessions,
        activeSession,
        activeSessionId,
        setActiveSessionId,
        createNewSession,
        appendMessages,
        appendMessage,
        updateMessage,
        deleteSession,
        isLoading
    };
}
}),
"[project]/src/components/database/DBComposer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DBComposer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * DBComposer — Cursor-style AI Sidebar for structured database schema generation & session management.
 *
 * Features:
 * - Multi-session persistence in Firestore via useComposerSessions
 * - Two-panel layout: Left session manager + Right chat thread
 * - Instant "+" new chat creation & trash session deletion
 * - Real-time canvas mutations via useComposerActions
 * - Collapsible "Actions Applied" detail panel
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wand-sparkles.js [app-ssr] (ecmascript) <export default as Wand2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.js [app-ssr] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table-2.js [app-ssr] (ecmascript) <export default as Table2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useComposerActions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useComposerActions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useComposerSessions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useComposerSessions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist-node/v4.js [app-ssr] (ecmascript) <export default as v4>");
'use client';
;
;
;
;
;
;
;
// ─── Relative time formatter ───────────────────────────────────────────────
function formatRelativeTime(timestamp) {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
    });
}
// ─── Action summary label ──────────────────────────────────────────────────
function actionLabel(action) {
    switch(action.type){
        case 'CREATE_DATABASE':
            return `Created database "${action.databaseName}" with ${action.tables?.length || 0} tables`;
        case 'ADD_TABLE':
            return `Added table "${action.tableName}" (${action.columns.length} columns)`;
        case 'ADD_COLUMN':
            return `Added column "${action.column.name}" to "${action.tableName}"`;
        case 'ADD_RELATIONSHIP':
            return `Linked ${action.fromTable}.${action.fromColumn} → ${action.toTable}.${action.toColumn}`;
        case 'DELETE_TABLE':
            return `Dropped table "${action.tableName}"`;
        case 'RENAME_TABLE':
            return `Renamed "${action.oldName}" → "${action.newName}"`;
        case 'EXECUTE_SQL':
            return `Executed ${action.sql?.length || 0} SQL queries`;
        case 'EXPLAIN':
            return action.message.slice(0, 80) + (action.message.length > 80 ? '…' : '');
    }
}
function actionIcon(type) {
    switch(type){
        case 'CREATE_DATABASE':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                className: "w-3.5 h-3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/database/DBComposer.tsx",
                lineNumber: 93,
                columnNumber: 14
            }, this);
        case 'ADD_TABLE':
        case 'DELETE_TABLE':
        case 'RENAME_TABLE':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__["Table2"], {
                className: "w-3.5 h-3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/database/DBComposer.tsx",
                lineNumber: 97,
                columnNumber: 14
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                className: "w-3.5 h-3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/database/DBComposer.tsx",
                lineNumber: 99,
                columnNumber: 14
            }, this);
    }
}
function DBComposer(props) {
    const { isOpen, onClose, theme, userId, selectedDatabaseId, ...actionParams } = props;
    const { executeActions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useComposerActions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComposerActions"])({
        userId,
        selectedDatabaseId,
        ...actionParams
    });
    // Hook for Firestore-persisted sessions
    const { sessions, activeSession, activeSessionId, setActiveSessionId, createNewSession, appendMessages, updateMessage, deleteSession, isLoading: isSessionsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useComposerSessions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComposerSessions"])(userId, selectedDatabaseId);
    // Local UI state
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isPending, setIsPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCreatingSession, setIsCreatingSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [expandedActions, setExpandedActions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    // Refs
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Active messages derived from current active session
    const messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return activeSession?.messages || [];
    }, [
        activeSession
    ]);
    // Auto-scroll on new messages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [
        messages
    ]);
    // Focus input when sidebar opens or active session changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen && inputRef.current) {
            setTimeout(()=>inputRef.current?.focus(), 300);
        }
    }, [
        isOpen,
        activeSessionId
    ]);
    // Build canvas context string for the AI
    const canvasContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!actionParams.tables || actionParams.tables.length === 0) return undefined;
        return actionParams.tables.map((t)=>{
            const cols = t.columns.map((c)=>{
                let desc = `${c.name} ${c.dataType}`;
                if (c.isPrimaryKey) desc += ' PK';
                if (c.isForeignKey) desc += ' FK';
                if (c.isNotNull) desc += ' NOT NULL';
                return desc;
            }).join(', ');
            return `Table "${t.name}" (${cols})`;
        }).join('\n');
    }, [
        actionParams.tables
    ]);
    // Build chat history array for Gemini multi-turn API
    const chatHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return messages.filter((m)=>m.status === 'done').map((m)=>({
                role: m.role,
                content: m.content
            }));
    }, [
        messages
    ]);
    // ── New Session Handler ───────────────────────────────────────────────
    const handleNewSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (isCreatingSession) return;
        setIsCreatingSession(true);
        try {
            await createNewSession();
            setInputValue('');
        } finally{
            setIsCreatingSession(false);
        }
    }, [
        createNewSession,
        isCreatingSession
    ]);
    // ── Send Message Handler ──────────────────────────────────────────────
    const handleSend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const text = inputValue.trim();
        if (!text || isPending) return;
        // Guarantee an active session exists
        let targetSessionId = activeSessionId;
        if (!targetSessionId) {
            targetSessionId = await createNewSession();
        }
        // 1. Create and append user message
        const userMsgId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
        const userMsg = {
            id: userMsgId,
            role: 'user',
            content: text,
            timestamp: Date.now(),
            status: 'done'
        };
        // 2. Create and append pending assistant message
        const assistantMsgId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
        const pendingAssistantMsg = {
            id: assistantMsgId,
            role: 'assistant',
            content: '',
            timestamp: Date.now(),
            status: 'pending'
        };
        setInputValue('');
        setIsPending(true);
        // Persist user + pending assistant turn into Firestore atomically
        await appendMessages(targetSessionId, [
            userMsg,
            pendingAssistantMsg
        ]);
        try {
            // 3. Call API in composer mode
            const response = await fetch('/api/chat/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: text,
                    mode: 'composer',
                    chatHistory,
                    canvasContext
                })
            });
            const data = await response.json();
            if (!data.success) {
                await updateMessage(targetSessionId, assistantMsgId, {
                    content: data.error || 'Failed to get response from AI.',
                    status: 'error'
                });
                setIsPending(false);
                return;
            }
            const actions = data.actions || [];
            const summary = data.summary || 'Actions completed.';
            // 4. Execute actions on the React Flow canvas + Firestore
            let execResult;
            if (actions.length > 0 && !actions.every((a)=>a.type === 'EXPLAIN')) {
                execResult = await executeActions(actions);
            }
            const finalStatus = execResult && !execResult.success ? 'error' : 'done';
            const finalSummary = execResult && !execResult.success ? `${summary} (Note: ${execResult.summary})` : summary;
            // 5. Update assistant message with final content, actions, and status
            await updateMessage(targetSessionId, assistantMsgId, {
                content: finalSummary,
                actions,
                status: finalStatus
            });
            // Auto-expand actions panel
            setExpandedActions((prev)=>({
                    ...prev,
                    [assistantMsgId]: true
                }));
        } catch (err) {
            await updateMessage(targetSessionId, assistantMsgId, {
                content: err.message || 'Network error.',
                status: 'error'
            });
        } finally{
            setIsPending(false);
        }
    }, [
        inputValue,
        isPending,
        activeSessionId,
        createNewSession,
        appendMessages,
        chatHistory,
        canvasContext,
        executeActions,
        updateMessage
    ]);
    // ── Key Handler ────────────────────────────────────────────────────────
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }, [
        handleSend
    ]);
    // ── Toggle Action Expansion ───────────────────────────────────────────
    const toggleActions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((msgId)=>{
        setExpandedActions((prev)=>({
                ...prev,
                [msgId]: !prev[msgId]
            }));
    }, []);
    // ── Auto-resize Textarea ─────────────────────────────────────────────
    const handleInputChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        setInputValue(e.target.value);
        const el = e.target;
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }, []);
    // Dark mode detection
    const isDark = theme?.navbar?.includes('slate') || theme?.bg?.includes('slate');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            !isOpen && props.onOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                initial: {
                    scale: 0,
                    opacity: 0
                },
                animate: {
                    scale: 1,
                    opacity: 1
                },
                whileHover: {
                    scale: 1.06,
                    y: -2
                },
                whileTap: {
                    scale: 0.95
                },
                onClick: props.onOpen,
                className: `fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all border font-medium text-sm ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-white shadow-black/40 border-slate-600' : 'bg-gray-900 hover:bg-black text-white shadow-gray-900/25 border-gray-800'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-6 h-6 rounded-full bg-white/15 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__["Wand2"], {
                            className: "w-3.5 h-3.5 text-white"
                        }, void 0, false, {
                            fileName: "[project]/src/components/database/DBComposer.tsx",
                            lineNumber: 335,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/database/DBComposer.tsx",
                        lineNumber: 334,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Schema Pilot"
                    }, void 0, false, {
                        fileName: "[project]/src/components/database/DBComposer.tsx",
                        lineNumber: 337,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] bg-white/15 text-white px-2 py-0.5 rounded-full font-mono font-medium",
                        children: "⌘K"
                    }, void 0, false, {
                        fileName: "[project]/src/components/database/DBComposer.tsx",
                        lineNumber: 338,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/database/DBComposer.tsx",
                lineNumber: 322,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        x: 560,
                        opacity: 0
                    },
                    animate: {
                        x: 0,
                        opacity: 1
                    },
                    exit: {
                        x: 560,
                        opacity: 0
                    },
                    transition: {
                        type: 'spring',
                        damping: 28,
                        stiffness: 300
                    },
                    className: "fixed right-0 top-0 h-full z-50 flex",
                    style: {
                        width: 540
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `absolute inset-0 ${isDark ? 'bg-slate-950/95 border-l border-slate-800' : 'bg-white/95 border-l border-gray-200'} backdrop-blur-xl`
                        }, void 0, false, {
                            fileName: "[project]/src/components/database/DBComposer.tsx",
                            lineNumber: 353,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex h-full w-full overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-[170px] flex flex-col border-r h-full flex-shrink-0 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-gray-50/90 border-gray-200'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `p-3 border-b flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-gray-200'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`,
                                                    children: "Sessions"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                    whileHover: {
                                                        scale: 1.05
                                                    },
                                                    whileTap: {
                                                        scale: 0.95
                                                    },
                                                    onClick: handleNewSession,
                                                    disabled: isCreatingSession,
                                                    className: `p-1.5 rounded-lg border transition-all flex items-center justify-center ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-300'}`,
                                                    title: "Start new chat session (+)",
                                                    children: isCreatingSession ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "w-3.5 h-3.5 animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                        lineNumber: 392,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                    lineNumber: 379,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                            lineNumber: 371,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 overflow-y-auto p-2 space-y-1",
                                            children: isSessionsLoading ? /* Skeletons */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 py-2 px-1",
                                                children: [
                                                    1,
                                                    2,
                                                    3
                                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `h-10 rounded-lg animate-pulse ${isDark ? 'bg-slate-800/60' : 'bg-gray-200/60'}`
                                                    }, i, false, {
                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                        lineNumber: 405,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                lineNumber: 403,
                                                columnNumber: 21
                                            }, this) : sessions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `text-center py-6 text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`,
                                                children: "No chats yet"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                lineNumber: 414,
                                                columnNumber: 21
                                            }, this) : sessions.map((session)=>{
                                                const isActive = session.id === activeSessionId;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    whileHover: {
                                                        x: 1
                                                    },
                                                    onClick: ()=>setActiveSessionId(session.id),
                                                    className: `group relative flex flex-col px-2.5 py-2 rounded-xl text-left cursor-pointer transition-all border ${isActive ? isDark ? 'bg-slate-800 text-white border-slate-700 shadow-sm' : 'bg-white text-gray-900 border-gray-300 shadow-sm font-medium' : isDark ? 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border-transparent' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-transparent'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between gap-1 w-full",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs truncate flex-1 font-medium",
                                                                    children: session.title || 'New Chat'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                    lineNumber: 436,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: (e)=>{
                                                                        e.stopPropagation();
                                                                        deleteSession(session.id);
                                                                    },
                                                                    className: `opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity ${isDark ? 'hover:bg-slate-700 text-slate-400 hover:text-red-400' : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'}`,
                                                                    title: "Delete chat session",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        className: "w-3 h-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                        lineNumber: 451,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                    lineNumber: 439,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                            lineNumber: 435,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-[10px] mt-0.5 flex items-center gap-1 ${isActive ? isDark ? 'text-slate-400' : 'text-gray-500' : isDark ? 'text-slate-600' : 'text-gray-400'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                    className: "w-2.5 h-2.5 opacity-60"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                    lineNumber: 459,
                                                                    columnNumber: 29
                                                                }, this),
                                                                formatRelativeTime(session.updatedAt)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                            lineNumber: 454,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, session.id, true, {
                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                    lineNumber: 421,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                            lineNumber: 400,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                    lineNumber: 365,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex flex-col h-full min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex items-center justify-between px-4 py-3 border-b ${isDark ? 'border-slate-800' : 'border-gray-200'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2.5 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative flex-shrink-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `w-8 h-8 rounded-xl flex items-center justify-center ${isDark ? 'bg-slate-800 border border-slate-700 shadow-md' : 'bg-gray-900 shadow-md'}`,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__["Wand2"], {
                                                                        className: "w-4 h-4 text-white"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                        lineNumber: 488,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                    lineNumber: 481,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-slate-950"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                    lineNumber: 490,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                            lineNumber: 480,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: `text-xs font-semibold tracking-tight truncate ${isDark ? 'text-white' : 'text-gray-900'}`,
                                                                    children: activeSession?.title || 'DB Composer'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                    lineNumber: 493,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: `text-[10px] ${isDark ? 'text-slate-500' : 'text-gray-400'} font-medium uppercase tracking-wider`,
                                                                    children: "Schema Pilot"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                    lineNumber: 500,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                            lineNumber: 492,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                    lineNumber: 479,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                        whileHover: {
                                                            scale: 1.05
                                                        },
                                                        whileTap: {
                                                            scale: 0.95
                                                        },
                                                        onClick: onClose,
                                                        className: `p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-500 hover:text-slate-300' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                            lineNumber: 520,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                        lineNumber: 510,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                    lineNumber: 509,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                            lineNumber: 474,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: scrollRef,
                                            className: "flex-1 overflow-y-auto px-4 py-4 space-y-4",
                                            children: [
                                                messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        y: 10
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0
                                                    },
                                                    className: "flex flex-col items-center justify-center h-full gap-5 py-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? 'bg-slate-800/80 border border-slate-700 shadow-md' : 'bg-gray-100 border border-gray-200 shadow-sm'}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                className: `w-7 h-7 ${isDark ? 'text-slate-200' : 'text-gray-800'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                lineNumber: 541,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                            lineNumber: 534,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-center space-y-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: `text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`,
                                                                    children: "What would you like to build?"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                    lineNumber: 548,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: `text-xs leading-relaxed max-w-[240px] ${isDark ? 'text-slate-500' : 'text-gray-400'}`,
                                                                    children: "Describe your database schema. Changes apply directly to your canvas."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                    lineNumber: 555,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                            lineNumber: 547,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col gap-2 w-full px-1",
                                                            children: [
                                                                'Create a car dealership database with cars, owners, and services tables',
                                                                'Build a student management system with grades and courses',
                                                                'Add a payments table with a foreign key to users'
                                                            ].map((suggestion, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                                    whileHover: {
                                                                        scale: 1.01
                                                                    },
                                                                    whileTap: {
                                                                        scale: 0.99
                                                                    },
                                                                    onClick: ()=>{
                                                                        setInputValue(suggestion);
                                                                        inputRef.current?.focus();
                                                                    },
                                                                    className: `text-left px-3 py-2 rounded-xl text-xs transition-all ${isDark ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 hover:border-slate-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 hover:border-gray-300'}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "opacity-50 mr-1.5",
                                                                            children: "→"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                            lineNumber: 585,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        suggestion
                                                                    ]
                                                                }, i, true, {
                                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                    lineNumber: 571,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                            lineNumber: 565,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                    lineNumber: 529,
                                                    columnNumber: 21
                                                }, this),
                                                messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            opacity: 0,
                                                            y: 8
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            y: 0
                                                        },
                                                        className: `flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`,
                                                        children: msg.role === 'user' ? /* ── User bubble ──────────────────────────── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "max-w-[88%]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `rounded-2xl rounded-tr-md px-3.5 py-2 text-xs shadow-md ${isDark ? 'bg-slate-800 text-white border border-slate-700' : 'bg-gray-900 text-white shadow-gray-900/10'}`,
                                                                children: msg.content
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                lineNumber: 604,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                            lineNumber: 603,
                                                            columnNumber: 25
                                                        }, this) : /* ── Assistant bubble ─────────────────────── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "max-w-[94%] space-y-2",
                                                            children: msg.status === 'pending' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `flex items-center gap-2 px-3.5 py-2.5 rounded-2xl rounded-tl-md ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-gray-50 border border-gray-200'}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                        className: `w-3.5 h-3.5 animate-spin ${isDark ? 'text-slate-400' : 'text-gray-600'}`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                        lineNumber: 622,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`,
                                                                        children: "Thinking..."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                        lineNumber: 627,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                lineNumber: 617,
                                                                columnNumber: 29
                                                            }, this) : msg.status === 'error' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `px-3.5 py-2.5 rounded-2xl rounded-tl-md border ${isDark ? 'bg-red-950/30 border-red-900/50 text-red-300' : 'bg-red-50 border-red-200 text-red-600'}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1.5 mb-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                                className: "w-3.5 h-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                lineNumber: 644,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs font-medium",
                                                                                children: "Error"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                lineNumber: 645,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                        lineNumber: 643,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs",
                                                                        children: msg.content
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                        lineNumber: 647,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                lineNumber: 636,
                                                                columnNumber: 29
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `px-3.5 py-2.5 rounded-2xl rounded-tl-md text-xs ${isDark ? 'bg-slate-900 border border-slate-800 text-slate-200' : 'bg-gray-50 border border-gray-200 text-gray-800'}`,
                                                                        children: msg.content
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                        lineNumber: 652,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    msg.actions && msg.actions.length > 0 && !msg.actions.every((a)=>a.type === 'EXPLAIN') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `rounded-xl overflow-hidden border ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-gray-200 bg-gray-50/50'}`,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>toggleActions(msg.id),
                                                                                className: `w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-medium transition-colors ${isDark ? 'text-slate-400 hover:bg-slate-800/50' : 'text-gray-500 hover:bg-gray-100'}`,
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "flex items-center gap-1.5",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                                                className: "w-3.5 h-3.5 text-emerald-500"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                                lineNumber: 678,
                                                                                                columnNumber: 39
                                                                                            }, this),
                                                                                            msg.actions.filter((a)=>a.type !== 'EXPLAIN').length,
                                                                                            " actions applied"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                        lineNumber: 677,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    expandedActions[msg.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                        className: "w-3.5 h-3.5"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                        lineNumber: 682,
                                                                                        columnNumber: 39
                                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                        className: "w-3.5 h-3.5"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                        lineNumber: 684,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                lineNumber: 669,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                                                children: expandedActions[msg.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                    initial: {
                                                                                        height: 0,
                                                                                        opacity: 0
                                                                                    },
                                                                                    animate: {
                                                                                        height: 'auto',
                                                                                        opacity: 1
                                                                                    },
                                                                                    exit: {
                                                                                        height: 0,
                                                                                        opacity: 0
                                                                                    },
                                                                                    transition: {
                                                                                        duration: 0.2
                                                                                    },
                                                                                    className: "overflow-hidden",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: `px-3 pb-2 space-y-1 border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`,
                                                                                        children: msg.actions.filter((a)=>a.type !== 'EXPLAIN').map((action, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: `flex items-center gap-2 py-1 text-[11px] ${isDark ? 'text-slate-400' : 'text-gray-500'}`,
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        className: "text-emerald-500",
                                                                                                        children: actionIcon(action.type)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                                        lineNumber: 711,
                                                                                                        columnNumber: 49
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        className: "truncate",
                                                                                                        children: actionLabel(action)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                                        lineNumber: 714,
                                                                                                        columnNumber: 49
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, idx, true, {
                                                                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                                lineNumber: 705,
                                                                                                columnNumber: 47
                                                                                            }, this))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                        lineNumber: 697,
                                                                                        columnNumber: 41
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                    lineNumber: 690,
                                                                                    columnNumber: 39
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                lineNumber: 688,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                        lineNumber: 664,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    msg.actions?.filter((a)=>a.type === 'EXPLAIN').map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `px-3.5 py-2.5 rounded-xl text-xs border ${isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-gray-100 border-gray-200 text-gray-800'}`,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                                                    className: "w-3.5 h-3.5 inline mr-1.5 opacity-60"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                                    lineNumber: 736,
                                                                                    columnNumber: 37
                                                                                }, this),
                                                                                a.type === 'EXPLAIN' ? a.message : ''
                                                                            ]
                                                                        }, i, true, {
                                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                            lineNumber: 728,
                                                                            columnNumber: 35
                                                                        }, this))
                                                                ]
                                                            }, void 0, true)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                            lineNumber: 614,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, msg.id, false, {
                                                        fileName: "[project]/src/components/database/DBComposer.tsx",
                                                        lineNumber: 595,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                            lineNumber: 526,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `px-3 pb-3 pt-2.5 border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `flex items-end gap-2 rounded-xl border px-3 py-2 transition-colors ${isDark ? 'bg-slate-900 border-slate-800 focus-within:border-slate-600' : 'bg-white border-gray-200 focus-within:border-gray-800'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            ref: inputRef,
                                                            value: inputValue,
                                                            onChange: handleInputChange,
                                                            onKeyDown: handleKeyDown,
                                                            placeholder: "Describe your database...",
                                                            rows: 1,
                                                            className: `flex-1 resize-none bg-transparent text-xs outline-none py-0.5 ${isDark ? 'text-white placeholder:text-slate-600' : 'text-gray-900 placeholder:text-gray-400'}`,
                                                            style: {
                                                                maxHeight: 110
                                                            },
                                                            disabled: isPending
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                            lineNumber: 761,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                            whileHover: {
                                                                scale: 1.05
                                                            },
                                                            whileTap: {
                                                                scale: 0.95
                                                            },
                                                            onClick: handleSend,
                                                            disabled: isPending || !inputValue.trim(),
                                                            className: `p-1.5 rounded-lg transition-all ${isPending || !inputValue.trim() ? isDark ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-gray-100 text-gray-300 cursor-not-allowed' : isDark ? 'bg-slate-100 hover:bg-white text-slate-900 shadow-sm' : 'bg-gray-900 hover:bg-black text-white shadow-md shadow-gray-900/20'}`,
                                                            children: isPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                className: "w-3.5 h-3.5 animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                lineNumber: 792,
                                                                columnNumber: 25
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/database/DBComposer.tsx",
                                                                lineNumber: 794,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                                            lineNumber: 776,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                    lineNumber: 754,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `text-[10px] mt-1.5 text-center ${isDark ? 'text-slate-600' : 'text-gray-400'}`,
                                                    children: "AI will apply changes directly to your canvas"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                                    lineNumber: 798,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/database/DBComposer.tsx",
                                            lineNumber: 749,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/database/DBComposer.tsx",
                                    lineNumber: 472,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/database/DBComposer.tsx",
                            lineNumber: 361,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/database/DBComposer.tsx",
                    lineNumber: 344,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/database/DBComposer.tsx",
                lineNumber: 342,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/database/TableNode.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/key.js [app-ssr] (ecmascript) <export default as Key>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link.js [app-ssr] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hash.js [app-ssr] (ecmascript) <export default as Hash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/type.js [app-ssr] (ecmascript) <export default as Type>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$toggle$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/toggle-left.js [app-ssr] (ecmascript) <export default as ToggleLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$braces$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileJson$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-braces.js [app-ssr] (ecmascript) <export default as FileJson>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
'use client';
;
;
;
;
;
const getTypeIcon = (dataType)=>{
    if ([
        'INT',
        'BIGINT',
        'SMALLINT',
        'TINYINT',
        'FLOAT',
        'DOUBLE',
        'DECIMAL'
    ].includes(dataType)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
            className: "w-3 h-3"
        }, void 0, false, {
            fileName: "[project]/src/components/database/TableNode.tsx",
            lineNumber: 19,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if ([
        'VARCHAR',
        'CHAR',
        'TEXT',
        'LONGTEXT'
    ].includes(dataType)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"], {
            className: "w-3 h-3"
        }, void 0, false, {
            fileName: "[project]/src/components/database/TableNode.tsx",
            lineNumber: 22,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if ([
        'DATE',
        'DATETIME',
        'TIMESTAMP',
        'TIME',
        'YEAR'
    ].includes(dataType)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
            className: "w-3 h-3"
        }, void 0, false, {
            fileName: "[project]/src/components/database/TableNode.tsx",
            lineNumber: 25,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (dataType === 'BOOLEAN') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$toggle$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleLeft$3e$__["ToggleLeft"], {
            className: "w-3 h-3"
        }, void 0, false, {
            fileName: "[project]/src/components/database/TableNode.tsx",
            lineNumber: 28,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (dataType === 'JSON') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$braces$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileJson$3e$__["FileJson"], {
            className: "w-3 h-3"
        }, void 0, false, {
            fileName: "[project]/src/components/database/TableNode.tsx",
            lineNumber: 31,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"], {
        className: "w-3 h-3"
    }, void 0, false, {
        fileName: "[project]/src/components/database/TableNode.tsx",
        lineNumber: 33,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
function TableNode({ data, selected }) {
    const { table, onDelete, onViewData, isSelected, theme } = data;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `
        relative ${theme?.modal || 'bg-white'} rounded-xl overflow-visible
        shadow-lg hover:shadow-xl transition-all duration-150
        border-2 ${selected || isSelected ? theme?.navbar?.includes('slate') ? 'border-blue-400' : 'border-blue-500' : theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}
        min-w-[220px]
      `,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${theme?.button || 'bg-black'} px-4 py-3 flex items-center justify-between group rounded-t-xl`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 bg-white rounded-full opacity-80"
                            }, void 0, false, {
                                fileName: "[project]/src/components/database/TableNode.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-white font-light text-sm tracking-wide",
                                style: {
                                    fontFamily: 'var(--font-geist-sans)'
                                },
                                children: table.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/database/TableNode.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/database/TableNode.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                        whileHover: {
                            scale: 1.1
                        },
                        whileTap: {
                            scale: 0.9
                        },
                        onClick: (e)=>{
                            e.stopPropagation();
                            onDelete(table.id);
                        },
                        className: "opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/20 text-white transition-all",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/database/TableNode.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/database/TableNode.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/database/TableNode.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `divide-y ${theme?.navbar?.includes('slate') ? 'divide-slate-700' : 'divide-gray-100'} overflow-hidden`,
                children: table.columns.map((column, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `relative px-4 py-2 flex items-center gap-3 ${theme?.navbar?.includes('slate') ? 'hover:bg-slate-700' : 'hover:bg-gray-50'} transition-colors`,
                        children: [
                            column.isForeignKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Handle"], {
                                type: "source",
                                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"].Left,
                                id: `${column.id}-source`,
                                className: "!w-3 !h-3 !bg-gray-800 !border-2 !border-white",
                                style: {
                                    left: -6
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/database/TableNode.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 flex-1 min-w-0",
                                children: [
                                    column.isPrimaryKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"], {
                                        className: "w-3.5 h-3.5 text-amber-500 flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/database/TableNode.tsx",
                                        lineNumber: 90,
                                        columnNumber: 17
                                    }, this),
                                    column.isForeignKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                                        className: `w-3.5 h-3.5 ${theme?.text || 'text-gray-700'} flex-shrink-0`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/database/TableNode.tsx",
                                        lineNumber: 93,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-sm ${theme?.text || 'text-gray-900'} truncate font-light`,
                                        style: {
                                            fontFamily: 'var(--font-geist-sans)'
                                        },
                                        children: column.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/database/TableNode.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/database/TableNode.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex items-center gap-1.5 ${theme?.textSecondary || 'text-gray-600'}`,
                                children: [
                                    getTypeIcon(column.dataType),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-mono",
                                        children: column.dataType
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/database/TableNode.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/database/TableNode.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1",
                                children: [
                                    column.isNotNull && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-[10px] px-1 py-0.5 ${theme?.buttonSecondary || 'bg-gray-200 text-gray-800'} rounded font-light`,
                                        children: "NN"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/database/TableNode.tsx",
                                        lineNumber: 109,
                                        columnNumber: 17
                                    }, this),
                                    column.isUnique && !column.isPrimaryKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-[10px] px-1 py-0.5 ${theme?.navbar?.includes('slate') ? 'bg-slate-600 text-white' : 'bg-gray-400 text-gray-800'} rounded font-light`,
                                        children: "UQ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/database/TableNode.tsx",
                                        lineNumber: 114,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/database/TableNode.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this),
                            column.isPrimaryKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Handle"], {
                                type: "target",
                                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"].Right,
                                id: `${column.id}-target`,
                                className: "!w-3 !h-3 !bg-amber-500 !border-2 !border-white",
                                style: {
                                    right: -6
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/database/TableNode.tsx",
                                lineNumber: 122,
                                columnNumber: 15
                            }, this)
                        ]
                    }, column.id, true, {
                        fileName: "[project]/src/components/database/TableNode.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/database/TableNode.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `px-4 py-2 ${theme?.navbar?.includes('slate') ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'} border-t rounded-b-xl`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex items-center justify-between text-xs ${theme?.textSecondary || 'text-gray-600'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                table.columns.length,
                                " columns"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/database/TableNode.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center gap-1",
                            children: [
                                table.columns.filter((c)=>c.isPrimaryKey).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"], {
                                            className: "w-3 h-3 text-amber-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/TableNode.tsx",
                                            lineNumber: 141,
                                            columnNumber: 17
                                        }, this),
                                        table.columns.filter((c)=>c.isPrimaryKey).length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/database/TableNode.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this),
                                table.columns.filter((c)=>c.isForeignKey).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-0.5 ml-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                                            className: `w-3 h-3 ${theme?.text || 'text-gray-700'}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/TableNode.tsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this),
                                        table.columns.filter((c)=>c.isForeignKey).length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/database/TableNode.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/database/TableNode.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/database/TableNode.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/database/TableNode.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                whileHover: {
                    scale: 1.1,
                    x: 3
                },
                whileTap: {
                    scale: 0.9
                },
                onClick: (e)=>{
                    e.stopPropagation();
                    onViewData(table.id, table.name);
                },
                className: `absolute -right-5 top-1/2 -translate-y-1/2 w-8 h-8 ${theme?.button || 'bg-black hover:bg-gray-800 text-white'} rounded-full shadow-lg flex items-center justify-center transition-colors z-20`,
                title: "View table data",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/database/TableNode.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/database/TableNode.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/database/TableNode.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
// Custom comparison function for memo to check if table columns changed
const arePropsEqual = (prevProps, nextProps)=>{
    // Always re-render if table or columns changed
    if (prevProps.data.table.columns.length !== nextProps.data.table.columns.length) {
        return false;
    }
    // Check if any column properties changed
    for(let i = 0; i < prevProps.data.table.columns.length; i++){
        const prevCol = prevProps.data.table.columns[i];
        const nextCol = nextProps.data.table.columns[i];
        if (prevCol.name !== nextCol.name || prevCol.dataType !== nextCol.dataType || prevCol.isPrimaryKey !== nextCol.isPrimaryKey || prevCol.isForeignKey !== nextCol.isForeignKey || prevCol.isNotNull !== nextCol.isNotNull || prevCol.isUnique !== nextCol.isUnique) {
            return false;
        }
    }
    // Check other props
    return prevProps.selected === nextProps.selected && prevProps.data.isSelected === nextProps.data.isSelected && prevProps.data.table.id === nextProps.data.table.id;
};
const __TURBOPACK__default__export__ = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(TableNode, arePropsEqual);
}),
"[project]/src/components/database/RelationshipEdge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RelationshipEdge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
function RelationshipEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, style = {}, markerEnd }) {
    const [edgePath, labelX, labelY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBezierPath"])({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        curvature: 0.25
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseEdge"], {
                id: id,
                path: edgePath,
                style: {
                    ...style,
                    strokeWidth: 2.5,
                    stroke: '#475569',
                    strokeDasharray: 'none'
                },
                markerEnd: markerEnd
            }, void 0, false, {
                fileName: "[project]/src/components/database/RelationshipEdge.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EdgeLabelRenderer"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        pointerEvents: 'all'
                    },
                    className: "nodrag nopan",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1 rounded-full font-semibold shadow-sm border border-slate-300",
                        children: "FK"
                    }, void 0, false, {
                        fileName: "[project]/src/components/database/RelationshipEdge.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/database/RelationshipEdge.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/database/RelationshipEdge.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/lib/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "onAuthChange",
    ()=>onAuthChange,
    "sendPasswordReset",
    ()=>sendPasswordReset,
    "signInWithEmail",
    ()=>signInWithEmail,
    "signInWithGithub",
    ()=>signInWithGithub,
    "signInWithGoogle",
    ()=>signInWithGoogle,
    "signOut",
    ()=>signOut,
    "signUpWithEmail",
    ()=>signUpWithEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/node-esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-ssr] (ecmascript)");
;
;
const signInWithGoogle = async ()=>{
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithPopup"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["googleProvider"]);
        return result.user;
    } catch (error) {
        console.error('Error signing in with Google:', error);
        throw error;
    }
};
const signInWithGithub = async ()=>{
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithPopup"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["githubProvider"]);
        return result.user;
    } catch (error) {
        console.error('Error signing in with GitHub:', error);
        throw error;
    }
};
const signInWithEmail = async (email, password)=>{
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithEmailAndPassword"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], email, password);
        return result.user;
    } catch (error) {
        console.error('Error signing in with email:', error);
        throw error;
    }
};
const signUpWithEmail = async (email, password, displayName)=>{
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createUserWithEmailAndPassword"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], email, password);
        if (displayName && result.user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateProfile"])(result.user, {
                displayName
            });
        }
        return result.user;
    } catch (error) {
        console.error('Error signing up with email:', error);
        throw error;
    }
};
const sendPasswordReset = async (email)=>{
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendPasswordResetEmail"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], email);
    } catch (error) {
        console.error('Error sending password reset:', error);
        throw error;
    }
};
const signOut = async ()=>{
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"]);
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};
const onAuthChange = (callback)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"], callback);
};
const getCurrentUser = ()=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"].currentUser;
};
}),
"[project]/src/hooks/useAuth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function useAuth() {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return null;
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return true;
    });
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onAuthChange"])((firebaseUser)=>{
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return ()=>unsubscribe();
    }, []);
    const signIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setLoading(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithGoogle"])();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to sign in');
        } finally{
            setLoading(false);
        }
    }, []);
    const signInGithub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setLoading(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithGithub"])();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to sign in with GitHub');
        } finally{
            setLoading(false);
        }
    }, []);
    const signInEmail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email, password)=>{
        try {
            setError(null);
            setLoading(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithEmail"])(email, password);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to sign in');
            throw err; // Re-throw so the UI can show specific error messages
        } finally{
            setLoading(false);
        }
    }, []);
    const signUpEmail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email, password, displayName)=>{
        try {
            setError(null);
            setLoading(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signUpWithEmail"])(email, password, displayName);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create account');
            throw err;
        } finally{
            setLoading(false);
        }
    }, []);
    const resetPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email)=>{
        try {
            setError(null);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendPasswordReset"])(email);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send reset email');
            throw err;
        }
    }, []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"])();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to sign out');
        }
    }, []);
    return {
        user,
        loading,
        error,
        signIn,
        signInGithub,
        signInEmail,
        signUpEmail,
        resetPassword,
        logout
    };
}
}),
"[project]/src/hooks/useWorkflowLayouts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWorkflowLayouts",
    ()=>useWorkflowLayouts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
// Debounce delay in milliseconds - reduced for faster position saves
const DEBOUNCE_DELAY = 300;
function useWorkflowLayouts({ userId, databaseId }) {
    const [layouts, setLayouts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Pending updates queue for debouncing
    const pendingUpdates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const debounceTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Generate composite document ID
    const getLayoutDocId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((tableId)=>{
        if (!userId || !databaseId) return null;
        return `${userId}_${databaseId}_${tableId}`;
    }, [
        userId,
        databaseId
    ]);
    // Subscribe to layout updates for the current database
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!userId || !databaseId) {
            setLayouts({});
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'workflow_layouts'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])('userId', '==', userId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])('databaseId', '==', databaseId));
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snapshot)=>{
            const layoutsMap = {};
            snapshot.forEach((doc)=>{
                const data = doc.data();
                if (data.tableId && data.position) {
                    layoutsMap[data.tableId] = {
                        x: data.position.x,
                        y: data.position.y
                    };
                }
            });
            setLayouts(layoutsMap);
            setIsLoading(false);
        }, (error)=>{
            console.error('Error fetching workflow layouts:', error);
            setIsLoading(false);
        });
        return ()=>unsubscribe();
    }, [
        userId,
        databaseId
    ]);
    // Flush pending updates to Firestore
    const flushUpdates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!userId || !databaseId || pendingUpdates.current.size === 0) return;
        const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeBatch"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]);
        const updates = new Map(pendingUpdates.current);
        pendingUpdates.current.clear();
        updates.forEach((position, tableId)=>{
            const docId = `${userId}_${databaseId}_${tableId}`;
            const layoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'workflow_layouts', docId);
            const layoutData = {
                id: docId,
                userId,
                databaseId,
                tableId,
                position,
                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
            };
            batch.set(layoutRef, layoutData, {
                merge: true
            });
        });
        try {
            await batch.commit();
            console.log('[WorkflowLayouts] Saved positions for', updates.size, 'tables');
        } catch (error) {
            console.error('[WorkflowLayouts] Error saving workflow layouts:', error);
            // Re-add failed updates to pending queue
            updates.forEach((position, tableId)=>{
                pendingUpdates.current.set(tableId, position);
            });
        }
    }, [
        userId,
        databaseId
    ]);
    // Update a single table's position with debouncing
    const updateTablePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((tableId, position)=>{
        if (!userId || !databaseId) {
            console.warn('[WorkflowLayouts] Cannot save position - missing userId or databaseId');
            return;
        }
        console.log('[WorkflowLayouts] Queueing position update for table:', tableId, position);
        // Add to pending updates
        pendingUpdates.current.set(tableId, position);
        // Update local state immediately for responsiveness
        setLayouts((prev)=>({
                ...prev,
                [tableId]: position
            }));
        // Clear existing debounce timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        // Set new debounce timer
        debounceTimer.current = setTimeout(()=>{
            flushUpdates();
        }, DEBOUNCE_DELAY);
    }, [
        userId,
        databaseId,
        flushUpdates
    ]);
    // Batch update multiple table positions
    const updateMultiplePositions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (updates)=>{
        if (!userId || !databaseId || updates.length === 0) return;
        const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeBatch"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]);
        updates.forEach(({ tableId, position })=>{
            const docId = `${userId}_${databaseId}_${tableId}`;
            const layoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'workflow_layouts', docId);
            const layoutData = {
                id: docId,
                userId,
                databaseId,
                tableId,
                position,
                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
            };
            batch.set(layoutRef, layoutData, {
                merge: true
            });
        });
        try {
            await batch.commit();
            // Update local state
            setLayouts((prev)=>{
                const newLayouts = {
                    ...prev
                };
                updates.forEach(({ tableId, position })=>{
                    newLayouts[tableId] = position;
                });
                return newLayouts;
            });
        } catch (error) {
            console.error('Error batch updating workflow layouts:', error);
        }
    }, [
        userId,
        databaseId
    ]);
    // Get position for a specific table (returns saved position or undefined)
    const getTablePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((tableId)=>{
        return layouts[tableId];
    }, [
        layouts
    ]);
    // Cleanup on unmount - ensure pending updates are saved
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const flushRef = flushUpdates;
        return ()=>{
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
            // Always flush any remaining updates on unmount
            if (pendingUpdates.current.size > 0) {
                console.log('[WorkflowLayouts] Flushing remaining updates on unmount:', pendingUpdates.current.size);
                flushRef();
            }
        };
    }, [
        flushUpdates
    ]);
    return {
        layouts,
        isLoading,
        updateTablePosition,
        updateMultiplePositions,
        getTablePosition
    };
}
}),
"[project]/src/lib/sql-parser.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SQL Parser and Importer
 * Parses SQL file contents and creates tables/databases accordingly
 */ __turbopack_context__.s([
    "convertMySQLToPgSQL",
    ()=>convertMySQLToPgSQL,
    "extractColumns",
    ()=>extractColumns,
    "extractTableName",
    ()=>extractTableName,
    "generateDatabaseName",
    ()=>generateDatabaseName,
    "parseSQLFile",
    ()=>parseSQLFile,
    "validateSQL",
    ()=>validateSQL
]);
function parseSQLFile(sqlContent) {
    const result = {
        databaseName: null,
        createTableStatements: [],
        insertStatements: [],
        otherStatements: []
    };
    // Split by semicolon, but be careful with strings
    const statements = splitSQLStatements(sqlContent);
    for (const statement of statements){
        const trimmed = statement.trim();
        if (!trimmed) continue;
        const upperCase = trimmed.toUpperCase();
        // Check for CREATE DATABASE
        if (upperCase.startsWith('CREATE DATABASE')) {
            const match = trimmed.match(/CREATE\s+DATABASE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?([^`\s;]+)`?/i);
            if (match) {
                result.databaseName = match[1];
            }
        } else if (upperCase.startsWith('USE')) {
            const match = trimmed.match(/USE\s+`?([^`\s;]+)`?/i);
            if (match) {
                result.databaseName = match[1];
            }
        } else if (upperCase.startsWith('CREATE TABLE')) {
            const match = trimmed.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?([^`\s(]+)`?/i);
            if (match) {
                // Convert MySQL syntax to PostgreSQL
                const convertedSQL = convertMySQLToPgSQL(trimmed);
                result.createTableStatements.push({
                    tableName: match[1],
                    sql: convertedSQL
                });
            }
        } else if (upperCase.startsWith('INSERT')) {
            const match = trimmed.match(/INSERT\s+INTO\s+`?([^`\s(\n]+)`?/i);
            if (match) {
                result.insertStatements.push({
                    tableName: match[1],
                    sql: trimmed
                });
            }
        } else if (upperCase.startsWith('CREATE TRIGGER') || upperCase.startsWith('CREATE PROCEDURE') || upperCase.startsWith('CREATE FUNCTION')) {
            result.otherStatements.push({
                type: 'STORED_OBJECT',
                sql: trimmed
            });
        }
    }
    return result;
}
/**
 * Split SQL statements carefully (respecting strings and comments)
 */ function splitSQLStatements(sql) {
    const statements = [];
    let current = '';
    let inString = false;
    let stringChar = '';
    let inComment = false;
    let inLineComment = false;
    for(let i = 0; i < sql.length; i++){
        const char = sql[i];
        const nextChar = sql[i + 1];
        // Handle line comments
        if (!inString && char === '-' && nextChar === '-') {
            inLineComment = true;
            i++; // skip next -
            continue;
        }
        // End line comment
        if (inLineComment && (char === '\n' || char === '\r')) {
            inLineComment = false;
            current += char;
            continue;
        }
        if (inLineComment) continue;
        // Handle block comments
        if (!inString && char === '/' && nextChar === '*') {
            inComment = true;
            i++; // skip *
            continue;
        }
        if (inComment && char === '*' && nextChar === '/') {
            inComment = false;
            i++; // skip /
            continue;
        }
        if (inComment) continue;
        // Handle strings
        if ((char === "'" || char === '"' || char === '`') && !inString) {
            inString = true;
            stringChar = char;
            current += char;
            continue;
        }
        if (inString && char === stringChar && sql[i - 1] !== '\\') {
            inString = false;
            current += char;
            continue;
        }
        // Handle statement terminator
        if (!inString && char === ';') {
            current += char;
            if (current.trim()) {
                statements.push(current);
            }
            current = '';
            continue;
        }
        current += char;
    }
    // Add remaining statement
    if (current.trim()) {
        statements.push(current);
    }
    return statements;
}
function extractTableName(createTableSQL) {
    const match = createTableSQL.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?([^`\s(]+)`?/i);
    return match ? match[1] : '';
}
function extractColumns(createTableSQL) {
    const columns = [];
    // Remove CREATE TABLE part and get the content between parentheses
    const match = createTableSQL.match(/\(([\s\S]*)\)(?:\s*;)?$/);
    if (!match) return columns;
    const content = match[1];
    // Split by comma, but be careful with nested parentheses (for foreign key constraints)
    const parts = splitByTopLevelComma(content);
    for (const part of parts){
        const trimmed = part.trim();
        if (!trimmed) continue;
        // Skip constraint definitions that start with PRIMARY KEY, FOREIGN KEY, etc.
        if (trimmed.toUpperCase().startsWith('PRIMARY KEY') || trimmed.toUpperCase().startsWith('FOREIGN KEY') || trimmed.toUpperCase().startsWith('UNIQUE') || trimmed.toUpperCase().startsWith('CHECK') || trimmed.toUpperCase().startsWith('CONSTRAINT')) {
            continue;
        }
        // Parse column definition
        const columnMatch = trimmed.match(/`?(\w+)`?\s+([^\s]+)(.*)$/i);
        if (columnMatch) {
            const name = columnMatch[1];
            const type = columnMatch[2];
            const constraintsStr = columnMatch[3].trim();
            const constraints = constraintsStr.split(/\s+/).filter((c)=>c && c !== '');
            columns.push({
                name,
                type,
                constraints
            });
        }
    }
    return columns;
}
/**
 * Split string by comma at top level only (respecting parentheses)
 */ function splitByTopLevelComma(str) {
    const parts = [];
    let current = '';
    let parenLevel = 0;
    let inString = false;
    let stringChar = '';
    for(let i = 0; i < str.length; i++){
        const char = str[i];
        // Handle strings
        if ((char === "'" || char === '"' || char === '`') && !inString) {
            inString = true;
            stringChar = char;
        } else if (inString && char === stringChar && str[i - 1] !== '\\') {
            inString = false;
        }
        if (!inString) {
            if (char === '(') parenLevel++;
            else if (char === ')') parenLevel--;
            else if (char === ',' && parenLevel === 0) {
                parts.push(current);
                current = '';
                continue;
            }
        }
        current += char;
    }
    if (current) parts.push(current);
    return parts;
}
function convertMySQLToPgSQL(sqlStatement) {
    if (!sqlStatement.toUpperCase().startsWith('CREATE TABLE')) {
        return sqlStatement;
    }
    let converted = sqlStatement;
    // Convert AUTO_INCREMENT to SERIAL
    // Handle both INT AUTO_INCREMENT and BIGINT AUTO_INCREMENT
    converted = converted.replace(/\b(BIGINT|INT|INTEGER)\s+AUTO_INCREMENT\b/gi, 'SERIAL');
    converted = converted.replace(/\bAUTO_INCREMENT\b/gi, 'SERIAL');
    // Remove UNSIGNED (PostgreSQL handles this differently)
    converted = converted.replace(/\bUNSIGNED\s+/gi, '');
    // Remove ENGINE clauses
    converted = converted.replace(/\s+ENGINE\s*=\s*[^\s;,]*/gi, '');
    // Remove CHARSET clauses
    converted = converted.replace(/\s+CHARSET\s*=\s*[^\s;,]*/gi, '');
    // Remove COLLATE clauses
    converted = converted.replace(/\s+COLLATE\s*=?\s*[^\s;,]*/gi, '');
    // Remove COMMENT clauses
    converted = converted.replace(/\s+COMMENT\s+'[^']*'/gi, '');
    converted = converted.replace(/\s+COMMENT\s+"[^"]*"/gi, '');
    // Remove ROW_FORMAT clauses
    converted = converted.replace(/\s+ROW_FORMAT\s*=\s*[^\s;,]*/gi, '');
    // Remove DEFAULT CHARSET clauses
    converted = converted.replace(/\s+DEFAULT\s+CHARSET\s*=\s*[^\s;,]*/gi, '');
    // Convert backticks to double quotes for PostgreSQL identifiers (they use double quotes)
    // But preserve backticks inside string literals
    let result = '';
    let inString = false;
    let stringChar = '';
    for(let i = 0; i < converted.length; i++){
        const char = converted[i];
        if ((char === "'" || char === '"') && !inString) {
            inString = true;
            stringChar = char;
            result += char;
        } else if (inString && char === stringChar && converted[i - 1] !== '\\') {
            inString = false;
            result += char;
        } else if (!inString && char === '`') {
            result += '"';
        } else {
            result += char;
        }
    }
    return result;
}
function validateSQL(sqlContent) {
    const trimmed = sqlContent.trim();
    if (!trimmed) {
        return {
            valid: false,
            error: 'SQL file is empty'
        };
    }
    if (!trimmed.includes('CREATE TABLE')) {
        return {
            valid: false,
            error: 'No CREATE TABLE statements found in the SQL file'
        };
    }
    return {
        valid: true
    };
}
function generateDatabaseName(fileName) {
    return fileName.replace(/\.sql$/i, '').replace(/[^a-zA-Z0-9_]/g, '_').replace(/^(\d)/, '_$1') // prepend _ if starts with number
    .substring(0, 64);
}
}),
"[project]/src/lib/fk-helpers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatFKDisplay",
    ()=>formatFKDisplay,
    "getFKColumnName",
    ()=>getFKColumnName,
    "getFKTableName",
    ()=>getFKTableName,
    "resolveFKNames",
    ()=>resolveFKNames
]);
function resolveFKNames(fkRef, tables) {
    if (!fkRef) return null;
    const table = tables.find((t)=>t.id === fkRef.tableId);
    const column = table?.columns.find((c)=>c.id === fkRef.columnId);
    if (!table || !column) return null;
    return {
        tableName: table.name,
        columnName: column.name,
        table,
        column
    };
}
function formatFKDisplay(fkRef, tables) {
    const resolved = resolveFKNames(fkRef, tables);
    if (!resolved) return 'Unknown';
    return `${resolved.tableName}.${resolved.columnName}`;
}
function getFKTableName(fkRef, tables) {
    const resolved = resolveFKNames(fkRef, tables);
    return resolved?.tableName || null;
}
function getFKColumnName(fkRef, tables) {
    const resolved = resolveFKNames(fkRef, tables);
    return resolved?.columnName || null;
}
}),
"[project]/src/app/dashboard/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-ssr] (ecmascript) <export ReactFlow as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/controls/dist/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist-node/v4.js [app-ssr] (ecmascript) <export default as v4>");
// Firebase
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-ssr] (ecmascript)");
// Components
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Navbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Sidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Terminal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Terminal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$database$2f$DBComposer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/database/DBComposer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$database$2f$TableNode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/database/TableNode.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$database$2f$RelationshipEdge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/database/RelationshipEdge.tsx [app-ssr] (ecmascript)");
// Hooks and Types
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWorkflowLayouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWorkflowLayouts.ts [app-ssr] (ecmascript)");
// SQL Parser
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sql$2d$parser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sql-parser.ts [app-ssr] (ecmascript)");
// FK helpers for 3NF compliance
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fk-helpers.ts [app-ssr] (ecmascript)");
// Icons
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
const CreateDatabaseModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/database/CreateDatabaseModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const UpgradePlanModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/common/UpgradePlanModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const CreateTableModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/database/CreateTableModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const EditTableModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/database/EditTableModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const InsertDataModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/database/InsertDataModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const UpdateDataModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/database/UpdateDataModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const DeleteDataModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/database/DeleteDataModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const SelectDataModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/database/SelectDataModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const DropModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/database/DropModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const CreateChoiceModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/database/CreateChoiceModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const ForeignKeyModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/database/ForeignKeyModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const ExportModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/database/ExportModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const ImportModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/database/ImportModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const SQLChatbot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/chatbot/SQLChatbot.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const QueryResultsPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/database/QueryResultsPanel.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
;
;
;
;
;
;
;
;
;
// Node and Edge types for React Flow
const nodeTypes = {
    tableNode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$database$2f$TableNode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
};
const edgeTypes = {
    relationshipEdge: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$database$2f$RelationshipEdge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
};
// Theme definitions (moved outside component to prevent re-creation)
const THEMES = {
    light: {
        bg: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
        navbar: 'bg-white/95 border-gray-200',
        sidebar: 'bg-white border-gray-200',
        text: 'text-gray-900',
        textSecondary: 'text-gray-600',
        button: 'bg-gray-900 hover:bg-gray-800 text-white',
        buttonSecondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
        modal: 'bg-white',
        input: 'bg-white border-gray-300 text-gray-900'
    },
    dark: {
        bg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
        navbar: 'bg-slate-900/95 border-slate-700',
        sidebar: 'bg-slate-900 border-slate-700',
        text: 'text-white',
        textSecondary: 'text-slate-300',
        button: 'bg-slate-100 hover:bg-white text-slate-900',
        buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-white',
        modal: 'bg-slate-800',
        input: 'bg-slate-900 border-slate-600 text-white'
    }
};
function DashboardPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, loading: authLoading, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        router.prefetch('/settings');
        router.prefetch('/profile');
        router.prefetch('/login');
    }, [
        router
    ]);
    // Track intentional logout to prevent redirect to login
    const isLoggingOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Theme State
    const [currentTheme, setCurrentTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('light');
    // Mobile Sidebar State
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // UI State
    const [isTerminalMinimized, setIsTerminalMinimized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCreateChoiceModalOpen, setIsCreateChoiceModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCreateDbModalOpen, setIsCreateDbModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCreateTableModalOpen, setIsCreateTableModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [upgradeReason, setUpgradeReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('database');
    const [isEditTableModalOpen, setIsEditTableModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isInsertDataModalOpen, setIsInsertDataModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUpdateDataModalOpen, setIsUpdateDataModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDeleteDataModalOpen, setIsDeleteDataModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSelectDataModalOpen, setIsSelectDataModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDropModalOpen, setIsDropModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isForeignKeyModalOpen, setIsForeignKeyModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isExportModalOpen, setIsExportModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isImportModalOpen, setIsImportModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingTableId, setEditingTableId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Workflow ref for export
    const workflowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [queryResults, setQueryResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Data State
    const [databases, setDatabases] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tables, setTables] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [allTables, setAllTables] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]); // All tables for sidebar counts
    const [selectedDatabaseId, setSelectedDatabaseId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedDatabaseId) {
            router.prefetch(`/terminal-mode?db=${selectedDatabaseId}`);
            router.prefetch(`/presentation?db=${selectedDatabaseId}&theme=${currentTheme}`);
        }
    }, [
        router,
        selectedDatabaseId,
        currentTheme
    ]);
    const [selectedTableId, setSelectedTableId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [terminalLogs, setTerminalLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Chatbot state
    const [chatMessages, setChatMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [chatbotDbId, setChatbotDbId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chatbotDbName, setChatbotDbName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chatLoaded, setChatLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // DB Composer sidebar state
    const [isComposerOpen, setIsComposerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // React Flow state & instance
    const [nodes, setNodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNodesState"])([]);
    const [edges, setEdges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEdgesState"])([]);
    const [reactFlowInstance, setReactFlowInstance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Compute current screen/viewport center in canvas coordinates for Schema Pilot table placement
    const viewportCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!reactFlowInstance) return undefined;
        try {
            const viewport = reactFlowInstance.getViewport();
            const windowWidth = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 1200;
            const windowHeight = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 800;
            const zoom = viewport.zoom || 1;
            return {
                x: Math.round((-viewport.x + windowWidth / 2) / zoom - 160),
                y: Math.round((-viewport.y + windowHeight / 2) / zoom - 120)
            };
        } catch  {
            return undefined;
        }
    }, [
        reactFlowInstance,
        nodes
    ]);
    // Smooth fitView handler for DB Composer actions
    const handleActionsExecuted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (reactFlowInstance) {
            setTimeout(()=>{
                reactFlowInstance.fitView({
                    padding: 0.25,
                    duration: 800
                });
            }, 200);
        }
    }, [
        reactFlowInstance
    ]);
    // Auto fitView whenever new tables are added
    const prevTablesCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(tables.length);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (tables.length > prevTablesCountRef.current && reactFlowInstance) {
            const timer = setTimeout(()=>{
                reactFlowInstance.fitView({
                    padding: 0.25,
                    duration: 800
                });
            }, 250);
            return ()=>clearTimeout(timer);
        }
        prevTablesCountRef.current = tables.length;
    }, [
        tables.length,
        reactFlowInstance
    ]);
    // Workflow layouts for position persistence
    const { layouts: workflowLayouts, updateTablePosition: saveTablePosition, isLoading: layoutsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWorkflowLayouts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkflowLayouts"])({
        userId: user?.uid,
        databaseId: selectedDatabaseId
    });
    // Helper function to calculate optimal table position (side by side)
    const calculateTablePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((databaseId)=>{
        const dbTables = tables.filter((t)=>t.databaseId === databaseId);
        if (dbTables.length === 0) {
            // First table: start at default position
            return {
                x: 100,
                y: 100
            };
        }
        // Find the rightmost table
        const rightmostTable = dbTables.reduce((max, table)=>{
            return table.position.x > max.position.x ? table : max;
        });
        // Place next table 350px to the right (TABLE_WIDTH + SPACING)
        // Align to the same Y level
        return {
            x: rightmostTable.position.x + 350,
            y: rightmostTable.position.y
        };
    }, [
        tables
    ]);
    // Calculate grid positions for multiple tables (no state dependency)
    const calculateGridPositions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((count, startIndex = 0)=>{
        const positions = [];
        const TABLE_WIDTH = 300;
        const SPACING = 50;
        const COLS_PER_ROW = 4;
        const ROW_HEIGHT = 350;
        for(let i = 0; i < count; i++){
            const col = (startIndex + i) % COLS_PER_ROW;
            const row = Math.floor((startIndex + i) / COLS_PER_ROW);
            positions.push({
                x: 100 + col * (TABLE_WIDTH + SPACING),
                y: 100 + row * ROW_HEIGHT
            });
        }
        return positions;
    }, []);
    // Load theme from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedTheme = localStorage.getItem('dbviz-theme');
        if (savedTheme && THEMES[savedTheme]) {
            setCurrentTheme(savedTheme);
        }
    }, []);
    // ⌘K / ⌘I / Ctrl+K / Ctrl+I keyboard shortcut to toggle DB Composer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = (e)=>{
            const isCmdOrCtrl = e.metaKey || e.ctrlKey;
            const key = e.key ? e.key.toLowerCase() : '';
            const code = e.code ? e.code.toLowerCase() : '';
            if (isCmdOrCtrl && (key === 'k' || key === 'i' || code === 'keyk' || code === 'keyi')) {
                e.preventDefault();
                e.stopPropagation();
                setIsComposerOpen((prev)=>!prev);
            }
        };
        window.addEventListener('keydown', handler, {
            capture: true
        });
        return ()=>window.removeEventListener('keydown', handler, {
                capture: true
            });
    }, []);
    // Theme change handler
    const handleThemeChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((themeId)=>{
        setCurrentTheme(themeId);
        localStorage.setItem('dbviz-theme', themeId);
    }, []);
    // Handle logout with redirect to home
    const handleLogout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        isLoggingOut.current = true;
        await logout();
        router.push('/');
    }, [
        logout,
        router
    ]);
    // Auth redirect (only if not logged in initially, not after logout)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!authLoading && !user && !isLoggingOut.current) {
            router.push('/login');
        }
    }, [
        user,
        authLoading,
        router
    ]);
    // Persist selected database to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedDatabaseId) {
            localStorage.setItem('dbviz-selected-database', selectedDatabaseId);
        }
    }, [
        selectedDatabaseId
    ]);
    // Firebase: Load chat messages on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user || chatLoaded) return;
        const loadChat = async ()=>{
            try {
                const chatRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'chatHistory', user.uid);
                const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(chatRef, (snap)=>{
                    if (snap.exists()) {
                        const data = snap.data();
                        const SCHEMA_PILOT_WELCOME = "⚡ **Schema Pilot Ready**\n\nI am Schema Pilot, your AI database copilot. Tell me what you want to build:\n\n• *\"Create a car dealership database with cars and sales tables\"*\n• *\"Build a student management system with 3 sample records\"*\n• *\"Add an orders table with a foreign key to users\"*\n\nI will generate the SQL and automatically render the tables onto your interactive canvas!";
                        const loaded = data.messages.map((m)=>{
                            let content = m.content;
                            if (m.id === 'welcome' || typeof content === 'string' && (content.includes('AI Composer') || content.includes('Cursor-like'))) {
                                content = SCHEMA_PILOT_WELCOME;
                            }
                            return {
                                id: m.id,
                                type: m.type,
                                content,
                                sql: m.sql,
                                executed: m.executed,
                                timestamp: m.timestamp instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"] ? m.timestamp.toDate() : new Date(m.timestamp)
                            };
                        });
                        setChatMessages(loaded);
                        if (data.activeDatabaseId) {
                            setChatbotDbId(data.activeDatabaseId);
                        }
                        if (data.activeDatabaseName) {
                            setChatbotDbName(data.activeDatabaseName);
                        }
                    }
                    setChatLoaded(true);
                });
                return unsub;
            } catch (err) {
                console.error('Error loading chat history:', err);
                setChatLoaded(true);
            }
        };
        loadChat();
    }, [
        user,
        chatLoaded
    ]);
    // Save chat messages to Firebase
    const handleChatMessagesChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (msgs)=>{
        if (!user) return;
        try {
            // Serialize messages for Firebase (no undefined values)
            const serialized = msgs.map((m)=>{
                const obj = {
                    id: m.id,
                    type: m.type,
                    content: m.content,
                    timestamp: m.timestamp instanceof Date ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].fromDate(m.timestamp) : m.timestamp
                };
                if (m.sql && m.sql.length > 0) obj.sql = m.sql;
                if (m.executed) obj.executed = true;
                return obj;
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'chatHistory', user.uid), {
                messages: serialized,
                activeDatabaseId: chatbotDbId || null,
                activeDatabaseName: chatbotDbName || null,
                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
            }, {
                merge: true
            });
        } catch (err) {
            console.error('Error saving chat history:', err);
        }
    }, [
        user,
        chatbotDbId,
        chatbotDbName
    ]);
    // Firebase: Subscribe to databases
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user) return;
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'databases'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])('userId', '==', user.uid));
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snapshot)=>{
            const dbs = [];
            snapshot.forEach((doc)=>{
                const data = doc.data();
                dbs.push({
                    id: doc.id,
                    name: data.name,
                    userId: data.userId,
                    db_password_hash: data.db_password_hash,
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date()
                });
            });
            setDatabases(dbs);
            // Restore previously selected database from localStorage, or auto-select first
            setSelectedDatabaseId((current)=>{
                if (current) return current; // Already selected, don't change
                // Try to restore from localStorage
                const savedDbId = localStorage.getItem('dbviz-selected-database');
                if (savedDbId && dbs.find((d)=>d.id === savedDbId)) {
                    return savedDbId;
                }
                // Otherwise select first database
                if (dbs.length > 0) {
                    return dbs[0].id;
                }
                return null;
            });
        });
        return ()=>unsubscribe();
    }, [
        user
    ]);
    // Stable key for database IDs to prevent listener tear-down/re-subscription thrashing
    const dbIdsKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>databases.map((d)=>d.id).sort().join(','), [
        databases
    ]);
    // Firebase: Subscribe to ALL tables for the user (for sidebar counts)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user || !dbIdsKey) {
            setAllTables([]);
            return;
        }
        const dbIds = dbIdsKey.split(',');
        const unsubscribes = [];
        const tablesByDb = {};
        dbIds.forEach((dbId)=>{
            const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])('databaseId', '==', dbId));
            const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snapshot)=>{
                const tbls = [];
                snapshot.forEach((doc)=>{
                    const data = doc.data();
                    tbls.push({
                        id: doc.id,
                        name: data.name,
                        databaseId: data.databaseId,
                        columns: data.columns || [],
                        position: data.position || {
                            x: 100,
                            y: 100
                        },
                        createdAt: data.createdAt?.toDate() || new Date(),
                        updatedAt: data.updatedAt?.toDate() || new Date()
                    });
                });
                tablesByDb[dbId] = tbls;
                const allTablesArray = Object.values(tablesByDb).flat();
                setAllTables(allTablesArray);
            });
            unsubscribes.push(unsub);
        });
        return ()=>{
            unsubscribes.forEach((unsub)=>unsub());
        };
    }, [
        user,
        dbIdsKey
    ]);
    // Firebase: Subscribe to tables for selected database (for workflow canvas)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!selectedDatabaseId) {
            setTables([]);
            return;
        }
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])('databaseId', '==', selectedDatabaseId));
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snapshot)=>{
            const tbls = [];
            snapshot.forEach((doc)=>{
                const data = doc.data();
                tbls.push({
                    id: doc.id,
                    name: data.name,
                    databaseId: data.databaseId,
                    columns: data.columns || [],
                    position: data.position || {
                        x: 100,
                        y: 100
                    },
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date()
                });
            });
            setTables(tbls);
        });
        return ()=>unsubscribe();
    }, [
        selectedDatabaseId
    ]);
    // Convert foreign key relationships to edges (only update if edge structure changes)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const newEdges = [];
        tables.forEach((table)=>{
            table.columns.forEach((column)=>{
                if (column.isForeignKey && column.foreignKeyReference) {
                    const targetTable = tables.find((t)=>t.id === column.foreignKeyReference?.tableId);
                    const targetColumn = targetTable?.columns.find((c)=>c.id === column.foreignKeyReference?.columnId);
                    if (targetTable && targetColumn) {
                        newEdges.push({
                            id: `${table.id}-${column.id}-${targetTable.id}-${targetColumn.id}`,
                            source: table.id,
                            target: targetTable.id,
                            sourceHandle: `${column.id}-source`,
                            targetHandle: `${targetColumn.id}-target`,
                            type: 'relationshipEdge',
                            animated: false,
                            markerEnd: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MarkerType"].ArrowClosed,
                                color: '#475569',
                                width: 20,
                                height: 20
                            },
                            data: {
                                sourceColumn: column.name,
                                targetColumn: targetColumn.name
                            }
                        });
                    }
                }
            });
        });
        setEdges((prevEdges)=>{
            const prevKey = prevEdges.map((e)=>e.id).sort().join(',');
            const nextKey = newEdges.map((e)=>e.id).sort().join(',');
            return prevKey === nextKey ? prevEdges : newEdges;
        });
    }, [
        tables,
        setEdges
    ]);
    // Handle node position changes (for immediate visual updates)
    const onNodesChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((changes)=>{
        setNodes((nds)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyNodeChanges"])(changes, nds));
    }, [
        setNodes
    ]);
    // Handle node drag stop - save position when drag ends
    const onNodeDragStop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((_event, node)=>{
        console.log('[Dashboard] Node drag stopped:', node.id, 'Position:', node.position);
        saveTablePosition(node.id, node.position);
    }, [
        saveTablePosition
    ]);
    // Add terminal log
    const addLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((type, message)=>{
        setTerminalLogs((prev)=>[
                ...prev,
                {
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                    type,
                    message,
                    timestamp: new Date()
                }
            ]);
    }, []);
    // Plan limits checks
    const handleOpenCreateDatabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (databases.length >= 3) {
            setUpgradeReason('database');
            setIsUpgradeModalOpen(true);
        } else {
            setIsCreateDbModalOpen(true);
        }
    }, [
        databases.length
    ]);
    const handleOpenCreateTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (tables.length >= 10) {
            setUpgradeReason('table');
            setIsUpgradeModalOpen(true);
        } else {
            setIsCreateTableModalOpen(true);
        }
    }, [
        tables.length
    ]);
    // Create database
    const handleCreateDatabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (name)=>{
        if (!user) return;
        try {
            // First, create the database/schema in PostgreSQL with user isolation
            const postgresResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/database/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name
                })
            });
            const postgresResult = await postgresResponse.json();
            if (!postgresResult.success) {
                addLog('error', `PostgreSQL Error: ${postgresResult.error}`);
                return;
            }
            // If PostgreSQL creation successful, save to Firebase (no password)
            const dbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'databases', dbId), {
                name,
                userId: user.uid,
                db_password_hash: '',
                createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
            });
            addLog('success', `Database '${name}' created successfully in PostgreSQL`);
            setSelectedDatabaseId(dbId);
            setIsCreateDbModalOpen(false);
        } catch (error) {
            console.error('Error creating database:', error);
            addLog('error', `Failed to create database '${name}'`);
        }
    }, [
        user,
        addLog
    ]);
    // Delete database
    const handleDeleteDatabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (databaseId)=>{
        if (!user) return;
        try {
            const dbToDelete = databases.find((d)=>d.id === databaseId);
            const dbName = dbToDelete?.name;
            if (dbName) {
                // First, drop the schema in PostgreSQL with user isolation
                const postgresResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/database/drop', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: dbName
                    })
                });
                const postgresResult = await postgresResponse.json();
                if (!postgresResult.success) {
                    // Log warning but continue with Firebase deletion
                    addLog('warning', `PostgreSQL: ${postgresResult.error}`);
                }
            }
            // Delete all tables in the database from Firebase
            const tablesToDelete = tables.filter((t)=>t.databaseId === databaseId);
            for (const table of tablesToDelete){
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', table.id));
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'databases', databaseId));
            if (selectedDatabaseId === databaseId) {
                setSelectedDatabaseId(null);
            }
            addLog('success', `Database '${dbName}' dropped successfully`);
        } catch (error) {
            console.error('Error deleting database:', error);
            addLog('error', 'Failed to delete database');
        }
    }, [
        user,
        databases,
        tables,
        selectedDatabaseId,
        addLog
    ]);
    // ── Helper: sync PostgreSQL tables → Firebase for a given database ────────────
    const syncTablesToFirebase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (actualDbName, firebaseDbId)=>{
        if (!user) return;
        const showTablesResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                database: actualDbName,
                query: 'SHOW TABLES'
            })
        });
        const showTablesResult = await showTablesResponse.json();
        if (!showTablesResult.success || !showTablesResult.results) return;
        const pgTableNames = showTablesResult.results.map((row)=>Object.values(row)[0]);
        // Get existing Firebase tables for this database so we don't duplicate
        const existingTablesSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])('databaseId', '==', firebaseDbId)));
        const existingNames = new Set();
        const existingTables = [];
        existingTablesSnap.forEach((d)=>{
            const data = d.data();
            existingNames.add(data.name);
            existingTables.push({
                name: data.name,
                position: data.position || {
                    x: 100,
                    y: 100
                }
            });
        });
        // Collect new tables to be added
        const newTables = [];
        for(let i = 0; i < pgTableNames.length; i++){
            const tableName = pgTableNames[i];
            if (existingNames.has(tableName)) continue; // Already in Firebase
            const descResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/table/describe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    database: actualDbName,
                    table: tableName
                })
            });
            const descResult = await descResponse.json();
            if (!descResult.success) {
                // Skip tables that can't be described (might not exist or access denied)
                console.warn(`Could not describe table '${tableName}':`, descResult.error);
                continue;
            }
            if (descResult.columns) {
                const columns = descResult.columns.map((col)=>{
                    const column = {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        name: col.Field,
                        dataType: col.Type.toUpperCase().replace(/\(.*\)/, '').trim(),
                        isPrimaryKey: col.Key === 'PRI',
                        isForeignKey: col.Key === 'MUL',
                        isNotNull: col.Null === 'NO',
                        isUnique: col.Key === 'UNI',
                        isAutoIncrement: (col.Extra || '').includes('auto_increment')
                    };
                    if (col.Default !== null && col.Default !== undefined) {
                        column.defaultValue = col.Default;
                    }
                    return column;
                });
                newTables.push({
                    name: tableName,
                    columns
                });
            }
        }
        // Calculate grid positions for new tables
        const totalTableCount = existingTables.length + newTables.length;
        const gridPositions = calculateGridPositions(totalTableCount);
        // Add new tables with calculated positions
        for(let i = 0; i < newTables.length; i++){
            const tableData = newTables[i];
            const positionIndex = existingTables.length + i;
            const position = gridPositions[positionIndex];
            const tableId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', tableId), {
                name: tableData.name,
                databaseId: firebaseDbId,
                columns: tableData.columns,
                position,
                createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
            });
            addLog('success', `Table '${tableData.name}' synced to workflow`);
        }
    }, [
        user,
        addLog,
        calculateGridPositions
    ]);
    // ── Execute SQL from chatbot → terminal → workflow ───────────────────────
    const handleExecuteSQL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (sqlStatements)=>{
        if (!user) throw new Error('Not authenticated');
        let dbId = chatbotDbId;
        let dbName = chatbotDbName;
        let actualDbName;
        // If no active chatbot database yet, check if user is creating one
        if (!dbId) {
            // Look for CREATE DATABASE statement in the SQL
            let createDbStatement = '';
            let extractedDbName = '';
            for (const sql of sqlStatements){
                const trimmed = sql.trim();
                if (/^CREATE\s+DATABASE/i.test(trimmed)) {
                    createDbStatement = trimmed;
                    // Extract database name from "CREATE DATABASE <name>"
                    const match = trimmed.match(/CREATE\s+DATABASE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
                    if (match && match[1]) {
                        extractedDbName = match[1];
                    }
                    break;
                }
            }
            // Use extracted name if available, otherwise generate one
            dbName = extractedDbName || `chatbot_db_${Date.now().toString(36)}`;
            const dbResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/database/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: dbName
                })
            });
            const dbResult = await dbResponse.json();
            if (!dbResult.success) {
                addLog('error', `Error: ${dbResult.error}`);
                throw new Error(dbResult.error);
            }
            dbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'databases', dbId), {
                name: dbName,
                userId: user.uid,
                db_password_hash: '',
                createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
            });
            actualDbName = dbName;
            setChatbotDbId(dbId);
            setChatbotDbName(dbName);
            // Persist chatbot DB info immediately (state won't be in closure yet)
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'chatHistory', user.uid), {
                activeDatabaseId: dbId,
                activeDatabaseName: dbName,
                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
            }, {
                merge: true
            });
            addLog('success', `Database '${dbName}' created from chatbot`);
        } else {
            // Use existing chatbot database
            const existingDb = databases.find((d)=>d.id === dbId);
            if (!existingDb) {
                throw new Error('Chatbot database not found. It may have been deleted.');
            }
            actualDbName = existingDb.name;
        }
        // Execute each SQL statement
        for (const sql of sqlStatements){
            const trimmed = sql.trim();
            if (!trimmed) continue;
            if (/^CREATE\s+DATABASE/i.test(trimmed)) continue; // Skip CREATE DATABASE
            const execResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    database: actualDbName,
                    query: trimmed
                })
            });
            const execResult = await execResponse.json();
            if (!execResult.success) {
                addLog('warning', `SQL: ${execResult.error}`);
            } else {
                addLog('success', `Executed: ${trimmed.substring(0, 80)}${trimmed.length > 80 ? '...' : ''}`);
            }
        }
        // Sync tables from PostgreSQL → Firebase (handles new tables only, skips existing)
        await syncTablesToFirebase(actualDbName, dbId);
        // Switch workflow to the chatbot database
        setSelectedDatabaseId(dbId);
        addLog('success', `Workflow showing '${dbName}'`);
    }, [
        user,
        chatbotDbId,
        chatbotDbName,
        databases,
        addLog,
        syncTablesToFirebase
    ]);
    // Create table
    const handleCreateTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (name, columns)=>{
        if (!selectedDatabaseId) return;
        try {
            const selectedDatabase = databases.find((d)=>d.id === selectedDatabaseId);
            const databaseName = selectedDatabase?.name;
            if (!databaseName) {
                addLog('error', 'No database selected');
                return;
            }
            // Check if table already exists in PostgreSQL
            const checkResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    database: databaseName,
                    query: `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = current_schema() AND table_name = '${name.toLowerCase()}'`
                })
            });
            const checkResult = await checkResponse.json();
            if (checkResult.success && checkResult.results && checkResult.results.length > 0) {
                const count = Number(checkResult.results[0].count);
                if (count > 0) {
                    addLog('error', `Table '${name}' already exists. Use DROP TABLE \`${name}\` to remove it first.`);
                    return;
                }
            }
            // First, create the table in PostgreSQL
            const pgColumns = columns.map((col)=>{
                const fkTableName = col.isForeignKey ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFKTableName"])(col.foreignKeyReference, tables) : null;
                const fkColumnName = col.isForeignKey ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFKColumnName"])(col.foreignKeyReference, tables) : null;
                return {
                    name: col.name,
                    dataType: col.dataType,
                    isPrimaryKey: col.isPrimaryKey,
                    isNotNull: col.isNotNull,
                    isUnique: col.isUnique,
                    isAutoIncrement: col.isAutoIncrement,
                    defaultValue: col.defaultValue,
                    isForeignKey: col.isForeignKey,
                    foreignKeyReference: col.foreignKeyReference && fkTableName && fkColumnName ? {
                        tableName: fkTableName,
                        columnName: fkColumnName
                    } : undefined
                };
            });
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/table/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    database: databaseName,
                    tableName: name,
                    columns: pgColumns
                })
            });
            const result = await response.json();
            if (!result.success) {
                addLog('error', `Error: ${result.error}`);
                return;
            }
            // If PostgreSQL creation successful, save to Firebase
            const tableId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            // Calculate position for new table
            const position = calculateTablePosition(selectedDatabaseId);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', tableId), {
                name,
                databaseId: selectedDatabaseId,
                columns,
                position,
                createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
            });
            addLog('success', `Table '${name}' created successfully in PostgreSQL`);
            // Log foreign key relationships
            columns.forEach((col)=>{
                if (col.isForeignKey && col.foreignKeyReference) {
                    const fkTableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFKTableName"])(col.foreignKeyReference, tables);
                    const fkColumnName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFKColumnName"])(col.foreignKeyReference, tables);
                    if (fkTableName && fkColumnName) {
                        addLog('info', `Foreign key linked: ${name}.${col.name} → ${fkTableName}.${fkColumnName}`);
                    }
                }
            });
            setIsCreateTableModalOpen(false);
        } catch (error) {
            console.error('Error creating table:', error);
            addLog('error', `Failed to create table '${name}'`);
        }
    }, [
        selectedDatabaseId,
        databases,
        tables,
        addLog
    ]);
    // Delete table
    const handleDeleteTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (tableId)=>{
        try {
            const tableToDelete = tables.find((t)=>t.id === tableId);
            const tableName = tableToDelete?.name;
            const databaseId = tableToDelete?.databaseId;
            const selectedDatabase = databases.find((d)=>d.id === databaseId);
            const databaseName = selectedDatabase?.name;
            if (tableName && databaseName) {
                // First, drop the table in PostgreSQL
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        database: databaseName,
                        query: `DROP TABLE "${tableName}"`
                    })
                });
                const result = await response.json();
                if (!result.success) {
                    // Log warning but continue with Firebase deletion
                    addLog('warning', `PostgreSQL: ${result.error}`);
                }
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', tableId));
            if (selectedTableId === tableId) {
                setSelectedTableId(null);
            }
            addLog('success', `Table '${tableName}' dropped successfully`);
        } catch (error) {
            console.error('Error deleting table:', error);
            addLog('error', 'Failed to delete table');
        }
    }, [
        tables,
        databases,
        selectedTableId,
        addLog
    ]);
    // Handle edit table
    const handleEditTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((tableId)=>{
        setEditingTableId(tableId);
        setIsEditTableModalOpen(true);
    }, []);
    // Update table columns
    const handleUpdateTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (tableId, columns)=>{
        try {
            const table = tables.find((t)=>t.id === tableId);
            if (!table) {
                addLog('error', 'Table not found');
                return;
            }
            const tableName = table.name;
            const selectedDatabase = databases.find((d)=>d.id === table.databaseId);
            const databaseName = selectedDatabase?.name;
            if (!databaseName) {
                addLog('error', 'Database not found');
                return;
            }
            // Get the old columns to compare
            const oldColumns = table.columns;
            const oldColumnNames = new Set(oldColumns.map((c)=>c.name));
            const newColumnNames = new Set(columns.map((c)=>c.name));
            // Identify added columns
            const addedColumns = columns.filter((c)=>!oldColumnNames.has(c.name));
            // Identify removed columns
            const removedColumns = oldColumns.filter((c)=>!newColumnNames.has(c.name));
            // Identify modified columns (same name but different properties)
            const modifiedColumns = columns.filter((newCol)=>{
                const oldCol = oldColumns.find((c)=>c.name === newCol.name);
                if (!oldCol) return false;
                return oldCol.dataType !== newCol.dataType || oldCol.isNotNull !== newCol.isNotNull || oldCol.isUnique !== newCol.isUnique || oldCol.defaultValue !== newCol.defaultValue;
            });
            // Execute ALTER TABLE commands for each change
            const alterCommands = [];
            // Add new columns
            for (const col of addedColumns){
                let colDef = `ADD COLUMN "${col.name}" ${col.dataType}`;
                if (col.isNotNull) colDef += ' NOT NULL';
                if (col.isUnique) colDef += ' UNIQUE';
                if (col.defaultValue) colDef += ` DEFAULT '${col.defaultValue}'`;
                alterCommands.push(colDef);
            }
            // Drop removed columns
            for (const col of removedColumns){
                alterCommands.push(`DROP COLUMN "${col.name}"`);
            }
            // Modify existing columns
            for (const col of modifiedColumns){
                let colDef = `ALTER COLUMN "${col.name}" TYPE ${col.dataType}`;
                if (col.isNotNull) colDef += ' NOT NULL';
                if (col.isUnique) colDef += ' UNIQUE';
                if (col.defaultValue) colDef += ` DEFAULT '${col.defaultValue}'`;
                alterCommands.push(colDef);
            }
            // If there are changes, execute with schema sync
            if (alterCommands.length > 0) {
                const alterQuery = `ALTER TABLE "${tableName}" ${alterCommands.join(', ')}`;
                // Use schema-aware execution to automatically sync to Firebase and canvas
                const result = await executeQueryWithSchemaSync(databaseName, alterQuery);
                if (!result.success) {
                    addLog('error', `Failed to alter table: ${result.error}`);
                    return;
                }
            }
            // Close modal - Firebase listener will sync the updated table
            setIsEditTableModalOpen(false);
            setEditingTableId(null);
            addLog('success', `Table '${tableName}' updated successfully`);
        } catch (error) {
            console.error('Error updating table:', error);
            addLog('error', 'Failed to update table');
        }
    }, [
        tables,
        databases,
        addLog
    ]);
    // Add foreign key to existing table
    const handleAddForeignKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (sourceTableId, sourceColumnId, targetTableId, targetColumnId)=>{
        const sourceTable = tables.find((t)=>t.id === sourceTableId);
        const targetTable = tables.find((t)=>t.id === targetTableId);
        const sourceColumn = sourceTable?.columns.find((c)=>c.id === sourceColumnId);
        const targetColumn = targetTable?.columns.find((c)=>c.id === targetColumnId);
        const selectedDatabase = databases.find((d)=>d.id === selectedDatabaseId);
        const databaseName = selectedDatabase?.name;
        if (!sourceTable || !targetTable || !sourceColumn || !targetColumn || !databaseName) {
            throw new Error('Invalid table or column selection');
        }
        try {
            // Add the foreign key constraint in PostgreSQL directly
            // PostgreSQL will return proper errors if tables don't exist
            const constraintName = `fk_${sourceTable.name}_${sourceColumn.name}`;
            const alterQuery = `ALTER TABLE "${sourceTable.name}" ADD CONSTRAINT "${constraintName}" FOREIGN KEY ("${sourceColumn.name}") REFERENCES "${targetTable.name}"("${targetColumn.name}")`;
            console.log('Adding FK with query:', alterQuery);
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    database: databaseName,
                    query: alterQuery
                })
            });
            const result = await response.json();
            console.log('FK operation result:', result);
            if (!result.success) {
                throw new Error(result.error || 'Failed to add foreign key in PostgreSQL');
            }
            // Update Firebase with the foreign key reference
            const updatedColumns = sourceTable.columns.map((col)=>{
                if (col.id === sourceColumnId) {
                    return {
                        ...col,
                        isForeignKey: true,
                        foreignKeyReference: {
                            tableId: targetTableId,
                            tableName: targetTable.name,
                            columnId: targetColumnId,
                            columnName: targetColumn.name
                        }
                    };
                }
                return col;
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', sourceTableId), {
                columns: updatedColumns,
                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
            });
            // Auto-position source table to the right of target table for straight FK line
            // Position 400px to the right and align vertically
            const newPosition = {
                x: targetTable.position.x + 400,
                y: targetTable.position.y
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', sourceTableId), {
                position: newPosition,
                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
            });
            addLog('success', `Foreign key added: ${sourceTable.name}.${sourceColumn.name} → ${targetTable.name}.${targetColumn.name}`);
        } catch (error) {
            console.error('Error adding foreign key:', error);
            throw error;
        }
    }, [
        tables,
        databases,
        selectedDatabaseId,
        addLog
    ]);
    // Remove foreign key from existing table
    const handleRemoveForeignKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (tableId, columnId)=>{
        const table = tables.find((t)=>t.id === tableId);
        const column = table?.columns.find((c)=>c.id === columnId);
        const selectedDatabase = databases.find((d)=>d.id === selectedDatabaseId);
        const databaseName = selectedDatabase?.name;
        if (!table || !column || !databaseName) {
            throw new Error('Invalid table or column');
        }
        try {
            // Remove the foreign key constraint from PostgreSQL
            const constraintName = `fk_${table.name}_${column.name}`;
            const alterQuery = `ALTER TABLE "${table.name}" DROP CONSTRAINT "${constraintName}"`;
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    database: databaseName,
                    query: alterQuery
                })
            });
            const result = await response.json();
            // Even if PostgreSQL fails (constraint might have different name), update Firebase
            if (!result.success) {
                addLog('warning', `PostgreSQL: ${result.error}. Updating workflow...`);
            }
            // Update Firebase to remove the foreign key reference
            const updatedColumns = table.columns.map((col)=>{
                if (col.id === columnId) {
                    const { foreignKeyReference, ...rest } = col;
                    return {
                        ...rest,
                        isForeignKey: false
                    };
                }
                return col;
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', tableId), {
                columns: updatedColumns,
                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
            });
            addLog('success', `Foreign key removed from ${table.name}.${column.name}`);
        } catch (error) {
            console.error('Error removing foreign key:', error);
            throw error;
        }
    }, [
        tables,
        databases,
        selectedDatabaseId,
        addLog
    ]);
    // Handle SQL file import
    const handleSQLImport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (sqlContent, fileName)=>{
        if (!user?.uid) {
            addLog('error', 'User ID not found');
            throw new Error('User ID not found');
        }
        try {
            // Validate SQL content
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sql$2d$parser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateSQL"])(sqlContent)) {
                throw new Error('SQL file is empty or contains no valid statements');
            }
            addLog('info', `🔄 Parsing SQL file: ${fileName}`);
            // Parse the SQL file
            const parsedSQL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sql$2d$parser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseSQLFile"])(sqlContent);
            if (!parsedSQL.createTableStatements || parsedSQL.createTableStatements.length === 0) {
                throw new Error('No CREATE TABLE statements found in the SQL file');
            }
            addLog('info', `📊 Found ${parsedSQL.createTableStatements.length} table(s) to import`);
            // Determine database name
            let targetDatabaseId;
            let targetDatabaseName;
            if (parsedSQL.databaseName) {
                // Database name found in SQL file (from CREATE DATABASE statement)
                targetDatabaseName = parsedSQL.databaseName;
                const existingDb = databases.find((d)=>d.name.toLowerCase() === targetDatabaseName.toLowerCase());
                if (existingDb) {
                    targetDatabaseId = existingDb.id;
                    addLog('info', `📁 Using existing database: ${targetDatabaseName}`);
                } else {
                    // Create the database from SQL
                    addLog('info', `📁 Creating database: ${targetDatabaseName}`);
                    const dbResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/database/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: targetDatabaseName
                        })
                    });
                    const dbResult = await dbResponse.json();
                    if (!dbResult.success) {
                        throw new Error(`Failed to create database: ${dbResult.error}`);
                    }
                    // Add database to Firestore
                    const newDb = {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        name: targetDatabaseName,
                        userId: user.uid,
                        db_password_hash: '',
                        createdAt: new Date(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now().toMillis()),
                        updatedAt: new Date(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now().toMillis())
                    };
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'databases', newDb.id), {
                        ...newDb,
                        createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                        updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                    });
                    targetDatabaseId = newDb.id;
                    addLog('success', `✅ Database created: ${targetDatabaseName}`);
                }
            } else {
                // No database name in SQL, use selected or create new
                if (!selectedDatabaseId) {
                    const generatedDbName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sql$2d$parser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateDatabaseName"])(fileName);
                    targetDatabaseName = generatedDbName;
                    addLog('info', `📁 Creating database: ${generatedDbName}`);
                    const dbResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/database/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: generatedDbName
                        })
                    });
                    const dbResult = await dbResponse.json();
                    if (!dbResult.success) {
                        throw new Error(`Failed to create database: ${dbResult.error}`);
                    }
                    const newDb = {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        name: generatedDbName,
                        userId: user.uid,
                        db_password_hash: '',
                        createdAt: new Date(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now().toMillis()),
                        updatedAt: new Date(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now().toMillis())
                    };
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'databases', newDb.id), {
                        ...newDb,
                        createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                        updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                    });
                    targetDatabaseId = newDb.id;
                    addLog('success', `✅ Database created: ${generatedDbName}`);
                } else {
                    targetDatabaseId = selectedDatabaseId;
                    targetDatabaseName = databases.find((d)=>d.id === selectedDatabaseId)?.name || 'database';
                    addLog('info', `📁 Using selected database: ${targetDatabaseName}`);
                }
            }
            const actualDatabaseName = databases.find((d)=>d.id === targetDatabaseId)?.name || targetDatabaseName;
            // Create tables by executing the CREATE TABLE statements
            for (const tableStatement of parsedSQL.createTableStatements){
                addLog('info', `📋 Creating table: ${tableStatement.tableName}`);
                // Execute CREATE TABLE statement in PostgreSQL
                const createResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        database: actualDatabaseName,
                        query: tableStatement.sql
                    })
                });
                const createResult = await createResponse.json();
                if (!createResult.success) {
                    addLog('warning', `⚠️ CREATE TABLE warning: ${createResult.error}`);
                } else {
                    addLog('success', `✅ Table created: ${tableStatement.tableName}`);
                }
            }
            // Execute INSERT statements
            if (parsedSQL.insertStatements && parsedSQL.insertStatements.length > 0) {
                addLog('info', `📝 Executing ${parsedSQL.insertStatements.length} INSERT statement(s)`);
                for (const insertStmt of parsedSQL.insertStatements){
                    const insertResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            database: actualDatabaseName,
                            query: insertStmt.sql
                        })
                    });
                    const insertResult = await insertResponse.json();
                    if (!insertResult.success) {
                        addLog('warning', `⚠️ INSERT warning: ${insertResult.error}`);
                    }
                }
                addLog('success', `✅ Data inserted successfully`);
            }
            // Execute any other statements (like procedures, functions, triggers, etc.)
            if (parsedSQL.otherStatements && parsedSQL.otherStatements.length > 0) {
                addLog('info', `🔧 Executing ${parsedSQL.otherStatements.length} additional statement(s)`);
                for (const stmt of parsedSQL.otherStatements){
                    try {
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                database: actualDatabaseName,
                                query: stmt.sql
                            })
                        });
                        const result = await response.json();
                        if (!result.success) {
                            addLog('warning', `⚠️ Statement executed with warning: ${result.error}`);
                        }
                    } catch (err) {
                        addLog('warning', `⚠️ Could not execute additional statement`);
                    }
                }
            }
            // Sync tables from PostgreSQL to Firebase (after all tables are created)
            addLog('info', `🔄 Syncing tables to workflow...`);
            await syncTablesToFirebase(actualDatabaseName, targetDatabaseId);
            // Set the imported database as selected
            setSelectedDatabaseId(targetDatabaseId);
            addLog('success', `🎉 Import completed successfully!`);
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown error';
            addLog('error', `❌ Import failed: ${errorMsg}`);
            throw error;
        }
    }, [
        user,
        selectedDatabaseId,
        databases,
        addLog,
        setSelectedDatabaseId,
        syncTablesToFirebase
    ]);
    // Execute query helper for modals
    const executeQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (database, query)=>{
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    database,
                    query
                })
            });
            const result = await response.json();
            if (result.success) {
                addLog('success', `Query executed: ${query.substring(0, 50)}${query.length > 50 ? '...' : ''}`);
                if (result.formattedOutput) {
                    result.formattedOutput.forEach((line)=>addLog('info', line));
                }
            } else {
                addLog('error', result.error || 'Query failed');
            }
            return result;
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : 'Query execution failed';
            addLog('error', errMsg);
            return {
                success: false,
                error: errMsg
            };
        }
    }, [
        addLog
    ]);
    // Execute query with automatic schema synchronization to Firebase/Canvas
    const executeQueryWithSchemaSync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (database, query)=>{
        // First execute the query
        const result = await executeQuery(database, query);
        if (!result.success) return result;
        // Then, check if this query changes the schema and sync to Firebase
        const upperQuery = query.toUpperCase().trim();
        const currentDatabaseName = database;
        try {
            // Handle CREATE TABLE - add to Firebase
            if (upperQuery.startsWith('CREATE TABLE')) {
                const match = query.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
                if (match && match[1] && selectedDatabaseId) {
                    const tableName = match[1];
                    // Fetch table structure from PostgreSQL using the proper endpoint
                    const describeResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/table/describe', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            database: currentDatabaseName,
                            table: tableName
                        })
                    });
                    const describeResult = await describeResponse.json();
                    if (describeResult.success && Array.isArray(describeResult.columns)) {
                        const columns = describeResult.columns.map((col)=>{
                            const column = {
                                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                                name: col.Field,
                                dataType: col.Type.toUpperCase().replace(/\(.*\)/, '').trim(),
                                isPrimaryKey: col.Key === 'PRI',
                                isNotNull: col.Null === 'NO',
                                isUnique: col.Key === 'UNI',
                                defaultValue: col.Default,
                                isForeignKey: col.Key === 'MUL'
                            };
                            return column;
                        });
                        const tableId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
                        const position = calculateTablePosition(selectedDatabaseId);
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', tableId), {
                            name: tableName,
                            databaseId: selectedDatabaseId,
                            columns,
                            position,
                            createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                            updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                        });
                        addLog('success', `Table '${tableName}' added to canvas`);
                    }
                }
            } else if (upperQuery.startsWith('DROP TABLE')) {
                const match = query.match(/DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
                if (match && match[1]) {
                    const tableName = match[1];
                    const tableToDelete = tables.find((t)=>t.name.toLowerCase() === tableName.toLowerCase() && t.databaseId === selectedDatabaseId);
                    if (tableToDelete) {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', tableToDelete.id));
                        if (selectedTableId === tableToDelete.id) {
                            setSelectedTableId(null);
                        }
                        addLog('info', `Table '${tableName}' removed from workflow`);
                    }
                }
            } else if (upperQuery.startsWith('ALTER TABLE')) {
                const match = query.match(/ALTER\s+TABLE\s+[`"]?(\w+)[`"]?/i);
                if (match && match[1] && selectedDatabaseId) {
                    const tableName = match[1];
                    const tableToUpdate = tables.find((t)=>t.name.toLowerCase() === tableName.toLowerCase() && t.databaseId === selectedDatabaseId);
                    if (tableToUpdate) {
                        // Use the proper table/describe endpoint for PostgreSQL
                        const describeResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/table/describe', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                database: currentDatabaseName,
                                table: tableName
                            })
                        });
                        const describeResult = await describeResponse.json();
                        if (describeResult.success && Array.isArray(describeResult.columns)) {
                            const updatedColumns = describeResult.columns.map((col)=>{
                                const existingColumn = tableToUpdate.columns.find((c)=>c.name === col.Field);
                                const column = {
                                    id: existingColumn?.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                                    name: col.Field,
                                    dataType: col.Type.toUpperCase().replace(/\(.*\)/, '').trim(),
                                    isPrimaryKey: col.Key === 'PRI',
                                    isNotNull: col.Null === 'NO',
                                    isUnique: col.Key === 'UNI',
                                    defaultValue: col.Default,
                                    isForeignKey: col.Key === 'MUL'
                                };
                                return column;
                            });
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', tableToUpdate.id), {
                                columns: updatedColumns,
                                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                            });
                            addLog('success', `Table '${tableName}' structure updated on canvas`);
                        }
                    }
                }
            }
        } catch (err) {
            console.error('Error syncing schema:', err);
        // Don't throw - schema sync failure shouldn't prevent query success
        }
        return result;
    }, [
        executeQuery,
        selectedDatabaseId,
        selectedTableId,
        tables,
        addLog,
        user?.uid
    ]);
    // Handle view data from table node arrow button
    const handleViewData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (tableId, tableName)=>{
        // Use terminalDbRef which has the ACTUAL prefixed schema name from terminal
        const db = terminalDbRef.current;
        if (!db) {
            addLog('error', `No database found in terminalDbRef`);
            console.error('[handleViewData] Database not found in terminalDbRef');
            return;
        }
        console.log('[handleViewData] Executing query with prefixed database:', {
            dbName: db.name,
            tableName
        });
        // Query table data - convert table name to lowercase for PostgreSQL consistency
        const tableNameLower = tableName.toLowerCase();
        const query = `SELECT * FROM "${tableNameLower}"`;
        const result = await executeQuery(db.name, query);
        if (result.success && result.results) {
            addLog('success', `Retrieved ${result.results.length} rows from "${tableNameLower}"`);
            setQueryResults({
                results: result.results,
                query
            });
        } else {
            addLog('error', result.error || `Failed to retrieve data from "${tableNameLower}"`);
            console.error('[handleViewData] Query failed:', result.error);
        }
    }, [
        executeQuery,
        addLog
    ]);
    // Track terminal's current database separately from UI selection
    // This allows USE command to work correctly even with async state updates
    const terminalDbRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Initialize terminal database ref when selected database changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedDatabaseId && user?.uid) {
            const db = databases.find((d)=>d.id === selectedDatabaseId);
            if (db) {
                // Compute prefixed database name (same logic as PostgreSQL uses: user_{first8chars}_{dbName})
                const prefix = `user_${user.uid.substring(0, 8)}_`;
                const prefixedName = `${prefix}${db.name}`;
                terminalDbRef.current = {
                    id: db.id,
                    name: prefixedName
                };
                console.log('[Dashboard] Initialized terminalDbRef with prefixed name:', prefixedName);
            }
        }
    }, [
        selectedDatabaseId,
        databases,
        user?.uid
    ]);
    // Convert tables to React Flow nodes with persisted layout positions
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (layoutsLoading) {
            console.log('[Dashboard] Waiting for layouts to load...');
            return;
        }
        console.log('[Dashboard] Creating nodes with layouts:', {
            tablesCount: tables.length,
            layoutsCount: Object.keys(workflowLayouts).length,
            layouts: workflowLayouts
        });
        const newNodes = tables.map((table)=>{
            // Use saved layout position if available, otherwise use table's default position
            const savedPosition = workflowLayouts[table.id];
            const position = savedPosition || table.position;
            console.log(`[Dashboard] Table ${table.name}: savedPosition=${JSON.stringify(savedPosition)}, using=${JSON.stringify(position)}`);
            return {
                id: table.id,
                type: 'tableNode',
                position,
                data: {
                    table: {
                        ...table,
                        columns: [
                            ...table.columns
                        ]
                    },
                    onDelete: handleDeleteTable,
                    onViewData: handleViewData,
                    isSelected: selectedTableId === table.id,
                    theme: THEMES[currentTheme] || THEMES.light
                }
            };
        });
        setNodes(newNodes);
    }, [
        tables,
        selectedTableId,
        handleViewData,
        handleDeleteTable,
        currentTheme,
        workflowLayouts,
        layoutsLoading
    ]);
    // Handle INSERT data
    const handleInsertData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (database, table, values)=>{
        const columns = Object.keys(values).filter((k)=>values[k] !== '');
        const vals = columns.map((col)=>{
            const val = values[col];
            // Check if value is numeric
            if (/^-?\d+(\.\d+)?$/.test(val)) {
                return val;
            }
            return `'${val.replace(/'/g, "''")}'`;
        });
        if (columns.length === 0) {
            throw new Error('At least one value is required');
        }
        const query = `INSERT INTO "${table}" (${columns.map((col)=>`"${col}"`).join(', ')}) VALUES (${vals.join(', ')})`;
        const result = await executeQueryWithSchemaSync(database, query);
        if (!result.success) {
            throw new Error(result.error);
        }
    }, [
        executeQueryWithSchemaSync
    ]);
    // Handle DROP table from modal
    const handleDropTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (database, tableName)=>{
        console.log('[handleDropTable] Input database:', database, 'tableName:', tableName);
        console.log('[handleDropTable] Available databases:', databases.map((d)=>({
                id: d.id,
                name: d.name
            })));
        console.log('[handleDropTable] Available tables (allTables):', allTables.map((t)=>({
                id: t.id,
                name: t.name,
                databaseId: t.databaseId
            })));
        // Find the table in Firebase - use allTables instead of tables
        const tableToDelete = allTables.find((t)=>t.name === tableName);
        const dbObject = databases.find((d)=>d.name === database);
        console.log('[handleDropTable] tableToDelete found:', !!tableToDelete, tableToDelete);
        console.log('[handleDropTable] dbObject found:', !!dbObject, dbObject);
        console.log('[handleDropTable] Match check:', tableToDelete?.databaseId === dbObject?.id);
        if (tableToDelete && dbObject && tableToDelete.databaseId === dbObject.id) {
            // Drop from PostgreSQL
            const dropQuery = `DROP TABLE "${tableName}"`;
            console.log('[handleDropTable] Executing query:', dropQuery, 'in database:', database, 'with userId:', user?.uid);
            const result = await executeQueryWithSchemaSync(database, dropQuery);
            console.log('[handleDropTable] Query result:', result);
            if (!result.success) {
                throw new Error(result.error);
            }
            addLog('success', `Table '${tableName}' dropped successfully`);
        } else {
            console.error('[handleDropTable] Table or database not found!', {
                tableFound: !!tableToDelete,
                dbFound: !!dbObject,
                tableDbMatch: tableToDelete?.databaseId === dbObject?.id
            });
            throw new Error('Table not found');
        }
    }, [
        allTables,
        databases,
        executeQueryWithSchemaSync,
        addLog,
        user?.uid
    ]);
    // Handle terminal command - Execute real PostgreSQL queries
    const handleTerminalCommand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (command)=>{
        const upperCommand = command.toUpperCase().trim();
        const trimmedCommand = command.trim();
        // Handle local commands (HELP, CLEAR)
        if (upperCommand === 'HELP' || upperCommand === '\\H') {
            addLog('info', 'Available commands (connected to PostgreSQL):');
            addLog('info', '  SHOW DATABASES    - List all databases');
            addLog('info', '  SHOW TABLES       - List tables in current database');
            addLog('info', '  USE <database>    - Select a database');
            addLog('info', '  DESCRIBE <table>  - Show table structure');
            addLog('info', '  SELECT ...        - Query data');
            addLog('info', '  INSERT ...        - Insert data');
            addLog('info', '  UPDATE ...        - Update data');
            addLog('info', '  DELETE ...        - Delete data');
            addLog('info', '  CREATE TABLE ...  - Create a new table');
            addLog('info', '  DROP TABLE ...    - Drop a table');
            addLog('info', '  CLEAR             - Clear terminal');
            // Show in workflow area
            const helpData = [
                {
                    Command: 'SHOW DATABASES',
                    Description: 'List all databases'
                },
                {
                    Command: 'SHOW TABLES',
                    Description: 'List tables in current database'
                },
                {
                    Command: 'USE <database>',
                    Description: 'Select a database'
                },
                {
                    Command: 'DESCRIBE <table>',
                    Description: 'Show table structure'
                },
                {
                    Command: 'SELECT ...',
                    Description: 'Query data'
                },
                {
                    Command: 'INSERT ...',
                    Description: 'Insert data'
                },
                {
                    Command: 'UPDATE ...',
                    Description: 'Update data'
                },
                {
                    Command: 'DELETE ...',
                    Description: 'Delete data'
                },
                {
                    Command: 'CREATE TABLE ...',
                    Description: 'Create a new table'
                },
                {
                    Command: 'DROP TABLE ...',
                    Description: 'Drop a table'
                },
                {
                    Command: 'CLEAR',
                    Description: 'Clear terminal'
                }
            ];
            setQueryResults({
                results: helpData,
                query: 'HELP'
            });
            return;
        }
        if (upperCommand === 'CLEAR' || upperCommand === '\\C') {
            setTerminalLogs([]);
            return;
        }
        // Handle SHOW DATABASES - fetch from PostgreSQL with user filter
        if (upperCommand === 'SHOW DATABASES' || upperCommand === 'SHOW DATABASES;') {
            addLog('info', 'Executing: SHOW DATABASES');
            try {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])(`/api/database/list`);
                const result = await response.json();
                if (result.success && result.databases) {
                    const postgresDatabases = result.databases;
                    if (postgresDatabases.length === 0) {
                        addLog('info', '+--------------------+');
                        addLog('info', '| Database           |');
                        addLog('info', '+--------------------+');
                        addLog('info', '+--------------------+');
                        addLog('info', 'No databases found');
                        setQueryResults({
                            results: [],
                            query: 'SHOW DATABASES'
                        });
                    } else {
                        addLog('info', '+--------------------+');
                        addLog('info', '| Database           |');
                        addLog('info', '+--------------------+');
                        postgresDatabases.forEach((db)=>{
                            addLog('info', `| ${db.name.padEnd(18)} |`);
                        });
                        addLog('info', '+--------------------+');
                        addLog('info', `${postgresDatabases.length} row${postgresDatabases.length !== 1 ? 's' : ''} in set`);
                        // Show in workflow area
                        const dbData = postgresDatabases.map((db)=>({
                                Database: db.name
                            }));
                        setQueryResults({
                            results: dbData,
                            query: 'SHOW DATABASES'
                        });
                    }
                } else {
                    addLog('error', `Error fetching databases: ${result.error || 'Unknown error'}`);
                }
            } catch (error) {
                addLog('error', 'Failed to fetch databases from PostgreSQL');
                console.error('Error fetching databases:', error);
            }
            return;
        }
        // Handle SHOW TABLES
        if (upperCommand === 'SHOW TABLES' || upperCommand === 'SHOW TABLES;') {
            if (!selectedDatabaseId) {
                addLog('error', 'No database selected. Use "USE <database>" first.');
                return;
            }
            const selectedDatabase = databases.find((d)=>d.id === selectedDatabaseId);
            const currentTables = tables.filter((t)=>t.databaseId === selectedDatabaseId);
            addLog('info', `Executing: SHOW TABLES from ${selectedDatabase?.name}`);
            if (currentTables.length === 0) {
                addLog('info', 'No tables found in database');
                setQueryResults({
                    results: [],
                    query: `SHOW TABLES FROM ${selectedDatabase?.name}`
                });
            } else {
                addLog('info', '+--------------------+');
                addLog('info', `| Tables_in_${selectedDatabase?.name?.padEnd(8)} |`);
                addLog('info', '+--------------------+');
                currentTables.forEach((table)=>{
                    addLog('info', `| ${table.name.padEnd(18)} |`);
                });
                addLog('info', '+--------------------+');
                addLog('info', `${currentTables.length} row${currentTables.length !== 1 ? 's' : ''} in set`);
                // Show in workflow area
                const tableData = currentTables.map((t)=>({
                        [`Tables_in_${selectedDatabase?.name}`]: t.name
                    }));
                setQueryResults({
                    results: tableData,
                    query: `SHOW TABLES FROM ${selectedDatabase?.name}`
                });
            }
            return;
        }
        // Handle USE command - changes selected database locally
        if (upperCommand.startsWith('USE ')) {
            const dbName = trimmedCommand.substring(4).trim().replace(';', '');
            const targetDb = databases.find((d)=>d.name.toLowerCase() === dbName.toLowerCase());
            if (targetDb) {
                // Update both React state AND the terminal ref immediately
                // This ensures the next query in the terminal uses the correct database
                setSelectedDatabaseId(targetDb.id);
                terminalDbRef.current = {
                    id: targetDb.id,
                    name: targetDb.name
                };
                addLog('success', 'Database changed');
            } else {
                addLog('error', `ERROR 1049 (42000): Unknown database '${dbName}'`);
            }
            return;
        }
        // Handle CREATE DATABASE (convert to PostgreSQL CREATE SCHEMA)
        if (/^CREATE\s+DATABASE/i.test(upperCommand)) {
            if (databases.length >= 3) {
                setUpgradeReason('database');
                setIsUpgradeModalOpen(true);
                addLog('error', 'Error: Free plan limit reached. Maximum 3 databases allowed.');
                return;
            }
            const match = trimmedCommand.match(/CREATE\s+DATABASE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
            if (match && match[1]) {
                const dbName = match[1];
                try {
                    addLog('info', `Executing: ${trimmedCommand}`);
                    // Create schema in PostgreSQL
                    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/database/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: dbName
                        })
                    });
                    const result = await response.json();
                    if (result.success) {
                        addLog('success', `Schema '${dbName}' created successfully`);
                        // Create schema in Firebase
                        const dbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'databases', dbId), {
                            name: dbName,
                            userId: user?.uid,
                            db_password_hash: '',
                            createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                            updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                        });
                        // Auto-select the newly created schema
                        setSelectedDatabaseId(dbId);
                        // Also update terminal ref so subsequent queries use the correct schema
                        terminalDbRef.current = {
                            id: dbId,
                            name: dbName
                        };
                        addLog('info', `Schema '${dbName}' added to workflow and selected`);
                    } else {
                        addLog('error', result.error || 'Failed to create schema');
                    }
                } catch (error) {
                    console.error('Error creating schema:', error);
                    addLog('error', 'Failed to create schema');
                }
                return;
            }
        }
        // Get current database name for queries - use terminal ref as source of truth
        // This is synced immediately when USE is executed, avoiding async state timing issues
        if (!terminalDbRef.current) {
            addLog('error', 'No database selected. Use "USE <database>" first.');
            return;
        }
        const currentDatabaseName = terminalDbRef.current.name;
        // Execute query against PostgreSQL
        try {
            // Check limits before executing CREATE TABLE
            if (/^CREATE\s+TABLE/i.test(upperCommand)) {
                const currentDbId = terminalDbRef.current?.id || selectedDatabaseId;
                const currentTables = allTables.filter((t)=>t.databaseId === currentDbId);
                if (currentTables.length >= 10) {
                    setUpgradeReason('table');
                    setIsUpgradeModalOpen(true);
                    addLog('error', 'Error: Free plan limit reached. Maximum 10 tables allowed per database.');
                    return;
                }
            }
            addLog('info', `Executing: ${trimmedCommand}`);
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/query/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    database: currentDatabaseName,
                    query: trimmedCommand
                })
            });
            const result = await response.json();
            if (result.success) {
                // Log formatted output
                if (result.formattedOutput && Array.isArray(result.formattedOutput)) {
                    result.formattedOutput.forEach((line)=>{
                        addLog('success', line);
                    });
                } else {
                    addLog('success', 'Query executed successfully');
                }
                // If it's a SELECT query and has results, also show in panel
                if (upperCommand.startsWith('SELECT') && result.results && Array.isArray(result.results) && result.results.length > 0) {
                    setQueryResults({
                        results: result.results,
                        query: trimmedCommand
                    });
                }
                // If it's a DESCRIBE query and has results, also show in panel
                if ((upperCommand.startsWith('DESCRIBE') || upperCommand.startsWith('DESC ')) && result.results && Array.isArray(result.results) && result.results.length > 0) {
                    setQueryResults({
                        results: result.results,
                        query: trimmedCommand
                    });
                }
                // Handle schema-changing queries to update UI immediately
                if (/^CREATE\s+TABLE/i.test(upperCommand)) {
                    // Extract table name from CREATE TABLE query
                    const match = trimmedCommand.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
                    if (match && match[1]) {
                        const tableName = match[1];
                        const dbId = terminalDbRef.current?.id || selectedDatabaseId;
                        if (!dbId) {
                            addLog('error', 'Error: No database selected. Use "USE <database>" first.');
                            return;
                        }
                        // Fetch table structure from PostgreSQL
                        try {
                            const describeResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/table/describe', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    database: currentDatabaseName,
                                    table: tableName
                                })
                            });
                            const describeResult = await describeResponse.json();
                            if (!describeResult.success) {
                                addLog('error', `Failed to describe table '${tableName}': ${describeResult.error || 'Unknown error'}`);
                                return;
                            }
                            if (!Array.isArray(describeResult.columns) || describeResult.columns.length === 0) {
                                addLog('warning', `Table '${tableName}' has no columns or couldn't be read`);
                                return;
                            }
                            // Convert PostgreSQL column info to our Column format
                            // describeResult.columns already includes key information from the API
                            const columns = describeResult.columns.map((col)=>{
                                const column = {
                                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                                    name: col.Field,
                                    dataType: col.Type,
                                    isPrimaryKey: col.Key === 'PRI',
                                    isNotNull: col.Null === 'NO',
                                    isUnique: col.Key === 'UNI',
                                    defaultValue: col.Default,
                                    isForeignKey: col.Key === 'MUL',
                                    isAutoIncrement: (col.Extra || '').includes('auto_increment')
                                };
                                return column;
                            });
                            // Add table to Firebase
                            const tableId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
                            const position = calculateTablePosition(dbId);
                            const newTable = {
                                id: tableId,
                                name: tableName,
                                databaseId: dbId,
                                columns,
                                position,
                                createdAt: new Date(),
                                updatedAt: new Date()
                            };
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', tableId), {
                                name: tableName,
                                databaseId: dbId,
                                columns,
                                position,
                                createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                                updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                            });
                            addLog('info', `Table '${tableName}' added to workflow`);
                            // Update React state immediately to show table in canvas
                            setTables((prevTables)=>[
                                    ...prevTables,
                                    newTable
                                ]);
                            // Ensure selectedDatabaseId matches so Firebase listener picks up future updates
                            if (selectedDatabaseId !== dbId) {
                                setSelectedDatabaseId(dbId);
                            }
                            // Log foreign key relationships
                            columns.forEach((col)=>{
                                if (col.isForeignKey && col.foreignKeyReference) {
                                    const fkTableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFKTableName"])(col.foreignKeyReference, tables);
                                    const fkColumnName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFKColumnName"])(col.foreignKeyReference, tables);
                                    if (fkTableName && fkColumnName) {
                                        addLog('info', `Foreign key linked: ${tableName}.${col.name} → ${fkTableName}.${fkColumnName}`);
                                    }
                                }
                            });
                        } catch (err) {
                            console.error('Error syncing table to Firebase:', err);
                            addLog('error', `Failed to add table to workflow: ${err instanceof Error ? err.message : 'Unknown error'}`);
                        }
                    }
                } else if (upperCommand.startsWith('ALTER TABLE')) {
                    // Handle ALTER TABLE to update columns live
                    const match = trimmedCommand.match(/ALTER\s+TABLE\s+[`"]?(\w+)[`"]?/i);
                    if (match && match[1] && selectedDatabaseId) {
                        const tableName = match[1];
                        const tableToUpdate = tables.find((t)=>t.name.toLowerCase() === tableName.toLowerCase() && t.databaseId === selectedDatabaseId);
                        if (tableToUpdate) {
                            // Fetch updated table structure from PostgreSQL
                            try {
                                const describeResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/table/describe', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        database: currentDatabaseName,
                                        table: tableName
                                    })
                                });
                                const describeResult = await describeResponse.json();
                                if (describeResult.success && Array.isArray(describeResult.columns)) {
                                    // Convert PostgreSQL column info to our Column format
                                    // IMPORTANT: Preserve original column IDs to maintain canvas integrity and relationships
                                    const updatedColumns = describeResult.columns.map((col)=>{
                                        // Find if this column existed before (match by name)
                                        const existingColumn = tableToUpdate.columns.find((c)=>c.name === col.Field);
                                        const column = {
                                            id: existingColumn?.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                                            name: col.Field,
                                            dataType: col.Type,
                                            isPrimaryKey: col.Key === 'PRI',
                                            isNotNull: col.Null === 'NO',
                                            isUnique: col.Key === 'UNI',
                                            defaultValue: col.Default,
                                            isForeignKey: col.Key === 'MUL',
                                            isAutoIncrement: (col.Extra || '').includes('auto_increment')
                                        };
                                        return column;
                                    });
                                    // Update table in Firebase
                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', tableToUpdate.id), {
                                        columns: updatedColumns,
                                        updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timestamp"].now()
                                    });
                                    addLog('info', `Table '${tableName}' structure updated in workflow`);
                                    // Log foreign key relationships
                                    updatedColumns.forEach((col)=>{
                                        if (col.isForeignKey && col.foreignKeyReference) {
                                            const fkTableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFKTableName"])(col.foreignKeyReference, tables);
                                            const fkColumnName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFKColumnName"])(col.foreignKeyReference, tables);
                                            if (fkTableName && fkColumnName) {
                                                addLog('info', `Foreign key linked: ${tableName}.${col.name} → ${fkTableName}.${fkColumnName}`);
                                            }
                                        }
                                    });
                                }
                            } catch (err) {
                                console.error('Error updating table structure:', err);
                            }
                        }
                    }
                } else if (upperCommand.startsWith('DROP TABLE')) {
                    // Extract table name from DROP TABLE query
                    const match = trimmedCommand.match(/DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
                    if (match && match[1]) {
                        const tableName = match[1];
                        // Find table with case-insensitive matching
                        const tableToDelete = tables.find((t)=>t.name.toLowerCase() === tableName.toLowerCase() && t.databaseId === selectedDatabaseId);
                        if (tableToDelete) {
                            // Delete from Firebase
                            try {
                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', tableToDelete.id));
                                if (selectedTableId === tableToDelete.id) {
                                    setSelectedTableId(null);
                                }
                                addLog('info', `Table '${tableName}' removed from workflow`);
                            } catch (err) {
                                console.error('Error removing table from Firebase:', err);
                                addLog('warning', `Failed to remove table '${tableName}' from workflow`);
                            }
                        } else {
                            addLog('info', `Table '${tableName}' not found in workflow (dropped from PostgreSQL only)`);
                        }
                        // Small delay to ensure PostgreSQL has committed the DROP
                        await new Promise((resolve)=>setTimeout(resolve, 200));
                    }
                } else if (upperCommand.startsWith('DROP DATABASE')) {
                    // Extract database name from DROP DATABASE query
                    const match = trimmedCommand.match(/DROP\s+DATABASE\s+(?:IF\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
                    if (match && match[1]) {
                        const dbName = match[1];
                        const dbToDelete = databases.find((d)=>d.name.toLowerCase() === dbName.toLowerCase());
                        if (dbToDelete) {
                            // Delete all tables in the database from Firebase
                            const tablesToDelete = tables.filter((t)=>t.databaseId === dbToDelete.id);
                            for (const table of tablesToDelete){
                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'tables', table.id));
                            }
                            // Delete database from Firebase
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'databases', dbToDelete.id));
                            if (selectedDatabaseId === dbToDelete.id) {
                                setSelectedDatabaseId(null);
                            }
                            addLog('info', `Database '${dbName}' removed from workflow`);
                        }
                    }
                } else if (upperCommand.startsWith('INSERT INTO') || upperCommand.startsWith('UPDATE') || upperCommand.startsWith('DELETE FROM')) {
                    // For data modification queries, just log success - data will be visible when queried
                    addLog('info', 'Data modified successfully');
                }
            } else {
                // Log error
                if (result.formattedOutput && Array.isArray(result.formattedOutput)) {
                    result.formattedOutput.forEach((line)=>{
                        addLog('error', line);
                    });
                } else {
                    addLog('error', result.error || 'Query execution failed');
                }
            }
        } catch (error) {
            console.error('Error executing query:', error);
            addLog('error', 'Failed to execute query. Check if PostgreSQL is running.');
        }
    }, [
        databases,
        selectedDatabaseId,
        tables,
        selectedTableId,
        addLog
    ]);
    // Handle quick SQL buttons
    const handleQuickSQL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((type)=>{
        switch(type){
            case 'CREATE':
                // If no databases exist, automatically create database
                if (databases.length === 0) {
                    handleOpenCreateDatabase();
                } else {
                    // Show choice modal
                    setIsCreateChoiceModalOpen(true);
                }
                break;
            case 'INSERT':
                setIsInsertDataModalOpen(true);
                break;
            case 'SELECT':
                setIsSelectDataModalOpen(true);
                break;
            case 'UPDATE':
                setIsUpdateDataModalOpen(true);
                break;
            case 'DELETE':
                setIsDeleteDataModalOpen(true);
                break;
            case 'DROP':
                setIsDropModalOpen(true);
                break;
        }
    }, [
        selectedDatabaseId
    ]);
    // Get selected database name
    const selectedDatabaseName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return databases.find((d)=>d.id === selectedDatabaseId)?.name || '';
    }, [
        databases,
        selectedDatabaseId
    ]);
    // Get tables for selected database
    const tablesForSelectedDb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return tables.filter((t)=>t.databaseId === selectedDatabaseId);
    }, [
        tables,
        selectedDatabaseId
    ]);
    if (authLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                animate: {
                    rotate: 360
                },
                transition: {
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                },
                className: "w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2432,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 2431,
            columnNumber: 7
        }, this);
    }
    if (!user) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0,
            y: -10
        },
        transition: {
            duration: 0.3
        },
        className: `h-screen flex flex-col ${THEMES[currentTheme]?.bg || THEMES.light.bg}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                onPresentationMode: ()=>{
                    if (selectedDatabaseId) {
                        router.push(`/presentation?db=${selectedDatabaseId}&theme=${currentTheme}`);
                    }
                },
                onTerminalMode: ()=>{
                    if (selectedDatabaseId) {
                        router.push(`/terminal-mode?db=${selectedDatabaseId}`);
                    }
                },
                onMobileMenuToggle: ()=>setIsMobileSidebarOpen(!isMobileSidebarOpen),
                onComposerToggle: ()=>setIsComposerOpen((prev)=>!prev),
                isComposerOpen: isComposerOpen,
                showModeButtons: !!selectedDatabaseId,
                theme: THEMES[currentTheme] || THEMES.light,
                selectedDatabaseName: databases.find((db)=>db.id === selectedDatabaseId)?.name
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2454,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 10
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 0.4,
                    delay: 0.1
                },
                className: "flex-1 flex overflow-hidden relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: isMobileSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    onClick: ()=>setIsMobileSidebarOpen(false),
                                    className: "md:hidden fixed inset-0 z-30 bg-black/40"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 2485,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        x: -260
                                    },
                                    animate: {
                                        x: 0
                                    },
                                    exit: {
                                        x: -260
                                    },
                                    transition: {
                                        type: 'spring',
                                        damping: 25,
                                        stiffness: 200
                                    },
                                    className: `absolute left-0 top-0 bottom-0 w-60 z-40 ${THEMES[currentTheme]?.sidebar || THEMES.light.sidebar} border-r flex flex-col h-full backdrop-blur-xl shadow-lg shadow-gray-200/10`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        databases: databases,
                                        tables: tables,
                                        allTables: allTables,
                                        selectedDatabaseId: selectedDatabaseId,
                                        selectedTableId: selectedTableId,
                                        user: user,
                                        onSelectDatabase: (dbId)=>{
                                            setSelectedDatabaseId(dbId);
                                            setIsMobileSidebarOpen(false);
                                        },
                                        onSelectTable: (tableId)=>{
                                            setSelectedTableId(tableId);
                                            setIsMobileSidebarOpen(false);
                                        },
                                        onCreateDatabase: ()=>{
                                            handleOpenCreateDatabase();
                                            setIsMobileSidebarOpen(false);
                                        },
                                        onCreateTable: ()=>{
                                            handleOpenCreateTable();
                                            setIsMobileSidebarOpen(false);
                                        },
                                        onDeleteDatabase: handleDeleteDatabase,
                                        onDeleteTable: handleDeleteTable,
                                        onQuickSQL: handleQuickSQL,
                                        onEditTable: handleEditTable,
                                        onManageForeignKeys: ()=>{
                                            setIsForeignKeyModalOpen(true);
                                            setIsMobileSidebarOpen(false);
                                        },
                                        onOpenSettings: ()=>{
                                            router.push('/settings');
                                            setIsMobileSidebarOpen(false);
                                        },
                                        onViewProfile: ()=>{
                                            router.push('/profile');
                                            setIsMobileSidebarOpen(false);
                                        },
                                        onTerminalMode: ()=>{
                                            if (selectedDatabaseId) {
                                                router.push(`/terminal-mode?db=${selectedDatabaseId}`);
                                            }
                                            setIsMobileSidebarOpen(false);
                                        },
                                        onPresentationMode: ()=>{
                                            if (selectedDatabaseId) {
                                                router.push(`/presentation?db=${selectedDatabaseId}&theme=${currentTheme}`);
                                            }
                                            setIsMobileSidebarOpen(false);
                                        },
                                        showModeButtons: !!selectedDatabaseId,
                                        onLogout: handleLogout,
                                        theme: THEMES[currentTheme] || THEMES.light
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 2501,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 2494,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 2481,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        databases: databases,
                        tables: tables,
                        allTables: allTables,
                        selectedDatabaseId: selectedDatabaseId,
                        selectedTableId: selectedTableId,
                        user: user,
                        onSelectDatabase: setSelectedDatabaseId,
                        onSelectTable: setSelectedTableId,
                        onCreateDatabase: ()=>handleOpenCreateDatabase(),
                        onCreateTable: ()=>handleOpenCreateTable(),
                        onDeleteDatabase: handleDeleteDatabase,
                        onDeleteTable: handleDeleteTable,
                        onQuickSQL: handleQuickSQL,
                        onEditTable: handleEditTable,
                        onManageForeignKeys: ()=>setIsForeignKeyModalOpen(true),
                        onOpenSettings: ()=>router.push('/settings'),
                        onViewProfile: ()=>router.push('/profile'),
                        onTerminalMode: ()=>{
                            if (selectedDatabaseId) {
                                router.push(`/terminal-mode?db=${selectedDatabaseId}`);
                            }
                        },
                        onPresentationMode: ()=>{
                            if (selectedDatabaseId) {
                                router.push(`/presentation?db=${selectedDatabaseId}&theme=${currentTheme}`);
                            }
                        },
                        showModeButtons: !!selectedDatabaseId,
                        onLogout: handleLogout,
                        theme: THEMES[currentTheme] || THEMES.light,
                        isCollapsed: isSidebarCollapsed
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 2562,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-40 hidden md:flex items-center w-0 h-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsSidebarCollapsed(!isSidebarCollapsed),
                            className: `absolute top-1/2 -translate-y-1/2 w-6 h-16 flex items-center justify-center shadow-md transition-all duration-300 z-50 cursor-pointer ${currentTheme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50'} ${isSidebarCollapsed ? 'left-0 rounded-r-md border-l-0 border-y border-r' : '-left-3 rounded-full border'}`,
                            title: isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar",
                            children: isSidebarCollapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 2611,
                                columnNumber: 35
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 2611,
                                columnNumber: 64
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 2598,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 2597,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col overflow-hidden p-2 sm:p-3 md:p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 relative",
                                ref: workflowRef,
                                children: [
                                    selectedDatabaseId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            scale: 0.98
                                        },
                                        animate: {
                                            opacity: 1,
                                            scale: 1
                                        },
                                        transition: {
                                            duration: 0.3
                                        },
                                        className: "h-full rounded-xl overflow-hidden border border-gray-200 bg-white",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__["default"], {
                                            nodes: nodes,
                                            edges: edges,
                                            onNodesChange: onNodesChange,
                                            onNodeDragStop: onNodeDragStop,
                                            nodeTypes: nodeTypes,
                                            edgeTypes: edgeTypes,
                                            onInit: setReactFlowInstance,
                                            fitViewOptions: {
                                                padding: 0.2
                                            },
                                            defaultViewport: {
                                                x: 0,
                                                y: 0,
                                                zoom: 0.75
                                            },
                                            proOptions: {
                                                hideAttribution: true
                                            },
                                            className: THEMES[currentTheme]?.bg || THEMES.light.bg,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "data-html2canvas-ignore": "true",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Controls"], {
                                                    className: "bg-white border border-gray-200 rounded-lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 2642,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 2641,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 2626,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 2620,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `h-full flex items-center justify-center rounded-2xl ${THEMES[currentTheme]?.bg || THEMES.light.bg}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: 20
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            transition: {
                                                duration: 0.4,
                                                ease: [
                                                    0.25,
                                                    0.46,
                                                    0.45,
                                                    0.94
                                                ]
                                            },
                                            className: "text-center max-w-lg mx-auto px-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        scale: 0.9
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        scale: 1
                                                    },
                                                    transition: {
                                                        duration: 0.35,
                                                        delay: 0.05
                                                    },
                                                    className: `w-14 h-14 ${currentTheme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-200'} border rounded-xl flex items-center justify-center mx-auto mb-6`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: `w-6 h-6 ${currentTheme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`,
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        strokeWidth: 1.5,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 2670,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                                        lineNumber: 2663,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 2657,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h2, {
                                                    initial: {
                                                        opacity: 0
                                                    },
                                                    animate: {
                                                        opacity: 1
                                                    },
                                                    transition: {
                                                        delay: 0.1
                                                    },
                                                    className: `text-2xl font-light ${THEMES[currentTheme]?.text || 'text-gray-900'} mb-3`,
                                                    style: {
                                                        fontFamily: 'var(--font-geist-sans)',
                                                        letterSpacing: '-0.01em'
                                                    },
                                                    children: "Design your database"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 2679,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                                    initial: {
                                                        opacity: 0
                                                    },
                                                    animate: {
                                                        opacity: 1
                                                    },
                                                    transition: {
                                                        delay: 0.15
                                                    },
                                                    className: `text-sm ${THEMES[currentTheme]?.textSecondary || 'text-gray-500'} mb-8 max-w-sm mx-auto leading-relaxed`,
                                                    style: {
                                                        fontFamily: 'var(--font-geist-sans)'
                                                    },
                                                    children: "Create tables, define columns, and set up relationships visually. Select a database from the sidebar or create a new one."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 2690,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                    initial: {
                                                        opacity: 0,
                                                        y: 8
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0
                                                    },
                                                    transition: {
                                                        delay: 0.2,
                                                        duration: 0.3
                                                    },
                                                    whileHover: {
                                                        scale: 1.02
                                                    },
                                                    whileTap: {
                                                        scale: 0.98
                                                    },
                                                    onClick: ()=>handleOpenCreateDatabase(),
                                                    className: `inline-flex items-center gap-2 px-5 py-2.5 ${currentTheme === 'dark' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'} rounded-lg transition-colors text-sm font-medium`,
                                                    style: {
                                                        fontFamily: 'var(--font-geist-sans)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            strokeWidth: 2,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                d: "M12 4v16m8-8H4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                                lineNumber: 2712,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 2711,
                                                            columnNumber: 21
                                                        }, this),
                                                        "New database"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 2701,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                                    initial: {
                                                        opacity: 0
                                                    },
                                                    animate: {
                                                        opacity: 1
                                                    },
                                                    transition: {
                                                        delay: 0.3
                                                    },
                                                    className: `text-xs ${currentTheme === 'dark' ? 'text-slate-500' : 'text-gray-400'} mt-4`,
                                                    style: {
                                                        fontFamily: 'var(--font-geist-sans)'
                                                    },
                                                    children: "or select from the sidebar"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 2718,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 2650,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 2649,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: selectedDatabaseId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                x: 20
                                            },
                                            animate: {
                                                opacity: 1,
                                                x: 0
                                            },
                                            exit: {
                                                opacity: 0,
                                                x: 20
                                            },
                                            transition: {
                                                duration: 0.3
                                            },
                                            className: "absolute top-8 right-8 space-y-3 z-10",
                                            "data-html2canvas-ignore": "true",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        scale: 0.9
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        scale: 1
                                                    },
                                                    transition: {
                                                        delay: 0.1
                                                    },
                                                    className: `${currentTheme === 'dark' ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-gray-300'} backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-md border`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: `text-[13px] ${THEMES[currentTheme]?.textSecondary || 'text-gray-600'}`,
                                                        style: {
                                                            fontFamily: 'var(--font-geist-sans)'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `font-medium ${THEMES[currentTheme]?.text || 'text-gray-900'}`,
                                                                children: selectedDatabaseName
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                                lineNumber: 2749,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "mx-1.5",
                                                                children: "·"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                                lineNumber: 2752,
                                                                columnNumber: 23
                                                            }, this),
                                                            tablesForSelectedDb.length,
                                                            " ",
                                                            tablesForSelectedDb.length === 1 ? 'table' : 'tables'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                                        lineNumber: 2748,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 2742,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                    initial: {
                                                        opacity: 0,
                                                        scale: 0.9
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        scale: 1
                                                    },
                                                    transition: {
                                                        delay: 0.15
                                                    },
                                                    whileHover: {
                                                        scale: 1.02,
                                                        y: -1
                                                    },
                                                    whileTap: {
                                                        scale: 0.98
                                                    },
                                                    onClick: ()=>setIsExportModalOpen(true),
                                                    className: "w-full bg-black hover:bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-md text-[13px] flex items-center justify-center gap-2 transition-colors",
                                                    style: {
                                                        fontFamily: 'var(--font-geist-sans)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                                lineNumber: 2769,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 2768,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Export"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 2758,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                    initial: {
                                                        opacity: 0,
                                                        scale: 0.9
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        scale: 1
                                                    },
                                                    transition: {
                                                        delay: 0.2
                                                    },
                                                    whileHover: {
                                                        scale: 1.02,
                                                        y: -1
                                                    },
                                                    whileTap: {
                                                        scale: 0.98
                                                    },
                                                    onClick: ()=>setIsImportModalOpen(true),
                                                    className: "w-full bg-black hover:bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-md text-[13px] flex items-center justify-center gap-2 transition-colors",
                                                    style: {
                                                        fontFamily: 'var(--font-geist-sans)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 2785,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Import"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 2775,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 2734,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 2732,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: queryResults && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QueryResultsPanel, {
                                            results: queryResults.results,
                                            query: queryResults.query,
                                            onClose: ()=>setQueryResults(null)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 2795,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 2793,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 2618,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Terminal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                logs: terminalLogs,
                                onCommand: handleTerminalCommand,
                                isMinimized: isTerminalMinimized,
                                onToggleMinimize: ()=>setIsTerminalMinimized(!isTerminalMinimized)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 2805,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 2616,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2474,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CreateChoiceModal, {
                isOpen: isCreateChoiceModalOpen,
                onClose: ()=>setIsCreateChoiceModalOpen(false),
                onChoose: (choice)=>{
                    if (choice === 'database') {
                        handleOpenCreateDatabase();
                    } else {
                        handleOpenCreateTable();
                    }
                },
                hasSelectedDatabase: !!selectedDatabaseId,
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2817,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CreateDatabaseModal, {
                isOpen: isCreateDbModalOpen,
                onClose: ()=>setIsCreateDbModalOpen(false),
                onCreate: handleCreateDatabase,
                existingNames: databases.map((d)=>d.name),
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2832,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CreateTableModal, {
                isOpen: isCreateTableModalOpen,
                onClose: ()=>setIsCreateTableModalOpen(false),
                onCreate: handleCreateTable,
                existingTables: tablesForSelectedDb,
                databaseName: selectedDatabaseName,
                onInsertData: handleInsertData,
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2841,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EditTableModal, {
                isOpen: isEditTableModalOpen,
                onClose: ()=>{
                    setIsEditTableModalOpen(false);
                    setEditingTableId(null);
                },
                table: tables.find((t)=>t.id === editingTableId) || null,
                onUpdate: handleUpdateTable,
                existingTables: tablesForSelectedDb,
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2852,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InsertDataModal, {
                isOpen: isInsertDataModalOpen,
                onClose: ()=>setIsInsertDataModalOpen(false),
                databases: databases,
                tables: tables,
                selectedDatabaseId: selectedDatabaseId,
                userId: user?.uid,
                onInsert: handleInsertData,
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2865,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UpdateDataModal, {
                isOpen: isUpdateDataModalOpen,
                onClose: ()=>setIsUpdateDataModalOpen(false),
                databases: databases,
                tables: tables,
                selectedDatabaseId: selectedDatabaseId,
                userId: user?.uid,
                onExecuteQuery: executeQuery,
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2877,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DeleteDataModal, {
                isOpen: isDeleteDataModalOpen,
                onClose: ()=>setIsDeleteDataModalOpen(false),
                databases: databases,
                tables: tables,
                selectedDatabaseId: selectedDatabaseId,
                userId: user?.uid,
                onExecuteQuery: executeQuery,
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2889,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectDataModal, {
                isOpen: isSelectDataModalOpen,
                onClose: ()=>setIsSelectDataModalOpen(false),
                databases: databases,
                tables: tables,
                selectedDatabaseId: selectedDatabaseId,
                userId: user?.uid,
                onExecuteQuery: executeQuery,
                onShowResults: (results, query)=>{
                    setQueryResults({
                        results,
                        query
                    });
                },
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2901,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DropModal, {
                isOpen: isDropModalOpen,
                onClose: ()=>setIsDropModalOpen(false),
                databases: databases,
                tables: allTables,
                selectedDatabaseId: selectedDatabaseId,
                userId: user?.uid,
                onDropDatabase: handleDeleteDatabase,
                onDropTable: handleDropTable,
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2916,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ForeignKeyModal, {
                isOpen: isForeignKeyModalOpen,
                onClose: ()=>setIsForeignKeyModalOpen(false),
                tables: tablesForSelectedDb,
                onAddForeignKey: handleAddForeignKey,
                onRemoveForeignKey: handleRemoveForeignKey,
                databaseName: selectedDatabaseName,
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2929,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ExportModal, {
                isOpen: isExportModalOpen,
                onClose: ()=>setIsExportModalOpen(false),
                databaseName: selectedDatabaseName,
                tables: tablesForSelectedDb,
                workflowRef: workflowRef,
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2940,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ImportModal, {
                isOpen: isImportModalOpen,
                onClose: ()=>setIsImportModalOpen(false),
                onImport: handleSQLImport,
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2950,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UpgradePlanModal, {
                isOpen: isUpgradeModalOpen,
                onClose: ()=>setIsUpgradeModalOpen(false),
                reason: upgradeReason,
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2958,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$database$2f$DBComposer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isComposerOpen,
                onClose: ()=>setIsComposerOpen(false),
                onOpen: ()=>setIsComposerOpen(true),
                userId: user?.uid,
                databases: databases,
                tables: tables,
                selectedDatabaseId: selectedDatabaseId,
                setSelectedDatabaseId: setSelectedDatabaseId,
                addLog: addLog,
                viewportCenter: viewportCenter,
                onActionsExecuted: handleActionsExecuted,
                theme: THEMES[currentTheme] || THEMES.light
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 2967,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/page.tsx",
        lineNumber: 2446,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8ac5e42c._.js.map