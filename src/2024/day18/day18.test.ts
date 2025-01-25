import fs from 'fs';
import { getCoords, steps, unreacheableAt } from './day18';

describe('Day 18', () => {
  let data: [number, number][];
  let sampleData: [number, number][];
  beforeAll(async () => {
    data = await fs.promises
      .readFile('./src/day18/day18.txt')
      .then((bufferContent) => getCoords(bufferContent.toString()));
    sampleData = getCoords(`5,4
                            4,2
                            4,5
                            3,0
                            2,1
                            6,3
                            2,4
                            1,5
                            0,6
                            3,3
                            2,6
                            5,1
                            1,2
                            5,5
                            2,5
                            6,5
                            1,4
                            0,4
                            6,4
                            1,1
                            6,1
                            1,0
                            0,5
                            1,6
                            2,0`);
  });
  test('#1 it should exists', () => {
    expect(data).toBeDefined();
    expect(sampleData).toBeDefined();
  });
  test('#2 it should return the minimum number of steps needed to reach the exit', () => {
    expect(steps(sampleData, 12, 7)).toBe(22);
  });
  test('#3 it should return the minimum number of steps needed to reach the exit', () => {
    expect(steps(data, 1024, 71)).toBe(226);
  });
  test(`#4 it should return the the coordinates of the first byte that will prevent
    the exit from being reachable from your starting position`, () => {
    const r = unreacheableAt(data, 71);
    expect(r[0]).toBe(46);
    expect(r[1]).toBe(60);
  });
});
