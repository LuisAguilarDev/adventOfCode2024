import fs from 'fs';
import { getScore, getScore2 } from './day10';
import { getGrid } from '../day8/day8';

describe('Day 10', () => {
  //prettier-ignore
  let data:string[][]
  let sampleGrid: string[][];
  const sampleData = `89010123
                      78121874
                      87430965
                      96549874
                      45678903
                      32019012
                      01329801
                      10456732`;
  beforeAll(async () => {
    data = getGrid(
      await fs.promises
        .readFile('./src/day10/day10.txt')
        .then((bufferContent) => bufferContent.toString()),
    );
    sampleGrid = getGrid(sampleData);
  });
  test('#1 the content should exist', () => {
    expect(data).toBeDefined();
  });
  test('#2 it should return the scores of all trailheads on your topographic map', () => {
    expect(
      getScore(
        getGrid(`...0...
                ...1...
                ...2...
                6543456
                7.....7
                8.....8
                9.....9`),
      ),
    ).toBe(2);
  });
  test('#3 it should return the scores of all trailheads on your topographic map', () => {
    expect(
      getScore(
        getGrid(`..90..9
                ...1.98
                ...2..7
                6543456
                765.987
                876....
                987....`),
      ),
    ).toBe(4);
  });
  test('#4 it should return the scores of all trailheads on your topographic map', () => {
    expect(getScore(sampleGrid)).toBe(36);
  });
  test('#5  it should return the scores of all trailheads on your topographic map', () => {
    expect(getScore(data)).toBe(782);
  });
  test('#6 it should return the scores(sum of paths) of all trailheads on your topographic map', () => {
    expect(
      getScore2(
        getGrid(`.....0.
                ..4321.
                ..5..2.
                ..6543.
                ..7..4.
                ..8765.
                ..9....`),
      ),
    ).toBe(3);
  });
  test('#7 it should return the scores(sum of paths) of all trailheads on your topographic map', () => {
    expect(
      getScore2(
        getGrid(`..90..9
                ...1.98
                ...2..7
                6543456
                765.987
                876....
                987....`),
      ),
    ).toBe(13);
  });
  test('#8 it should return the scores(sum of paths) of all trailheads on your topographic map', () => {
    expect(
      getScore2(
        getGrid(`89010123
                78121874
                87430965
                96549874
                45678903
                32019012
                01329801
                10456732`),
      ),
    ).toBe(81);
  });
  test('#9 it should return the scores(sum of paths) of all trailheads on your topographic map', () => {
    expect(getScore2(data)).toBe(1694);
  });
});
