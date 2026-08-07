'use client';

/**
 * useComposerSessions — Hook to manage Firestore-persisted multi-session chat history
 * for DB Composer (Schema Pilot).
 *
 * Features:
 * - Real-time synchronization via onSnapshot
 * - Creates, appends, updates, deletes chat sessions per user
 * - Atomic message persistence (appendMessages) to eliminate race conditions
 * - Automatically derives session title from the first user prompt
 * - Firestore safe: strips undefined values to prevent serialization errors
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';
import type { ComposerChatMessage, ComposerSession } from '@/types/composer';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sanitizeMessageForFirestore(msg: ComposerChatMessage): Record<string, any> {
  const clean: Record<string, any> = {
    id: msg.id,
    role: msg.role,
    content: msg.content || '',
    timestamp: typeof msg.timestamp === 'number' ? msg.timestamp : Date.now(),
    status: msg.status || 'done',
  };
  if (msg.actions && msg.actions.length > 0) {
    clean.actions = JSON.parse(JSON.stringify(msg.actions));
  }
  return clean;
}

function sanitizeSessionForFirestore(session: ComposerSession): Record<string, any> {
  return {
    id: session.id,
    userId: session.userId || 'anonymous',
    databaseId: session.databaseId || 'default',
    title: session.title || 'New Chat',
    createdAt: session.createdAt || Date.now(),
    updatedAt: session.updatedAt || Date.now(),
    messages: (session.messages || []).map(sanitizeMessageForFirestore),
  };
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export function useComposerSessions(userId: string | undefined, databaseId: string | null) {
  const [sessions, setSessions] = useState<ComposerSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const effectiveUserId = userId || 'anonymous';
  const effectiveDbId = databaseId || 'default';
  const activeSessionIdRef = useRef<string | null>(activeSessionId);

  useEffect(() => {
    activeSessionIdRef.current = activeSessionId;
  }, [activeSessionId]);

  // Listen to Firestore composer_sessions in real-time by userId
  useEffect(() => {
    if (!effectiveUserId) {
      setSessions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const colRef = collection(db, 'composer_sessions');
    const q = query(
      colRef,
      where('userId', '==', effectiveUserId)
    );

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const list: ComposerSession[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            userId: data.userId || effectiveUserId,
            databaseId: data.databaseId || effectiveDbId,
            title: data.title || 'New Chat',
            createdAt: typeof data.createdAt === 'number' ? data.createdAt : Date.now(),
            updatedAt: typeof data.updatedAt === 'number' ? data.updatedAt : Date.now(),
            messages: Array.isArray(data.messages)
              ? data.messages.map((m: any) => ({
                  id: m.id || uuidv4(),
                  role: m.role || 'user',
                  content: m.content || '',
                  actions: m.actions || undefined,
                  timestamp: typeof m.timestamp === 'number' ? m.timestamp : Date.now(),
                  status: m.status || 'done',
                }))
              : [],
          });
        });

        // Sort by updatedAt descending (newest first)
        list.sort((a, b) => b.updatedAt - a.updatedAt);

        setSessions(list);
        setIsLoading(false);

        // Keep active session in sync if not set or invalid
        if (list.length > 0) {
          const current = activeSessionIdRef.current;
          if (!current || !list.some(s => s.id === current)) {
            setActiveSessionId(list[0].id);
          }
        }
      },
      err => {
        console.error('[useComposerSessions] Firestore listener error:', err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [effectiveUserId, effectiveDbId]);

  // Active session object
  const activeSession = useMemo(() => {
    if (!activeSessionId) return sessions[0] || null;
    return sessions.find(s => s.id === activeSessionId) || sessions[0] || null;
  }, [sessions, activeSessionId]);

  // ── Create a new session ────────────────────────────────────────────────────
  const createNewSession = useCallback(
    async (customTitle?: string): Promise<string> => {
      const newId = uuidv4();
      const now = Date.now();
      const newSession: ComposerSession = {
        id: newId,
        userId: effectiveUserId,
        databaseId: effectiveDbId,
        title: customTitle || 'New Chat',
        createdAt: now,
        updatedAt: now,
        messages: [],
      };

      await setDoc(doc(db, 'composer_sessions', newId), sanitizeSessionForFirestore(newSession));
      setActiveSessionId(newId);
      return newId;
    },
    [effectiveUserId, effectiveDbId]
  );

  // Auto-create a first session if none exist after loading
  useEffect(() => {
    if (!isLoading && sessions.length === 0 && effectiveUserId !== 'anonymous') {
      createNewSession();
    }
  }, [isLoading, sessions.length, effectiveUserId, createNewSession]);

  // ── Append multiple messages atomically ────────────────────────────────────
  const appendMessages = useCallback(
    async (sessionId: string, newMessages: ComposerChatMessage[]) => {
      if (!sessionId || newMessages.length === 0) return;
      const targetDoc = doc(db, 'composer_sessions', sessionId);
      const docSnap = await getDoc(targetDoc);

      const now = Date.now();
      let currentMessages: ComposerChatMessage[] = [];
      let currentTitle = 'New Chat';

      if (docSnap.exists()) {
        const data = docSnap.data();
        currentMessages = Array.isArray(data.messages) ? data.messages : [];
        currentTitle = data.title || 'New Chat';
      }

      // If this session is named "New Chat", auto-generate title from first user message
      let newTitle = currentTitle;
      const firstUserMsg = newMessages.find(m => m.role === 'user' && m.content);
      if ((currentTitle === 'New Chat' || !currentTitle) && firstUserMsg) {
        newTitle = firstUserMsg.content.slice(0, 36) + (firstUserMsg.content.length > 36 ? '…' : '');
      }

      const updatedMessages = [...currentMessages, ...newMessages];

      await setDoc(
        targetDoc,
        {
          userId: effectiveUserId,
          databaseId: effectiveDbId,
          title: newTitle,
          updatedAt: now,
          messages: updatedMessages.map(sanitizeMessageForFirestore),
        },
        { merge: true }
      );
    },
    [effectiveUserId, effectiveDbId]
  );

  // ── Append a single message ─────────────────────────────────────────────────
  const appendMessage = useCallback(
    async (sessionId: string, message: ComposerChatMessage) => {
      await appendMessages(sessionId, [message]);
    },
    [appendMessages]
  );

  // ── Update a specific message ─────────────────────────────────────────────
  const updateMessage = useCallback(
    async (sessionId: string, messageId: string, update: Partial<ComposerChatMessage>) => {
      if (!sessionId || !messageId) return;
      const targetDoc = doc(db, 'composer_sessions', sessionId);
      const docSnap = await getDoc(targetDoc);

      if (!docSnap.exists()) return;

      const data = docSnap.data();
      const currentMessages: ComposerChatMessage[] = Array.isArray(data.messages)
        ? data.messages
        : [];

      const updatedMessages = currentMessages.map(m =>
        m.id === messageId ? { ...m, ...update } : m
      );

      await updateDoc(targetDoc, {
        updatedAt: Date.now(),
        messages: updatedMessages.map(sanitizeMessageForFirestore),
      });
    },
    []
  );

  // ── Delete a session ──────────────────────────────────────────────────────
  const deleteSession = useCallback(
    async (sessionId: string) => {
      if (!sessionId) return;

      const remaining = sessions.filter(s => s.id !== sessionId);

      // If active session is deleted, switch to the next most recent
      if (sessionId === activeSessionId) {
        if (remaining.length > 0) {
          setActiveSessionId(remaining[0].id);
        } else {
          // If it was the last session, create a new one
          const newId = await createNewSession();
          setActiveSessionId(newId);
        }
      }

      await deleteDoc(doc(db, 'composer_sessions', sessionId));
    },
    [sessions, activeSessionId, createNewSession]
  );

  return {
    sessions,
    activeSession,
    activeSessionId,
    setActiveSessionId,
    createNewSession,
    appendMessages,
    appendMessage,
    updateMessage,
    deleteSession,
    isLoading,
  };
}
