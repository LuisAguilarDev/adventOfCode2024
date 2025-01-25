//--- Day 10: Hoof It ---
// Based on un-scorched scraps of the book, you determine that a good hiking trail is as long as possible and has an even, gradual,
// uphill slope. For all practical purposes, this means that a hiking trail is any path that starts at height 0, ends at height 9,
// and always increases by a height of exactly 1 at each step. Hiking trails never include diagonal steps - only up, down, left,
// or right (from the perspective of the map).

import { directions } from '../utils/utills';

// A trailhead starts on 0 and trace a route from 0 to 9.
// Trailhead score is equal to number of paths 2 for this example:
// ...0...
// ...1...
// ...2...
// 6543456
// 7.....7
// 8.....8
// 9.....9
// impassable tiles "."
//Part 1
export function getScore(map: string[][]): number {
  let score = 0;
  const IROWS = map.length;
  const ICOLS = map[0].length;
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      if (map[r][c] === '0') {
        score += getScoreTile(map, [r, c]);
      }
    }
  }
  return score;
}

function getScoreTile(map: string[][], start: [r: number, c: number]): number {
  // Trailhead score
  const validPath = new Set();
  const visited = new Set();

  //DFS - fast access O(1) pop push
  const stack = [[...start, 0]];
  while (stack.length) {
    const [r, c, v] = stack.pop()!;
    const hash = [r, c].toString();
    if (map[r][c] === '9') validPath.add(hash);
    visited.add(hash); // DFS
    for (const [dr, dc] of directions) {
      const [nr, nc] = [r + dr, c + dc];
      const tileContent = map[nr]?.[nc];
      if (!tileContent || tileContent === '.') continue;
      if (Number(tileContent) - v !== 1) continue;
      const hash = [nr, nc].toString();
      if (!visited.has(hash)) {
        //visited.add(hash); //BFS
        stack.push([nr, nc, v + 1]);
      }
    }
  }
  return validPath.size;
}

//Part 2
export function getScore2(map: string[][]): number {
  let score = 0;
  const IROWS = map.length;
  const ICOLS = map[0].length;
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      if (map[r][c] === '0') {
        score += getScoreTile2(map, [r, c]);
      }
    }
  }
  return score;
}
//TODO: se puede marcar el numero visitado con un numero de caminos para no revisitar los caminos repetidos
function getScoreTile2(map: string[][], start: [r: number, c: number]): number {
  // Trailhead score
  let paths = 0;

  //DFS - fast access O(1) pop push
  const stack: Array<[number, number, number, Set<string>]> = [
    [...start, 0, new Set(start.toString())],
  ];
  while (stack.length) {
    const [r, c, v, visited] = stack.pop()!;
    for (const [dr, dc] of directions) {
      const [nr, nc] = [r + dr, c + dc];
      const tileContent = map[nr]?.[nc];
      if (!tileContent || tileContent === '.') continue;
      if (Number(tileContent) - v !== 1) continue;
      const hash = [nr, nc].toString();
      if (tileContent === '9') paths++;
      if (!visited.has(hash)) {
        visited.add(hash);
        stack.push([nr, nc, v + 1, new Set([...visited])]);
      }
    }
  }
  return paths;
}
