import fs from 'fs';
import { fits, getData } from './day25';

describe('Day 23', () => {
  let data: [number[][], number[][], number];

  let sampleData = getData(`#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`);
  beforeAll(async () => {
    data = await fs.promises
      .readFile('./src/day25/day25.txt')
      .then((bufferContent) => getData(bufferContent.toString()));
  });

  test('#1 should initialize data and sampleData properly', () => {
    expect(data).toBeDefined();
    expect(sampleData).toBeDefined();
  });
  test('#2 it should return the count of unique lock/key pairs fit together without overlapping in any column', () => {
    expect(fits(...sampleData)).toBe(3);
  });
  test('#2 it should return the count of unique lock/key pairs fit together without overlapping in any column', () => {
    expect(fits(...data)).toBe(3);
  });
});
