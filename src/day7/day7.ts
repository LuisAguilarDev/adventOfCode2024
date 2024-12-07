//--- Day 7: Bridge Repair ---
//Return [result, numbersToOperate]
export function getCalibrationsEquations(rawData: string): Array<number[]> {
  return rawData.split('\n').map((row) => {
    const [result, numbers] = row.trim().split(':');

    return [
      Number(result),
      ...numbers
        .trim()
        .split(' ')
        .map((numberString) => Number(numberString)),
    ];
  });
}
//Part 1
export function getCalibrationResult(
  calibrationsEquations: Array<number[]>,
): number {
  let calibrationResult = 0;
  for (const calibrationEquations of calibrationsEquations) {
    const result = calibrationEquations[0];
    const numbers = calibrationEquations.slice(1);
    if (canGetTheResult(numbers, result)) {
      calibrationResult += result;
    }
  }
  return calibrationResult;
}

function canGetTheResult(numbers: number[], result: number): boolean {
  const allResultsByLevel: Array<number[]> = [];
  for (let i = 0; i < numbers.length; i++) {
    if (i === 0) {
      allResultsByLevel[i] = [numbers[0]];
      continue;
    }
    for (const lastResult of allResultsByLevel[i - 1]) {
      allResultsByLevel[i] ??= [];
      allResultsByLevel[i].push(lastResult * numbers[i]);
      allResultsByLevel[i].push(lastResult + numbers[i]);
    }
  }
  return allResultsByLevel[numbers.length - 1].includes(result);
}
//Part 2
export function getCalibrationResultWithAditionalOperator(
  calibrationsEquations: Array<number[]>,
): number {
  let calibrationResult = 0;
  for (const calibrationEquations of calibrationsEquations) {
    const result = calibrationEquations[0];
    const numbers = calibrationEquations.slice(1);
    if (canGetTheResultWithAditionalOperator(numbers, result)) {
      calibrationResult += result;
    }
  }
  return calibrationResult;
}
function canGetTheResultWithAditionalOperator(
  numbers: number[],
  result: number,
): boolean {
  //Dynamic Programing
  const allResultsByLevel: Array<number[]> = [];
  for (let i = 0; i < numbers.length; i++) {
    if (i === 0) {
      allResultsByLevel[i] = [numbers[0]];
      continue;
    }
    for (const lastResult of allResultsByLevel[i - 1]) {
      allResultsByLevel[i] ??= [];
      allResultsByLevel[i].push(lastResult * numbers[i]);
      allResultsByLevel[i].push(lastResult + numbers[i]);
      allResultsByLevel[i].push(
        Number(lastResult.toString() + numbers[i].toString()),
      );
    }
  }
  return allResultsByLevel[numbers.length - 1].includes(result);
}
