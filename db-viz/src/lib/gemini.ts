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

const SYSTEM_PROMPT = `You are the AI Composer for SchemaView (a visual database management system & interactive canvas tool).
Your primary job is to act like a Cursor-like AI Composer for database design and SQL generation.

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
