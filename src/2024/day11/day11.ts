//--- Day 11: Plutonian Pebbles ---
//rules
// If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
// If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
// If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.

//Part 1
export function countStones(stones: number[]) {
  for (let b = 0; b < 25; b++) {
    stones = blink(stones);
  }
  return stones.length;
}
function blink(stones: number[]): number[] {
  const newStones: number[] = [];
  for (const stone of stones) {
    if (stone === 0) {
      newStones.push(1);
      continue;
    }
    if (stone.toString().length % 2 === 0) {
      const ns = stone.toString();
      const lh = ns.slice(0, ns.length / 2);
      const rh = ns.slice(ns.length / 2);
      newStones.push(Number(lh));
      newStones.push(Number(rh));
      continue;
    }
    newStones.push(stone * 2024);
  }
  return newStones;
}
//Part 2
export function countStones2(stones: number[], blinks: number): number {
  let count = 0;
  const cache: Map<string, number> = new Map();
  for (const stone of stones) {
    count += blinkRecursive(stone, blinks, cache);
  }
  return count;
}

function blinkRecursive(
  value: number,
  rem: number, // shortened from remainingIterations
  cache: Map<string, number>,
): number {
  const cacheKey = `${value},${rem}`;
  const cachedValue = cache.get(cacheKey);
  if (cachedValue) return cachedValue;
  if (rem === 0) {
    return 1;
  }
  rem--;
  let result;
  if (value === 0) {
    result = blinkRecursive(1, rem, cache);
  } else if (value.toString().length % 2 !== 0) {
    value *= 2024;
    result = blinkRecursive(value, rem, cache);
  } else {
    const ns = value.toString();
    const l = Number(ns.slice(0, ns.length / 2));
    const r = Number(ns.slice(ns.length / 2));
    const resultl = blinkRecursive(l, rem, cache);
    const resultr = blinkRecursive(r, rem, cache);
    result = resultl + resultr;
  }
  cache.set(cacheKey, result);
  return result;
}

//Iterative to be done
