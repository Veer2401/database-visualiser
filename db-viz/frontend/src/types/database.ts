// Database Types (PostgreSQL)
export interface Database {
  id: string;
  name: string; // User-friendly name, auto-prefixed in PostgreSQL
  userId: string;
  db_password_hash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  name: string;
  dataType: DataType;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  foreignKeyReference?: ForeignKeyReference;
  isNotNull: boolean;
  isUnique: boolean;
  isAutoIncrement?: boolean;
  defaultValue?: string;
}

export interface Table {
  id: string;
  name: string;
  databaseId: string;
  columns: Column[];
  position: { x: number; y: number };
  createdAt: Date;
  updatedAt: Date;
}

export interface ForeignKeyReference {
  tableId: string;
  columnId: string;
  // Note: tableName and columnName should be derived via JOINs (3NF compliant)
  // When needed in UI, resolve from tables array by looking up tableId and columnId
}

export interface Relationship {
  id: string;
  sourceTableId: string;
  sourceColumnId: string;
  targetTableId: string;
  targetColumnId: string;
}

export type DataType =
  | 'INT'
  | 'BIGINT'
  | 'SMALLINT'
  | 'TINYINT'
  | 'FLOAT'
  | 'DOUBLE'
  | 'DECIMAL'
  | 'VARCHAR'
  | 'CHAR'
  | 'TEXT'
  | 'LONGTEXT'
  | 'DATE'
  | 'DATETIME'
  | 'TIMESTAMP'
  | 'TIME'
  | 'YEAR'
  | 'BOOLEAN'
  | 'BLOB'
  | 'JSON';

export const DATA_TYPES: DataType[] = [
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
  'JSON',
];

// Numeric types that can be foreign keys to each other
export const NUMERIC_TYPES: DataType[] = ['INT', 'BIGINT', 'SMALLINT', 'TINYINT'];

// Check if two data types are compatible for FK-PK relationship
export function areTypesCompatible(sourceType: DataType, targetType: DataType): boolean {
  if (sourceType === targetType) return true;

  // Numeric types are compatible with each other
  if (NUMERIC_TYPES.includes(sourceType) && NUMERIC_TYPES.includes(targetType)) {
    return true;
  }

  // String types compatibility
  if (['VARCHAR', 'CHAR', 'TEXT'].includes(sourceType) && ['VARCHAR', 'CHAR', 'TEXT'].includes(targetType)) {
    return true;
  }

  return false;
}

// Terminal log types
export interface TerminalLog {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: Date;
}

// User type
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Workflow Layout type for persisting table positions
export interface WorkflowLayout {
  id: string; // Composite: `${userId}_${databaseId}_${tableId}`
  userId: string;
  databaseId: string;
  tableId: string;
  position: {
    x: number;
    y: number;
  };
  updatedAt: Date;
}
