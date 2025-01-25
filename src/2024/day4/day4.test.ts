import fs from 'fs';
import { countMAS, countXMAS, getInput } from './day4';

describe('Day 4', () => {
  let input: string[][];
  beforeAll(async () => {
    input = getInput(
      await fs.promises
        .readFile('./src/day4/day4.txt')
        .then((bufferContent) => bufferContent.toString()),
    );
  });
  test('#1 It should return the count of how many times XMAS appear', () => {
    expect(countXMAS(input)).toEqual(2483);
  });
  test('#2 It should return the count of how many times X-MAS appear', () => {
    expect(countMAS(input)).toEqual(1925);
  });
});
