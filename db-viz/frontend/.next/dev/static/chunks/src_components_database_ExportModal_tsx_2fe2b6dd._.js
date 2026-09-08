(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/database/ExportModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExportModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileImage$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-image.js [app-client] (ecmascript) <export default as FileImage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileType$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-type.js [app-client] (ecmascript) <export default as FileType>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fk-helpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$to$2d$image$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html-to-image/es/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/docx/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$file$2d$saver$2f$dist$2f$FileSaver$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/file-saver/dist/FileSaver.min.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function ExportModal({ isOpen, onClose, databaseName, tables, workflowRef, theme }) {
    _s();
    const [isExporting, setIsExporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [exportSuccess, setExportSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const exportOptions = [
        {
            type: 'pdf',
            label: 'PDF Document',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
            color: 'bg-black hover:bg-gray-900'
        },
        {
            type: 'word',
            label: 'Word Document',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileType$3e$__["FileType"],
            color: 'bg-black hover:bg-gray-900'
        },
        {
            type: 'png',
            label: 'PNG Image',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileImage$3e$__["FileImage"],
            color: 'bg-black hover:bg-gray-900'
        },
        {
            type: 'whatsapp',
            label: 'Share via WhatsApp',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"],
            color: 'bg-black hover:bg-gray-900'
        },
        {
            type: 'save',
            label: 'Save Locally',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"],
            color: 'bg-black hover:bg-gray-900'
        }
    ];
    const captureWorkflow = async ()=>{
        if (!workflowRef.current) return null;
        try {
            const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$to$2d$image$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toCanvas"])(workflowRef.current, {
                backgroundColor: '#f9fafb',
                pixelRatio: 2,
                filter: (node)=>{
                    if (node?.hasAttribute && node.hasAttribute('data-html2canvas-ignore')) {
                        return false;
                    }
                    return true;
                }
            });
            return canvas;
        } catch (error) {
            console.error('Workflow capture skipped due to rendering limitations. Export will continue without visualization.', error);
            return null;
        }
    };
    const generateTableInfo = ()=>{
        let info = `Database: ${databaseName}\n`;
        info += `Total Tables: ${tables.length}\n\n`;
        info += '='.repeat(50) + '\n\n';
        tables.forEach((table, index)=>{
            info += `Table ${index + 1}: ${table.name}\n`;
            info += '-'.repeat(30) + '\n';
            info += 'Columns:\n';
            table.columns.forEach((col)=>{
                let colInfo = `  • ${col.name} (${col.dataType})`;
                if (col.isPrimaryKey) colInfo += ' [PK]';
                if (col.isForeignKey) colInfo += ` [FK → ${col.foreignKeyReference ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFKDisplay"])(col.foreignKeyReference, tables) : 'Unknown'}]`;
                if (col.isNotNull) colInfo += ' NOT NULL';
                if (col.isUnique && !col.isPrimaryKey) colInfo += ' UNIQUE';
                info += colInfo + '\n';
            });
            info += '\n';
        });
        return info;
    };
    const handleExport = async (type)=>{
        setIsExporting(type);
        setExportSuccess(null);
        try {
            const canvas = await captureWorkflow();
            switch(type){
                case 'pdf':
                case 'save':
                    {
                        const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]('landscape', 'mm', 'a4');
                        const pageWidth = pdf.internal.pageSize.getWidth();
                        const pageHeight = pdf.internal.pageSize.getHeight();
                        const margin = 10;
                        // Title
                        pdf.setFontSize(20);
                        pdf.setFont('helvetica', 'bold');
                        pdf.text(`Database: ${databaseName}`, margin, 20);
                        // Subtitle
                        pdf.setFontSize(12);
                        pdf.setFont('helvetica', 'normal');
                        pdf.text(`Total Tables: ${tables.length}`, margin, 30);
                        pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, 36);
                        // Add workflow image
                        if (canvas) {
                            const imgData = canvas.toDataURL('image/png');
                            const imgWidth = pageWidth - margin * 2;
                            const imgHeight = canvas.height * imgWidth / canvas.width;
                            const maxImgHeight = pageHeight - 60;
                            const finalImgHeight = Math.min(imgHeight, maxImgHeight);
                            const finalImgWidth = finalImgHeight / imgHeight * imgWidth;
                            pdf.addImage(imgData, 'PNG', margin, 45, finalImgWidth, finalImgHeight);
                        } else {
                            // If canvas capture failed, add a note
                            pdf.setFontSize(10);
                            pdf.setTextColor(100, 100, 100);
                            pdf.text('(Workflow visualization unavailable)', margin, 50);
                        }
                        // Add table information on new page
                        pdf.addPage();
                        pdf.setFontSize(16);
                        pdf.setFont('helvetica', 'bold');
                        pdf.text('Table Structures', margin, 20);
                        let yPosition = 35;
                        const lineHeight = 6;
                        tables.forEach((table)=>{
                            if (yPosition > pageHeight - 40) {
                                pdf.addPage();
                                yPosition = 20;
                            }
                            pdf.setFontSize(14);
                            pdf.setFont('helvetica', 'bold');
                            pdf.text(`${table.name}`, margin, yPosition);
                            yPosition += lineHeight + 2;
                            pdf.setFontSize(10);
                            pdf.setFont('helvetica', 'normal');
                            table.columns.forEach((col)=>{
                                if (yPosition > pageHeight - 20) {
                                    pdf.addPage();
                                    yPosition = 20;
                                }
                                let colText = `• ${col.name} (${col.dataType})`;
                                const badges = [];
                                if (col.isPrimaryKey) badges.push('PK');
                                if (col.isForeignKey) {
                                    const fkDisplay = col.foreignKeyReference ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFKDisplay"])(col.foreignKeyReference, tables) : 'Unknown';
                                    badges.push(`FK → ${fkDisplay.split('.')[0]}`);
                                }
                                if (col.isNotNull) badges.push('NN');
                                if (col.isUnique && !col.isPrimaryKey) badges.push('UQ');
                                if (badges.length > 0) {
                                    colText += ` [${badges.join(', ')}]`;
                                }
                                pdf.text(colText, margin + 5, yPosition);
                                yPosition += lineHeight;
                            });
                            yPosition += lineHeight;
                        });
                        pdf.save(`${databaseName}_export.pdf`);
                        setExportSuccess(type);
                        break;
                    }
                case 'word':
                    {
                        // Create document children array that can contain both Paragraphs and Tables
                        const docChildren = [];
                        // Title
                        docChildren.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                            text: `Database: ${databaseName}`,
                            heading: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingLevel"].HEADING_1,
                            spacing: {
                                after: 200
                            }
                        }));
                        docChildren.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                            children: [
                                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextRun"]({
                                    text: `Total Tables: ${tables.length}`,
                                    size: 24
                                })
                            ],
                            spacing: {
                                after: 200
                            }
                        }));
                        docChildren.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                            children: [
                                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextRun"]({
                                    text: `Generated: ${new Date().toLocaleString()}`,
                                    size: 20,
                                    italics: true
                                })
                            ],
                            spacing: {
                                after: 400
                            }
                        }));
                        // Add workflow image to Word document
                        if (canvas) {
                            try {
                                const dataUrl = canvas.toDataURL('image/png');
                                const res = await fetch(dataUrl);
                                const imageBlob = await res.blob();
                                if (imageBlob) {
                                    const imageBuffer = await imageBlob.arrayBuffer();
                                    const imageBytes = new Uint8Array(imageBuffer);
                                    // Calculate image dimensions to fit page width (600px)
                                    const maxWidth = 600;
                                    const aspectRatio = canvas.height / canvas.width;
                                    const imageWidth = Math.round(Math.min(canvas.width, maxWidth));
                                    const imageHeight = Math.round(imageWidth * aspectRatio);
                                    docChildren.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                                        children: [
                                            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageRun"]({
                                                data: imageBytes,
                                                transformation: {
                                                    width: imageWidth,
                                                    height: imageHeight
                                                },
                                                type: 'png'
                                            })
                                        ],
                                        spacing: {
                                            after: 400
                                        }
                                    }));
                                }
                            } catch (error) {
                                console.error('Error adding image to Word document:', error);
                                docChildren.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                                    children: [
                                        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextRun"]({
                                            text: '(Workflow visualization unavailable)',
                                            italics: true,
                                            color: '888888'
                                        })
                                    ],
                                    spacing: {
                                        after: 400
                                    }
                                }));
                            }
                        } else {
                            // If canvas capture failed, add a note
                            docChildren.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                                children: [
                                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextRun"]({
                                        text: '(Workflow visualization unavailable)',
                                        italics: true,
                                        color: '888888'
                                    })
                                ],
                                spacing: {
                                    after: 400
                                }
                            }));
                        }
                        // Add each table's info
                        tables.forEach((table)=>{
                            docChildren.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                                text: table.name,
                                heading: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingLevel"].HEADING_2,
                                spacing: {
                                    before: 300,
                                    after: 200
                                }
                            }));
                            // Create table for columns
                            const rows = [
                                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"]({
                                    children: [
                                        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"]({
                                            children: [
                                                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                                                    text: 'Column',
                                                    alignment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlignmentType"].CENTER
                                                })
                                            ],
                                            width: {
                                                size: 25,
                                                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidthType"].PERCENTAGE
                                            },
                                            shading: {
                                                fill: 'E0E0E0'
                                            }
                                        }),
                                        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"]({
                                            children: [
                                                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                                                    text: 'Type',
                                                    alignment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlignmentType"].CENTER
                                                })
                                            ],
                                            width: {
                                                size: 20,
                                                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidthType"].PERCENTAGE
                                            },
                                            shading: {
                                                fill: 'E0E0E0'
                                            }
                                        }),
                                        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"]({
                                            children: [
                                                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                                                    text: 'Constraints',
                                                    alignment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlignmentType"].CENTER
                                                })
                                            ],
                                            width: {
                                                size: 55,
                                                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidthType"].PERCENTAGE
                                            },
                                            shading: {
                                                fill: 'E0E0E0'
                                            }
                                        })
                                    ]
                                })
                            ];
                            table.columns.forEach((col)=>{
                                const constraints = [];
                                if (col.isPrimaryKey) constraints.push('Primary Key');
                                if (col.isForeignKey) constraints.push(`Foreign Key → ${col.foreignKeyReference ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fk$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFKDisplay"])(col.foreignKeyReference, tables) : 'Unknown'}`);
                                if (col.isNotNull) constraints.push('NOT NULL');
                                if (col.isUnique && !col.isPrimaryKey) constraints.push('UNIQUE');
                                rows.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"]({
                                    children: [
                                        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"]({
                                            children: [
                                                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                                                    text: col.name
                                                })
                                            ]
                                        }),
                                        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"]({
                                            children: [
                                                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                                                    text: col.dataType
                                                })
                                            ]
                                        }),
                                        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"]({
                                            children: [
                                                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                                                    text: constraints.join(', ') || '-'
                                                })
                                            ]
                                        })
                                    ]
                                }));
                            });
                            const docTable = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"]({
                                rows,
                                width: {
                                    size: 100,
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidthType"].PERCENTAGE
                                }
                            });
                            docChildren.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                                children: []
                            })); // Spacer
                            docChildren.push(docTable);
                        });
                        const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Document"]({
                            sections: [
                                {
                                    children: docChildren
                                }
                            ]
                        });
                        const blob = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Packer"].toBlob(doc);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$file$2d$saver$2f$dist$2f$FileSaver$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAs"])(blob, `${databaseName}_export.docx`);
                        setExportSuccess(type);
                        break;
                    }
                case 'png':
                    {
                        if (canvas) {
                            const dataUrl = canvas.toDataURL('image/png');
                            const res = await fetch(dataUrl);
                            const blob = await res.blob();
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$file$2d$saver$2f$dist$2f$FileSaver$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAs"])(blob, `${databaseName}_workflow.png`);
                            setExportSuccess(type);
                        }
                        break;
                    }
                case 'whatsapp':
                    {
                        const info = generateTableInfo();
                        const whatsappText = encodeURIComponent(`🗄️ *Database Export: ${databaseName}*\n\n` + `📊 Tables: ${tables.length}\n` + `📅 Generated: ${new Date().toLocaleString()}\n\n` + `*Tables:*\n${tables.map((t)=>`• ${t.name} (${t.columns.length} columns)`).join('\n')}`);
                        window.open(`https://wa.me/?text=${whatsappText}`, '_blank');
                        setExportSuccess(type);
                        break;
                    }
            }
        } catch (error) {
            console.error('Export error:', error);
        } finally{
            setIsExporting(null);
        }
    };
    const handleClose = ()=>{
        setExportSuccess(null);
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
            className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center",
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
                className: `${theme?.modal || 'bg-white'} rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden`,
                onClick: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center justify-between p-5 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-9 h-9 ${theme?.buttonSecondary || 'bg-gray-100'} rounded-lg flex items-center justify-center`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                            className: `w-4 h-4 ${theme?.textSecondary || 'text-gray-700'}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/ExportModal.tsx",
                                            lineNumber: 423,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/database/ExportModal.tsx",
                                        lineNumber: 422,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: `text-base font-normal ${theme?.text || 'text-black'}`,
                                                style: {
                                                    fontFamily: 'var(--font-geist-sans)'
                                                },
                                                children: "Export Schema"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/ExportModal.tsx",
                                                lineNumber: 426,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-[13px] ${theme?.textSecondary || 'text-gray-500'}`,
                                                style: {
                                                    fontFamily: 'var(--font-geist-sans)'
                                                },
                                                children: databaseName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/database/ExportModal.tsx",
                                                lineNumber: 427,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/database/ExportModal.tsx",
                                        lineNumber: 425,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/database/ExportModal.tsx",
                                lineNumber: 421,
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
                                    fileName: "[project]/src/components/database/ExportModal.tsx",
                                    lineNumber: 436,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/database/ExportModal.tsx",
                                lineNumber: 430,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/database/ExportModal.tsx",
                        lineNumber: 420,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-5 space-y-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-[13px] ${theme?.textSecondary || 'text-gray-600'} mb-3`,
                                style: {
                                    fontFamily: 'var(--font-geist-sans)'
                                },
                                children: [
                                    tables.length,
                                    " ",
                                    tables.length === 1 ? 'table' : 'tables',
                                    " ready to export"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/database/ExportModal.tsx",
                                lineNumber: 442,
                                columnNumber: 15
                            }, this),
                            exportOptions.map(({ type, label, icon: Icon, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    whileHover: {
                                        scale: 1.01,
                                        y: -1
                                    },
                                    whileTap: {
                                        scale: 0.99
                                    },
                                    onClick: ()=>handleExport(type),
                                    disabled: isExporting !== null,
                                    className: `w-full flex items-center gap-2.5 p-3 rounded-lg text-white transition-all ${color} ${isExporting !== null && isExporting !== type ? 'opacity-50' : ''} text-[13px]`,
                                    style: {
                                        fontFamily: 'var(--font-geist-sans)'
                                    },
                                    children: [
                                        isExporting === type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "w-4 h-4 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/ExportModal.tsx",
                                            lineNumber: 459,
                                            columnNumber: 21
                                        }, this) : exportSuccess === type ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/ExportModal.tsx",
                                            lineNumber: 461,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/ExportModal.tsx",
                                            lineNumber: 463,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: exportSuccess === type ? 'Exported' : label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/database/ExportModal.tsx",
                                            lineNumber: 465,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, type, true, {
                                    fileName: "[project]/src/components/database/ExportModal.tsx",
                                    lineNumber: 447,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/database/ExportModal.tsx",
                        lineNumber: 441,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-4 border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'} ${theme?.buttonSecondary || 'bg-gray-50'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-500 text-center",
                            style: {
                                fontFamily: 'var(--font-geist-sans)'
                            },
                            children: "Includes schema structure and visual layout"
                        }, void 0, false, {
                            fileName: "[project]/src/components/database/ExportModal.tsx",
                            lineNumber: 472,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/database/ExportModal.tsx",
                        lineNumber: 471,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/database/ExportModal.tsx",
                lineNumber: 411,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/database/ExportModal.tsx",
            lineNumber: 404,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/database/ExportModal.tsx",
        lineNumber: 402,
        columnNumber: 5
    }, this);
}
_s(ExportModal, "A21v5206xmHPySBnasz+sK1Ltz8=");
_c = ExportModal;
var _c;
__turbopack_context__.k.register(_c, "ExportModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/database/ExportModal.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/database/ExportModal.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_database_ExportModal_tsx_2fe2b6dd._.js.map