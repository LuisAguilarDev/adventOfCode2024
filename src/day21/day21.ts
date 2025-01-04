import { directions } from '../utils/utills';

//--- Day 21: Keypad Conundrum ---
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
export function sumOfComplexities2(codes: string[], robots = 2): number {
  let total = 0;
  const cache = new Map();
  for (const code of codes) {
    const inputs = solve(code, numSeqs);
    const results = [];
    for (const input of inputs) {
      const result = computeLength(input, cache, robots);
      results.push(result);
    }
    const length = Math.min(...results);
    const complexity = length * Number(code.slice(0, 3));
    total += complexity;
  }
  return total;
}
const directionsS: [number, number, string][] = [
  [-1, 0, '^'],
  [1, 0, 'v'],
  [0, -1, '<'],
  [0, 1, '>'],
];
function computeSeqs(keypad: string[][]) {
  const pos: { [key: string]: number[] } = {};

  for (let r = 0; r < keypad.length; r++) {
    for (let c = 0; c < keypad[r].length; c++) {
      if (keypad[r][c]) {
        pos[keypad[r][c]] = [r, c];
      }
    }
  }
  const seqs: { [key: string]: string[] } = {};

  for (const x in pos) {
    for (const y in pos) {
      if (x === y) {
        seqs[`${x},${y}`] = ['A'];
        continue;
      }

      const possibilities = [];
      const queue: [number, number, string][] = [
        [...(pos[x] as [number, number]), ''],
      ];
      let optimal = Infinity;
      while (queue.length > 0) {
        const [r, c, moves] = queue.shift()!;
        for (const [dr, dc, nm] of directionsS) {
          const [nr, nc] = [r + dr, c + dc];
          if (nr < 0 || nc < 0 || nr >= keypad.length || nc >= keypad[0].length)
            continue;
          if (!keypad[nr][nc]) continue;

          if (keypad[nr][nc] === y) {
            if (optimal < moves.length + 1) {
              queue.length = 0;
              break;
            }
            optimal = moves.length + 1;
            possibilities.push(moves + nm + 'A');
          } else {
            queue.push([nr, nc, moves + nm]);
          }
        }
      }

      seqs[`${x},${y}`] = possibilities;
    }
  }

  return seqs;
}
const dirSeqs = computeSeqs(sKeypad);
const dirLengths: { [key: string]: number } = {};
for (const [key, value] of Object.entries(dirSeqs)) {
  dirLengths[key] = value[0].length;
}
const numSeqs = computeSeqs(numKeyPad);

function solve(str: string, seqs: any) {
  let path = customZip('A' + str);
  const options = [];
  for (const [x, y] of path) {
    options.push(seqs[`${x},${y}`]);
  }
  const response = mixPatterns(options);
  return response;
}

function customZip(str: string): [string, string][] {
  let r: [string, string][] = [];
  for (let i = 0; i < str.length - 1; i++) {
    r.push([str[i], str[i + 1]]);
  }
  return r;
}

function mixPatterns(patterns: string[]) {
  const result: string[] = [];

  function combine(current: string[], depth: number) {
    if (depth === patterns.length) {
      result.push(current.join(''));
      return;
    }

    for (const pattern of patterns[depth]) {
      combine([...current, pattern], depth + 1);
    }
  }

  combine([], 0);
  return result;
}

function computeLength(
  seq: string,
  cache: Map<string, number>,
  depth = 2,
): number {
  const cached = cache.get(seq + ',' + depth);
  if (cached) return cached;
  if (depth === 1) {
    const options = customZip('A' + seq);
    let total = 0;
    for (const [x, y] of options) {
      total += dirLengths[`${x},${y}`];
    }
    cache.set(seq + ',' + depth, total);
    return total;
  }
  let length = 0;
  const options = customZip('A' + seq);
  for (const [x, y] of options) {
    const subSeq = dirSeqs[`${x},${y}`];
    let results: number[] = [];
    for (const seq of subSeq) {
      results.push(computeLength(seq, cache, depth - 1));
    }
    length += Math.min(...results);
  }
  cache.set(seq + ',' + depth, length);
  return length;
}
