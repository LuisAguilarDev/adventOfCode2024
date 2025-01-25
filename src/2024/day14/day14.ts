//--- Day 14: Restroom Redoubt ---

//Part1
export class Robot {
  startPosition: { c: number; r: number };
  velocity: { c: number; r: number };
  constructor(
    startPosition: { c: number; r: number },
    velocity: { c: number; r: number },
  ) {
    this.startPosition = startPosition;
    this.velocity = velocity;
  }
}
export class Point {
  c: number;
  r: number;
  constructor(r: number, c: number) {
    this.r = r;
    this.c = c;
  }
}
export function getRobots(rawData: string): Robot[] {
  const robots: Robot[] = [];
  rawData.split('\n').forEach((row) => {
    const regex = /-?\d+/g;
    const [sc, sr, vc, vr] = row.match(regex)?.map(Number) ?? [0, 0, 0, 0];
    robots.push(new Robot({ c: sc, r: sr }, { c: vc, r: vr }));
  });
  return robots;
}
export function getSafetyFactor(
  IROWS: number,
  ICOLS: number,
  robots: Robot[],
): number {
  const time = 100;
  const middleR = Math.floor(IROWS / 2);
  const middleC = Math.floor(ICOLS / 2);
  let [q1, q2, q3, q4] = [0, 0, 0, 0];
  for (const robot of robots) {
    const r = robot.startPosition.r;
    const c = robot.startPosition.c;
    const dr = robot.velocity.r;
    const dc = robot.velocity.c;
    let nr = (((r + dr * time) % IROWS) + IROWS) % IROWS;
    let nc = (((c + dc * time) % ICOLS) + ICOLS) % ICOLS;
    if (nr < middleR && nc < middleC) {
      q1++;
    }
    if (nr < middleR && nc > middleC) {
      q2++;
    }
    if (nr > middleR && nc < middleC) {
      q3++;
    }
    if (nr > middleR && nc > middleC) {
      q4++;
    }
  }
  return q1 * q2 * q3 * q4;
}

//Part2
export function timeToShowPicture(
  IROWS: number,
  ICOLS: number,
  robots: Robot[],
): number {
  let time = 1;
  // prettier-ignore
  const directions = [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
  let maxClusterSize = 0;
  let timeShowed = 0;
  while (time < ICOLS * IROWS) {
    const robotsPosition: Point[] = [];
    const visited = new Set<string>();
    for (const robot of robots) {
      const r = robot.startPosition.r;
      const c = robot.startPosition.c;
      const dr = robot.velocity.r;
      const dc = robot.velocity.c;
      let nr = (((r + dr * time) % IROWS) + IROWS) % IROWS;
      let nc = (((c + dc * time) % ICOLS) + ICOLS) % ICOLS;
      robotsPosition.push(new Point(nr, nc));
    }
    robotsPosition.sort((a, b) => a.c - b.c || a.r - b.r);
    const positionsSet = new Set<string>(
      robotsPosition.map((p) => `${p.r},${p.c}`),
    );
    for (const { r, c } of robotsPosition) {
      const key = `${r},${c}`;
      if (!visited.has(key)) {
        const clusterSize = bfs(r, c, positionsSet, visited);
        if (clusterSize > maxClusterSize) {
          maxClusterSize = clusterSize;
          timeShowed = time;
        }
      }
    }

    time++;
  }

  function bfs(
    startR: number,
    startC: number,
    positionsSet: Set<string>,
    visited: Set<string>,
  ) {
    visited.add(`${startR},${startC}`);
    const queue = [[startR, startC]];
    let clusterCount = 0;
    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      clusterCount++;
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        const key = `${nr},${nc}`;
        if (positionsSet.has(key) && !visited.has(key)) {
          visited.add(key);
          queue.push([nr, nc]);
        }
      }
    }
    return clusterCount;
  }
  return timeShowed;
}
