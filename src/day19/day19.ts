//Day 19: Linen Layout ---
// getting data
export function getData(rawString: string): [string[], string[]] {
  const towels: string[] = [];
  const designs: string[] = [];
  rawString.split('\n').forEach((rawRow: string) => {
    rawRow = rawRow.trim();
    if (!rawRow) return;
    if (!towels.length) {
      rawRow.split(',').forEach((x) => {
        towels.push(x.trim());
      });
    } else {
      designs.push(rawRow.trim());
    }
  });
  return [towels, designs];
}
// Part 1
//w,u,b,r,g
export function getPosibleDesigns([towels, designs]: [
  string[],
  string[],
]): number {
  let posible = 0;
  designs.forEach((design) => {
    if (designReview(design, towels)) {
      posible++;
    }
  });
  return posible;
}
function designReview(design: string, towels: string[]): boolean {
  const stack = [design];
  while (stack.length) {
    const cd = stack.pop()!;
    let found = false;
    towels.forEach((towel) => {
      if (cd.startsWith(towel)) {
        const next = cd.slice(towel.length);
        if (!next) {
          found = true;
        }
        stack.push(next);
      }
    });
    if (found) return true;
  }
  return false;
}
// Part 2
export function countPossibleDesigns([towels, designs]: [
  string[],
  string[],
]): number {
  let totalWays = 0;
  const cache: Map<string, number> = new Map();
  designs.forEach((design) => {
    totalWays += countWaysToMakeDesign(design, towels, cache);
  });
  return totalWays;
}

function countWaysToMakeDesign(
  design: string,
  towels: string[],
  cache: Map<string, number>,
): number {
  return countWays(design, towels, cache);
}

function countWays(
  design: string,
  towels: string[],
  cache: Map<string, number>,
): number {
  if (design === '') return 1;
  let cached = cache.get(design);
  if (cached) return cached;
  let ways = 0;
  towels.forEach((towel) => {
    if (design.startsWith(towel)) {
      const remainingDesign = design.slice(towel.length);
      ways += countWays(remainingDesign, towels, cache);
    }
  });
  cache.set(design, ways);
  return ways;
}
