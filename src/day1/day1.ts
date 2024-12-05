//First;
export function distanceBetweenList(rawData: string) {
  const list1: number[] = [];
  const list2: number[] = [];
  rawData.split('\n').forEach((line: string) => {
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
  return totalDifference;
}
//Second;
export function similarityScore(rawData: string) {
  const list1: number[] = [];
  const list2 = new Map();
  rawData.split('\n').forEach((line: string) => {
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
  return totalSimilarityScore;
}
