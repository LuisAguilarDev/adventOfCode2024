import fs from 'fs';
import { countSafeReports, countSafeReportsWithDampener } from './day2';

describe('Day 2', () => {
  let rawData = '';
  beforeAll(async () => {
    rawData = await fs.promises
      .readFile('./src/day2/day2.txt')
      .then((bufferContent) => bufferContent.toString());
  });
  test('#1 It should count the safe reports', () => {
    expect(countSafeReports(rawData)).toEqual(341);
  });
  test('#2 It should count the safe reports with Problem Dampener', () => {
    expect(countSafeReportsWithDampener(rawData)).toEqual(404);
  });
});
