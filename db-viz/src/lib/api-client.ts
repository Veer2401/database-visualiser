import { auth } from './firebase';

/**
 * Authenticated fetch wrapper
 * Automatically adds Firebase ID token to all requests
 * This ensures the backend can verify the user's identity
 */
async function authenticatedFetch(
  url: string,
  options?: RequestInit
): Promise<Response> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated. Please log in.');
  }

  // Get Firebase ID token
  const token = await user.getIdToken();

  // Prepare headers with authorization
  const headers = new Headers(options?.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Helper for GET requests with authentication
 */
export async function apiGet(url: string): Promise<any> {
  const response = await authenticatedFetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Helper for POST requests with authentication
 */
export async function apiPost(url: string, data: any): Promise<any> {
  const response = await authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Helper for PUT requests with authentication
 */
export async function apiPut(url: string, data: any): Promise<any> {
  const response = await authenticatedFetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Helper for DELETE requests with authentication
 */
export async function apiDelete(url: string): Promise<any> {
  const response = await authenticatedFetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Helper for PATCH requests with authentication
 */
export async function apiPatch(url: string, data: any): Promise<any> {
  const response = await authenticatedFetch(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Unauthenticated fetch helper - use for public endpoints only
 */
export async function apiPublicGet(url: string): Promise<any> {
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Authenticated fetch – mirrors native fetch() but auto-attaches the Firebase
 * Bearer token. Use this instead of raw fetch() for all /api/* calls.
 */
export async function authFetch(url: string, options?: RequestInit): Promise<Response> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated. Please log in.');
  }
  const token = await user.getIdToken();
  const headers = new Headers(options?.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  return fetch(url, { ...options, headers });
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return auth.currentUser !== null;
}

/**
 * Get current user's Firebase ID token
 */
export async function getAuthToken(): Promise<string | null> {
  if (!auth.currentUser) return null;
  return auth.currentUser.getIdToken();
}

/**
 * Get current user's ID
 */
export function getCurrentUserId(): string | null {
  return auth.currentUser?.uid || null;
}
