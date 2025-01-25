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
//Parser approach
//TODO: Build as AST
function lexer(input: string): string[] {
  const tokens = [];
  const re = /mul\((\d{1,3}),(\d{1,3})\)/g;
  let match;
  while ((match = re.exec(input)) !== null) {
    tokens.push(match[1] + ',' + match[2]);
  }

  return tokens;
}

function operate(tokens: string[]) {
  let sum = 0;
  for (const operation of tokens) {
    const numbers = operation.split(',').map(Number);
    sum += numbers[0] * numbers[1];
    console.log(sum);
  }
  return sum;
}
const tokens = lexer(
  'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
);
operate(tokens);
