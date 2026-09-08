import { NextRequest, NextResponse } from 'next/server';

// Firebase Admin SDK - already initialized
let adminAuth: any = null;

/**
 * Initialize Firebase Admin SDK for token verification
 * Uses credentials from environment variables
 */
function getAdminAuth() {
  if (!adminAuth) {
    try {
      // Dynamic import to avoid issues if firebase-admin is not installed
      const admin = require('firebase-admin');
      
      if (!admin.apps.length) {
        const projectId =
          process.env.FIREBASE_PROJECT_ID ||
          process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
          'database-visualiser';
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

        if (clientEmail && privateKey) {
          admin.initializeApp({
            credential: admin.credential.cert({
              projectId,
              project_id: projectId,
              clientEmail,
              client_email: clientEmail,
              privateKey,
              private_key: privateKey,
            } as any),
          });
        } else {
          admin.initializeApp({
            projectId,
          });
        }
      }
      
      adminAuth = admin.auth();
    } catch (error) {
      console.error('Failed to initialize Firebase Admin:', error);
      throw new Error('Firebase Admin not configured');
    }
  }
  return adminAuth;
}

/**
 * Extract and verify Firebase ID token from request
 * Returns the userId if token is valid, null otherwise
 */
export async function getUserIdFromRequest(
  request: NextRequest
): Promise<string | null> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.warn('No Bearer token found in authorization header');
      return null;
    }

    const token = authHeader.substring(7);
    
    const auth = getAdminAuth();
    const decodedToken = await auth.verifyIdToken(token);
    
    return decodedToken.uid;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Middleware to protect API routes - verifies authentication
 * Returns userId if authenticated, otherwise returns error response
 */
export async function verifyAuth(
  request: NextRequest
): Promise<string | NextResponse> {
  const userId = await getUserIdFromRequest(request);
  
  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized - Invalid or missing token' },
      { status: 401 }
    );
  }
  
  return userId;
}

/**
 * Extract userId from request URL query parameters (fallback method)
 * Less secure than token verification, only use if necessary
 */
export function getUserIdFromQuery(request: NextRequest): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get('userId');
}

/**
 * Verify that a userId from query matches the authenticated user
 * For extra security - compare query userId with token userId
 */
export async function verifyUserIdMatch(
  request: NextRequest,
  queryUserId: string | null
): Promise<boolean> {
  try {
    const tokenUserId = await getUserIdFromRequest(request);
    if (!tokenUserId) return false;
    
    return tokenUserId === queryUserId;
  } catch {
    return false;
  }
}
