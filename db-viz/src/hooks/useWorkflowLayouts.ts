'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  where,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { WorkflowLayout } from '@/types/database';

// Debounce delay in milliseconds - reduced for faster position saves
const DEBOUNCE_DELAY = 300;

interface UseWorkflowLayoutsProps {
  userId: string | undefined;
  databaseId: string | null;
}

interface LayoutPosition {
  x: number;
  y: number;
}

interface LayoutsMap {
  [tableId: string]: LayoutPosition;
}

export function useWorkflowLayouts({ userId, databaseId }: UseWorkflowLayoutsProps) {
  const [layouts, setLayouts] = useState<LayoutsMap>({});
  const [isLoading, setIsLoading] = useState(true);

  // Pending updates queue for debouncing
  const pendingUpdates = useRef<Map<string, LayoutPosition>>(new Map());
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Generate composite document ID
  const getLayoutDocId = useCallback(
    (tableId: string) => {
      if (!userId || !databaseId) return null;
      return `${userId}_${databaseId}_${tableId}`;
    },
    [userId, databaseId]
  );

  // Subscribe to layout updates for the current database
  useEffect(() => {
    if (!userId || !databaseId) {
      setLayouts({});
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const q = query(
      collection(db, 'workflow_layouts'),
      where('userId', '==', userId),
      where('databaseId', '==', databaseId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const layoutsMap: LayoutsMap = {};
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.tableId && data.position) {
            layoutsMap[data.tableId] = {
              x: data.position.x,
              y: data.position.y,
            };
          }
        });
        setLayouts(layoutsMap);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching workflow layouts:', error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId, databaseId]);

  // Flush pending updates to Firestore
  const flushUpdates = useCallback(async () => {
    if (!userId || !databaseId || pendingUpdates.current.size === 0) return;

    const batch = writeBatch(db);
    const updates = new Map(pendingUpdates.current);
    pendingUpdates.current.clear();

    updates.forEach((position, tableId) => {
      const docId = `${userId}_${databaseId}_${tableId}`;
      const layoutRef = doc(db, 'workflow_layouts', docId);

      const layoutData: Omit<WorkflowLayout, 'id'> & { id: string } = {
        id: docId,
        userId,
        databaseId,
        tableId,
        position,
        updatedAt: Timestamp.now() as unknown as Date,
      };

      batch.set(layoutRef, layoutData, { merge: true });
    });

    try {
      await batch.commit();
      console.log('[WorkflowLayouts] Saved positions for', updates.size, 'tables');
    } catch (error) {
      console.error('[WorkflowLayouts] Error saving workflow layouts:', error);
      // Re-add failed updates to pending queue
      updates.forEach((position, tableId) => {
        pendingUpdates.current.set(tableId, position);
      });
    }
  }, [userId, databaseId]);

  // Update a single table's position with debouncing
  const updateTablePosition = useCallback(
    (tableId: string, position: LayoutPosition) => {
      if (!userId || !databaseId) {
        console.warn('[WorkflowLayouts] Cannot save position - missing userId or databaseId');
        return;
      }

      console.log('[WorkflowLayouts] Queueing position update for table:', tableId, position);

      // Add to pending updates
      pendingUpdates.current.set(tableId, position);

      // Update local state immediately for responsiveness
      setLayouts((prev) => ({
        ...prev,
        [tableId]: position,
      }));

      // Clear existing debounce timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // Set new debounce timer
      debounceTimer.current = setTimeout(() => {
        flushUpdates();
      }, DEBOUNCE_DELAY);
    },
    [userId, databaseId, flushUpdates]
  );

  // Batch update multiple table positions
  const updateMultiplePositions = useCallback(
    async (updates: { tableId: string; position: LayoutPosition }[]) => {
      if (!userId || !databaseId || updates.length === 0) return;

      const batch = writeBatch(db);

      updates.forEach(({ tableId, position }) => {
        const docId = `${userId}_${databaseId}_${tableId}`;
        const layoutRef = doc(db, 'workflow_layouts', docId);

        const layoutData = {
          id: docId,
          userId,
          databaseId,
          tableId,
          position,
          updatedAt: Timestamp.now(),
        };

        batch.set(layoutRef, layoutData, { merge: true });
      });

      try {
        await batch.commit();

        // Update local state
        setLayouts((prev) => {
          const newLayouts = { ...prev };
          updates.forEach(({ tableId, position }) => {
            newLayouts[tableId] = position;
          });
          return newLayouts;
        });
      } catch (error) {
        console.error('Error batch updating workflow layouts:', error);
      }
    },
    [userId, databaseId]
  );

  // Get position for a specific table (returns saved position or undefined)
  const getTablePosition = useCallback(
    (tableId: string): LayoutPosition | undefined => {
      return layouts[tableId];
    },
    [layouts]
  );

  // Cleanup on unmount - ensure pending updates are saved
  useEffect(() => {
    const flushRef = flushUpdates;
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      // Always flush any remaining updates on unmount
      if (pendingUpdates.current.size > 0) {
        console.log('[WorkflowLayouts] Flushing remaining updates on unmount:', pendingUpdates.current.size);
        flushRef();
      }
    };
  }, [flushUpdates]);

  return {
    layouts,
    isLoading,
    updateTablePosition,
    updateMultiplePositions,
    getTablePosition,
  };
}
