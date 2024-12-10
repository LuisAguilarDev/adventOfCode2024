import fs from 'fs';
import { countAntinodes, countAntinodesExpanded, getGrid } from './day8';

describe('Day 8', () => {
  //prettier-ignore
  let sampleGrid:string[][]
  let grid: string[][];
  const sampleData = `............
                      ........0...
                      .....0......
                      .......0....
                      ....0.......
                      ......A.....
                      ............
                      ............
                      ........A...
                      .........A..
                      ............
                      ............`;
  beforeAll(async () => {
    grid = getGrid(
      await fs.promises
        .readFile('./src/day8/day8.txt')
        .then((bufferContent) => bufferContent.toString()),
    );
    sampleGrid = getGrid(sampleData);
  });
  test('#1 the content should exist', () => {
    expect(sampleGrid).toBeDefined();
    expect(grid).toBeDefined();
  });
  test('#2 it should return the quantity of unique locations within the bounds of the map that contain an antinode', () => {
    expect(countAntinodes(sampleGrid)).toBe(14);
  });
  test('#3 it should return the quantity of unique locations within the bounds of the map that contain an antinode', () => {
    expect(countAntinodes(grid)).toBe(214);
  });
  test('#4 it should return the quantity of unique locations within the bounds of the map that contain an antinode with expanded range', () => {
    expect(countAntinodesExpanded(sampleGrid)).toBe(34);
  });
  test('#5 it should return the quantity of unique locations within the bounds of the map that contain an antinode with expanded range', () => {
    expect(countAntinodesExpanded(grid)).toBe(809);
  });
});
