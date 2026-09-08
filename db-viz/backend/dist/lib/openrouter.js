"use strict";
/**
 * OpenRouter & AI Service
 *
 * Handles communication with OpenRouter API for SQL/DBMS focused conversations.
 * Implements model fallback chain for reliability.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_INPUT_LENGTH = void 0;
exports.getOpenRouterResponse = getOpenRouterResponse;
const MODELS = {
    primary: 'google/gemini-2.0-flash-001',
    fallback1: 'mistralai/mistral-small-3.1-24b-instruct',
    fallback2: 'meta-llama/llama-3.3-8b-instruct',
};
const SYSTEM_PROMPT = `You are a friendly and professional SQL and Database Management System (DBMS) assistant integrated into the Schema View app.

IMPORTANT RULES:
1. You PRIMARILY answer questions related to SQL, databases, and DBMS concepts.
2. You ALSO handle basic conversational greetings and pleasantries naturally. Respond warmly to "Hi", "Hello", "Hey", "Thanks", "Thank you", "Bye", "Good morning", etc. Keep greeting responses short and friendly, and gently mention you can help with SQL questions.
3. Provide educational, accurate, and professional responses.
4. Include SQL syntax examples when relevant, using standard SQL or PostgreSQL syntax. Wrap SQL in markdown code blocks (e.g. \`\`\`sql ... \`\`\`).
5. NEVER pretend to execute queries or access any actual database.
6. If asked about non-database topics (other than basic greetings), politely redirect to SQL/DBMS topics.
7. Keep responses concise but comprehensive.
8. Use proper SQL formatting with appropriate capitalization of SQL keywords.
9. When explaining query results or errors, be clear and provide examples.

You help users understand:
- SQL syntax (SELECT, INSERT, UPDATE, DELETE, etc.)
- Database design and normalization
- Joins, indexes, and constraints  
- Stored procedures and functions
- Database optimization and best practices
- ACID properties and transactions
- Query results interpretation and debugging SQL errors`;
const MAX_INPUT_LENGTH = 1000;
exports.MAX_INPUT_LENGTH = MAX_INPUT_LENGTH;
function extractSQLQueries(text) {
    const sqlQueries = [];
    let cleanedText = text;
    const codeBlockRegex = /```(?:sql)?\s*([\s\S]*?)```/gi;
    let match;
    while ((match = codeBlockRegex.exec(text)) !== null) {
        const sqlContent = match[1].trim();
        if (sqlContent && isSQLStatement(sqlContent)) {
            sqlQueries.push(sqlContent);
        }
    }
    cleanedText = cleanedText.replace(codeBlockRegex, '').trim();
    if (sqlQueries.length === 0) {
        const sqlKeywords = /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TRUNCATE|GRANT|REVOKE|USE|SHOW|DESCRIBE|EXPLAIN|WITH)\b/i;
        const blocks = text.split(';');
        for (let block of blocks) {
            block = block.trim();
            if (!block)
                continue;
            let testBlock = block;
            if (!testBlock.endsWith(';')) {
                testBlock = block + ';';
            }
            if (sqlKeywords.test(testBlock)) {
                const cleanedBlock = block
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0)
                    .join('\n');
                if (cleanedBlock && isSQLStatement(cleanedBlock)) {
                    sqlQueries.push(cleanedBlock);
                }
            }
        }
        for (const sql of sqlQueries) {
            const escapedSQL = sql.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            cleanedText = cleanedText.replace(new RegExp(escapedSQL, 'gi'), '');
        }
    }
    cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n').trim();
    return { cleanedText, sqlQueries };
}
function isSQLStatement(text) {
    const sqlKeywords = /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TRUNCATE|GRANT|REVOKE|USE|SHOW|DESCRIBE|EXPLAIN|WITH)\b/i;
    return sqlKeywords.test(text.trim());
}
function validateInput(message) {
    if (!message || typeof message !== 'string') {
        return { valid: false, error: 'Message is required and must be a string' };
    }
    const trimmed = message.trim();
    if (trimmed.length === 0) {
        return { valid: false, error: 'Message cannot be empty' };
    }
    if (trimmed.length > MAX_INPUT_LENGTH) {
        return { valid: false, error: `Message too long. Maximum ${MAX_INPUT_LENGTH} characters allowed.` };
    }
    return { valid: true };
}
async function callOpenRouter(model, messages, apiKey) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://schemaview.app',
            'X-Title': 'Schema View',
        },
        body: JSON.stringify({
            model,
            messages,
            max_tokens: 1024,
            temperature: 0.7,
        }),
    });
    if (!response.ok) {
        const errorData = (await response.json().catch(() => ({})));
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }
    return (await response.json());
}
async function getOpenRouterResponse(userMessage) {
    const validation = validateInput(userMessage);
    if (!validation.valid) {
        return {
            success: false,
            message: '',
            error: validation.error,
        };
    }
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY_2;
    if (!apiKey) {
        console.error('OPENROUTER_API_KEY is not configured');
        return {
            success: false,
            message: '',
            error: 'AI service is not configured. Please contact support.',
        };
    }
    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage.trim() },
    ];
    const modelChain = [MODELS.primary, MODELS.fallback1, MODELS.fallback2];
    for (const model of modelChain) {
        try {
            console.log(`[OpenRouter] Trying model: ${model}`);
            const response = await callOpenRouter(model, messages, apiKey);
            if (response.error) {
                console.warn(`[OpenRouter] Model ${model} returned error:`, response.error.message);
                continue;
            }
            const content = response.choices?.[0]?.message?.content;
            if (!content) {
                console.warn(`[OpenRouter] Model ${model} returned empty response`);
                continue;
            }
            console.log(`[OpenRouter] Success with model: ${model}`);
            const { cleanedText, sqlQueries } = extractSQLQueries(content.trim());
            return {
                success: true,
                message: cleanedText || content.trim(),
                sql: sqlQueries.length > 0 ? sqlQueries : undefined,
                model,
            };
        }
        catch (error) {
            console.error(`[OpenRouter] Model ${model} failed:`, error instanceof Error ? error.message : error);
        }
    }
    console.error('[OpenRouter] All models in fallback chain failed');
    return {
        success: false,
        message: '',
        error: 'Unable to get a response at this time. Please try again later.',
    };
}
