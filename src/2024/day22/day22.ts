//--- Day 22: Monkey Market ---
export function getData(rawString: string): number[] {
  return rawString.split('\n').map((str) => Number(str.trim()));
}

// KEYWORDS: modular arithmetic, cycle detection and sequence analysis.

// Part 1

export function getNextSecret(num: bigint): bigint {
  num = ((num * 64n) ^ num) % 16777216n;
  num = ((num / 32n) ^ num) % 16777216n;
  num = ((num * 2048n) ^ num) % 16777216n;
  //using bigwise operations
  // num = ((num << 6n) ^ num) & 0xffffffn;
  // num = ((num >> 5n) ^ num) & 0xffffffn;
  // num = ((num << 11n) ^ num) & 0xffffffn;
  return num;
}

export function sumOfSecrets(secrets: number[], iterations: number): number {
  let result = 0;
  for (const secret of secrets) {
    result += getLastSecret(secret, iterations);
  }
  return result;
}
export function getLastSecret(secret: number, iterations: number): number {
  let nextSecret: bigint = BigInt(secret);
  for (let i = 0; i < iterations; i++) {
    nextSecret = getNextSecret(nextSecret);
  }
  return Number(nextSecret);
}

// Part 2
export function getHigherPrice(
  secret: number,
  sumAllSeqs: Map<string, number>,
): void {
  let seqs: number[] = [];
  let prevSecret: bigint = BigInt(secret);
  const visited = new Set();
  for (let i = 0; i < 2000; i++) {
    let nextSecret = getNextSecret(prevSecret);
    let prevPrice = Number(prevSecret % 10n);
    let nextPrice = Number(nextSecret % 10n);
    let diff = nextPrice - prevPrice;
    seqs.push(diff);
    prevSecret = nextSecret;
    if (seqs.length < 4) continue;
    if (seqs.length === 5) {
      seqs.shift();
    }
    const hash = seqs.toString();
    if (visited.has(hash)) continue;
    visited.add(hash);
    let price = sumAllSeqs.get(hash);
    if (!price) sumAllSeqs.set(hash, nextPrice);
    else {
      sumAllSeqs.set(hash, price + nextPrice);
    }
  }
}
export function bestSeq(secrets: number[]): number {
  const sumAllSeqs: Map<string, number> = new Map();
  for (const secret of secrets) {
    getHigherPrice(secret, sumAllSeqs);
  }
  const max = Math.max(...sumAllSeqs.values());

  // However, both spread (...) and apply will either fail or return the wrong result if the array has too many elements,
  // because they try to pass the array elements as function parameters. See Using apply and built-in functions for more details. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#using_apply_and_built-in_functions
  // The reduce solution does not have this problem.

  // const max = [...sumAllSeqs.values()].reduce(
  //   (a, b) => Math.max(a, b),
  //   -Infinity,
  // );
  return max;
}
