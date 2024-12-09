//--- Day 6: Guard Gallivant ---
type guardState = '^' | '>' | 'v' | '<';
const guardStates: guardState[] = ['^', '>', 'v', '<'];
const guardMoves = new Map<guardState, [number, number]>([
  ['^', [-1, 0]],
  ['>', [0, 1]],
  ['v', [1, 0]],
  ['<', [0, -1]],
]);

export function getLabMap(rawData: string): Array<string[]> {
  return rawData.split('\n').map((row) => {
    return row.trim().split('');
  });
}

export function getStartPosition(labMap: Array<string[]>): [number, number] {
  const [IROWS, ICOLS] = [labMap.length, labMap[0].length];
  for (let row = 0; row <= IROWS; row++) {
    for (let col = 0; col <= ICOLS; col++) {
      if (guardStates.includes(labMap[row][col] as guardState)) {
        return [row, col];
      }
    }
  }
  return [-1, -1];
}
//Part 1
export function countPositionsVisited(
  labMap: Array<string[]>,
  start: [number, number],
): number {
  //get initial direction
  let direction: [number, number] = guardMoves.get(
    labMap[start[0]][start[1]] as guardState,
  )!;

  //traverse the nodes
  let [r, c] = start;
  const visited: Set<string> = new Set([start.toString()]); //r,c
  while (true) {
    const [dr, dc] = direction;
    const [nr, nc] = [r + dr, c + dc];
    const nextPosition = labMap[nr]?.[nc];
    if (!nextPosition) break;
    if (
      nextPosition === '.' ||
      guardStates.includes(nextPosition as guardState)
    ) {
      visited.add([nr, nc].toString());
      [r, c] = [nr, nc];
    }
    if (nextPosition === '#') {
      direction = rotateDirection(direction);
    }
  }

  return visited.size;
}

//Part 2
export function isInLoop(
  labMap: Array<string[]>,
  start: [number, number],
  obstrucion: [number, number],
): boolean {
  //get initial direction
  let direction: [number, number] = guardMoves.get(
    labMap[start[0]][start[1]] as guardState,
  )!;

  let [r, c] = start;
  //if the guard visit a cell with the same direction it will be a loop //visited = r,c,direction
  const visited: Set<string> = new Set([
    start.toString() + ',' + direction.toString(),
  ]);
  while (true) {
    const [dr, dc] = direction;
    const [nr, nc] = [r + dr, c + dc];
    const nextPosition = labMap[nr]?.[nc];
    if (!nextPosition) break;
    const visitHash = [nr, nc].toString() + ',' + direction.toString();
    if (visited.has(visitHash)) return true;
    if (
      nextPosition === '#' ||
      (nr === obstrucion[0] && nc === obstrucion[1])
    ) {
      direction = rotateDirection(direction);
      continue;
    }
    if (
      nextPosition === '.' ||
      guardStates.includes(nextPosition as guardState)
    ) {
      visited.add(visitHash);
      [r, c] = [nr, nc];
    }
  }
  return false;
}
export function countPlacesToPlaceObstruction(
  labMap: Array<string[]>,
  start: [number, number],
): number {
  // Retrieve all possible routes the guard can take.
  // Placing an obstacle outside of these routes will have no effect.
  const allPositionsVisited = positionsVisited(labMap, start);
  let totalObstructions = 0;
  for (const hash of allPositionsVisited) {
    const [r, c] = hash.split(',').map(Number);
    if (isInLoop(labMap, start, [r, c])) {
      totalObstructions++;
    }
  }
  return totalObstructions;
}

export function positionsVisited(
  labMap: Array<string[]>,
  start: [number, number],
): Set<string> {
  //get initial direction
  let direction: [number, number] = guardMoves.get(
    labMap[start[0]][start[1]] as guardState,
  )!;

  //traverse the nodes
  let [r, c] = start;
  const visitedAddress: Set<string> = new Set();
  while (true) {
    const [dr, dc] = direction;
    const [nr, nc] = [r + dr, c + dc];
    const nextPosition = labMap[nr]?.[nc];
    if (!nextPosition) break;
    if (nextPosition === '.') {
      [r, c] = [nr, nc];
      visitedAddress.add([nr, nc].toString());
      continue;
    }
    if (guardStates.includes(nextPosition as guardState)) {
      [r, c] = [nr, nc];
      continue;
    }
    if (nextPosition === '#') {
      direction = rotateDirection(direction);
    }
  }
  return visitedAddress;
}

function rotateDirection([x, y]: [number, number]): [number, number] {
  return [y, -x];
}
