/**
 * SQL Parser and Importer
 * Parses SQL file contents and creates tables/databases accordingly
 */

export interface ParsedSQL {
  databaseName: string | null;
  createTableStatements: Array<{
    tableName: string;
    sql: string;
  }>;
  insertStatements: Array<{
    tableName: string;
    sql: string;
  }>;
  otherStatements: Array<{
    type: string;
    sql: string;
  }>;
}

/**
 * Parse SQL file contents
 */
export function parseSQLFile(sqlContent: string): ParsedSQL {
  const result: ParsedSQL = {
    databaseName: null,
    createTableStatements: [],
    insertStatements: [],
    otherStatements: [],
  };

  // Split by semicolon, but be careful with strings
  const statements = splitSQLStatements(sqlContent);

  for (const statement of statements) {
    const trimmed = statement.trim();
    if (!trimmed) continue;

    const upperCase = trimmed.toUpperCase();

    // Check for CREATE DATABASE
    if (upperCase.startsWith('CREATE DATABASE')) {
      const match = trimmed.match(
        /CREATE\s+DATABASE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?([^`\s;]+)`?/i
      );
      if (match) {
        result.databaseName = match[1];
      }
    }
    // Check for USE DATABASE
    else if (upperCase.startsWith('USE')) {
      const match = trimmed.match(/USE\s+`?([^`\s;]+)`?/i);
      if (match) {
        result.databaseName = match[1];
      }
    }
    // Check for CREATE TABLE
    else if (upperCase.startsWith('CREATE TABLE')) {
      const match = trimmed.match(
        /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?([^`\s(]+)`?/i
      );
      if (match) {
        // Convert MySQL syntax to PostgreSQL
        const convertedSQL = convertMySQLToPgSQL(trimmed);
        result.createTableStatements.push({
          tableName: match[1],
          sql: convertedSQL,
        });
      }
    }
    // Check for INSERT
    else if (upperCase.startsWith('INSERT')) {
      const match = trimmed.match(/INSERT\s+INTO\s+`?([^`\s(\n]+)`?/i);
      if (match) {
        result.insertStatements.push({
          tableName: match[1],
          sql: trimmed,
        });
      }
    }
    // Other statements (TRIGGER, PROCEDURE, etc.)
    else if (
      upperCase.startsWith('CREATE TRIGGER') ||
      upperCase.startsWith('CREATE PROCEDURE') ||
      upperCase.startsWith('CREATE FUNCTION')
    ) {
      result.otherStatements.push({
        type: 'STORED_OBJECT',
        sql: trimmed,
      });
    }
  }

  return result;
}

/**
 * Split SQL statements carefully (respecting strings and comments)
 */
function splitSQLStatements(sql: string): string[] {
  const statements: string[] = [];
  let current = '';
  let inString = false;
  let stringChar = '';
  let inComment = false;
  let inLineComment = false;

  for (let i = 0; i < sql.length; i++) {
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

/**
 * Extract table name from CREATE TABLE statement
 */
export function extractTableName(createTableSQL: string): string {
  const match = createTableSQL.match(
    /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?([^`\s(]+)`?/i
  );
  return match ? match[1] : '';
}

/**
 * Extract column definitions from CREATE TABLE statement
 */
export function extractColumns(createTableSQL: string): Array<{
  name: string;
  type: string;
  constraints: string[];
}> {
  const columns: Array<{
    name: string;
    type: string;
    constraints: string[];
  }> = [];

  // Remove CREATE TABLE part and get the content between parentheses
  const match = createTableSQL.match(/\(([\s\S]*)\)(?:\s*;)?$/);
  if (!match) return columns;

  const content = match[1];

  // Split by comma, but be careful with nested parentheses (for foreign key constraints)
  const parts = splitByTopLevelComma(content);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // Skip constraint definitions that start with PRIMARY KEY, FOREIGN KEY, etc.
    if (
      trimmed.toUpperCase().startsWith('PRIMARY KEY') ||
      trimmed.toUpperCase().startsWith('FOREIGN KEY') ||
      trimmed.toUpperCase().startsWith('UNIQUE') ||
      trimmed.toUpperCase().startsWith('CHECK') ||
      trimmed.toUpperCase().startsWith('CONSTRAINT')
    ) {
      continue;
    }

    // Parse column definition
    const columnMatch = trimmed.match(/`?(\w+)`?\s+([^\s]+)(.*)$/i);
    if (columnMatch) {
      const name = columnMatch[1];
      const type = columnMatch[2];
      const constraintsStr = columnMatch[3].trim();
      const constraints = constraintsStr
        .split(/\s+/)
        .filter((c) => c && c !== '');

      columns.push({
        name,
        type,
        constraints,
      });
    }
  }

  return columns;
}

/**
 * Split string by comma at top level only (respecting parentheses)
 */
function splitByTopLevelComma(str: string): string[] {
  const parts: string[] = [];
  let current = '';
  let parenLevel = 0;
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < str.length; i++) {
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

/**
 * Convert MySQL DDL syntax to PostgreSQL DDL syntax
 * Handles AUTO_INCREMENT, UNSIGNED, ENGINE, CHARSET, COLLATE, etc.
 */
export function convertMySQLToPgSQL(sqlStatement: string): string {
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

  for (let i = 0; i < converted.length; i++) {
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

/**
 * Validate if SQL looks reasonable for import
 */
export function validateSQL(sqlContent: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = sqlContent.trim();

  if (!trimmed) {
    return { valid: false, error: 'SQL file is empty' };
  }

  if (!trimmed.includes('CREATE TABLE')) {
    return {
      valid: false,
      error: 'No CREATE TABLE statements found in the SQL file',
    };
  }

  return { valid: true };
}

/**
 * Generate a database name from filename if no database is specified
 */
export function generateDatabaseName(fileName: string): string {
  return fileName
    .replace(/\.sql$/i, '')
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/^(\d)/, '_$1') // prepend _ if starts with number
    .substring(0, 64);
}
