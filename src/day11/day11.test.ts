import fs from 'fs';
import { countStones, countStones2 } from './day11';

describe('Day 11', () => {
  //prettier-ignore
  let data:number[]
  const sampleData = `125 17`.split(' ').map(Number);
  beforeAll(async () => {
    data = await fs.promises
      .readFile('./src/day11/day11.txt')
      .then((bufferContent) => bufferContent.toString().split(' ').map(Number));
  });
  test('#1 the content should exist', () => {
    expect(data).toBeDefined();
  });
  test('#2 it should the count of the stones after 25 blinks', () => {
    expect(countStones(sampleData)).toBe(55312);
  });
  test('#3 it should the count of the stones after 25 blinks', () => {
    expect(countStones(data)).toBe(183620);
  });
  test('#4 it should the count of the stones after 25 blinks', () => {
    expect(countStones2(sampleData, 25)).toBe(55312);
  });
  test('#4 it should the count of the stones after 75 blinks', () => {
    expect(countStones2(data, 75)).toBe(75);
  });
});
