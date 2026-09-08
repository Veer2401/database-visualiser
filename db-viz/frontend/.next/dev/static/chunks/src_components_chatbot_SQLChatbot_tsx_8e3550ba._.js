(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/chatbot/SQLChatbot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SQLChatbot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$database$2f$DBComposer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/database/DBComposer.tsx [app-client] (ecmascript)");
'use client';
;
;
function SQLChatbot(props) {
    // If full DBComposer props are provided, render DBComposer
    if (props.databases && props.addLog && props.setSelectedDatabaseId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$database$2f$DBComposer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            isOpen: props.isOpen ?? false,
            onClose: props.onClose ?? (()=>{}),
            userId: props.userId,
            databases: props.databases,
            tables: props.tables || [],
            selectedDatabaseId: props.selectedDatabaseId ?? null,
            setSelectedDatabaseId: props.setSelectedDatabaseId,
            addLog: props.addLog,
            theme: props.theme
        }, void 0, false, {
            fileName: "[project]/src/components/chatbot/SQLChatbot.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this);
    }
    // Fallback: render nothing (DBComposer is managed directly by page.tsx)
    return null;
}
_c = SQLChatbot;
var _c;
__turbopack_context__.k.register(_c, "SQLChatbot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/chatbot/SQLChatbot.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/chatbot/SQLChatbot.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_chatbot_SQLChatbot_tsx_8e3550ba._.js.map