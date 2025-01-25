import fs from 'fs';
import {
  getInput,
  getSumFromAllMiddlePages,
  getSumFromAllMiddlePages2,
} from './day5';

describe('Day 5', () => {
  let input: {
    orderingRules: Map<number, Set<number>>;
    updates: Array<number[]>;
  };
  let sampleInput: {
    orderingRules: Map<number, Set<number>>;
    updates: Array<number[]>;
  };
  const sampleData = `47|53
                      97|13
                      97|61
                      97|47
                      75|29
                      61|13
                      75|53
                      29|13
                      97|29
                      53|29
                      61|53
                      97|53
                      61|29
                      47|13
                      75|47
                      97|75
                      47|61
                      75|61
                      47|29
                      75|13
                      53|13

                      75,47,61,53,29
                      97,61,53,29,13
                      75,29,13
                      75,97,47,61,53
                      61,13,29
                      97,13,75,29,47`;
  beforeAll(async () => {
    input = getInput(
      await fs.promises
        .readFile('./src/day5/day5.txt')
        .then((bufferContent) => bufferContent.toString()),
    );
    sampleInput = getInput(sampleData);
  });
  test('#1 the content should exist', () => {
    expect(input).toBeDefined();
  });
  test('#2 it should return the sum of the middle page number from all valid updates', () => {
    expect(getSumFromAllMiddlePages(sampleInput)).toEqual(143);
  });
  test('#3 it should return the sum of the middle page number from all valid updates', () => {
    expect(getSumFromAllMiddlePages(input)).toEqual(6041);
  });
  test('#4 it should return the sum of the middle page number from fixed updates', () => {
    expect(getSumFromAllMiddlePages2(sampleInput)).toEqual(123);
  });
  test('#5 it should return the sum of the middle page number from fixed updates', () => {
    expect(getSumFromAllMiddlePages2(input)).toEqual(4884);
  });
});
