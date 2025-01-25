import fs from 'fs';
import { getGrid } from '../day8/day8';
import { getLowestScore, getTilesOnBestPath } from './day16';

describe('Day 16', () => {
  //prettier-ignore
  let data:string[][]
  let sampleGrid: string[][];
  let sampleGrid2: string[][];
  const sampleData = `###############
                        #.......#....E#
                        #.#.###.#.###.#
                        #.....#.#...#.#
                        #.###.#####.#.#
                        #.#.#.......#.#
                        #.#.#####.###.#
                        #...........#.#
                        ###.#.#####.#.#
                        #...#.....#.#.#
                        #.#.#.###.#.#.#
                        #.....#...#.#.#
                        #.###.#.#.#.#.#
                        #S..#.....#...#
                        ###############`;
  const sampleData2 = `#################
                        #...#...#...#..E#
                        #.#.#.#.#.#.#.#.#
                        #.#.#.#...#...#.#
                        #.#.#.#.###.#.#.#
                        #...#.#.#.....#.#
                        #.#.#.#.#.#####.#
                        #.#...#.#.#.....#
                        #.#.#####.#.###.#
                        #.#.#.......#...#
                        #.#.###.#####.###
                        #.#.#...#.....#.#
                        #.#.#.#####.###.#
                        #.#.#.........#.#
                        #.#.#.#########.#
                        #S#.............#
                        #################`;
  beforeAll(async () => {
    data = getGrid(
      await fs.promises
        .readFile('./src/day16/day16.txt')
        .then((bufferContent) => bufferContent.toString()),
    );
    sampleGrid = getGrid(sampleData);
    sampleGrid2 = getGrid(sampleData2);
  });
  test('#1 the content should exist', () => {
    expect(data).toBeDefined();
  });
  test('#2 it should return the lowest score a Reindeer could possibly get', () => {
    expect(getLowestScore(sampleGrid)).toBe(7036);
  });
  test('#3 it should return the lowest score a Reindeer could possibly get', () => {
    expect(getLowestScore(data)).toBe(88416);
  });
  test('#4 it should return the number of tiles that the Reindeer will pass with the lowest score', () => {
    expect(getTilesOnBestPath(sampleGrid)).toBe(45);
  });
  test('#4 it should return the number of tiles that the Reindeer will pass with the lowest score', () => {
    expect(getTilesOnBestPath(sampleGrid2)).toBe(64);
  });
  test('#5 it should return the number of tiles that the Reindeer will pass with the lowest score', () => {
    expect(getTilesOnBestPath(data)).toBe(442);
  });
});
