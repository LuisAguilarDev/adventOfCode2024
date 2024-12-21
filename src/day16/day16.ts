//--- Day 16: Reindeer Maze ---
//prettier-ignore
const directions = [[0,1],[1,0],[-1,0],[0,-1]]
//Part 1
export function getLowestScore(grid: string[][]): number {
  const IROWS = grid.length;
  const ICOLS = grid[0].length;
  const gridScore: number[][] = Array.from({ length: IROWS }, () =>
    Array(ICOLS).fill(Infinity),
  );
  const start: [number, number] = getLocation(grid, 'S');
  gridScore[start[0]][start[1]] = 0;
  let lowestScore = Infinity;
  const startDirection: [number, number] = [0, 1];
  const queue: [[number, number], [number, number], number][] = [
    [start, startDirection, 0],
  ]; //position, direction, score
  while (queue.length) {
    const [position, direction, score] = queue.shift()!;
    const [r, c] = position;
    if (score > gridScore[r][c]) continue;
    gridScore[r][c] = score;
    if (grid[r][c] === 'E') {
      lowestScore = Math.min(lowestScore, score);
      continue;
    }
    for (const [dr, dc] of directions) {
      const [nr, nc] = [r + dr, c + dc];
      const ntileContent = grid[nr][nc];
      if (ntileContent === '#') continue;
      const [cdr, cdc] = direction;
      const rotate: boolean = cdr !== dr || cdc !== dc;
      const nScore = score + 1 + (rotate ? 1000 : 0);
      if (nScore > gridScore[nr][nc]) continue;
      queue.push([[nr, nc], [dr, dc], nScore]);
    }
  }
  return lowestScore;
}

export function getLocation(
  grid: Array<string[]>,
  symbol: string,
): [number, number] {
  const [IROWS, ICOLS] = [grid.length, grid[0].length];
  for (let r = 0; r <= IROWS; r++) {
    for (let c = 0; c <= ICOLS; c++) {
      if (grid[r][c] === symbol) {
        return [r, c];
      }
    }
  }
  return [-1, -1];
}

//Part 2
export function getTilesOnBestPath(grid: string[][]): number {
  //prettier-ignore
  const directions = [[1,0],[-1,0],[0,-1],[0,1]]
  const IROWS = grid.length;
  const ICOLS = grid[0].length;

  // Create a grid to store scores by direction grid[r][c][d] [d] -> [0,1,2,3] === [[1,0],[-1,0],[0,-1],[0,1]]
  // Initial Score Infinity
  const gridScore: [number, number, number, number][][] = Array.from(
    { length: IROWS },
    () =>
      Array.from({ length: ICOLS }, () => [
        Infinity,
        Infinity,
        Infinity,
        Infinity,
      ]),
  );
  // Create a grid to store predecessors: prev[r][c][d] = an array of states [pr, pc, pd]
  const prev: [number, number, number][][][][] = Array.from(
    { length: IROWS },
    () => Array.from({ length: ICOLS }, () => [[], [], [], []]),
  );

  const [sr, sc] = getLocation(grid, 'S');
  // Save initial cost
  // Start direction [0,1] index 3 on directions
  gridScore[sr][sc][3] = 0;

  // BFS
  const queue: [number, number, number, number][] = [];
  queue.push([0, sr, sc, 3]);
  while (queue.length) {
    const [score, r, c, d] = queue.shift()!;
    if (score > gridScore[r][c][d]) continue;
    for (let nd = 0; nd < directions.length; nd++) {
      const [dr, dc] = directions[nd];
      const [nr, nc] = [r + dr, c + dc];
      if (grid[nr][nc] === '#') continue;
      const [cdr, cdc] = directions[d];
      const rotate: boolean = cdr !== dr || cdc !== dc;
      const nScore = score + 1 + (rotate ? 1000 : 0);
      if (nScore < gridScore[nr][nc][nd]) {
        // Save new min score
        gridScore[nr][nc][nd] = nScore;
        // Overwrite predecessors with a single new array
        prev[nr][nc][nd] = [[r, c, d]];
        queue.push([nScore, nr, nc, nd]);
      } else if (nScore === gridScore[nr][nc][nd]) {
        // Found another equally good path -> add this predecessor too
        prev[nr][nc][nd].push([r, c, d]);
      }
    }
  }
  const [er, ec] = getLocation(grid, 'E');
  const bestScore = Math.min(...gridScore[er][ec]);

  const visited = new Set<string>(); // store "r,c" as string
  const stack: [number, number, number][] = [];

  // Initialize stack with all directions at E that have cost == bestScore
  for (let d = 0; d < 4; d++) {
    if (gridScore[er][ec][d] === bestScore) {
      stack.push([er, ec, d]);
    }
  }

  while (stack.length > 0) {
    const [r, c, d] = stack.pop()!;
    // Mark the cell as used on a minimal path
    visited.add(`${r},${c}`);

    // Walk back all predecessors
    for (const [pr, pc, pd] of prev[r][c][d]) {
      stack.push([pr, pc, pd]);
    }
  }

  // The visited set now contains all (r,c) positions that lie
  // on at least one minimal path from S to E.
  return visited.size;
}
