import fs from 'fs';
import {
  countPlacesToPlaceObstruction,
  positionsVisited,
  getLabMap,
  getStartPosition,
  mapWithPositionsVisited,
} from './day6';

describe('Day 6', () => {
  //prettier-ignore
  const sampleData =   `....#.....
                        .........#
                        ..........
                        ..#.......
                        .......#..
                        ..........
                        .#..^.....
                        ........#.
                        #.........
                        ......#...`;
  const sampleLabMap = getLabMap(sampleData);
  const starSampleLabMap: [number, number] = getStartPosition(sampleLabMap);

  let labMap: string[][] = [[]];
  let startLabMap: [number, number];
  beforeAll(async () => {
    const rawData = await fs.promises
      .readFile('./src/day6/day6.txt')
      .then((bufferContent) => bufferContent.toString());
    labMap = getLabMap(rawData);
    startLabMap = getStartPosition(labMap);
  });
  test('#1 the content should exist', () => {
    expect(labMap).toBeDefined();
  });
  test('#2 it should count how many distinct positions will the guard visit before leaving the mapped area', () => {
    expect(positionsVisited(sampleLabMap, starSampleLabMap)).toEqual(41);
  });
  test('#3 it should count how many distinct positions will the guard visit before leaving the mapped area', () => {
    expect(positionsVisited(labMap, startLabMap)).toEqual(5453);
  });
  test('#4 it should count how many distinct positions could you choose for this obstruction to create a stuck in a loop', () => {
    expect(
      countPlacesToPlaceObstruction(sampleLabMap, starSampleLabMap),
    ).toEqual(6);
  });
  test('#5 it should return the map of positions visited', () => {
    expect(mapWithPositionsVisited(sampleLabMap, starSampleLabMap)).toEqual([
      ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', 'O', 'O', 'O', 'O', 'O', '#'],
      ['.', '.', '.', '.', 'O', '.', '.', '.', 'O', '.'],
      ['.', '.', '#', '.', 'O', '.', '.', '.', 'O', '.'],
      ['.', '.', 'O', 'O', 'O', 'O', 'O', '#', 'O', '.'],
      ['.', '.', 'O', '.', 'O', '.', 'O', '.', 'O', '.'],
      ['.', '#', 'O', 'O', '^', 'O', 'O', 'O', 'O', '.'],
      ['.', 'O', 'O', 'O', 'O', 'O', 'O', 'O', '#', '.'],
      ['#', 'O', 'O', 'O', 'O', 'O', 'O', 'O', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '#', 'O', '.', '.'],
    ]);
  });
  test('#6 it should count how many distinct positions could you choose for this obstruction to create a stuck in a loop', () => {
    expect(countPlacesToPlaceObstruction(labMap, startLabMap)).toEqual(2188);
  });
});
