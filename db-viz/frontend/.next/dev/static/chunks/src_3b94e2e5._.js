(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/common/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
'use client';
;
;
function Button({ variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, children, className = '', disabled, ...props }) {
    const baseStyles = 'inline-flex items-center justify-center font-light rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const fontFamily = {
        fontFamily: 'var(--font-geist-sans)'
    };
    const variantStyles = {
        primary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400 border border-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400'
    };
    const sizeStyles = {
        sm: 'px-3 sm:px-4 py-2.5 sm:py-2 text-sm min-h-[40px] sm:min-h-0 gap-1.5',
        md: 'px-4 sm:px-5 py-3 sm:py-2.5 text-sm sm:text-base min-h-[44px] sm:min-h-0 gap-2',
        lg: 'px-5 sm:px-7 py-3.5 sm:py-3.5 text-base sm:text-lg min-h-[44px] sm:min-h-0 gap-2.5'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        whileHover: {
            scale: disabled ? 1 : 1.02,
            y: disabled ? 0 : -1
        },
        whileTap: {
            scale: disabled ? 1 : 0.98
        },
        className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`,
        style: fontFamily,
        disabled: disabled || isLoading,
        ...props,
        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "animate-spin h-5 w-5",
            viewBox: "0 0 24 24",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/Button.tsx",
                    lineNumber: 53,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/Button.tsx",
                    lineNumber: 62,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/common/Button.tsx",
            lineNumber: 52,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                leftIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: leftIcon
                }, void 0, false, {
                    fileName: "[project]/src/components/common/Button.tsx",
                    lineNumber: 70,
                    columnNumber: 24
                }, this),
                children,
                rightIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: rightIcon
                }, void 0, false, {
                    fileName: "[project]/src/components/common/Button.tsx",
                    lineNumber: 72,
                    columnNumber: 25
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/components/common/Button.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/types/database.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Database Types (PostgreSQL)
__turbopack_context__.s([
    "DATA_TYPES",
    ()=>DATA_TYPES,
    "NUMERIC_TYPES",
    ()=>NUMERIC_TYPES,
    "areTypesCompatible",
    ()=>areTypesCompatible
]);
const DATA_TYPES = [
    'INT',
    'BIGINT',
    'SMALLINT',
    'TINYINT',
    'FLOAT',
    'DOUBLE',
    'DECIMAL',
    'VARCHAR',
    'CHAR',
    'TEXT',
    'LONGTEXT',
    'DATE',
    'DATETIME',
    'TIMESTAMP',
    'TIME',
    'YEAR',
    'BOOLEAN',
    'BLOB',
    'JSON'
];
const NUMERIC_TYPES = [
    'INT',
    'BIGINT',
    'SMALLINT',
    'TINYINT'
];
function areTypesCompatible(sourceType, targetType) {
    if (sourceType === targetType) return true;
    // Numeric types are compatible with each other
    if (NUMERIC_TYPES.includes(sourceType) && NUMERIC_TYPES.includes(targetType)) {
        return true;
    }
    // String types compatibility
    if ([
        'VARCHAR',
        'CHAR',
        'TEXT'
    ].includes(sourceType) && [
        'VARCHAR',
        'CHAR',
        'TEXT'
    ].includes(targetType)) {
        return true;
    }
    return false;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/database/ForeignKeyModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ForeignKeyModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link.js [app-client] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$unlink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/unlink.js [app-client] (ecmascript) <export default as Unlink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$database$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/database.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fk-helpers.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function ForeignKeyModal({ isOpen, onClose, tables, onAddForeignKey, onRemoveForeignKey, databaseName, theme }) {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('add');
    const [sourceTableId, setSourceTableId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sourceColumnId, setSourceColumnId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [targetTableId, setTargetTableId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [targetColumnId, setTargetColumnId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Reset form when modal opens/closes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ForeignKeyModal.useEffect": ()=>{
            if (isOpen) {
                setSourceTableId('');
                setSourceColumnId('');
                setTargetTableId('');
                setTargetColumnId('');
                setError(null);
                setSuccess(null);
            }
        }
    }["ForeignKeyModal.useEffect"], [
        isOpen
    ]);
    // Reset column selections when table changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ForeignKeyModal.useEffect": ()=>{
            setSourceColumnId('');
        }
    }["ForeignKeyModal.useEffect"], [
        sourceTableId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ForeignKeyModal.useEffect": ()=>{
            setTargetColumnId('');
        }
    }["ForeignKeyModal.useEffect"], [
        targetTableId
    ]);
    // Get source table columns (excluding existing foreign keys in add mode)
    const sourceColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ForeignKeyModal.useMemo[sourceColumns]": ()=>{
            const table = tables.find({
                "ForeignKeyModal.useMemo[sourceColumns].table": (t)=>t.id === sourceTableId
            }["ForeignKeyModal.useMemo[sourceColumns].table"]);
            if (!table) return [];
            if (mode === 'add') {
                // Filter out columns that are already foreign keys
                return table.columns.filter({
                    "ForeignKeyModal.useMemo[sourceColumns]": (c)=>!c.isForeignKey
                }["ForeignKeyModal.useMemo[sourceColumns]"]);
            } else {
                // For remove mode, show only foreign key columns
                return table.columns.filter({
                    "ForeignKeyModal.useMemo[sourceColumns]": (c)=>c.isForeignKey
                }["ForeignKeyModal.useMemo[sourceColumns]"]);
            }
        }
    }["ForeignKeyModal.useMemo[sourceColumns]"], [
        tables,
        sourceTableId,
        mode
    ]);
    // Get target table columns (only primary keys for FK reference)
    const targetColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ForeignKeyModal.useMemo[targetColumns]": ()=>{
            const table = tables.find({
                "ForeignKeyModal.useMemo[targetColumns].table": (t)=>t.id === targetTableId
            }["ForeignKeyModal.useMemo[targetColumns].table"]);
            if (!table) return [];
            return table.columns.filter({
                "ForeignKeyModal.useMemo[targetColumns]": (c)=>c.isPrimaryKey
            }["ForeignKeyModal.useMemo[targetColumns]"]);
        }
    }["ForeignKeyModal.useMemo[targetColumns]"], [
        tables,
        targetTableId
    ]);
    // Get existing foreign keys for display
    const existingForeignKeys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ForeignKeyModal.useMemo[existingForeignKeys]": ()=>{
            const fks = [];
            tables.forEach({
                "ForeignKeyModal.useMemo[existingForeignKeys]": (table)=>{
                    table.columns.forEach({
                        "ForeignKeyModal.useMemo[existingForeignKeys]": (column)=>{
                            if (column.isForeignKey && column.foreignKeyReference) {
                                const targetTable = tables.find({
                                    "ForeignKeyModal.useMemo[existingForeignKeys].targetTable": (t)=>t.id === column.foreignKeyReference?.tableId
                                }["ForeignKeyModal.useMemo[existingForeignKeys].targetTable"]);
                                const targetColumn = targetTable?.columns.find({
                                    "ForeignKeyModal.useMemo[existingForeignKeys]": (c)=>c.id === column.foreignKeyReference?.columnId
                                }["ForeignKeyModal.useMemo[existingForeignKeys]"]);
                                fks.push({
                                    sourceTable: table,
                                    sourceColumn: column,
                                    targetTable,
                                    targetColumn
                                });
                            }
                        }
                    }["ForeignKeyModal.useMemo[existingForeignKeys]"]);
                }
            }["ForeignKeyModal.useMemo[existingForeignKeys]"]);
            return fks;
        }
    }["ForeignKeyModal.useMemo[existingForeignKeys]"], [
        tables
    ]);
    // Validate type compatibility
    const isTypeCompatible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ForeignKeyModal.useMemo[isTypeCompatible]": ()=>{
            if (!sourceColumnId || !targetColumnId) return true;
            const sourceTable = tables.find({
                "ForeignKeyModal.useMemo[isTypeCompatible].sourceTable": (t)=>t.id === sourceTableId
            }["ForeignKeyModal.useMemo[isTypeCompatible].sourceTable"]);
            const targetTable = tables.find({
                "ForeignKeyModal.useMemo[isTypeCompatible].targetTable": (t)=>t.id === targetTableId
            }["ForeignKeyModal.useMemo[isTypeCompatible].targetTable"]);
            const sourceColumn = sourceTable?.columns.find({
                "ForeignKeyModal.useMemo[isTypeCompatible]": (c)=>c.id === sourceColumnId
            }["ForeignKeyModal.useMemo[isTypeCompatible]"]);
            const targetColumn = targetTable?.columns.find({
                "ForeignKeyModal.useMemo[isTypeCompatible]": (c)=>c.id === targetColumnId
            }["ForeignKeyModal.useMemo[isTypeCompatible]"]);
            if (!sourceColumn || !targetColumn) return true;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$database$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["areTypesCompatible"])(sourceColumn.dataType, targetColumn.dataType);
        }
    }["ForeignKeyModal.useMemo[isTypeCompatible]"], [
        tables,
        sourceTableId,
        sourceColumnId,
        targetTableId,
        targetColumnId
    ]);
    const handleAddForeignKey = async ()=>{
        if (!sourceTableId || !sourceColumnId || !targetTableId || !targetColumnId) {
            setError('Please select all required fields');
            return;
        }
        if (!isTypeCompatible) {
            setError('Data types are not compatible');
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await onAddForeignKey(sourceTableId, sourceColumnId, targetTableId, targetColumnId);
            const sourceTable = tables.find((t)=>t.id === sourceTableId);
            const sourceColumn = sourceTable?.columns.find((c)=>c.id === sourceColumnId);
            const targetTable = tables.find((t)=>t.id === targetTableId);
            const targetColumn = targetTable?.columns.find((c)=>c.id === targetColumnId);
            setSuccess(`Foreign key added: ${sourceTable?.name}.${sourceColumn?.name} → ${targetTable?.name}.${targetColumn?.name}`);
            // Reset selections after success
            setSourceTableId('');
            setSourceColumnId('');
            setTargetTableId('');
            setTargetColumnId('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add foreign key');
        } finally{
            setIsLoading(false);
        }
    };
    const handleRemoveForeignKey = async ()=>{
        if (!sourceTableId || !sourceColumnId) {
            setError('Please select a table and column');
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await onRemoveForeignKey(sourceTableId, sourceColumnId);
            const sourceTable = tables.find((t)=>t.id === sourceTableId);
            const sourceColumn = sourceTable?.columns.find((c)=>c.id === sourceColumnId);
            setSuccess(`Foreign key removed from ${sourceTable?.name}.${sourceColumn?.name}`);
            // Reset selections after success
            setSourceTableId('');
            setSourceColumnId('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to remove foreign key');
        } finally{
            setIsLoading(false);
        }
    };
    const handleClose = ()=>{
        setSourceTableId('');
        setSourceColumnId('');
        setTargetTableId('');
        setTargetColumnId('');
        setError(null);
        setSuccess(null);
        setMode('add');
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto py-8",
            onClick: handleClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scale: 0.9,
                    opacity: 0
                },
                animate: {
                    scale: 1,
                    opacity: 1
                },
                exit: {
                    scale: 0.9,
                    opacity: 0
                },
                transition: {
                    type: 'spring',
                    damping: 25,
                    stiffness: 300
                },
                className: `${theme?.modal || 'bg-white'} rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden`,
                onClick: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center justify-between p-4 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-10 h-10 ${theme?.buttonSecondary || 'bg-gray-100'} rounded-lg flex items-center justify-center`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                                            className: `w-5 h-5 ${theme?.text || 'text-gray-700'}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                            lineNumber: 232,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                        lineNumber: 231,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: `text-lg font-semibold ${theme?.text || 'text-black'}`,
                                                children: "Manage Foreign Keys"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 235,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-sm ${theme?.textSecondary || 'text-gray-600'}`,
                                                children: [
                                                    "in ",
                                                    databaseName
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 238,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                        lineNumber: 234,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                lineNumber: 230,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileHover: {
                                    scale: 1.1
                                },
                                whileTap: {
                                    scale: 0.9
                                },
                                onClick: handleClose,
                                className: `p-2 rounded-lg ${theme?.buttonSecondary || 'hover:bg-gray-100'} transition-colors`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: `w-5 h-5 ${theme?.textSecondary || 'text-gray-600'}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                    lineNumber: 247,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                lineNumber: 241,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                        lineNumber: 229,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-4 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setMode('add');
                                        setSourceTableId('');
                                        setSourceColumnId('');
                                        setTargetTableId('');
                                        setTargetColumnId('');
                                        setError(null);
                                        setSuccess(null);
                                    },
                                    className: `flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${mode === 'add' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                            lineNumber: 269,
                                            columnNumber: 19
                                        }, this),
                                        "Add Foreign Key"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                    lineNumber: 254,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setMode('remove');
                                        setSourceTableId('');
                                        setSourceColumnId('');
                                        setTargetTableId('');
                                        setTargetColumnId('');
                                        setError(null);
                                        setSuccess(null);
                                    },
                                    className: `flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${mode === 'remove' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$unlink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlink$3e$__["Unlink"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                            lineNumber: 287,
                                            columnNumber: 19
                                        }, this),
                                        "Remove Foreign Key"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                    lineNumber: 272,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                            lineNumber: 253,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                        lineNumber: 252,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 space-y-4 max-h-[60vh] overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: [
                                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: -10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        exit: {
                                            opacity: 0,
                                            y: -10
                                        },
                                        className: "flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                className: "w-4 h-4 shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 304,
                                                columnNumber: 21
                                            }, this),
                                            error
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                        lineNumber: 298,
                                        columnNumber: 19
                                    }, this),
                                    success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: -10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        exit: {
                                            opacity: 0,
                                            y: -10
                                        },
                                        className: "flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "w-4 h-4 shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 315,
                                                columnNumber: 21
                                            }, this),
                                            success
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                        lineNumber: 309,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                lineNumber: 296,
                                columnNumber: 15
                            }, this),
                            tables.length < 2 && mode === 'add' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        className: "w-4 h-4 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                        lineNumber: 323,
                                        columnNumber: 19
                                    }, this),
                                    "You need at least 2 tables to create a foreign key relationship."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                lineNumber: 322,
                                columnNumber: 17
                            }, this),
                            mode === 'add' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: `block text-sm font-medium ${theme?.text || 'text-gray-700'} mb-2`,
                                                children: "Source Table (where FK will be added)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 332,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: sourceTableId,
                                                onChange: (e)=>setSourceTableId(e.target.value),
                                                className: "w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-gray-500 focus:border-gray-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select source table..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 23
                                                    }, this),
                                                    tables.map((table)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: table.id,
                                                            children: [
                                                                table.name,
                                                                " (",
                                                                table.columns.length,
                                                                " columns)"
                                                            ]
                                                        }, table.id, true, {
                                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 25
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 335,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                        lineNumber: 331,
                                        columnNumber: 19
                                    }, this),
                                    sourceTableId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: -10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: "Source Column (to be foreign key)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 355,
                                                columnNumber: 23
                                            }, this),
                                            sourceColumns.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-500 p-3 bg-gray-50 rounded-lg",
                                                children: "No available columns. All columns may already be foreign keys."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 359,
                                                columnNumber: 25
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: sourceColumnId,
                                                onChange: (e)=>setSourceColumnId(e.target.value),
                                                className: "w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-gray-500 focus:border-gray-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select source column..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                        lineNumber: 368,
                                                        columnNumber: 27
                                                    }, this),
                                                    sourceColumns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: column.id,
                                                            children: [
                                                                column.name,
                                                                " (",
                                                                column.dataType,
                                                                ")",
                                                                column.isPrimaryKey ? ' [PK]' : ''
                                                            ]
                                                        }, column.id, true, {
                                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                            lineNumber: 370,
                                                            columnNumber: 29
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 363,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                        lineNumber: 351,
                                        columnNumber: 21
                                    }, this),
                                    sourceColumnId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center py-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-gray-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-8 h-0.5 bg-gray-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                    lineNumber: 384,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                    lineNumber: 385,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-8 h-0.5 bg-gray-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                    lineNumber: 386,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                            lineNumber: 383,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                        lineNumber: 382,
                                        columnNumber: 21
                                    }, this),
                                    sourceColumnId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: -10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: "Target Table (referenced table)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 397,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: targetTableId,
                                                onChange: (e)=>setTargetTableId(e.target.value),
                                                className: "w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-gray-500 focus:border-gray-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select target table..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                        lineNumber: 405,
                                                        columnNumber: 25
                                                    }, this),
                                                    tables.filter((t)=>t.id !== sourceTableId).filter((t)=>t.columns.some((c)=>c.isPrimaryKey)).map((table)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: table.id,
                                                            children: [
                                                                table.name,
                                                                " (",
                                                                table.columns.filter((c)=>c.isPrimaryKey).length,
                                                                " PK)"
                                                            ]
                                                        }, table.id, true, {
                                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                            lineNumber: 410,
                                                            columnNumber: 29
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 400,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                        lineNumber: 393,
                                        columnNumber: 21
                                    }, this),
                                    targetTableId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: -10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: "Target Column (primary key to reference)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 424,
                                                columnNumber: 23
                                            }, this),
                                            targetColumns.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-500 p-3 bg-gray-50 rounded-lg",
                                                children: "No primary key columns found in this table."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 428,
                                                columnNumber: 25
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: targetColumnId,
                                                onChange: (e)=>setTargetColumnId(e.target.value),
                                                className: `w-full px-3 py-2.5 rounded-lg border text-sm bg-white text-black focus:ring-2 focus:ring-gray-500 focus:border-gray-500 ${!isTypeCompatible ? 'border-red-500' : 'border-gray-300'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select target column..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                        lineNumber: 438,
                                                        columnNumber: 27
                                                    }, this),
                                                    targetColumns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: column.id,
                                                            children: [
                                                                column.name,
                                                                " (",
                                                                column.dataType,
                                                                ") [PK]"
                                                            ]
                                                        }, column.id, true, {
                                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                            lineNumber: 440,
                                                            columnNumber: 29
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 432,
                                                columnNumber: 25
                                            }, this),
                                            !isTypeCompatible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-red-500 mt-1",
                                                children: "Data types are not compatible. Source and target must have compatible types."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 447,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                        lineNumber: 420,
                                        columnNumber: 21
                                    }, this),
                                    sourceTableId && sourceColumnId && targetTableId && targetColumnId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        className: "p-4 bg-gray-50 rounded-lg border border-gray-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-gray-800 mb-2",
                                                children: "Relationship Preview:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 461,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-center gap-3 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-3 py-2 bg-white rounded-lg border border-gray-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-gray-700",
                                                                children: tables.find((t)=>t.id === sourceTableId)?.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                                lineNumber: 466,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-600",
                                                                children: [
                                                                    ".",
                                                                    tables.find((t)=>t.id === sourceTableId)?.columns.find((c)=>c.id === sourceColumnId)?.name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                                lineNumber: 469,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                        lineNumber: 465,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        className: "w-5 h-5 text-gray-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                        lineNumber: 473,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-3 py-2 bg-white rounded-lg border border-gray-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-gray-700",
                                                                children: tables.find((t)=>t.id === targetTableId)?.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                                lineNumber: 475,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-600",
                                                                children: [
                                                                    ".",
                                                                    tables.find((t)=>t.id === targetTableId)?.columns.find((c)=>c.id === targetColumnId)?.name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                                lineNumber: 478,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                        lineNumber: 474,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                lineNumber: 464,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                        lineNumber: 456,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: existingForeignKeys.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$unlink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlink$3e$__["Unlink"], {
                                            className: "w-12 h-12 mx-auto text-gray-400 mb-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                            lineNumber: 491,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: "No foreign keys to remove"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                            lineNumber: 492,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 mt-1",
                                            children: "Create some foreign key relationships first"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                            lineNumber: 493,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                    lineNumber: 490,
                                    columnNumber: 21
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                    children: "Select Table"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                    lineNumber: 501,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: sourceTableId,
                                                    onChange: (e)=>setSourceTableId(e.target.value),
                                                    className: "w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-red-500 focus:border-red-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Select table..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                            lineNumber: 509,
                                                            columnNumber: 27
                                                        }, this),
                                                        tables.filter((t)=>t.columns.some((c)=>c.isForeignKey)).map((table)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: table.id,
                                                                children: [
                                                                    table.name,
                                                                    " (",
                                                                    table.columns.filter((c)=>c.isForeignKey).length,
                                                                    " FK)"
                                                                ]
                                                            }, table.id, true, {
                                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                                lineNumber: 513,
                                                                columnNumber: 31
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                    lineNumber: 504,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                            lineNumber: 500,
                                            columnNumber: 23
                                        }, this),
                                        sourceTableId && sourceColumns.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: -10
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                    children: "Select Foreign Key to Remove"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                    lineNumber: 526,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: sourceColumnId,
                                                    onChange: (e)=>setSourceColumnId(e.target.value),
                                                    className: "w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-red-500 focus:border-red-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Select foreign key column..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                            lineNumber: 534,
                                                            columnNumber: 29
                                                        }, this),
                                                        sourceColumns.map((column)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: column.id,
                                                                children: [
                                                                    column.name,
                                                                    " → ",
                                                                    column.foreignKeyReference ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFKDisplay"])(column.foreignKeyReference, tables) : 'Unknown'
                                                                ]
                                                            }, column.id, true, {
                                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                                lineNumber: 536,
                                                                columnNumber: 31
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                    lineNumber: 529,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                            lineNumber: 522,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                    children: "Existing Foreign Keys"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                    lineNumber: 546,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2 max-h-48 overflow-y-auto",
                                                    children: existingForeignKeys.map((fk, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                                                                        className: "w-4 h-4 text-gray-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                                        lineNumber: 556,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium text-gray-700",
                                                                        children: [
                                                                            fk.sourceTable.name,
                                                                            ".",
                                                                            fk.sourceColumn.name
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                                        lineNumber: 557,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                        className: "w-4 h-4 text-gray-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                                        lineNumber: 560,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-600",
                                                                        children: [
                                                                            fk.targetTable?.name,
                                                                            ".",
                                                                            fk.targetColumn?.name
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                                        lineNumber: 561,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                                lineNumber: 555,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, index, false, {
                                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                            lineNumber: 551,
                                                            columnNumber: 29
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                            lineNumber: 545,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                        lineNumber: 294,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center justify-end gap-3 p-4 border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'} ${theme?.buttonSecondary || 'bg-gray-50'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                variant: "secondary",
                                onClick: handleClose,
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                lineNumber: 577,
                                columnNumber: 15
                            }, this),
                            mode === 'add' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onClick: handleAddForeignKey,
                                isLoading: isLoading,
                                disabled: !sourceTableId || !sourceColumnId || !targetTableId || !targetColumnId || !isTypeCompatible,
                                className: "bg-gray-900 hover:bg-gray-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                        lineNumber: 593,
                                        columnNumber: 19
                                    }, this),
                                    "Add Foreign Key"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                lineNumber: 581,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onClick: handleRemoveForeignKey,
                                isLoading: isLoading,
                                disabled: !sourceTableId || !sourceColumnId,
                                className: "bg-red-600 hover:bg-red-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$unlink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlink$3e$__["Unlink"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                        lineNumber: 603,
                                        columnNumber: 19
                                    }, this),
                                    "Remove Foreign Key"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                                lineNumber: 597,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                        lineNumber: 576,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
                lineNumber: 220,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
            lineNumber: 213,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/database/ForeignKeyModal.tsx",
        lineNumber: 211,
        columnNumber: 5
    }, this);
}
_s(ForeignKeyModal, "ciz5BuPp4KDnbdfQO2N9tPU8JOw=");
_c = ForeignKeyModal;
var _c;
__turbopack_context__.k.register(_c, "ForeignKeyModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/database/ForeignKeyModal.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/database/ForeignKeyModal.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_3b94e2e5._.js.map