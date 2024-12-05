import fs from 'fs';
import { countX_MAS, countXMAS } from './day4';

describe('Day 4', () => {
  let rawData = '';
  beforeAll(async () => {
    rawData = await fs.promises
      .readFile('./src/day4/day4.txt')
      .then((bufferContent) => bufferContent.toString());
  });
  test('#1 It should return the count of how many times XMAS appear', () => {
    expect(countXMAS(rawData)).toEqual(2483);
  });
  test('#2 It should return the count of how many times X-MAS appear', () => {
    expect(countX_MAS(rawData)).toEqual(1925);
  });
});
