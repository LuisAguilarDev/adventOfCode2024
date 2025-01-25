import fs from 'fs';
import { countPossibleDesigns, getData, getPosibleDesigns } from './day19';

describe('Day 19', () => {
  let data: [string[], string[]];
  let sampleData: [string[], string[]];
  beforeAll(async () => {
    data = await fs.promises
      .readFile('./src/day19/day19.txt')
      .then((bufferContent) => getData(bufferContent.toString()));
    sampleData = getData(`r, wr, b, g, bwu, rb, gb, br

                            brwrr
                            bggr
                            gbbr
                            rrbgbr
                            ubwu
                            bwurrg
                            brgr
                            bbrgwb`);
  });
  test('#1 it should exists', () => {
    expect(data).toBeDefined();
    expect(sampleData).toBeDefined();
  });
  test('#2 it should return the count of designs that are possible', () => {
    expect(getPosibleDesigns(sampleData)).toBe(6);
  });
  test('#3 it should return the count of designs that are possible', () => {
    expect(getPosibleDesigns(data)).toBe(363);
  });
  test('#4 it should return the count of all different designs that are possible', () => {
    expect(countPossibleDesigns(sampleData)).toBe(16);
  });
  test('#3 it should return the count of all different designs that are possible', () => {
    expect(countPossibleDesigns(data)).toBe(642535800868438);
  });
});
