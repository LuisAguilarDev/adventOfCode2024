import fs from 'fs';
import { getAllFewestToken, getInput, Point, getFixedInput } from './day13';

describe('Day 13', () => {
  let data: Point[][];
  let dataFixed: Point[][];
  //prettier-ignore
  const sampleData =   `Button A: X+94, Y+34
                        Button B: X+22, Y+67
                        Prize: X=8400, Y=5400

                        Button A: X+26, Y+66
                        Button B: X+67, Y+21
                        Prize: X=12748, Y=12176

                        Button A: X+17, Y+86
                        Button B: X+84, Y+37
                        Prize: X=7870, Y=6450

                        Button A: X+69, Y+23
                        Button B: X+27, Y+71
                        Prize: X=18641, Y=10279`
  beforeAll(async () => {
    data = await fs.promises
      .readFile('./src/day13/day13.txt')
      .then((bufferContent) => getInput(bufferContent.toString()));
    dataFixed = await fs.promises
      .readFile('./src/day13/day13.txt')
      .then((bufferContent) => getFixedInput(bufferContent.toString()));
  });
  test('#1 it shiuld give the fewest tokens you would have to spend to win all possible prizes', () => {
    expect(data).toBeDefined();
  });
  test('#2 it shiuld give the fewest tokens you would have to spend to win all possible prizes', () => {
    expect(getAllFewestToken(getInput(sampleData))).toBe(480);
  });
  test('#3 it shiuld give the fewest tokens you would have to spend to win all possible prizes', () => {
    expect(getAllFewestToken(data)).toBe(30973);
  });
  test('#3 it shiuld give the fewest tokens you would have to spend to win all possible prizes', () => {
    expect(getAllFewestToken(dataFixed)).toBe(95688837203288);
  });
});
