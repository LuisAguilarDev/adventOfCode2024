import { directions } from '../utils/utills';

//--- Day 18: RAM Run ---
export function getCoords(rawData: string): [number, number][] {
  const coords: [number, number][] = [];
  rawData.split('\n').forEach((rawRow) => {
    const regex = /\d+/g;
    const [col, row] = rawRow.match(regex)?.map(Number) ?? [0, 0];
    coords.push([row, col]);
  });
  return coords;
}
//Part 1
export function steps(
  points: [number, number][],
  ticks: number,
  size: number,
): number {
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => '.'),
  );
  for (let i = 0; i < ticks; i++) {
    const [row, col] = points[i];
    grid[row][col] = '#';
  }
  const visited = new Set(['0,0']);

  const queue = [[0, 0, 0]]; //r,c,steps
  while (queue.length) {
    const [r, c, s] = queue.shift()!;

    for (const [dr, dc] of directions) {
      const [nr, nc] = [r + dr, c + dc];
      const tileContent = grid[nr]?.[nc];
      if (!tileContent || tileContent === '#') continue;
      if (r === size - 1 && c === size - 1) {
        return s;
      }
      const hash = [nr, nc].toString();
      if (!visited.has(hash)) {
        visited.add(hash);
        queue.push([nr, nc, s + 1]);
      }
    }
  }
  return -1;
}

//Part 2
export function unreacheableAt(
  points: [number, number][],
  size: number,
): [number, number] {
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => '.'),
  );
  let i = 0;
  while (true) {
    const [row, col] = points[i];
    grid[row][col] = '#';
    const r = getSteps();
    if (r < 0) {
      return [row, col];
    }
    i++;
  }
  function getSteps(): number {
    const visited = new Set(['0,0']);
    const queue = [[0, 0, 0]]; //r,c,steps
    while (queue.length) {
      const [r, c, s] = queue.shift()!;

      for (const [dr, dc] of directions) {
        const [nr, nc] = [r + dr, c + dc];
        const tileContent = grid[nr]?.[nc];
        if (!tileContent || tileContent === '#') continue;
        if (r === size - 1 && c === size - 1) {
          return s;
        }
        const hash = [nr, nc].toString();
        if (!visited.has(hash)) {
          visited.add(hash);
          queue.push([nr, nc, s + 1]);
        }
      }
    }
    return -1;
  }
}
