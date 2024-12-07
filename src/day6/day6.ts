//--- Day 6: Guard Gallivant ---
type guardState = '^' | '>' | 'v' | '<';
const guardStates: guardState[] = ['^', '>', 'v', '<'];
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
export function positionsVisited(
  labMap: Array<string[]>,
  start: [number, number],
): number {
  const guardMoves = new Map<guardState, [number, number]>([
    ['^', [-1, 0]],
    ['>', [0, 1]],
    ['v', [1, 0]],
    ['<', [0, -1]],
  ]);
  const visited: Set<string> = new Set([start.toString()]); //r,c
  const currentStateGuard: guardState = labMap[start[0]][
    start[1]
  ] as guardState;
  const stack: Array<[number, number, guardState]> = [
    [...start, currentStateGuard],
  ];
  while (stack.length) {
    const [r, c, guardState] = stack.pop()!;
    let currentGuardState = guardState;
    const startIndex = guardStates.findIndex((item) => {
      return item === guardState;
    });
    for (let i = 0; i < guardStates.length; i++) {
      const [dr, dc] = guardMoves.get(currentGuardState)!;
      const [nr, nc] = [r + dr, c + dc];
      const nextPosition = labMap[nr]?.[nc];
      if (!nextPosition) continue;
      if (
        nextPosition === '.' ||
        guardStates.includes(nextPosition as guardState)
      ) {
        visited.add([nr, nc].toString());
        stack.push([nr, nc, currentGuardState]);
        break;
      }
      if (nextPosition === '#') {
        const nextState = (startIndex + 1 + i) % 4;
        currentGuardState = guardStates[nextState];
      }
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
  const guardMoves = new Map<guardState, [number, number]>([
    ['^', [-1, 0]],
    ['>', [0, 1]],
    ['v', [1, 0]],
    ['<', [0, -1]],
  ]);
  const currentStateGuard: guardState = labMap[start[0]][
    start[1]
  ] as guardState;
  const visited: Set<string> = new Set([start.toString() + currentStateGuard]); //r,c,guardState
  const stack: Array<[number, number, guardState]> = [
    [...start, currentStateGuard],
  ];
  while (stack.length) {
    const [r, c, guardState] = stack.pop()!;
    let currentGuardState = guardState;
    const startIndex = guardStates.findIndex((item) => {
      return item === guardState;
    });
    for (let i = 0; i < guardStates.length; i++) {
      const [dr, dc] = guardMoves.get(currentGuardState)!;
      const [nr, nc] = [r + dr, c + dc];
      const nextPosition = labMap[nr]?.[nc];
      if (!nextPosition) continue;
      const visitHash = [nr, nc].toString() + currentGuardState;
      if (visited.has(visitHash)) return true;
      if (
        nextPosition === '#' ||
        (nr === obstrucion[0] && nc === obstrucion[1])
      ) {
        const nextState = (startIndex + 1 + i) % 4;
        currentGuardState = guardStates[nextState];
        continue;
      }
      if (
        nextPosition === '.' ||
        guardStates.includes(nextPosition as guardState)
      ) {
        visited.add(visitHash);
        stack.push([nr, nc, currentGuardState]);
        break;
      }
    }
  }

  return false;
}
export function countPlacesToPlaceObstruction(
  labMap: Array<string[]>,
  start: [number, number],
): number {
  const [IROWS, ICOLS] = [labMap.length, labMap[0].length];
  // Retrieve all possible routes the guard can take.
  // Placing an obstacle outside of these routes will have no effect.
  const mapWithPlacesVisitedByTheGuard = mapWithPositionsVisited(
    structuredClone(labMap),
    start,
  );
  let totalObstructions = 0;
  //Placing an obstacle if the guard visit a cell with the same direction it will be a loop
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      const labValue = mapWithPlacesVisitedByTheGuard[r][c];
      if (
        labValue === '.' ||
        labValue === '#' ||
        guardStates.includes(labMap[r][c] as guardState)
      )
        continue;
      if (isInLoop(labMap, start, [r, c])) {
        totalObstructions++;
      }
    }
  }
  return totalObstructions;
}

export function mapWithPositionsVisited(
  labMap: Array<string[]>,
  start: [number, number],
): Array<string[]> {
  const guardMoves = new Map<guardState, [number, number]>([
    ['^', [-1, 0]],
    ['>', [0, 1]],
    ['v', [1, 0]],
    ['<', [0, -1]],
  ]);
  const currentStateGuard: guardState = labMap[start[0]][
    start[1]
  ] as guardState;
  const stack: Array<[number, number, guardState]> = [
    [...start, currentStateGuard],
  ];
  while (stack.length) {
    const [r, c, guardState] = stack.pop()!;
    let currentGuardState = guardState;
    const startIndex = guardStates.findIndex((item) => {
      return item === guardState;
    });
    for (let i = 0; i < guardStates.length; i++) {
      const [dr, dc] = guardMoves.get(currentGuardState)!;
      const [nr, nc] = [r + dr, c + dc];
      const nextPosition = labMap[nr]?.[nc];
      if (!nextPosition) continue;
      if (
        nextPosition === 'O' ||
        nextPosition === '.' ||
        guardStates.includes(nextPosition as guardState)
      ) {
        stack.push([nr, nc, currentGuardState]);
        if (!guardStates.includes(nextPosition as guardState)) {
          labMap[nr][nc] = 'O';
        }
        break;
      }
      if (nextPosition === '#') {
        const nextState = (startIndex + 1 + i) % 4;
        currentGuardState = guardStates[nextState];
      }
    }
  }
  return labMap;
}
