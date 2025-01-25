import fs from 'fs';
//--- Day 15: Warehouse Woes ---
type robotStates = '^' | '>' | 'v' | '<';
const robotMoves = new Map<robotStates, [number, number]>([
  ['^', [-1, 0]],
  ['>', [0, 1]],
  ['v', [1, 0]],
  ['<', [0, -1]],
]);

//Part 1
export function getSumOfAllBoxes([grid, moves]: [string[][], string]): number {
  const copiedGrid = structuredClone(grid);
  // Get start @
  let [r, c] = getStart(grid);
  // Get final map
  for (const move of moves) {
    const [dr, dc] = robotMoves.get(move as robotStates) ?? [0, 0];
    if (!dr && !dc) {
      throw new Error('algo salio mal');
    }
    const [nr, nc] = [r + dr, c + dc];
    const newTile = copiedGrid[nr][nc];
    if (newTile === '#') continue;
    if (newTile === '.') {
      copiedGrid[nr][nc] = '@';
      copiedGrid[r][c] = '.';
      [r, c] = [nr, nc];
      continue;
    }
    // "O" move logic
    let moves = 2;
    let nextTile = copiedGrid[r + dr * moves][c + dc * moves];
    while (!['.', '#'].includes(nextTile)) {
      moves++;
      nextTile = copiedGrid[r + dr * moves][c + dc * moves];
    }
    if (nextTile === '#') continue;
    // Swap first "O" insert on end
    copiedGrid[r + dr * moves][c + dc * moves] = 'O';
    copiedGrid[nr][nc] = '@';
    copiedGrid[r][c] = '.';
    [r, c] = [nr, nc];
  }
  const IROWS = grid.length;
  const ICOLS = grid[0].length;
  let sum = 0;
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      if (copiedGrid[r][c] === 'O') {
        sum += getGPSCoordinate(r, c);
      }
    }
  }
  return sum;
}

//Part 2
export function getSumOfAllBoxes2([grid, moves]: [string[][], string]): number {
  const workingGrid = structuredClone(grid);
  // Get start @
  let [r, c] = getStart(workingGrid);
  // Get final map
  for (const move of moves) {
    const [dr, dc] = robotMoves.get(move as robotStates) ?? [0, 0];
    if (!dr && !dc) {
      throw new Error('algo salio mal');
    }
    const [nr, nc] = [r + dr, c + dc];
    const nexTile = workingGrid[nr][nc];
    if (nexTile === '#') {
      continue;
    }
    if (nexTile === '.') {
      workingGrid[nr][nc] = '@';
      workingGrid[r][c] = '.';
      [r, c] = [nr, nc];
      continue;
    }
    // Search "." ond end of all boxesPath
    const isBlocked = isMovementBlocked([r, c], [dr, dc]);
    if (isBlocked) continue;

    workingGrid[r][c] = '.';
    // "[]" move logic

    // swap for each tile
    if (dr === 0) {
      // Going left or right
      let t = 1;
      let nextTemp = '@';
      while (true) {
        const nextTile = workingGrid[r + dr * t][c + dc * t];
        workingGrid[r + dr * t][c + dc * t] = nextTemp;
        workingGrid[r][c] = '.';
        if (nextTile === '.') break;
        nextTemp = nextTile;
        t++;
      }
    } else {
      // Going top or bottom
      const stack: [number, number, string][] = [[r, c, '@']];
      while (stack.length) {
        const [r, c, nextTemp] = stack.pop()!;
        const [nr, nc] = [r + dr, c + dc];
        const nextTile = workingGrid[nr][nc];
        if (nextTile === '.') {
          workingGrid[nr][nc] = nextTemp;
          continue;
        }
        if (nextTile === '[') {
          stack.push([nr, nc, '[']);
          stack.push([nr, nc + 1, ']']);
          workingGrid[nr][nc] = nextTemp;
          workingGrid[nr][nc + 1] = '.';
        }
        if (nextTile === ']') {
          stack.push([nr, nc, ']']);
          stack.push([nr, nc - 1, '[']);
          workingGrid[nr][nc] = nextTemp;
          workingGrid[nr][nc - 1] = '.';
        }
      }
    }

    [r, c] = [nr, nc];
  }
  const IROWS = grid.length;
  const ICOLS = grid[0].length;
  let sum = 0;
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      if (workingGrid[r][c] === '[') {
        sum += getGPSCoordinate(r, c);
      }
    }
  }

  function isMovementBlocked(start: number[], direction: number[]): boolean {
    const [dr, dc] = direction;
    const stack = [start];
    while (stack.length) {
      const [r, c] = stack.pop()!;
      const [nr, nc] = [r + dr, c + dc];
      const nextTile = workingGrid[nr][nc];
      if (nextTile === '#') return true;
      if (nextTile === '.') continue;
      // Going left or right
      if (dr === 0) {
        stack.push([nr, nc]);
        continue;
      }
      // Going top or bottom
      if (nextTile === '[') {
        stack.push([nr, nc]);
        stack.push([nr, nc + 1]);
        continue;
      }
      if (nextTile === ']') {
        stack.push([nr, nc]);
        stack.push([nr, nc - 1]);
      }
    }
    return false;
  }
  return sum;
}

//AUX FUNCTIONS
export function getGridAndMoves(rawData: string): [string[][], string] {
  const grid: string[][] = [];
  let moves = '';
  let isGrid = true;
  rawData.split('\n').forEach((row) => {
    if (isGrid && row.trim()) grid.push(row.trim().split(''));
    else {
      moves += row.trim();
    }
    if (!row.trim()) isGrid = false;
  });
  return [grid, moves];
}

function getGPSCoordinate(r: number, c: number) {
  return r * 100 + c;
}

function getStart(grid: string[][]): [number, number] {
  const IROWS = grid.length;
  const ICOLS = grid[0].length;
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      if (grid[r][c] === '@') {
        return [r, c];
      }
    }
  }
  return [-1, -1];
}

export function getWideGrid(grid: string[][]): string[][] {
  const wideGrid: string[][] = [];
  for (const row of grid) {
    const newRow: string[] = [];
    wideGrid.push(newRow);
    for (const tile of row) {
      if (tile === '#') {
        newRow.push('#');
        newRow.push('#');
        continue;
      }
      if (tile === '.') {
        newRow.push('.');
        newRow.push('.');
        continue;
      }
      if (tile === 'O') {
        newRow.push('[');
        newRow.push(']');
        continue;
      }
      if (tile === '@') {
        newRow.push('@');
        newRow.push('.');
      }
    }
  }
  return wideGrid;
}

async function printGrid(grid: string[][]) {
  await waitSeconds(0);
  let print = '';
  for (const row of grid) {
    print += row.join('') + '\n';
  }
  fs.appendFileSync('output.txt', print, 'utf8');
}

async function waitSeconds(s: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, s * 1000);
  });
}
