'use client';

/**
 * SQLChatbot (Re-exported as Schema Pilot / DB Composer wrapper)
 *
 * Ensures backward compatibility across all dynamic imports while rendering
 * the new Cursor-style DBComposer sidebar & Schema Pilot assistant.
 */

import React from 'react';
import DBComposer, { type DBComposerProps } from '@/components/database/DBComposer';

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  sql?: string[];
  timestamp: Date;
  executed?: boolean;
}

export interface SQLChatbotProps {
  theme?: any;
  onExecuteSQL?: (sqlStatements: string[]) => Promise<void>;
  savedMessages?: ChatMessage[];
  onMessagesChange?: (messages: ChatMessage[]) => void;
  activeDatabaseName?: string;
  // DBComposer forward props (optional)
  isOpen?: boolean;
  onClose?: () => void;
  userId?: string;
  databases?: any[];
  tables?: any[];
  selectedDatabaseId?: string | null;
  setSelectedDatabaseId?: (id: string | null) => void;
  addLog?: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
}

export default function SQLChatbot(props: SQLChatbotProps) {
  // If full DBComposer props are provided, render DBComposer
  if (props.databases && props.addLog && props.setSelectedDatabaseId) {
    return (
      <DBComposer
        isOpen={props.isOpen ?? false}
        onClose={props.onClose ?? (() => {})}
        userId={props.userId}
        databases={props.databases}
        tables={props.tables || []}
        selectedDatabaseId={props.selectedDatabaseId ?? null}
        setSelectedDatabaseId={props.setSelectedDatabaseId}
        addLog={props.addLog}
        theme={props.theme}
      />
    );
  }

  // Fallback: render nothing (DBComposer is managed directly by page.tsx)
  return null;
}