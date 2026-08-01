// ─── DB Composer Action Schema ─────────────────────────────────────────────
// Defines the structured actions that the AI Composer generates and the
// action executor applies to the React Flow canvas + Firestore.

export type ColumnDef = {
  name: string;
  type: 'INT' | 'VARCHAR' | 'TEXT' | 'DATE' | 'DECIMAL' | 'BOOLEAN' | 'ENUM' | 'TIMESTAMP' | string;
  length?: number;
  isPrimary?: boolean;
  isForeign?: boolean;
  references?: { table: string; column: string };
  isNotNull?: boolean;
  isUnique?: boolean;
  defaultValue?: string;
};

export type TableDef = {
  name: string;
  columns: ColumnDef[];
  color?: string; // hex color for the node header
};

export type ComposerAction =
  | { type: 'CREATE_DATABASE'; databaseName: string; tables: TableDef[] }
  | { type: 'ADD_TABLE'; tableName: string; columns: ColumnDef[] }
  | { type: 'ADD_COLUMN'; tableName: string; column: ColumnDef }
  | { type: 'ADD_RELATIONSHIP'; fromTable: string; fromColumn: string; toTable: string; toColumn: string }
  | { type: 'DELETE_TABLE'; tableName: string }
  | { type: 'RENAME_TABLE'; oldName: string; newName: string }
  | { type: 'EXECUTE_SQL'; sql: string[]; explanation?: string }
  | { type: 'EXPLAIN'; message: string };

export type ComposerResponse = {
  summary: string;          // short human-readable summary of what will happen
  actions: ComposerAction[];
};

export type ComposerChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;           // the summary shown in chat
  actions?: ComposerAction[];
  timestamp: number;
  status: 'pending' | 'done' | 'error';
};

export type ComposerSession = {
  id: string;
  userId?: string;
  databaseId?: string | null;
  title: string;
  createdAt: number;   // unix ms
  updatedAt: number;   // unix ms
  messages: ComposerChatMessage[];
};
