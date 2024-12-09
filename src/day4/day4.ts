//--- Day 4: Ceres Search ---
export function getInput(rawData: string): string[][] {
  return rawData.split('\n').map((row) => {
    return row.trim().split('');
  });
}
//First
export function countXMAS(input: string[][]): number {
  // look for X then MAS in all directions
  const IROWS = input.length;
  const ICOLS = input[0].length;
  let count = 0;
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      if (input[r][c] === 'X') {
        count += countXMAS([r, c]);
      }
    }
  }
  //Count how many times XMAS appear from X
  function countXMAS([r, c]: number[]) {
    const MAS = 'MAS';
    let count = 0;
    //prettier-ignore
    const directions = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]
    for (const [dr, dc] of directions) {
      let isValid = true;
      for (let i = 0; i < 3; i++) {
        const [nr, nc] = [r + dr * (i + 1), c + dc * (1 + i)];
        const currLetter = input[nr]?.[nc];
        if (!currLetter || currLetter !== MAS[i]) {
          isValid = false;
          break;
        }
      }
      if (isValid) count++;
    }
    return count;
  }
  return count;
}
//Second
// look for X-MAS in X
export function countMAS(input: string[][]): number {
  let count = 0;
  const IROWS = input.length;
  const ICOLS = input[0].length;
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      if (input[r][c] === 'A' && validMAS(r, c)) {
        count++;
      }
    }
  }
  function validMAS(r: number, c: number): boolean {
    let count = 0;
    //prettier-ignore
    const pattern = input[r + 1]?.[c + 1] + input[r - 1]?.[c - 1] + input[r + 1]?.[c - 1] + input[r - 1]?.[c + 1];

    //Si los casos no son tantos no hay que complicarse
    const validPatterns = ['MSMS', 'SMSM', 'MSSM', 'SMMS'];
    return validPatterns.includes(pattern);
  }
  return count;
}
