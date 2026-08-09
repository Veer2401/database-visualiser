/**
 * Gemini & OpenRouter AI Composer Service
 * 
 * Interacts with Google Gemini API & OpenRouter API to serve as a Cursor-like
 * AI Composer for database schema creation, table visualization, and SQL query generation.
 * Supports multi-key rotation and automatic fallback to OpenRouter keys.
 */

import type { ComposerResponse, ComposerAction } from '@/types/composer';

const CANDIDATE_MODELS = [
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.6-flash',
];

const OPENROUTER_MODELS = [
    'google/gemini-2.5-flash',
    'google/gemini-3.5-flash-lite',
    'google/gemma-4-31b-it:free',
    'google/gemma-4-26b-a4b-it:free',
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function formatGeminiError(rawError: string): string {
    return 'An error occurred. Please try again.';
}

function getGeminiApiKeys(): string[] {
    const keys: string[] = [];
    if (process.env.GEMINI_API_KEY) keys.push(process.env.GEMINI_API_KEY);
    if (process.env.GEMINI_API_KEY_2) keys.push(process.env.GEMINI_API_KEY_2);
    if (process.env.GEMINI_API_KEY_3) keys.push(process.env.GEMINI_API_KEY_3);
    return Array.from(new Set(keys.filter(Boolean)));
}

function getOpenRouterApiKeys(): string[] {
    const keys: string[] = [];
    if (process.env.OPENROUTER_API_KEY) keys.push(process.env.OPENROUTER_API_KEY);
    if (process.env.OPENROUTER_API_KEY_1) keys.push(process.env.OPENROUTER_API_KEY_1);
    if (process.env.OPENROUTER_API_KEY_2) keys.push(process.env.OPENROUTER_API_KEY_2);
    if (process.env.OPENROUTER_API_KEY_3) keys.push(process.env.OPENROUTER_API_KEY_3);
    return Array.from(new Set(keys.filter(Boolean)));
}

async function callOpenRouter(
    apiKey: string,
    systemPrompt: string,
    userPrompt: string,
    chatHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<{ content: string; model: string } | null> {
    const messages: Array<{ role: string; content: string }> = [
        { role: 'system', content: systemPrompt }
    ];

    if (chatHistory && chatHistory.length > 0) {
        for (const msg of chatHistory) {
            messages.push({
                role: msg.role === 'assistant' ? 'assistant' : 'user',
                content: msg.content
            });
        }
    }

    messages.push({ role: 'user', content: userPrompt });

    for (const model of OPENROUTER_MODELS) {
        try {
            console.log(`[OpenRouter API] Attempting model: ${model}`);
            const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://schemaview.app',
                    'X-Title': 'SchemaView',
                },
                body: JSON.stringify({
                    model,
                    messages,
                    response_format: { type: 'json_object' }
                })
            });

            if (!res.ok) {
                const errText = await res.text().catch(() => '');
                console.warn(`[OpenRouter API] Model ${model} returned status ${res.status}:`, errText);
                continue;
            }

            const data = await res.json();
            const content = data.choices?.[0]?.message?.content;
            if (content) {
                console.log(`[OpenRouter API] Success with model: ${model}`);
                return { content, model: `openrouter/${model}` };
            }
        } catch (err) {
            console.error(`[OpenRouter API] Error with model ${model}:`, err);
        }
    }

    return null;
}

export const MAX_INPUT_LENGTH = 1500;

export interface GeminiResponse {
    success: boolean;
    explanation: string;
    sql_statements: string[];
    auto_execute?: boolean;
    error?: string;
    model?: string;
}

const SYSTEM_PROMPT = `You are Schema Pilot, the AI database copilot for SchemaView (a visual database management system & interactive canvas tool strictly tailored for PostgreSQL).
Your primary job is to assist with PostgreSQL database design, schema generation, and SQL queries.

When the user asks you to build, modify, or create a database/table schema (e.g. "Create a car dealership database with cars and sales tables, insert sample data"), you must:
1. Explain what schema changes or SQL statements you are performing.
2. Provide precise, valid PostgreSQL statements (e.g., CREATE TABLE, ALTER TABLE, INSERT INTO) to create schemas, tables, relationships, constraints, or insert records.
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
- Strictly use PostgreSQL syntax, data types, and functions.
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

    const geminiKeys = getGeminiApiKeys();
    const openRouterKeys = getOpenRouterApiKeys();

    if (geminiKeys.length === 0 && openRouterKeys.length === 0) {
        console.error('Neither GEMINI_API_KEY nor OPENROUTER_API_KEY is configured');
        return {
            success: false,
            explanation: '',
            sql_statements: [],
            error: 'AI API keys are not configured in environment variables.',
        };
    }

    let promptText = userMessage.trim();
    if (contextSchema) {
        promptText = `Current Canvas Context:\n${contextSchema}\n\nUser Request: ${promptText}`;
    }

    let lastErrorMessage = '';

    // 1. Try Gemini API keys
    for (const apiKey of geminiKeys) {
        for (let i = 0; i < CANDIDATE_MODELS.length; i++) {
            const model = CANDIDATE_MODELS[i];
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

            try {
                console.log(`[Gemini API] Attempting model: ${model}`);
                let response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                        contents: [{ role: 'user', parts: [{ text: promptText }] }],
                        generationConfig: { temperature: 0.2, responseMimeType: 'application/json' }
                    })
                });

                if (response.status === 429 && i === 0) {
                    console.warn(`[Gemini API] Primary model ${model} rate limited (429). Retrying in 1s...`);
                    await delay(1000);
                    response = await fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                            contents: [{ role: 'user', parts: [{ text: promptText }] }],
                            generationConfig: { temperature: 0.2, responseMimeType: 'application/json' }
                        })
                    });
                }

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    lastErrorMessage = errData.error?.message || `Status ${response.status}`;
                    console.warn(`[Gemini API] Model ${model} returned error (${response.status}):`, lastErrorMessage);
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
    }

    // 2. OpenRouter Fallback
    for (const apiKey of openRouterKeys) {
        console.log(`[OpenRouter API] Trying fallback key...`);
        const result = await callOpenRouter(apiKey, SYSTEM_PROMPT, promptText);
        if (result) {
            try {
                let parsed: any;
                try {
                    parsed = JSON.parse(result.content);
                } catch {
                    const cleaned = result.content.replace(/```json/gi, '').replace(/```/g, '').trim();
                    parsed = JSON.parse(cleaned);
                }

                return {
                    success: true,
                    explanation: parsed.explanation || result.content,
                    sql_statements: Array.isArray(parsed.sql_statements) ? parsed.sql_statements : [],
                    auto_execute: parsed.auto_execute !== false && Array.isArray(parsed.sql_statements) && parsed.sql_statements.length > 0,
                    model: result.model
                };
            } catch (err) {
                console.error('[OpenRouter API] JSON parse error:', err);
            }
        }
    }

    return {
        success: false,
        explanation: '',
        sql_statements: [],
        error: formatGeminiError(lastErrorMessage)
    };
}

// ─── DB Composer Mode ──────────────────────────────────────────────────────
// Returns structured ComposerResponse instead of raw SQL statements.

export interface ComposerGeminiResult {
    success: boolean;
    data?: ComposerResponse;
    error?: string;
    model?: string;
}

const COMPOSER_SYSTEM_PROMPT = `You are Schema Pilot — the AI database copilot inside SchemaView (a visual database canvas tool strictly built for PostgreSQL).

Your task: interpret natural-language requests about databases and return a JSON object describing **structured actions** to execute on the user's PostgreSQL database canvas.

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

7. EXECUTE_SQL — executes PostgreSQL SQL statements directly against the database to insert sample data, populate rows, or alter schemas
{
  "type": "EXECUTE_SQL",
  "databaseName": "cars",
  "sql": [
    "INSERT INTO students (id, first_name, last_name, email) VALUES (1, 'Alice', 'Smith', 'alice@student.edu') ON CONFLICT DO NOTHING;",
    "INSERT INTO courses (id, course_code, course_name) VALUES (1, 'CS101', 'Intro to CS') ON CONFLICT DO NOTHING;"
  ],
  "explanation": "Inserting sample rows into students and courses tables."
}

8. EXPLAIN — explain a concept without touching the database
{ "type": "EXPLAIN", "message": "A foreign key is a column that references the primary key of another table..." }

RULES:
- STRICTLY OPTIMIZED FOR POSTGRESQL: All table schemas, data types, foreign key definitions, and SQL queries must strictly target PostgreSQL database execution.
- CRITICAL: Whenever the user asks to build, create, generate, or add any database, system, application, schema, or table (e.g. "create a car dealership database", "build a student management system", "add an orders table"), you MUST return at least one action of type CREATE_DATABASE or ADD_TABLE with complete table definitions and columns.
- CRITICAL: Whenever the user asks to insert values, add sample records, populate data, insert rows, or run data queries (e.g. "insert some values into these tables", "add 3 sample records to students"), you MUST return an EXECUTE_SQL action with clean, valid PostgreSQL INSERT statements ending with "ON CONFLICT DO NOTHING" (e.g. "INSERT INTO airports (id, code) VALUES (1, 'JFK') ON CONFLICT DO NOTHING;"). ALWAYS include "databaseName" matching the database where tables exist or were created. NEVER return an EXPLAIN message telling the user to insert data manually!
- Every table MUST have a primary key column (usually "id" with type "INT", isPrimary: true, isNotNull: true).
- When the user asks to create a full database or multi-table system, use CREATE_DATABASE with all relevant tables included in the "tables" array.
- When the user asks to add a single table to an existing database, use ADD_TABLE.
- Foreign key columns should have isForeign: true and a references object pointing to the referenced table and column.
- Use EXPLAIN ONLY when the user asks a purely theoretical or conceptual question (e.g. "what is normalization?", "explain B-trees").
- Column types must be valid PostgreSQL types: INT, BIGINT, SMALLINT, FLOAT, DOUBLE, DECIMAL, VARCHAR, CHAR, TEXT, DATE, DATETIME, TIMESTAMP, TIME, BOOLEAN, JSON.
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

    const geminiKeys = getGeminiApiKeys();
    const openRouterKeys = getOpenRouterApiKeys();

    if (geminiKeys.length === 0 && openRouterKeys.length === 0) {
        return { success: false, error: 'AI API key is not configured.' };
    }

    // Build conversation contents for Gemini
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

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

    if (chatHistory && chatHistory.length > 0) {
        for (const msg of chatHistory) {
            contents.push({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            });
        }
    }

    contents.push({
        role: 'user',
        parts: [{ text: userMessage.trim() }]
    });

    let lastErrorMessage = '';

    // 1. Try Gemini API keys
    for (const apiKey of geminiKeys) {
        for (let i = 0; i < CANDIDATE_MODELS.length; i++) {
            const model = CANDIDATE_MODELS[i];
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

            try {
                console.log(`[Composer API] Attempting model: ${model}`);
                let response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        systemInstruction: { parts: [{ text: COMPOSER_SYSTEM_PROMPT }] },
                        contents,
                        generationConfig: { temperature: 0.15, responseMimeType: 'application/json' }
                    })
                });

                if (response.status === 429 && i === 0) {
                    console.warn(`[Composer API] Primary model ${model} rate limited (429). Retrying in 1s...`);
                    await delay(1000);
                    response = await fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            systemInstruction: { parts: [{ text: COMPOSER_SYSTEM_PROMPT }] },
                            contents,
                            generationConfig: { temperature: 0.15, responseMimeType: 'application/json' }
                        })
                    });
                }

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    lastErrorMessage = errData.error?.message || `Status ${response.status}`;
                    console.warn(`[Composer API] Model ${model} error (${response.status}):`, lastErrorMessage);
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
    }

    // 2. OpenRouter Fallback
    let openRouterPrompt = userMessage.trim();
    if (canvasContext) {
        openRouterPrompt = `[CANVAS CONTEXT — current tables on canvas]\n${canvasContext}\n\nUser Request: ${openRouterPrompt}`;
    }

    for (const apiKey of openRouterKeys) {
        console.log(`[Composer OpenRouter API] Trying fallback key...`);
        const result = await callOpenRouter(apiKey, COMPOSER_SYSTEM_PROMPT, openRouterPrompt, chatHistory);
        if (result) {
            try {
                let parsed: ComposerResponse;
                try {
                    parsed = JSON.parse(result.content);
                } catch {
                    const cleaned = result.content.replace(/```json/gi, '').replace(/```/g, '').trim();
                    parsed = JSON.parse(cleaned);
                }

                if (parsed.summary && Array.isArray(parsed.actions)) {
                    console.log(`[Composer OpenRouter API] Success with model: ${result.model}, ${parsed.actions.length} actions`);
                    return {
                        success: true,
                        data: parsed,
                        model: result.model
                    };
                }
            } catch (err) {
                console.error('[Composer OpenRouter API] JSON parse error:', err);
            }
        }
    }

    return {
        success: false,
        error: formatGeminiError(lastErrorMessage)
    };
}
