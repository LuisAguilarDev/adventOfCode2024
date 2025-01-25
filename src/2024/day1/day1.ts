//--- Day 1: Historian Hysteria ---
//First;
export function distanceBetweenList(rawData: string) {
  const list1: number[] = [];
  const list2: number[] = [];

  //Get Data
  rawData.split('\n').forEach((line: string) => {
    const [left, rigth] = line.trim().split(/\s+/).map(Number);
    list1.push(left);
    list2.push(rigth);
  });

  //Sort List
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  //Get distance between each
  let diff = 0;
  for (let i = 0; i < list1.length; i++) {
    diff += Math.abs(list1[i] - list2[i]);
  }
  return diff;
}
//Second;
export function similarityScore(rawData: string) {
  const list1: number[] = [];
  const list2 = new Map();

  //Get data
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

  //get score
  let score = 0;
  list1.forEach((number) => {
    score += number * (list2.get(number) ?? 0);
  });
  return score;
}
