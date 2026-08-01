/**
 * Gemini AI Composer Service
 * 
 * Interacts directly with Google Gemini API (gemini-2.0-flash) to serve as a Cursor-like
 * AI Composer for database schema creation, table visualization, and SQL query generation.
 */

const CANDIDATE_MODELS = [
    'gemini-flash-latest',
    'gemini-pro-latest',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-2.0-flash-lite',
];

export const MAX_INPUT_LENGTH = 1500;

export interface GeminiResponse {
    success: boolean;
    explanation: string;
    sql_statements: string[];
    auto_execute?: boolean;
    error?: string;
    model?: string;
}

const SYSTEM_PROMPT = `You are Schema Pilot, the AI database copilot for SchemaView (a visual database management system & interactive canvas tool).
Your primary job is to assist with database design, schema generation, and SQL queries.

When the user asks you to build, modify, or create a database/table schema (e.g. "Create a car dealership database with cars and sales tables, insert sample data"), you must:
1. Explain what schema changes or SQL statements you are performing.
2. Provide precise, valid standard SQL / PostgreSQL statements to create schemas, tables, relationships, constraints, or insert records.
3. Keep explanation concise, action-oriented, and structured.

CRITICAL FORMAT REQUIREMENT:
You MUST output your response as valid JSON matching this exact structure:
{
  "explanation": "Brief explanation of what you created or answered.",
  "sql_statements": [
    "CREATE SCHEMA ...;",
    "CREATE TABLE ...;",
    "INSERT INTO ...;"
  ],
  "auto_execute": true
}

Rules:
- Include ALL SQL commands required to fulfill the user's intent in the "sql_statements" array.
- "auto_execute" should be true whenever valid SQL statements are generated for canvas creation.
- If the user asks a general SQL question without needing table creation (e.g. "What is a foreign key?"), set "sql_statements" to an empty array [] and explain the concept clearly in "explanation".
- Output ONLY pure JSON without markdown backticks wrapping the whole JSON response.`;

export async function getGeminiResponse(userMessage: string, contextSchema?: string): Promise<GeminiResponse> {
    if (!userMessage || userMessage.trim().length === 0) {
        return { success: false, explanation: '', sql_statements: [], error: 'Message cannot be empty.' };
    }

    if (userMessage.length > MAX_INPUT_LENGTH) {
        return { success: false, explanation: '', sql_statements: [], error: `Message exceeds maximum length of ${MAX_INPUT_LENGTH} characters.` };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('GEMINI_API_KEY is not configured');
        return {
            success: false,
            explanation: '',
            sql_statements: [],
            error: 'Gemini API key is not configured in .env.local',
        };
    }

    let promptText = userMessage.trim();
    if (contextSchema) {
        promptText = `Current Canvas Context:\n${contextSchema}\n\nUser Request: ${promptText}`;
    }

    let lastErrorMessage = '';

    // Loop through candidate models in fallback order
    for (const model of CANDIDATE_MODELS) {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        try {
            console.log(`[Gemini API] Attempting model: ${model}`);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: SYSTEM_PROMPT }]
                    },
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: promptText }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.2,
                        responseMimeType: 'application/json'
                    }
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                lastErrorMessage = errData.error?.message || `Status ${response.status}`;
                console.warn(`[Gemini API] Model ${model} returned error (${response.status}):`, lastErrorMessage);
                
                // If it's a quota / 429 error or model limit 0, continue to next fallback model
                if (response.status === 429 || response.status === 404 || lastErrorMessage.includes('Quota exceeded') || lastErrorMessage.includes('limit: 0')) {
                    continue;
                }
                
                continue;
            }

            const data = await response.json();
            const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!rawContent) {
                console.warn(`[Gemini API] Model ${model} returned empty content.`);
                continue;
            }

            let parsed: any;
            try {
                parsed = JSON.parse(rawContent);
            } catch {
                const cleaned = rawContent.replace(/```json/gi, '').replace(/```/g, '').trim();
                parsed = JSON.parse(cleaned);
            }

            console.log(`[Gemini API] Success with model: ${model}`);

            return {
                success: true,
                explanation: parsed.explanation || rawContent,
                sql_statements: Array.isArray(parsed.sql_statements) ? parsed.sql_statements : [],
                auto_execute: parsed.auto_execute !== false && Array.isArray(parsed.sql_statements) && parsed.sql_statements.length > 0,
                model
            };
        } catch (error: any) {
            console.error(`[Gemini API] Model ${model} call exception:`, error);
            lastErrorMessage = error?.message || 'Network exception';
        }
    }

    return {
        success: false,
        explanation: '',
        sql_statements: [],
        error: lastErrorMessage || 'All Gemini models in fallback chain exceeded quota or failed.'
    };
}

// ─── DB Composer Mode ──────────────────────────────────────────────────────
// Returns structured ComposerResponse instead of raw SQL statements.

import type { ComposerResponse, ComposerAction } from '@/types/composer';

export interface ComposerGeminiResult {
    success: boolean;
    data?: ComposerResponse;
    error?: string;
    model?: string;
}

const COMPOSER_SYSTEM_PROMPT = `You are Schema Pilot — the AI database copilot inside SchemaView (a visual database canvas tool).

Your task: interpret natural-language requests about databases and return a JSON object describing **structured actions** to execute on the user's canvas.

RESPONSE FORMAT — return ONLY this JSON (no markdown, no backticks):
{
  "summary": "One-sentence human-readable description of what you are doing.",
  "actions": [
    // one or more actions from the list below
  ]
}

AVAILABLE ACTIONS:

1. CREATE_DATABASE — creates a new database with one or more tables
{
  "type": "CREATE_DATABASE",
  "databaseName": "car_dealership",
  "tables": [
    {
      "name": "cars",
      "columns": [
        { "name": "id", "type": "INT", "isPrimary": true, "isNotNull": true },
        { "name": "make", "type": "VARCHAR", "length": 100, "isNotNull": true },
        { "name": "model", "type": "VARCHAR", "length": 100 },
        { "name": "year", "type": "INT" },
        { "name": "price", "type": "DECIMAL" }
      ]
    }
  ]
}

2. ADD_TABLE — adds a table to the currently selected database
{
  "type": "ADD_TABLE",
  "tableName": "payments",
  "columns": [
    { "name": "id", "type": "INT", "isPrimary": true, "isNotNull": true },
    { "name": "amount", "type": "DECIMAL", "isNotNull": true },
    { "name": "car_id", "type": "INT", "isForeign": true, "references": { "table": "cars", "column": "id" } }
  ]
}

3. ADD_COLUMN — adds a column to an existing table
{
  "type": "ADD_COLUMN",
  "tableName": "cars",
  "column": { "name": "color", "type": "VARCHAR", "length": 50 }
}

4. ADD_RELATIONSHIP — creates a foreign key relationship between tables
{
  "type": "ADD_RELATIONSHIP",
  "fromTable": "orders",
  "fromColumn": "customer_id",
  "toTable": "customers",
  "toColumn": "id"
}

5. DELETE_TABLE — drops an existing table
{ "type": "DELETE_TABLE", "tableName": "temp_data" }

6. RENAME_TABLE — renames an existing table
{ "type": "RENAME_TABLE", "oldName": "users", "newName": "customers" }

7. EXPLAIN — explain a concept without touching the canvas
{ "type": "EXPLAIN", "message": "A foreign key is a column that references the primary key of another table..." }

RULES:
- CRITICAL: Whenever the user asks to build, create, generate, or add any database, system, application, schema, or table (e.g. "create a car dealership database", "build a student management system", "add an orders table"), you MUST return at least one action of type CREATE_DATABASE or ADD_TABLE with complete table definitions and columns.
- Every table MUST have a primary key column (usually "id" with type "INT", isPrimary: true, isNotNull: true).
- When the user asks to create a full database or multi-table system, use CREATE_DATABASE with all relevant tables included in the "tables" array.
- When the user asks to add a single table to an existing database, use ADD_TABLE.
- Foreign key columns should have isForeign: true and a references object pointing to the referenced table and column.
- Use EXPLAIN ONLY when the user asks a purely theoretical or conceptual question (e.g. "what is normalization?", "explain B-trees").
- Column types must be one of: INT, BIGINT, SMALLINT, TINYINT, FLOAT, DOUBLE, DECIMAL, VARCHAR, CHAR, TEXT, LONGTEXT, DATE, DATETIME, TIMESTAMP, TIME, YEAR, BOOLEAN, BLOB, JSON.
- Keep all table, database, and column names lowercase with underscores (e.g. "car_dealership", "student_id", "first_name").
- Output ONLY pure JSON. Do NOT wrap in markdown code blocks.`;

export async function getComposerResponse(
    userMessage: string,
    chatHistory?: Array<{ role: 'user' | 'assistant'; content: string }>,
    canvasContext?: string
): Promise<ComposerGeminiResult> {
    if (!userMessage || userMessage.trim().length === 0) {
        return { success: false, error: 'Message cannot be empty.' };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return { success: false, error: 'Gemini API key is not configured.' };
    }

    // Build conversation contents
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Add canvas context as the first user turn if available
    if (canvasContext) {
        contents.push({
            role: 'user',
            parts: [{ text: `[CANVAS CONTEXT — current tables on canvas]\n${canvasContext}\n\n(Use this context to understand existing tables when the user references them.)` }]
        });
        contents.push({
            role: 'model',
            parts: [{ text: '{"summary":"Canvas context noted.","actions":[]}' }]
        });
    }

    // Add chat history for multi-turn
    if (chatHistory && chatHistory.length > 0) {
        for (const msg of chatHistory) {
            contents.push({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            });
        }
    }

    // Add the current user message
    contents.push({
        role: 'user',
        parts: [{ text: userMessage.trim() }]
    });

    let lastErrorMessage = '';

    for (const model of CANDIDATE_MODELS) {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        try {
            console.log(`[Composer API] Attempting model: ${model}`);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: COMPOSER_SYSTEM_PROMPT }]
                    },
                    contents,
                    generationConfig: {
                        temperature: 0.15,
                        responseMimeType: 'application/json'
                    }
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                lastErrorMessage = errData.error?.message || `Status ${response.status}`;
                console.warn(`[Composer API] Model ${model} error (${response.status}):`, lastErrorMessage);
                if (response.status === 429 || response.status === 404 || lastErrorMessage.includes('Quota exceeded') || lastErrorMessage.includes('limit: 0')) {
                    continue;
                }
                continue;
            }

            const data = await response.json();
            const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!rawContent) {
                console.warn(`[Composer API] Model ${model} returned empty content.`);
                continue;
            }

            let parsed: ComposerResponse;
            try {
                parsed = JSON.parse(rawContent);
            } catch {
                const cleaned = rawContent.replace(/```json/gi, '').replace(/```/g, '').trim();
                parsed = JSON.parse(cleaned);
            }

            // Validate the response structure
            if (!parsed.summary || !Array.isArray(parsed.actions)) {
                console.warn(`[Composer API] Model ${model} returned invalid structure.`);
                continue;
            }

            console.log(`[Composer API] Success with model: ${model}, ${parsed.actions.length} actions`);

            return {
                success: true,
                data: parsed,
                model
            };
        } catch (error: any) {
            console.error(`[Composer API] Model ${model} exception:`, error);
            lastErrorMessage = error?.message || 'Network exception';
        }
    }

    return {
        success: false,
        error: lastErrorMessage || 'All Gemini models in fallback chain exceeded quota or failed.'
    };
}
