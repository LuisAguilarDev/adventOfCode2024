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
    console.log('🚀 ~ i1:', input1, input2);
    if (input1 === undefined || input2 === undefined) {
      operations.push([i1, op, i2, _, target]);
      continue;
    }
    console.log(op);
    if (op === 'AND') {
      inputs.set(target, input1 + input2 === 2 ? 1 : 0);
    }
    if (op === 'OR') {
      inputs.set(target, input1 + input2 > 0 ? 1 : 0);
    }
    if (op === 'XOR') {
      inputs.set(target, input1 + input2 === 1 ? 1 : 0);
    }
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
export function sortWires({
  inputs,
  operations,
}: {
  inputs: Map<string, number>;
  operations: string[][];
}): string {
  const replaced: string[] = [];
  while (operations.length) {
    const [i1, op, i2, _, target] = operations.shift()!;
    const c1 = i1.startsWith('x');
    const c2 = i2.startsWith('y');
    const c3 = target.startsWith('z');
    if (c1 || c2 || c3) {
      if (!c1 && !c2) {
        replaced.push(target);
        continue;
      }
      if (c1 && c2 && !c3) {
        replaced.push(target);
        continue;
      }
      if (c1 && c2) {
        replaced.push(i1);
      }
      if (!c2 && c1) {
        replaced.push(i2);
      }
      const ncb = Number(i1.slice(1)); //number condition base
      const nct = Number(target.slice(1)); // number condition target
      if (!isNaN(ncb) && !isNaN(nct) && c3 && ncb !== nct) {
        replaced.push(target);
      }
    }
  }
  return replaced.sort((a, b) => a.localeCompare(b)).join(',');
}
