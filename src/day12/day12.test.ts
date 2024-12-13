import fs from 'fs';
import { getGrid } from '../day8/day8';
import { getFencingCost, getFencingCostOverSides } from './day12';
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
  xtest('#1 the content should exist', () => {
    expect(grid).toBeDefined();
  });
  xtest('#2 it should return the total cost of fencing all regions on your map', () => {
    expect(
      getFencingCost(
        getGrid(`AAAA
                BBCD
                BBCC
                EEEC`),
      ),
    ).toBe(140);
  });
  xtest('#3 it should return the total cost of fencing all regions on your map', () => {
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
  xtest('#4 it should return the total cost of fencing all regions on your map', () => {
    expect(getFencingCost(grid)).toBe(1488414);
  });
  xtest('#5 it should the count of the stones after 75 blinks', () => {
    expect(
      getFencingCostOverSides(
        getGrid(`AAAA
                BBCD
                BBCC
                EEEC`),
      ),
    ).toBe(80);
  });
  xtest('#6 it should the count of the stones after 75 blinks', () => {
    expect(
      getFencingCostOverSides(
        getGrid(`EEEEE
                EXXXX
                EEEEE
                EXXXX
                EEEEE`),
      ),
    ).toBe(368);
  });
  xtest('#6 it should the count of the stones after 75 blinks', () => {
    expect(
      getFencingCostOverSides(
        getGrid(`AAAAAA
                 AAABBA
                 AAABBA
                 ABBAAA
                 ABBAAA
                 AAAAAA`),
      ),
    ).toBe(1206);
  });
  xtest('#6 it should the count of the stones after 75 blinks', () => {
    expect(
      getFencingCostOverSides(
        getGrid(`AAAA
                BBCD
                BBCC
                EEEC`),
      ),
    ).toBe(80);
  });
  xtest('#6 it should the count of the stones after 75 blinks', () => {
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
  test('#3 it should return the total cost of fencing all regions on your map', () => {
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
});
