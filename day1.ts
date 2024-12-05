import fs from 'fs';

const filePath = './data/day1.txt';
//First;
fs.readFile(filePath, 'utf8', (err: any, content: string) => {
  if (err) return;
  const list1: number[] = [];
  const list2: number[] = [];
  content.split('\n').forEach((line: string) => {
    const [left, rigth] = line.trim().split(/\s+/).map(Number);
    list1.push(left);
    list2.push(rigth);
  });
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);
  let totalDifference = 0;
  for (let i = 0; i < list1.length; i++) {
    const difference = Math.abs(list1[i] - list2[i]);
    totalDifference += difference;
  }
  console.log('🚀 ~ fs.readFile ~ totalDifference:', totalDifference);
});

//Second;
fs.readFile(filePath, 'utf8', (err: any, content: any) => {
  if (err) return;
  const list1: number[] = [];
  const list2 = new Map();
  content.split('\n').forEach((line: string) => {
    const [left, rigth] = line.trim().split(/\s+/).map(Number);
    list1.push(left);
    const numberOfAppearances = list2.get(rigth);
    if (typeof numberOfAppearances !== 'number') {
      list2.set(rigth, 1);
    } else {
      list2.set(rigth, numberOfAppearances + 1);
    }
  });
  let totalSimilarityScore = 0;
  list1.forEach((number) => {
    const similarityMultiplier = list2.get(number) ?? 0;
    const similarityScore = number * similarityMultiplier;
    totalSimilarityScore += similarityScore;
  });
  console.log('🚀 ~ fs.readFile ~ totalSimilarityScore:', totalSimilarityScore);
});
