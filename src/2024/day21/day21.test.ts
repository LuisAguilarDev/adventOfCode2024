import fs from 'fs';
import {
  getData,
  getPattern,
  myPattern,
  sumOfComplexities,
  sumOfComplexities2,
} from './day21';

describe('Day 21', () => {
  let data: string[];
  let sampleData: string[];
  const nKeyPad = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['', '0', 'A'],
  ];
  const ns: [number, number] = [3, 2]; // Robot starts on "A"
  const sKeypad = [
    ['', '^', 'A'],
    ['<', 'v', '>'],
  ];
  const ss: [number, number] = [0, 2]; // Robot starts on "A"

  beforeAll(async () => {
    data = await fs.promises
      .readFile('./src/day21/day21.txt')
      .then((bufferContent) => getData(bufferContent.toString()));
    sampleData = getData(`029A
                          980A
                          179A
                          456A
                          379A`);
  });

  test('#1 should define data and sampleData properly', () => {
    expect(data).toBeDefined();
    expect(sampleData).toBeDefined();
  });

  test('#2 should return valid patterns for single input "7"', () => {
    expect(getPattern('7', nKeyPad, ns)).toEqual([
      '^^^<<A',
      '^^<^<A',
      '^^<<^A',
      '^<^^<A',
      '^<^<^A',
      '^<<^^A',
      '<^^^<A',
      '<^^<^A',
      '<^<^^A',
    ]);
  });

  test('#3 should return valid patterns for input "98"', () => {
    expect(getPattern('98', nKeyPad, ns)).toEqual(['^^^A<A']);
  });

  test('#4 should return valid patterns for input "78"', () => {
    expect(getPattern('78', nKeyPad, ns)).toEqual([
      '^^^<<A>A',
      '^^<^<A>A',
      '^^<<^A>A',
      '^<^^<A>A',
      '^<^<^A>A',
      '^<<^^A>A',
      '<^^^<A>A',
      '<^^<^A>A',
      '<^<^^A>A',
    ]);
  });

  test('#5 should return valid patterns for input "029A"', () => {
    expect(getPattern('029A', nKeyPad, ns)).toEqual([
      '<A^A^^>AvvvA',
      '<A^A^>^AvvvA',
      '<A^A>^^AvvvA',
    ]);
  });

  test('#6 should return valid patterns for input "<A^A^^>AvvvA" on small keypad', () => {
    expect(getPattern('<A^A^^>AvvvA', sKeypad, ss)).toEqual([
      'v<<A>^>A<A>A<AAv>A^Av<AAA^>A',
      'v<<A>^>A<A>A<AAv>A^Av<AAA>^A',
      'v<<A>^>A<A>A<AAv>A^A<vAAA^>A',
      'v<<A>^>A<A>A<AAv>A^A<vAAA>^A',
      'v<<A>^>A<A>A<AA>vA^Av<AAA^>A',
      'v<<A>^>A<A>A<AA>vA^Av<AAA>^A',
      'v<<A>^>A<A>A<AA>vA^A<vAAA^>A',
      'v<<A>^>A<A>A<AA>vA^A<vAAA>^A',
      'v<<A>>^A<A>A<AAv>A^Av<AAA^>A',
      'v<<A>>^A<A>A<AAv>A^Av<AAA>^A',
      'v<<A>>^A<A>A<AAv>A^A<vAAA^>A',
      'v<<A>>^A<A>A<AAv>A^A<vAAA>^A',
      'v<<A>>^A<A>A<AA>vA^Av<AAA^>A',
      'v<<A>>^A<A>A<AA>vA^Av<AAA>^A',
      'v<<A>>^A<A>A<AA>vA^A<vAAA^>A',
      'v<<A>>^A<A>A<AA>vA^A<vAAA>^A',
      '<v<A>^>A<A>A<AAv>A^Av<AAA^>A',
      '<v<A>^>A<A>A<AAv>A^Av<AAA>^A',
      '<v<A>^>A<A>A<AAv>A^A<vAAA^>A',
      '<v<A>^>A<A>A<AAv>A^A<vAAA>^A',
      '<v<A>^>A<A>A<AA>vA^Av<AAA^>A',
      '<v<A>^>A<A>A<AA>vA^Av<AAA>^A',
      '<v<A>^>A<A>A<AA>vA^A<vAAA^>A',
      '<v<A>^>A<A>A<AA>vA^A<vAAA>^A',
      '<v<A>>^A<A>A<AAv>A^Av<AAA^>A',
      '<v<A>>^A<A>A<AAv>A^Av<AAA>^A',
      '<v<A>>^A<A>A<AAv>A^A<vAAA^>A',
      '<v<A>>^A<A>A<AAv>A^A<vAAA>^A',
      '<v<A>>^A<A>A<AA>vA^Av<AAA^>A',
      '<v<A>>^A<A>A<AA>vA^Av<AAA>^A',
      '<v<A>>^A<A>A<AA>vA^A<vAAA^>A',
      '<v<A>>^A<A>A<AA>vA^A<vAAA>^A',
    ]);
  });

  test('#7 should calculate pattern length and first pattern length for complex input', () => {
    const patterns = getPattern('v<<A>>^A<A>A<AAv>A^Av<AAA^>A', sKeypad, ss);
    expect(patterns.length).toEqual(2048);
    expect(patterns[0].length).toEqual(68);
  });

  test('#8 should calculate complexity for input "029A" at depth 1', () => {
    expect(myPattern('029A', 1)).toBe(28);
  });

  test('#9 should calculate complexity for input "029A" at depth 2', () => {
    expect(myPattern('029A', 2)).toBe(68);
  });

  test('#10 should calculate sum of complexities for input array', () => {
    expect(sumOfComplexities(['029A'])).toBe(1972);
  });

  test('#11 should calculate sum of complexities for "sampleData"', () => {
    expect(sumOfComplexities(sampleData)).toBe(126384);
  });

  test('#12 should calculate sum of complexities for large dataset', () => {
    expect(sumOfComplexities(data)).toBe(212488);
  });

  test('#13 should calculate sumOfComplexities2 for input "029A"', () => {
    expect(sumOfComplexities2(['029A'])).toBe(1972);
  });

  test('#14 should calculate sumOfComplexities2 for data with depth limit', () => {
    expect(sumOfComplexities2(data, 25)).toBe(258263972600402);
  });
});
