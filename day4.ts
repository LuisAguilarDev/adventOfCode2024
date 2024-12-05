import fs from 'fs';
//First
fs.readFile('./data/day4.txt', 'utf8', (err: any, content: string) => {
  if (err) return;
  // look for XMAS in all directions
  const word = 'XMAS';
  const lines = content.split('\n').map((row) => {
    return row.trim().split('');
  });
  const IROWS = lines.length;
  const ICOLS = lines[0].length;
  const stack: Array<[number, number]> = [];
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      if (lines[r][c] === 'X') {
        stack.push([r, c]);
      }
    }
  }
  //prettier-ignore
  const directions = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]
  let totalXMAS = 0;
  while (stack.length) {
    const [r, c] = stack.pop()!;
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
  console.log('🚀 ~ fs.readFile ~ totalXMAS:', totalXMAS);
});
//Second
fs.readFile('./data/day4.txt', 'utf8', (err: any, content: string) => {
  if (err) return;
  // look for X-MAS in X
  let total_X_MAS = 0;
  function review(r: number, c: number) {
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
  const lines = content.split('\n').map((row) => {
    return row.trim().split('');
  });
  const IROWS = lines.length;
  const ICOLS = lines[0].length;
  for (let r = 0; r < IROWS; r++) {
    for (let c = 0; c < ICOLS; c++) {
      if (lines[r][c] === 'A') {
        review(r, c);
      }
    }
  }

  console.log('🚀 ~ fs.readFile ~ total_X_MAS:', total_X_MAS);
});
