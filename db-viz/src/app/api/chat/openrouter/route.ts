/**
 * OpenRouter Chat API Endpoint
 * 
 * Server-side API route for handling AI chat requests.
 * All OpenRouter API calls happen here - API key never exposed to frontend.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getOpenRouterResponse, MAX_INPUT_LENGTH } from '@/lib/openrouter';
import { verifyAuth } from '@/lib/auth-helper';

// Request body type
interface ChatRequest {
    message: string;
}

/**
 * POST /api/chat/openrouter
 * 
 * Accepts: { message: string }
 * Returns: { success: boolean, message: string, error?: string }
 */
export async function POST(request: NextRequest) {
    // Require authentication — prevents anonymous abuse of OpenRouter credits
    const authResult = await verifyAuth(request);
    if (authResult instanceof NextResponse) return authResult;

    try {
        // Parse request body
        const body: ChatRequest = await request.json();

        // Validate message presence
        if (!body.message || typeof body.message !== 'string') {
            return NextResponse.json(
                {
                    success: false,
                    message: '',
                    error: 'Message is required and must be a string',
                },
                { status: 400 }
            );
        }

        // Check message length
        if (body.message.length > MAX_INPUT_LENGTH) {
            return NextResponse.json(
                {
                    success: false,
                    message: '',
                    error: `Message too long. Maximum ${MAX_INPUT_LENGTH} characters allowed.`,
                },
                { status: 400 }
            );
        }

        // Get AI response from OpenRouter
        const result = await getOpenRouterResponse(body.message);

        // Return response
        if (result.success) {
            return NextResponse.json({
                success: true,
                message: result.message,
                sql: result.sql,
            });
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: '',
                    error: result.error || 'Failed to get response',
                },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('[API /chat/openrouter] Error:', error);

        // Handle JSON parse errors
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                {
                    success: false,
                    message: '',
                    error: 'Invalid JSON in request body',
                },
                { status: 400 }
            );
        }

        // Generic error response
        return NextResponse.json(
            {
                success: false,
                message: '',
                error: 'An unexpected error occurred. Please try again.',
            },
            { status: 500 }
        );
    }
}
