// --- Day 24: Crossed Wires ---

// Get data
export function getData(rawString: string): {
  inputs: Map<string, number>;
  operations: string[][];
} {
  const inputs = new Map<string, number>();
  const operations: string[][] = [];
  rawString.split('\n').forEach((str) => {
    if (!str.trim()) return;
    if (str.includes(':')) {
      const [input, value] = str
        .trim()
        .split(':')
        .map((x) => x.trim());
      inputs.set(input, Number(value));
    } else {
      operations.push(
        str
          .trim()
          .split(' ')
          .map((x) => x.trim()),
      );
    }
  });
  return { inputs, operations };
}
const operators: { [key: string]: Function } = {
  AND: (x: number, y: number) => x & y,
  OR: (x: number, y: number) => x | y,
  XOR: (x: number, y: number) => x ^ y,
};
// Part 1
export function getNumber({
  inputs,
  operations,
}: {
  inputs: Map<string, number>;
  operations: string[][];
}): number {
  while (operations.length) {
    const [i1, op, i2, _, target] = operations.shift()!;
    const input1 = inputs.get(i1);
    const input2 = inputs.get(i2);
    if (input1 === undefined || input2 === undefined) {
      operations.push([i1, op, i2, _, target]);
      continue;
    }
    inputs.set(target, operators[op](input1, input2));
  }
  let r: number[] = [];
  for (const [k, v] of inputs) {
    if (k.includes('z')) {
      r[Number(k.slice(1))] = v;
    }
  }
  const binaryStr = r.reverse().join('');
  return parseInt(binaryStr, 2);
}
// Part 2
export function getWires(operations: string[][]) {
  let formulas: Record<string, [string, string, string]> = {};
  operations.forEach(([x, op, y, _, wire]) => {
    formulas[wire] = [op, x, y];
  });

  function verifyZ(wire: string, num: number): boolean {
    if (!(wire in formulas)) return false;
    const [op, x, y] = formulas[wire];
    if (op !== 'XOR') return false;
    if (num === 0) return sortedEqual([x, y], ['x00', 'y00']);
    return (
      (verifyIntermediateXor(x, num) && verifyCarryBit(y, num)) ||
      (verifyIntermediateXor(y, num) && verifyCarryBit(x, num))
    );
  }

  function verifyIntermediateXor(wire: string, num: number): boolean {
    if (!(wire in formulas)) return false;
    const [op, x, y] = formulas[wire];
    if (op !== 'XOR') return false;
    return sortedEqual([x, y], [makeWire('x', num), makeWire('y', num)]);
  }

  function verifyCarryBit(wire: string, num: number): boolean {
    if (!(wire in formulas)) return false;
    const [op, x, y] = formulas[wire];
    if (num === 1) {
      if (op !== 'AND') return false;
      return sortedEqual([x, y], ['x00', 'y00']);
    }
    if (op !== 'OR') return false;
    return (
      (verifyDirectCarry(x, num - 1) && verifyRecarry(y, num - 1)) ||
      (verifyDirectCarry(y, num - 1) && verifyRecarry(x, num - 1))
    );
  }

  function verifyDirectCarry(wire: string, num: number): boolean {
    if (!(wire in formulas)) return false;
    const [op, x, y] = formulas[wire];
    if (op !== 'AND') return false;
    return sortedEqual([x, y], [makeWire('x', num), makeWire('y', num)]);
  }

  function verifyRecarry(wire: string, num: number): boolean {
    if (!(wire in formulas)) return false;
    const [op, x, y] = formulas[wire];
    if (op !== 'AND') return false;
    return (
      (verifyIntermediateXor(x, num) && verifyCarryBit(y, num)) ||
      (verifyIntermediateXor(y, num) && verifyCarryBit(x, num))
    );
  }

  function verify(num: number): boolean {
    return verifyZ(makeWire('z', num), num);
  }

  function progressFn(): number {
    let i = 0;
    while (true) {
      if (!verify(i)) break;
      i++;
    }
    return i;
  }

  const swaps: string[] = [];

  for (let i = 0; i < 4; i++) {
    const baseline = progressFn();
    let found = false;
    for (const x in formulas) {
      for (const y in formulas) {
        if (x === y) continue;
        const temp = formulas[x];
        formulas[x] = formulas[y];
        formulas[y] = temp;
        if (progressFn() > baseline) {
          swaps.push(x, y);
          found = true;
          break;
        }
        const temp2 = formulas[x];
        formulas[x] = formulas[y];
        formulas[y] = temp2;
      }
      if (found) {
        break;
      }
    }
  }
  console.log(swaps);
  return swaps.sort((a, b) => a.localeCompare(b)).join(',');
}

function makeWire(char: string, num: number): string {
  return char + num.toString().padStart(2, '0');
}

function sortedEqual(a: string[], b: string[]): boolean {
  const sortedA = [...a].sort((a, b) => a.localeCompare(b));
  const sortedB = [...b].sort((a, b) => a.localeCompare(b));
  if (sortedA.length !== sortedB.length) return false;
  return sortedA.every((val, idx) => val === sortedB[idx]);
}

