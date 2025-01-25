//--- Day 20: Race Condition ---

import { getLocation } from '../day16/day16';
import { getGrid } from '../day8/day8';
import { directions } from '../utils/utills';

//Part1
export function cheatsAvailable(grid: string[][], savedTime = 0) {
  const start = getLocation(grid, 'S');
  const path = getPath(grid, start);
  return cheatedRoutes(grid, path, savedTime);
}
function getPath(
  map: string[][],
  start: [r: number, c: number],
): [number, number][] {
  const visited = new Set(start.toString());
  const queue: [number, number, [number, number][]][] = [[...start, [start]]]; //r,c,path

  while (queue.length) {
    const [r, c, path] = queue.shift()!;
    for (const [dr, dc] of directions) {
      const [nr, nc] = [r + dr, c + dc];
      const tileContent = map[nr]?.[nc];
      if (!tileContent || tileContent === '#') continue;
      const nPath = [...path];
      nPath.push([nr, nc]);
      if (tileContent === 'E') return nPath;
      const hash = [nr, nc].toString();
      if (!visited.has(hash)) {
        visited.add(hash);
        queue.push([nr, nc, nPath]);
      }
    }
  }
  return [];
}
function cheatedRoutes(
  map: string[][],
  path: [number, number][],
  savedTime: number,
): { q: number; o: any } {
  let qr = 0; //quantity routes
  let IROWS = map.length;
  let ICOLS = map[0].length;
  const o: any = {};
  for (let i = 0; i < path.length; i++) {
    const [r, c] = path[i];
    for (const [dr, dc] of directions) {
      const [nr, nc] = [r + dr, c + dc];
      const tileContent = map[nr]?.[nc];
      // No cheat on outside wall
      if (nr === IROWS || nc === ICOLS || nc === 0 || nr === 0) continue;
      // No cheat needed
      if (tileContent !== '#') continue;
      // next tile should be part of the initial path
      const [nnr, nnc] = [nr + dr, nc + dc];
      const index = path.findIndex((item) => {
        return item[0] === nnr && item[1] === nnc;
      });
      if (index < 0 || index < i) continue;
      const time = index - i - 2;
      if (time < savedTime) continue;
      o[time] = (o[time] ?? 0) + 1;
      qr++;
    }
  }
  return { q: qr, o };
}
//Part2
export function cheatsAvailablePartTwo(grid: string[][], savedTime = 0) {
  const start = getLocation(grid, 'S');
  const path = getPath(grid, start);
  return cheatedRoutesPartTwo(grid, path, savedTime);
}
function cheatedRoutesPartTwo(
  map: string[][],
  path: [number, number][],
  savedTime: number,
): { q: number; o: any } {
  let qr = 0; //quantity routes
  const cheat = new Set();
  let IROWS = map.length;
  let ICOLS = map[0].length;
  const o: any = {};
  for (let i = 0; i < path.length; i++) {
    const visited = new Set([path[i].toString()]);
    const queue: [number, number, number][] = [[...path[i], 0]]; //r,c,s
    while (queue.length) {
      const [r, c, s] = queue.shift()!;
      const ns = s + 1;
      if (ns > 20) continue;
      for (const [dr, dc] of directions) {
        const [nr, nc] = [r + dr, c + dc];
        // No cheat on outside wall
        if (nr === IROWS || nc === ICOLS || nc === 0 || nr === 0) continue;
        const tileContent = map[nr][nc];
        //add to the queue to be reviewed
        const hash = [nr, nc].toString();
        if (!visited.has(hash)) {
          visited.add(hash);
          queue.push([nr, nc, ns]);
        }
        if (tileContent === '#') {
          continue;
        }
        const index = path.findIndex((item) => {
          return item[0] === nr && item[1] === nc;
        });
        // The tile should be part of the initial path
        if (index < 0) continue;
        const time = index - i - ns;
        // Bad cheat
        if (time <= 0) continue;
        if (index < 0 || index < i) continue;
        // Insuficient time;
        if (time < savedTime) continue;
        const hashC = [...path[i], nr, nc].toString();
        if (cheat.has(hashC)) continue;
        cheat.add(hashC);
        o[time] = (o[time] ?? 0) + 1;
        qr++;
      }
    }
  }
  return { q: qr, o };
}
