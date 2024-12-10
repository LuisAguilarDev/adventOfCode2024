//Frecuencia: minuscula, mayuscula, digito
export function getGrid(rawData: string): string[][] {
  return rawData.split('\n').map((row) => row.trim().split(''));
}
//Antinodes can exist over an antenna
//Part 1
export function countAntinodes(grid: string[][]): number {
  //get locations by frecuency
  const locations = new Map<string, number[][]>(); //frecuency,locations
  const [IROWS, ICOLS] = [grid.length, grid[0].length];
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      const cell = grid[r][c];
      if (cell === '.') continue;
      const current = locations.get(cell) ?? [];
      current.push([r, c]);
      locations.set(grid[r][c], current);
    }
  }

  const antinodes = new Set();
  for (const location of locations.values()) {
    //antinode occurs at any point that is perfectly in line with two antennas of the same frequency
    //get all posible two antennas combination
    for (let i = 0; i < location.length; i++) {
      for (let j = i + 1; j < location.length; j++) {
        getAntinodes([location[i], location[j]]);
      }
    }
  }
  function getAntinodes(antennas: number[][]) {
    antennas.sort((a, b) => a[0] - b[0]);
    //antinodes outside grid doesn't count
    const [r1, c1] = antennas[0];
    const [r2, c2] = antennas[1];

    const dr = Math.abs(r2 - r1);
    const dc = Math.abs(c1 - c2);
    if (!Number.isInteger(dr) || !Number.isInteger(dc)) return;
    //get slope m
    const m = (r2 - r1) / (c2 - c1);
    //get antinodes based on slope
    const direction = m > 0 ? -1 : 1;
    const [nr1, nc1] = [r1 - dr, c1 + direction * dc];
    const [nr2, nc2] = [r2 + dr, c2 - direction * dc];
    if (grid[nr1]?.[nc1]) {
      antinodes.add([nr1, nc1].toString());
    }
    if (grid[nr2]?.[nc2]) {
      antinodes.add([nr2, nc2].toString());
    }
  }

  return antinodes.size;
}
//Part 2
export function countAntinodesExpanded(grid: string[][]): number {
  //get locations by frecuency
  const locations = new Map<string, number[][]>(); //frecuency,locations
  const [IROWS, ICOLS] = [grid.length, grid[0].length];
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      const cell = grid[r][c];
      if (cell === '.') continue;
      const current = locations.get(cell) ?? [];
      current.push([r, c]);
      locations.set(grid[r][c], current);
    }
  }

  const antinodes = new Set();
  for (const location of locations.values()) {
    //antinode occurs at any point that is perfectly in line with two antennas of the same frequency
    //get all posible two antennas combination
    for (let i = 0; i < location.length; i++) {
      for (let j = i + 1; j < location.length; j++) {
        getAntinodesExpanded([location[i], location[j]]);
      }
    }
  }
  function getAntinodesExpanded(antennas: number[][]) {
    antennas.sort((a, b) => a[0] - b[0]);
    //antinodes outside grid doesn't count
    let [r1, c1] = antennas[0];
    let [r2, c2] = antennas[1];

    //obtener la pendiente
    const dr = Math.abs(r2 - r1);
    const dc = Math.abs(c1 - c2);
    if (!Number.isInteger(dr) || !Number.isInteger(dc)) return;
    const m = (r2 - r1) / (c2 - c1);
    //get antinodes based on slope
    antinodes.add([r1, c1].toString());
    antinodes.add([r2, c2].toString());
    const direction = m > 0 ? -1 : 1;
    while (true) {
      const [nr1, nc1] = [r1 - dr, c1 + direction * dc];
      const [nr2, nc2] = [r2 + dr, c2 - direction * dc];
      const gridContent1 = grid[nr1]?.[nc1];
      const gridContent2 = grid[nr2]?.[nc2];
      if (!gridContent1 && !gridContent2) break;
      if (gridContent1) {
        antinodes.add([nr1, nc1].toString());
        [r1, c1] = [nr1, nc1];
      }
      if (gridContent2) {
        antinodes.add([nr2, nc2].toString());
        [r2, c2] = [nr2, nc2];
      }
    }
  }

  return antinodes.size;
}
