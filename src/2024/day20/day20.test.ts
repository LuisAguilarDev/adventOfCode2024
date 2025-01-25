import fs from 'fs';
import { getGrid } from '../day8/day8';
import { cheatsAvailable, cheatsAvailablePartTwo } from './day20';

describe('Day 20', () => {
  let data: string[][];
  let sampleData: string[][];
  beforeAll(async () => {
    data = await fs.promises
      .readFile('./src/day20/day20.txt')
      .then((bufferContent) => getGrid(bufferContent.toString()));
    sampleData = getGrid(`###############
                          #...#...#.....#
                          #.#.#.#.#.###.#
                          #S#...#.#.#...#
                          #######.#.#.###
                          #######.#.#...#
                          #######.#.###.#
                          ###..E#...#...#
                          ###.#######.###
                          #...###...#...#
                          #.#####.#.###.#
                          #.#...#.#.#...#
                          #.#.#.#.#.#.###
                          #...#...#...###
                          ###############`);
  });
  test('#1 it should exists', () => {
    expect(data).toBeDefined();
    expect(sampleData).toBeDefined();
  });
  test('#2 it should return the quantity of cheats would save picoseconds', () => {
    expect(cheatsAvailable(sampleData).q).toBe(44);
  });
  test('#3 it should return the quantity of cheats would save at least 100 picoseconds', () => {
    expect(cheatsAvailable(data, 100).q).toBe(1441);
  });
  test('#4 it should return the quantity of cheats would save at least 50 picoseconds', () => {
    expect(cheatsAvailablePartTwo(sampleData, 50).q).toBe(285);
  });
  // it worked but needs to be improved very slow performance
  // √ #5 it should return the quantity of cheats would save at least 100 picoseconds (104557 ms)
  // test('#5 it should return the quantity of cheats would save at least 100 picoseconds', () => {
  //   expect(cheatsAvailablePartTwo(data, 100).q).toBe(1021490);
  // });
});
