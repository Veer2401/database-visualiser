"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openrouter_1 = require("../../lib/openrouter");
const auth_helper_1 = require("../../lib/auth-helper");
const router = (0, express_1.Router)();
router.use(auth_helper_1.authenticateToken);
// POST /api/chat/openrouter
router.post('/openrouter', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                message: '',
                error: 'Message is required and must be a string',
            });
        }
        if (message.length > openrouter_1.MAX_INPUT_LENGTH) {
            return res.status(400).json({
                success: false,
                message: '',
                error: `Message too long. Maximum ${openrouter_1.MAX_INPUT_LENGTH} characters allowed.`,
            });
        }
        const result = await (0, openrouter_1.getOpenRouterResponse)(message);
        if (result.success) {
            return res.json({
                success: true,
                message: result.message,
                sql: result.sql,
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: '',
                error: result.error || 'Failed to get response',
            });
        }
    }
    catch (error) {
        console.error('[API /chat/openrouter] Error:', error);
        return res.status(500).json({
            success: false,
            message: '',
            error: 'An unexpected error occurred. Please try again.',
        });
    }
});
exports.default = router;
