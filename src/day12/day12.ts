//--- Day 12: Garden Groups ---
// Traverse the map and get the regions
// Region (Letter,Size)
// getPerimeter() size and shape
// Price Region Size * Perimeter
// get the sum of prices
//Part 1
export function getFencingCost(grid: string[][]): number {
  //prettier-ignore
  const directions = [[1,0],[-1,0],[0,1],[0,-1]]
  const visited = new Set([[0, 0, ''].toString()]);
  //DFS
  const stack: [number, number, string][] = [[0, 0, '']]; //r,c,char '' First Exploration 'char' on cost calculation
  let cost = 0;
  while (stack.length) {
    const [r, c] = stack.pop()!;
    cost += exploreRegion(r, c, grid[r][c]);
    for (const [dr, dc] of directions) {
      const [nr, nc] = [r + dr, c + dc];
      const tileContent = grid[nr]?.[nc];
      if (!tileContent) continue;
      const hash = [nr, nc, ''].toString();
      if (!visited.has(hash)) {
        visited.add(hash);
        stack.push([nr, nc, '']);
      }
    }
  }

  function exploreRegion(r: number, c: number, char: string) {
    const hash = [r, c, char].toString();
    if (visited.has(hash)) {
      return 0;
    }
    visited.add(hash);
    //prettier-ignore
    const directions = [[1,0],[-1,0],[0,1],[0,-1]]
    const data = { area: 0, fences: 0 };

    const stack: [number, number, string][] = [[r, c, char]];
    while (stack.length) {
      //process the area
      const [r, c, char] = stack.pop()!;
      //prettier-ignore
      const allDirections = [grid[r + 1]?.[c],grid[r - 1]?.[c],grid[r]?.[c + 1],grid[r]?.[c - 1]];
      const fences = allDirections.filter((value) => value !== char).length;
      data.area += 1;
      data.fences += fences;
      for (const [dr, dc] of directions) {
        const [nr, nc] = [r + dr, c + dc];
        const nchar = grid[nr]?.[nc];
        if (!nchar || nchar !== char) continue;
        const hash = [nr, nc, char].toString();
        if (!visited.has(hash)) {
          visited.add(hash);
          stack.push([nr, nc, char]);
        }
      }
    }
    return data.area * data.fences;
  }

  return cost;
}
//Part 2
export function getFencingCostOverSides(grid: string[][]): number {
  //prettier-ignore
  const directions = [[1,0],[-1,0],[0,1],[0,-1]]
  const visited = new Set([[0, 0, ''].toString()]);
  //DFS
  const stack: [number, number, string][] = [[0, 0, '']]; //r,c,char '' First Exploration 'char' on cost calculation
  let cost = 0;
  while (stack.length) {
    const [r, c] = stack.pop()!;
    cost += exploreRegion(r, c, grid[r][c]);
    for (const [dr, dc] of directions) {
      const [nr, nc] = [r + dr, c + dc];
      const tileContent = grid[nr]?.[nc];
      if (!tileContent) continue;
      const hash = [nr, nc, ''].toString();
      if (!visited.has(hash)) {
        visited.add(hash);
        stack.push([nr, nc, '']);
      }
    }
  }

  function exploreRegion(r: number, c: number, char: string) {
    const hash = [r, c, char].toString();
    if (visited.has(hash)) {
      return 0;
    }
    visited.add(hash);
    //prettier-ignore
    const directions = [[1,0],[-1,0],[0,1],[0,-1]]
    const stack: [number, number, string][] = [[r, c, char]]; //r,c,char
    const points: [number, number][] = [[r, c]];
    while (stack.length) {
      const [r, c, char] = stack.pop()!;
      for (const [dr, dc] of directions) {
        const [nr, nc] = [r + dr, c + dc];
        const nchar = grid[nr]?.[nc];
        if (!nchar || nchar !== char) continue;
        const hash = [nr, nc, char].toString();

        if (!visited.has(hash)) {
          visited.add(hash);
          points.push([nr, nc]);
          stack.push([nr, nc, char]);
        }
      }
    }
    const area = points.length;
    let borders = 0;
    let [minR, minC] = [Infinity, Infinity];
    let [maxR, maxC] = [0, 0];
    //get max area
    for (const [r, c] of points) {
      if (r < minR) minR = r;
      if (c < minC) minC = c;
      if (r > maxR) maxR = r;
      if (c > maxC) maxC = c;
    }
    //-> OK
    borders += getBordersInc(points, minR, maxR, minC, maxC);
    //<-
    // borders += getBordersDec(points, minR, maxR, minC, maxC);
    //^
    //|
    // borders += getBorders(points, minR, maxR, minC, maxC);
    //|
    //v OK
    borders += getBordersInc(points, minC, maxC, minR, maxR);
    if (char === 'R') {
      console.log(area, char, borders);
    }
    return borders * area;
  }
  return cost;
}

function getBordersInc(
  points: [number, number][],
  minR: number,
  maxR: number,
  minC: number,
  maxC: number,
): number {
  //traverse from directions
  //left to right minR,minC -> maxR,minC moving [0,1]
  let borders = 0;
  const lines: [number, number][] = [];
  for (let i = minR; i <= maxR; i++) {
    let lastEdgeR;
    for (let j = minC; j <= maxC; j++) {
      const point = points.find(([r, c]) => {
        return i === r && j === c;
      });
      if (point) {
        if (lastEdgeR === undefined) {
          lastEdgeR = j;
          lines.push([i, j]);
          //++ solo si no hay una linea
          if (!lines.length) {
            borders++;
          } else {
            const point = lines.find(([r, c]) => {
              return j === c && Math.abs(i - r) === 1;
            });
            if (!point) {
              borders++;
            }
          }
        } else if (lastEdgeR + 1 === j) {
          lastEdgeR++;
        } else {
          //++ solo si no hay una linea
          borders++;
        }
      }
    }
  }
  return borders;
}
function getBordersDec(
  points: [number, number][],
  minR: number,
  maxR: number,
  minC: number,
  maxC: number,
): number {
  //traverse from directions
  //right to left maxR,minC -> minR,minC moving [0,1]
  let borders = 0;
  const lines: [number, number][] = [];
  for (let i = minR; i <= maxR; i++) {
    let lastEdgeR;
    for (let j = maxC; j >= minC; j--) {
      const point = points.find(([r, c]) => {
        return i === r && j === c;
      });
      if (point) {
        if (lastEdgeR === undefined) {
          lastEdgeR = j;
          lines.push([i, j]);
          //++ solo si no hay una linea
          if (!lines.length) {
            borders++;
          } else {
            const point = lines.find(([r, c]) => {
              return j === c && Math.abs(i - r) === 1;
            });
            if (!point) {
              borders++;
            }
          }
        } else if (lastEdgeR + 1 === j) {
          lastEdgeR++;
        } else {
          //++ solo si no hay una linea
          borders++;
        }
      }
    }
  }
  return borders;
}
