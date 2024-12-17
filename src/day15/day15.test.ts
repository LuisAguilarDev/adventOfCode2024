import fs from 'fs';
import {
  getGridAndMoves,
  getSumOfAllBoxes,
  getSumOfAllBoxes2,
  getWideGrid,
} from './day15';

describe('Day 15', () => {
  let data: [string[][], string];
  let sampleData: [string[][], string];
  beforeAll(async () => {
    data = await fs.promises
      .readFile('./src/day15/day15.txt')
      .then((bufferContent) => getGridAndMoves(bufferContent.toString()));
    sampleData = await fs.promises
      .readFile('./src/day15/day15.sample.txt')
      .then((bufferContent) => getGridAndMoves(bufferContent.toString()));
  });
  test("#1 it should give the sum of all boxes' GPS coordinates", () => {
    expect(data).toBeDefined();
    expect(sampleData).toBeDefined();
  });
  test("#2 it should give the sum of all boxes' GPS coordinates", () => {
    expect(getSumOfAllBoxes(sampleData)).toBe(10092);
  });
  test("#3 it should give the sum of all boxes' GPS coordinates", () => {
    expect(getSumOfAllBoxes(data)).toBe(1509074);
  });
  test("#4 it should give the sum of all boxes' GPS coordinates", () => {
    const sampleGrid = getWideGrid(sampleData[0]);
    expect(getSumOfAllBoxes2([sampleGrid, sampleData[1]])).toBe(9021);
  });
  test("#5 it should give the sum of all boxes' GPS coordinates", () => {
    expect(
      getSumOfAllBoxes2([getWideGrid(data[0]), data[1]]),
    ).toBe(1433513);
  });
});
//prettier-ignore
