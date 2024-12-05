import fs from 'fs';
//First
fs.readFile('./files/day3.txt', 'utf8', (err: any, content: string) => {
  if (err) return;
  const regex = /mul\(\d+,\d+\)/g;
  const operations = content.match(regex);
  let total = 0;
  operations?.forEach((operation) => {
    //operation is mul(n,n)
    const regex = /\d+/g;
    const [n1, n2] = operation.match(regex)?.map(Number) ?? [0, 0];
    total += n1 * n2;
  });
  console.log('🚀 ~ fs.readFile ~ total First:', total);
});
//Second
fs.readFile('./files/day3.txt', 'utf8', (err: any, content: string) => {
  if (err) return;
  const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
  const operations = content.match(regex);
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
  console.log('🚀 ~ fs.readFile ~ total Second:', total);
});
