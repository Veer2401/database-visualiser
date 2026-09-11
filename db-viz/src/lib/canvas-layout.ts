import { Table } from '@/types/database';

export interface TableLayoutPosition {
  x: number;
  y: number;
}

const TABLE_WIDTH = 280;
const COLUMN_X_GAP = 140; // Gap between columns (table + gap = 420px column pitch)
const ROW_Y_GAP = 70; // Vertical gap between stacked tables in the same column
const HEADER_HEIGHT = 44;
const ROW_HEIGHT = 38;
const FOOTER_HEIGHT = 36;
const START_X = 80;
const START_Y = 80;

/**
 * Estimates the rendered pixel height of a table node based on its column count.
 */
export function estimateTableHeight(table: Table): number {
  const columnCount = table.columns?.length || 0;
  return HEADER_HEIGHT + columnCount * ROW_HEIGHT + FOOTER_HEIGHT;
}

/**
 * Computes estimated Y offset of a specific column inside a table node.
 */
export function getColumnYOffset(table: Table, columnId: string): number {
  const index = table.columns.findIndex((c) => c.id === columnId);
  if (index === -1) return HEADER_HEIGHT + ROW_HEIGHT / 2;
  return HEADER_HEIGHT + index * ROW_HEIGHT + ROW_HEIGHT / 2;
}

/**
 * Connection-Priority Hierarchical Layout:
 * 1. Analyzes foreign key relationships to determine graph dependencies (Parent -> Child).
 * 2. Computes a connection priority score for every table. Tables with the most connections
 *    (especially parent tables referenced by others as foreign keys) have the highest priority.
 * 3. Assigns tables to horizontal layers (columns from left to right):
 *    - Layer 0 (Leftmost): High-priority root/parent tables (e.g. `users`).
 *    - Layer 1: Derived/child tables that reference Layer 0 (e.g. `posts`, `follows`).
 *    - Layer 2+: Tables referencing Layer 1, etc.
 * 4. Optimizes vertical alignment (Y) so that referencing foreign key rows align
 *    horizontally with their referenced primary key rows, creating clean straight lines.
 */
export function calculatePriorityLayout(tables: Table[]): Map<string, TableLayoutPosition> {
  const positions = new Map<string, TableLayoutPosition>();
  if (!tables || tables.length === 0) return positions;

  const tableMap = new Map<string, Table>(tables.map((t) => [t.id, t]));

  // Adjacency graph:
  // parent -> children (tables that reference parent)
  // child -> parents (tables that child references)
  const childrenMap = new Map<string, Set<string>>(); // parentId -> Set of childIds
  const parentsMap = new Map<string, Set<string>>(); // childId -> Set of parentIds
  const referencedByCount = new Map<string, number>();
  const referencingCount = new Map<string, number>();

  tables.forEach((t) => {
    childrenMap.set(t.id, new Set());
    parentsMap.set(t.id, new Set());
    referencedByCount.set(t.id, 0);
    referencingCount.set(t.id, 0);
  });

  tables.forEach((table) => {
    table.columns.forEach((column) => {
      if (column.isForeignKey && column.foreignKeyReference?.tableId) {
        const parentId = column.foreignKeyReference.tableId;
        if (tableMap.has(parentId) && parentId !== table.id) {
          childrenMap.get(parentId)?.add(table.id);
          parentsMap.get(table.id)?.add(parentId);
          referencedByCount.set(parentId, (referencedByCount.get(parentId) || 0) + 1);
          referencingCount.set(table.id, (referencingCount.get(table.id) || 0) + 1);
        }
      }
    });
  });

  // Calculate priority score for each table:
  // High score = Most referenced parent tables (should be placed leftmost)
  const priorityScores = new Map<string, number>();
  tables.forEach((t) => {
    const refs = referencedByCount.get(t.id) || 0;
    const deps = referencingCount.get(t.id) || 0;
    // Score heavily rewards being referenced by others, while penalizing being dependent on others
    const score = refs * 10 - deps * 2 + (refs + deps);
    priorityScores.set(t.id, score);
  });

  // Assign column layers (0 = leftmost, 1 = next column, ...)
  const layerMap = new Map<string, number>();
  const visited = new Set<string>();

  // Identify root tables:
  // Tables that are referenced by others but have NO parents within this database,
  // or tables with the highest priority score.
  const rootTables = tables
    .filter((t) => (parentsMap.get(t.id)?.size || 0) === 0 && (childrenMap.get(t.id)?.size || 0) > 0)
    .sort((a, b) => (priorityScores.get(b.id) || 0) - (priorityScores.get(a.id) || 0));

  // If no pure root tables found (e.g. cycle), pick the table with the highest priority score
  if (rootTables.length === 0) {
    const sortedAll = [...tables].sort(
      (a, b) => (priorityScores.get(b.id) || 0) - (priorityScores.get(a.id) || 0)
    );
    if (sortedAll.length > 0) {
      rootTables.push(sortedAll[0]);
    }
  }

  // BFS / DAG layer assignment starting from root tables
  const queue: Array<{ id: string; layer: number }> = rootTables.map((t) => ({ id: t.id, layer: 0 }));
  rootTables.forEach((t) => {
    layerMap.set(t.id, 0);
    visited.add(t.id);
  });

  while (queue.length > 0) {
    const { id, layer } = queue.shift()!;
    const children = childrenMap.get(id) || new Set();

    children.forEach((childId) => {
      // Child layer must be at least layer + 1
      const currentLayer = layerMap.get(childId) ?? -1;
      const targetLayer = Math.max(currentLayer, layer + 1);
      layerMap.set(childId, targetLayer);

      if (!visited.has(childId)) {
        visited.add(childId);
        queue.push({ id: childId, layer: targetLayer });
      }
    });
  }

  // Handle any remaining unvisited tables (independent or disconnected)
  const remainingTables = tables
    .filter((t) => !layerMap.has(t.id))
    .sort((a, b) => (priorityScores.get(b.id) || 0) - (priorityScores.get(a.id) || 0));

  remainingTables.forEach((t) => {
    // If table has parents that are mapped, place after them
    const parents = parentsMap.get(t.id) || new Set();
    let maxParentLayer = -1;
    parents.forEach((pId) => {
      if (layerMap.has(pId)) {
        maxParentLayer = Math.max(maxParentLayer, layerMap.get(pId)!);
      }
    });

    if (maxParentLayer >= 0) {
      layerMap.set(t.id, maxParentLayer + 1);
    } else {
      // Independent table: put in Layer 0
      layerMap.set(t.id, 0);
    }
  });

  // Group tables by layer
  const columns: Table[][] = [];
  tables.forEach((t) => {
    const l = layerMap.get(t.id) || 0;
    while (columns.length <= l) {
      columns.push([]);
    }
    columns[l].push(t);
  });

  // Sort tables within each layer by priority and relationship alignment
  columns.forEach((colTables, colIndex) => {
    colTables.sort((a, b) => {
      // If colIndex > 0, try to order child tables relative to their parent's position
      if (colIndex > 0) {
        const aParents = Array.from(parentsMap.get(a.id) || []);
        const bParents = Array.from(parentsMap.get(b.id) || []);
        const aFirstParentY = aParents[0] && positions.has(aParents[0]) ? positions.get(aParents[0])!.y : 0;
        const bFirstParentY = bParents[0] && positions.has(bParents[0]) ? positions.get(bParents[0])!.y : 0;
        if (aFirstParentY !== bFirstParentY) {
          return aFirstParentY - bFirstParentY;
        }
      }
      return (priorityScores.get(b.id) || 0) - (priorityScores.get(a.id) || 0);
    });

    // Compute X coordinate for this column
    const colX = START_X + colIndex * (TABLE_WIDTH + COLUMN_X_GAP);

    // Compute Y coordinate for tables in this column
    let currentY = START_Y;

    colTables.forEach((table, index) => {
      let desiredY = currentY;

      // Row alignment optimization:
      // If this is the primary child table referencing a parent in a previous column,
      // align its foreign key row with the parent's primary key row for a straight horizontal line.
      const parents = Array.from(parentsMap.get(table.id) || []);
      if (parents.length > 0 && index === 0) {
        const parentId = parents[0];
        const parentTable = tableMap.get(parentId);
        const parentPos = positions.get(parentId);

        if (parentTable && parentPos) {
          // Find the specific matching FK and PK columns
          const fkCol = table.columns.find(
            (c) => c.isForeignKey && c.foreignKeyReference?.tableId === parentId
          );
          if (fkCol && fkCol.foreignKeyReference) {
            const parentColId = fkCol.foreignKeyReference.columnId;
            const parentColYOffset = getColumnYOffset(parentTable, parentColId);
            const childColYOffset = getColumnYOffset(table, fkCol.id);

            // Calculate Y so: parentPos.y + parentColYOffset === childY + childColYOffset
            const alignedY = parentPos.y + parentColYOffset - childColYOffset;
            desiredY = Math.max(currentY, alignedY);
          }
        }
      }

      positions.set(table.id, {
        x: Math.round(colX),
        y: Math.round(desiredY),
      });

      const tableHeight = estimateTableHeight(table);
      currentY = desiredY + tableHeight + ROW_Y_GAP;
    });
  });

  return positions;
}

/**
 * Calculates an optimal position for a newly created table based on its relationships.
 * If it has foreign keys referencing existing tables, it places it to the right of the parent.
 * Otherwise, it appends it to the rightmost available space.
 */
export function calculateNewTablePosition(
  newTable: Table,
  existingTables: Table[]
): TableLayoutPosition {
  if (!existingTables || existingTables.length === 0) {
    return { x: START_X, y: START_Y };
  }

  // Combine with existing tables and run full priority layout to find ideal spot
  const combined = [...existingTables, newTable];
  const layout = calculatePriorityLayout(combined);
  const pos = layout.get(newTable.id);

  if (pos) {
    return pos;
  }

  // Fallback: place to the right of rightmost table
  const rightmost = existingTables.reduce((max, t) => (t.position.x > max.position.x ? t : max));
  return {
    x: rightmost.position.x + TABLE_WIDTH + COLUMN_X_GAP,
    y: rightmost.position.y,
  };
}
