"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
let adminAuth = null;
function getAdminAuth() {
    if (!adminAuth) {
        try {
            const admin = require('firebase-admin');
            if (!admin.apps.length) {
                const serviceAccount = {
                    projectId: process.env.FIREBASE_PROJECT_ID || 'database-visualiser',
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                };
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                });
            }
            adminAuth = admin.auth();
        }
        catch (error) {
            console.warn('Firebase Admin not initialized, falling back to soft token check:', error);
            return null;
        }
    }
    return adminAuth;
}
async function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Unauthorized - Missing Bearer token' });
    }
    const token = authHeader.substring(7);
    try {
        const auth = getAdminAuth();
        if (auth) {
            const decodedToken = await auth.verifyIdToken(token);
            req.userId = decodedToken.uid;
            return next();
        }
        // Fallback if Firebase Admin isn't configured with service account locally
        req.userId = token.length > 5 ? token.substring(0, 20) : 'default-user';
        return next();
    }
    catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ success: false, error: 'Unauthorized - Invalid token' });
    }
}
