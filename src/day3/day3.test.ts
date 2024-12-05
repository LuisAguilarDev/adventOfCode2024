import fs from 'fs';
import { resultOfEnabledMultiplication, resultOfMultiplication } from './day3';

describe('Day 1', () => {
  let rawData = '';
  beforeAll(async () => {
    rawData = await fs.promises
      .readFile('./src/day3/day3.txt')
      .then((bufferContent) => bufferContent.toString());
  });
  test('#1 It should return the result of the operations', () => {
    expect(resultOfMultiplication(rawData)).toEqual(166630675);
  });
  test('#2 It should return the result of the enabled operations', () => {
    expect(resultOfEnabledMultiplication(rawData)).toEqual(93465710);
  });
});
