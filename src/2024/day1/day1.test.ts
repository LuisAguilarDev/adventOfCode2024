import fs from 'fs';
import { distanceBetweenList, similarityScore } from './day1';

describe('Day 1', () => {
  let rawData = '';
  beforeAll(async () => {
    rawData = await fs.promises
      .readFile('./src/day1/day1.txt')
      .then((bufferContent) => bufferContent.toString());
  });
  test('#1 It should return the listance letween list', () => {
    expect(distanceBetweenList(rawData)).toEqual(2375403);
  });
  test('#2 It should return the similarity score between list', () => {
    expect(similarityScore(rawData)).toEqual(23082277);
  });
});
