//--- Day 3: Mull It Over ---
//First
export function resultOfMultiplication(rawData: string): number {
  const regex = /mul\(\d+,\d+\)/g;
  const operations = rawData.match(regex);
  let total = 0;
  operations?.forEach((operation) => {
    //operation is mul(n,n)
    const regex = /\d+/g;
    const [n1, n2] = operation.match(regex)?.map(Number) ?? [0, 0];
    total += n1 * n2;
  });
  return total;
}
//Second
export function resultOfEnabledMultiplication(rawData: string) {
  const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
  const operations = rawData.match(regex);
  let total = 0;
  let isEnabled = true;
  operations?.forEach((operation) => {
    //operation is mul(n,n) do() don't()
    if (operation === 'do()') {
      isEnabled = true;
      return;
    }
    if (operation === "don't()") {
      isEnabled = false;
      return;
    }
    if (!isEnabled) return;
    //operation is mul(n,n)
    const regex = /\d+/g;
    const [n1, n2] = operation.match(regex)?.map(Number) ?? [0, 0];
    total += n1 * n2;
  });
  return total;
}
