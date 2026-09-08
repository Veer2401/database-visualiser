/**
 * Dynamic import utilities for code splitting and performance optimization
 * These functions lazy-load components to reduce initial bundle size.
 * All modal/interactive components use ssr: false since they require browser APIs.
 */

import dynamic from 'next/dynamic';

// Modal Components — client-only, lazy-loaded for better initial page performance
export const DynamicCreateDatabaseModal = dynamic(
  () => import('@/components/database/CreateDatabaseModal'),
  { ssr: false, loading: () => null }
);

export const DynamicCreateTableModal = dynamic(
  () => import('@/components/database/CreateTableModal'),
  { ssr: false, loading: () => null }
);

export const DynamicEditTableModal = dynamic(
  () => import('@/components/database/EditTableModal'),
  { ssr: false, loading: () => null }
);

export const DynamicInsertDataModal = dynamic(
  () => import('@/components/database/InsertDataModal'),
  { ssr: false, loading: () => null }
);

export const DynamicUpdateDataModal = dynamic(
  () => import('@/components/database/UpdateDataModal'),
  { ssr: false, loading: () => null }
);

export const DynamicDeleteDataModal = dynamic(
  () => import('@/components/database/DeleteDataModal'),
  { ssr: false, loading: () => null }
);

export const DynamicSelectDataModal = dynamic(
  () => import('@/components/database/SelectDataModal'),
  { ssr: false, loading: () => null }
);

export const DynamicDropModal = dynamic(
  () => import('@/components/database/DropModal'),
  { ssr: false, loading: () => null }
);

export const DynamicCreateChoiceModal = dynamic(
  () => import('@/components/database/CreateChoiceModal'),
  { ssr: false, loading: () => null }
);

export const DynamicForeignKeyModal = dynamic(
  () => import('@/components/database/ForeignKeyModal'),
  { ssr: false, loading: () => null }
);

export const DynamicExportModal = dynamic(
  () => import('@/components/database/ExportModal'),
  { ssr: false, loading: () => null }
);

export const DynamicQueryResultsPanel = dynamic(
  () => import('@/components/database/QueryResultsPanel'),
  { ssr: false, loading: () => null }
);

export const DynamicSQLChatbot = dynamic(
  () => import('@/components/chatbot/SQLChatbot'),
  { ssr: false, loading: () => null }
);

