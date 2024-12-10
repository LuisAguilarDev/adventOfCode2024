import fs from 'fs';
import { getCheckSum, getCheckSum2 } from './day9';

describe('Day 9', () => {
  //prettier-ignore
  let data:string
  const sampleData = `2333133121414131402`;
  beforeAll(async () => {
    data = await fs.promises
      .readFile('./src/day9/day9.txt')
      .then((bufferContent) => bufferContent.toString());
  });
  test('#1 the content should exist', () => {
    expect(data).toBeDefined();
  });
  test('#2 it should reeturn the filesystem checksum', () => {
    expect(getCheckSum(sampleData)).toBe(1928);
  });
  test('#3 it should reeturn the filesystem checksum', () => {
    expect(getCheckSum(data)).toBe(6200294120911);
  });
  test('#4 it should reeturn the filesystem checksum', () => {
    expect(getCheckSum2(sampleData)).toBe(2858);
  });
  test('#5 it should reeturn the filesystem checksum', () => {
    expect(getCheckSum2(data)).toBe(6227018762750);
  });
});
