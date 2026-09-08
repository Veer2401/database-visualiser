'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  FileText,
  FileImage,
  Share2,
  Save,
  FileType,
  Loader2,
  Check,
} from 'lucide-react';
import Button from '@/components/common/Button';
import { Table as TableType } from '@/types/database';
import { formatFKDisplay } from '@/lib/fk-helpers';
import { toCanvas } from 'html-to-image';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, HeadingLevel, AlignmentType, ImageRun } from 'docx';
import { saveAs } from 'file-saver';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  databaseName: string;
  tables: TableType[];
  workflowRef: React.RefObject<HTMLDivElement | null>;
  theme?: any;
}

type ExportType = 'pdf' | 'word' | 'png' | 'whatsapp' | 'save';

export default function ExportModal({
  isOpen,
  onClose,
  databaseName,
  tables,
  workflowRef,
  theme,
}: ExportModalProps) {
  const [isExporting, setIsExporting] = useState<ExportType | null>(null);
  const [exportSuccess, setExportSuccess] = useState<ExportType | null>(null);

  const exportOptions = [
    { type: 'pdf' as ExportType, label: 'PDF Document', icon: FileText, color: 'bg-black hover:bg-gray-900' },
    { type: 'word' as ExportType, label: 'Word Document', icon: FileType, color: 'bg-black hover:bg-gray-900' },
    { type: 'png' as ExportType, label: 'PNG Image', icon: FileImage, color: 'bg-black hover:bg-gray-900' },
    { type: 'whatsapp' as ExportType, label: 'Share via WhatsApp', icon: Share2, color: 'bg-black hover:bg-gray-900' },
    { type: 'save' as ExportType, label: 'Save Locally', icon: Save, color: 'bg-black hover:bg-gray-900' },
  ];

  const captureWorkflow = async (): Promise<HTMLCanvasElement | null> => {
    if (!workflowRef.current) return null;

    try {
      const canvas = await toCanvas(workflowRef.current, {
        backgroundColor: '#f9fafb',
        pixelRatio: 2,
        filter: (node: any) => {
          if (node?.hasAttribute && node.hasAttribute('data-html2canvas-ignore')) {
            return false;
          }
          return true;
        },
      });
      
      return canvas;
    } catch (error) {
      console.error('Workflow capture skipped due to rendering limitations. Export will continue without visualization.', error);
      return null;
    }
  };

  const generateTableInfo = () => {
    let info = `Database: ${databaseName}\n`;
    info += `Total Tables: ${tables.length}\n\n`;
    info += '='.repeat(50) + '\n\n';

    tables.forEach((table, index) => {
      info += `Table ${index + 1}: ${table.name}\n`;
      info += '-'.repeat(30) + '\n';
      info += 'Columns:\n';
      table.columns.forEach((col) => {
        let colInfo = `  • ${col.name} (${col.dataType})`;
        if (col.isPrimaryKey) colInfo += ' [PK]';
        if (col.isForeignKey) colInfo += ` [FK → ${col.foreignKeyReference ? formatFKDisplay(col.foreignKeyReference, tables) : 'Unknown'}]`;
        if (col.isNotNull) colInfo += ' NOT NULL';
        if (col.isUnique && !col.isPrimaryKey) colInfo += ' UNIQUE';
        info += colInfo + '\n';
      });
      info += '\n';
    });

    return info;
  };

  const handleExport = async (type: ExportType) => {
    setIsExporting(type);
    setExportSuccess(null);

    try {
      const canvas = await captureWorkflow();

      switch (type) {
        case 'pdf':
        case 'save': {
          const pdf = new jsPDF('landscape', 'mm', 'a4');
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
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            const maxImgHeight = pageHeight - 60;
            const finalImgHeight = Math.min(imgHeight, maxImgHeight);
            const finalImgWidth = (finalImgHeight / imgHeight) * imgWidth;

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

          tables.forEach((table) => {
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

            table.columns.forEach((col) => {
              if (yPosition > pageHeight - 20) {
                pdf.addPage();
                yPosition = 20;
              }

              let colText = `• ${col.name} (${col.dataType})`;
              const badges: string[] = [];
              if (col.isPrimaryKey) badges.push('PK');
              if (col.isForeignKey) {
                const fkDisplay = col.foreignKeyReference ? formatFKDisplay(col.foreignKeyReference, tables) : 'Unknown';
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

        case 'word': {
          // Create document children array that can contain both Paragraphs and Tables
          const docChildren: (Paragraph | Table)[] = [];
          
          // Title
          docChildren.push(
            new Paragraph({
              text: `Database: ${databaseName}`,
              heading: HeadingLevel.HEADING_1,
              spacing: { after: 200 },
            })
          );

          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({ text: `Total Tables: ${tables.length}`, size: 24 }),
              ],
              spacing: { after: 200 },
            })
          );

          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({ text: `Generated: ${new Date().toLocaleString()}`, size: 20, italics: true }),
              ],
              spacing: { after: 400 },
            })
          );

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
                
                docChildren.push(
                  new Paragraph({
                    children: [
                      new ImageRun({
                        data: imageBytes,
                        transformation: {
                          width: imageWidth,
                          height: imageHeight,
                        },
                        type: 'png',
                      }),
                    ],
                    spacing: { after: 400 },
                  })
                );
              }
            } catch (error) {
              console.error('Error adding image to Word document:', error);
              docChildren.push(
                new Paragraph({
                  children: [
                    new TextRun({ text: '(Workflow visualization unavailable)', italics: true, color: '888888' }),
                  ],
                  spacing: { after: 400 },
                })
              );
            }
          } else {
            // If canvas capture failed, add a note
            docChildren.push(
              new Paragraph({
                children: [
                  new TextRun({ text: '(Workflow visualization unavailable)', italics: true, color: '888888' }),
                ],
                spacing: { after: 400 },
              })
            );
          }

          // Add each table's info
          tables.forEach((table) => {
            docChildren.push(
              new Paragraph({
                text: table.name,
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 200 },
              })
            );

            // Create table for columns
            const rows: TableRow[] = [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: 'Column', alignment: AlignmentType.CENTER })],
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E0E0E0' },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: 'Type', alignment: AlignmentType.CENTER })],
                    width: { size: 20, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E0E0E0' },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: 'Constraints', alignment: AlignmentType.CENTER })],
                    width: { size: 55, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E0E0E0' },
                  }),
                ],
              }),
            ];

            table.columns.forEach((col) => {
              const constraints: string[] = [];
              if (col.isPrimaryKey) constraints.push('Primary Key');
              if (col.isForeignKey) constraints.push(`Foreign Key → ${col.foreignKeyReference ? formatFKDisplay(col.foreignKeyReference, tables) : 'Unknown'}`);
              if (col.isNotNull) constraints.push('NOT NULL');
              if (col.isUnique && !col.isPrimaryKey) constraints.push('UNIQUE');

              rows.push(
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: col.name })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: col.dataType })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: constraints.join(', ') || '-' })],
                    }),
                  ],
                })
              );
            });

            const docTable = new Table({
              rows,
              width: { size: 100, type: WidthType.PERCENTAGE },
            });

            docChildren.push(new Paragraph({ children: [] })); // Spacer
            docChildren.push(docTable);
          });

          const doc = new Document({
            sections: [
              {
                children: docChildren,
              },
            ],
          });

          const blob = await Packer.toBlob(doc);
          saveAs(blob, `${databaseName}_export.docx`);
          setExportSuccess(type);
          break;
        }

        case 'png': {
          if (canvas) {
            const dataUrl = canvas.toDataURL('image/png');
            const res = await fetch(dataUrl);
            const blob = await res.blob();
            saveAs(blob, `${databaseName}_workflow.png`);
            setExportSuccess(type);
          }
          break;
        }

        case 'whatsapp': {
          const info = generateTableInfo();
          const whatsappText = encodeURIComponent(
            `🗄️ *Database Export: ${databaseName}*\n\n` +
            `📊 Tables: ${tables.length}\n` +
            `📅 Generated: ${new Date().toLocaleString()}\n\n` +
            `*Tables:*\n${tables.map((t) => `• ${t.name} (${t.columns.length} columns)`).join('\n')}`
          );
          window.open(`https://wa.me/?text=${whatsappText}`, '_blank');
          setExportSuccess(type);
          break;
        }
      }
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(null);
    }
  };

  const handleClose = () => {
    setExportSuccess(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`${theme?.modal || 'bg-white'} rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-5 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 ${theme?.buttonSecondary || 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                  <Download className={`w-4 h-4 ${theme?.textSecondary || 'text-gray-700'}`} />
                </div>
                <div>
                  <h2 className={`text-base font-normal ${theme?.text || 'text-black'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>Export Schema</h2>
                  <p className={`text-[13px] ${theme?.textSecondary || 'text-gray-500'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>{databaseName}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className={`p-2 rounded-lg ${theme?.buttonSecondary || 'hover:bg-gray-100'} transition-colors`}
              >
                <X className={`w-5 h-5 ${theme?.textSecondary || 'text-gray-600'}`} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-2.5">
              <p className={`text-[13px] ${theme?.textSecondary || 'text-gray-600'} mb-3`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                {tables.length} {tables.length === 1 ? 'table' : 'tables'} ready to export
              </p>

              {exportOptions.map(({ type, label, icon: Icon, color }) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleExport(type)}
                  disabled={isExporting !== null}
                  className={`w-full flex items-center gap-2.5 p-3 rounded-lg text-white transition-all ${color} ${
                    isExporting !== null && isExporting !== type ? 'opacity-50' : ''
                  } text-[13px]`}
                  style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                  {isExporting === type ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : exportSuccess === type ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span>{exportSuccess === type ? 'Exported' : label}</span>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className={`p-4 border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'} ${theme?.buttonSecondary || 'bg-gray-50'}`}>
              <p className="text-xs text-gray-500 text-center" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Includes schema structure and visual layout
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
