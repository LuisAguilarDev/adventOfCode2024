//--- Day 21: Keypad Conundrum ---
import { directions } from '../utils/utills';

//getData
export function getData(rawString: string): string[] {
  return rawString.split('\n').map((str) => str.trim());
}
const numKeyPad = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['', '0', 'A'],
];
const ns: [number, number] = [3, 2]; // hand of robot starts on "A"
const sKeypad = [
  ['', '^', 'A'],
  ['<', 'v', '>'],
];
const ss: [number, number] = [0, 2]; // hand of robot starts on "A"
export function getPattern(
  code: string,
  pad: string[][],
  start: [number, number],
): string[] {
  let [sr, sc] = start;
  const movements: { [key: string]: string } = {
    '0,1': '>',
    '1,0': 'v',
    '-1,0': '^',
    '0,-1': '<',
  };
  let patternsByLevel: string[][] = Array.from(
    { length: code.length },
    () => [],
  );
  for (let i = 0; i < code.length; i++) {
    const target = code[i];
    const visited = new Set();
    const queue: [number, number, string][] = [[sr, sc, '']];
    while (queue.length) {
      const [r, c, path] = queue.shift()!;
      const hash = r + ',' + c;
      visited.add(hash);

      if (pad[r][c] === target) {
        patternsByLevel[i].push(path + 'A');
        [sr, sc] = [r, c];
        continue;
      }

      for (const [dr, dc] of directions) {
        const [nr, nc] = [r + dr, c + dc];
        const tileContent = pad[nr]?.[nc];
        if (!tileContent) continue;
        const cSymbol = movements[[dr, dc].toString()];
        const hash = [nr, nc].toString();
        if (!visited.has(hash)) {
          let npath = path + cSymbol;
          queue.push([nr, nc, npath]);
        }
      }
    }
  }
  return combineMinPatterns(patternsByLevel);
}

export function myPattern(code: string, drobots: number): number {
  let patterns = getPattern(code, numKeyPad, ns);
  let r: string[] = [];
  for (let i = 0; i < drobots; i++) {
    r = [];
    for (const path of patterns) {
      getPattern(path, sKeypad, ss).forEach((item) => {
        r.push(item);
      });
    }
    patterns = r;
  }
  let minLength = Infinity;
  for (const pattern of patterns) {
    if (minLength > pattern.length) {
      minLength = pattern.length;
    }
  }
  return minLength;
}
// Part 1
export function sumOfComplexities(codes: string[], robots = 2): number {
  let sum = 0;
  for (const code of codes) {
    const pattern = myPattern(code, robots);
    const number = Number(code.slice(0, 3));
    sum += number * pattern;
  }
  return sum;
}
function combineMinPatterns(patternsByLevel: string[][]): string[] {
  if (!patternsByLevel.length) return [];

  // Start with the first level
  let combinedPatterns = [...patternsByLevel[0]];

  // Keep track of the minimal length so far

  let currentMin = Infinity;
  for (const pattern of combinedPatterns) {
    if (currentMin > pattern.length) {
      currentMin = pattern.length;
    }
  }

  for (let i = 1; i < patternsByLevel.length; i++) {
    const currentLevel = patternsByLevel[i];
    const newCombinations: string[] = [];

    // Generate all combos from existing + current level
    for (const existingPattern of combinedPatterns) {
      for (const piece of currentLevel) {
        newCombinations.push(existingPattern + piece);
      }
    }

    let newMin = Infinity;
    for (const pattern of newCombinations) {
      if (newMin > pattern.length) {
        newMin = pattern.length;
      }
    }
    combinedPatterns = newCombinations.filter(
      (combo) => combo.length === newMin,
    );
  }

  return combinedPatterns;
}
// Part 2
