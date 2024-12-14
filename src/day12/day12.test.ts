import fs from 'fs';
import { getGrid } from '../day8/day8';
import { getBorders, getFencingCost, getFencingCostOverSides } from './day12';
describe('Day 11', () => {
  //prettier-ignore
  let grid:string[][];
  beforeAll(async () => {
    grid = getGrid(
      await fs.promises
        .readFile('./src/day12/day12.txt')
        .then((bufferContent) => bufferContent.toString()),
    );
  });
  test('#1 the content should exist', () => {
    expect(grid).toBeDefined();
  });
  test('#2 it should return the total cost of fencing all regions on your map', () => {
    expect(
      getFencingCost(
        getGrid(`AAAA
                BBCD
                BBCC
                EEEC`),
      ),
    ).toBe(140);
  });
  test('#3 it should return the total cost of fencing all regions on your map', () => {
    expect(
      getFencingCost(
        getGrid(`RRRRIICCFF
                RRRRIICCCF
                VVRRRCCFFF
                VVRCCCJFFF
                VVVVCJJCFE
                VVIVCCJJEE
                VVIIICJJEE
                MIIIIIJJEE
                MIIISIJEEE
                MMMISSJEEE`),
      ),
    ).toBe(1930);
  });
  test('#4 it should return the total cost of fencing all regions on your map', () => {
    expect(getFencingCost(grid)).toBe(1488414);
  });
  test('#5 it should return the total cost of fencing all regions on your map with discount', () => {
    expect(
      getFencingCostOverSides(
        getGrid(`AAAA
                BBCD
                BBCC
                EEEC`),
      ),
    ).toBe(80);
  });
  test('#6 it should return the total cost of fencing all regions on your map with discount', () => {
    expect(
      getFencingCostOverSides(
        getGrid(`EEEEE
                EXXXX
                EEEEE
                EXXXX
                EEEEE`),
      ),
    ).toBe(236);
  });
  test('#7 it should return the total cost of fencing all regions on your map with discount', () => {
    expect(
      getFencingCostOverSides(
        getGrid(`AAAAAA
                AAABBA
                AAABBA
                ABBAAA
                ABBAAA
                AAAAAA`),
      ),
    ).toBe(368);
  });
  test('#8 it should return the total cost of fencing all regions on your map with discount', () => {
    expect(
      getFencingCostOverSides(
        getGrid(`AAAA
                BBCD
                BBCC
                EEEC`),
      ),
    ).toBe(80);
  });
  test('#9 it should return the total cost of fencing all regions on your map with discount', () => {
    expect(
      getFencingCostOverSides(
        getGrid(`EEEEE
                EXXXX
                EEEEE
                EXXXX
                EEEEE`),
      ),
    ).toBe(236);
  });
  test('#10 it should return the total cost of fencing all regions on your map with discount', () => {
    expect(
      getFencingCostOverSides(
        getGrid(`RRRRIICCFF
                 RRRRIICCCF
                 VVRRRCCFFF
                 VVRCCCJFFF
                 VVVVCJJCFE
                 VVIVCCJJEE
                 VVIIICJJEE
                 MIIIIIJJEE
                 MIIISIJEEE
                 MMMISSJEEE`),
      ),
    ).toBe(1206);
  });

  test('#11 should count the sides based on points (x,y)', () => {
    const points: [number, number][] = [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
      [1, 2],
      [0, 3],
      [1, 3],
      [2, 3],
      [2, 4],
      [2, 2],
      [3, 2],
    ];

    expect(getBorders(points)).toBe(10);
  });

  test('#12 should count the sides based on points (x,y)', () => {
    const points: [number, number][] = [
      [0, 4],
      [1, 4],
      [0, 5],
      [1, 5],
    ];

    expect(getBorders(points)).toBe(4);
  });

  test('#13 should count the sides based on points (x,y)', () => {
    const points: [number, number][] = [
      [6, 4],
      [7, 4],
      [6, 3],
      [7, 3],
      [6, 2],
      [7, 2],
      [5, 2],
      [8, 2],
      [7, 1],
      [8, 1],
      [8, 3],
      [9, 3],
      [7, 5],
      [8, 5],
    ];

    expect(getBorders(points)).toBe(16);
  });

  test('#14 should count the sides based on points (x,y)', () => {
    const points: [number, number][] = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ];

    expect(getBorders(points)).toBe(4);
  });

  test('#15 should count the sides based on points (x,y)', () => {
    const points: [number, number][] = [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ];

    expect(getBorders(points)).toBe(4);
  });

  test('#16 it should return the total cost of fencing all regions on your map with discount', () => {
    const points: [number, number][] = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [3, 0],
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4],
    ];

    expect(getBorders(points)).toBe(12);
  });

  test('#17 it should return the total cost of fencing all regions on your map with discount', () => {
    expect(getFencingCostOverSides(grid)).toBe(911750);
  });
});
