//--- Day 4: Ceres Search ---
//First
export function countXMAS(rawData: string): number {
  // look for XMAS in all directions
  const lines = rawData.split('\n').map((row) => {
    return row.trim().split('');
  });

  const IROWS = lines.length;
  const ICOLS = lines[0].length;
  let totalXMAS = 0;
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      if (lines[r][c] === 'X') {
        reviewXMAS([r, c]);
      }
    }
  }
  //Count how many times XMAS appear from X
  function reviewXMAS([r, c]: number[]) {
    const word = 'XMAS';
    //prettier-ignore
    const directions = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]
    for (const [dr, dc] of directions) {
      let isValid = true;
      for (let i = 1; i < 4; i++) {
        const [nr, nc] = [r + dr * i, c + dc * i];
        if (!isValid) break;
        const letterNeeded = word[i];
        const currentLetter = lines[nr]?.[nc];
        if (!currentLetter) {
          isValid = false;
        }
        if (currentLetter !== letterNeeded) {
          isValid = false;
        }
      }
      if (isValid) totalXMAS++;
    }
  }
  return totalXMAS;
}

//Second
// look for X-MAS in X
export function countX_MAS(rawData: string): number {
  let total_X_MAS = 0;

  const lines = rawData.split('\n').map((row) => {
    return row.trim().split('');
  });
  const IROWS = lines.length;
  const ICOLS = lines[0].length;
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      if (lines[r][c] === 'A') {
        reviewX_MAS(r, c);
      }
    }
  }
  function reviewX_MAS(r: number, c: number) {
    //prettier-ignore
    const directions = [[1,1],[-1,-1],[1,-1],[-1,1]]
    const dic: any = {
      M: 'S',
      S: 'M',
    };
    const validLetters = ['M', 'S'];
    const letters: string[] = [];
    for (const [dr, dc] of directions) {
      const letter = lines[r + dr]?.[c + dc];
      if (!letter || !validLetters.includes(letter)) break;
      letters.push(letter);
    }
    if (letters.length !== 4) return;
    if (dic[letters[0]] === letters[1] && dic[letters[2]] === letters[3]) {
      total_X_MAS++;
    }
  }
  return total_X_MAS;
}
