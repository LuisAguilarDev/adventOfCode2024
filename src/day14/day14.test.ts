import fs from 'fs';
import { getRobots, getSafetyFactor, Robot, timeToShowPicture } from './day14';

describe('Day 14', () => {
  let data: Robot[];
  beforeAll(async () => {
    data = await fs.promises
      .readFile('./src/day14/day14.txt')
      .then((bufferContent) => getRobots(bufferContent.toString()));
  });
  test('#1 it should give the fewest tokens you would have to spend to win all possible prizes', () => {
    expect(data).toBeDefined();
  });
  test('#2 it should give the fewest tokens you would have to spend to win all possible prizes', () => {
    expect(
      getSafetyFactor(
        11,
        7,
        getRobots(`p=0,4 v=3,-3
                   p=6,3 v=-1,-3
                   p=10,3 v=-1,2
                   p=2,0 v=2,-1
                   p=0,0 v=1,3
                   p=3,0 v=-2,-2
                   p=7,6 v=-1,-3
                   p=3,0 v=-1,-2
                   p=9,3 v=2,3
                   p=7,3 v=-1,2
                   p=2,4 v=2,-3
                   p=9,5 v=-3,-3`),
      ),
    ).toBe(12);
  });
  test('#3 it should give the fewest tokens you would have to spend to win all possible prizes', () => {
    expect(getSafetyFactor(103, 101, data)).toBe(211692000);
  });
  test('#4 it should give the fewest tokens you would have to spend to win all possible prizes', () => {
    expect(timeToShowPicture(103, 101, data)).toBe(6587);
  });
});
