import fs from 'fs';
import { getCheckSum } from './day9';

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
  test('#2 it should reeturn the filesystem checksum', () => {
    expect(getCheckSum(data)).toBe(6200294120911);
  });
});
