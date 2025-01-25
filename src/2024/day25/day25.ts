// --- Day 25: Code Chronicle ---

// getting data
export function getData(rawString: string): [number[][], number[][], number] {
  const locks: number[][] = [];
  const keys: number[][] = [];
  const baseData: string[][][] = [];
  let schematic: string[][] = [];
  let heigth: number;
  rawString.split('\n').forEach((str, i, arr) => {
    if (!str.trim()) {
      baseData.push(structuredClone(schematic));
      heigth ??= schematic.length;
      schematic = [];
      return;
    }
    schematic.push(str.trim().split(''));
    if (i === arr.length - 1) {
      baseData.push(structuredClone(schematic));
    }
  });
  baseData.forEach((grid: string[][]) => {
    if (grid[0].every((str) => str === '#')) {
      locks.push(getHeightsLocks(grid));
      return;
    }
    if (grid.at(-1)!.every((str) => str === '#')) {
      keys.push(getHeightsKeys(grid));
    }
  });
  heigth ??= 0;
  return [locks, keys, heigth];
}
function getHeightsLocks(grid: string[][]): number[] {
  let heigths: number[] = [];
  for (let c = 0; c < grid[0].length; c++) {
    for (let r = grid.length - 1; r >= 0; r--) {
      if (grid[r][c] === '#') {
        heigths.push(r);
        break;
      }
    }
  }
  return heigths;
}
function getHeightsKeys(grid: string[][]): number[] {
  let heigths: number[] = [];
  for (let c = 0; c < grid[0].length; c++) {
    for (let r = 0; r < grid.length; r++) {
      if (grid[r][c] === '#') {
        heigths.push(Math.abs(r - (grid.length - 1)));
        break;
      }
    }
  }
  return heigths;
}

// Part 1
export function fits(
  locks: number[][],
  keys: number[][],
  heigth: number,
): number {
  let fits = 0;
  for (const lock of locks) {
    for (const key of keys) {
      let itFits = true;
      for (let i = 0; i < lock.length; i++) {
        if (lock[i] >= Math.abs(key[i] - heigth) - 1) {
          itFits = false;
          break;
        }
      }
      if (itFits) {
        fits++;
      }
    }
  }
  return fits;
}
