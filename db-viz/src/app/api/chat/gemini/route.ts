import { NextResponse } from 'next/server';
import { getGeminiResponse, MAX_INPUT_LENGTH } from '@/lib/gemini';

/**
 * POST /api/chat/gemini
 * Next.js API route for Gemini AI Composer
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message, contextSchema } = body;

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Message is required and must be a string' },
                { status: 400 }
            );
        }

        const trimmed = message.trim();
        if (trimmed.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Message cannot be empty' },
                { status: 400 }
            );
        }

        if (trimmed.length > MAX_INPUT_LENGTH) {
            return NextResponse.json(
                { success: false, error: `Message exceeds maximum length of ${MAX_INPUT_LENGTH} characters` },
                { status: 400 }
            );
        }

        const response = await getGeminiResponse(trimmed, contextSchema);

        if (!response.success) {
            return NextResponse.json(
                { success: false, error: response.error || 'Failed to get response from Gemini AI' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            explanation: response.explanation,
            sql_statements: response.sql_statements,
            auto_execute: response.auto_execute,
            model: response.model,
        });
    } catch (error) {
        console.error('[API /chat/gemini] Exception:', error);
        return NextResponse.json(
            { success: false, error: 'An unexpected error occurred processing your request.' },
            { status: 500 }
        );
    }
}
