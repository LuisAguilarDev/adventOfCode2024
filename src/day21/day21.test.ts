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
  const ns: [number, number] = [3, 2]; // hand of robot starts on "A"
  const sKeypad = [
    ['', '^', 'A'],
    ['<', 'v', '>'],
  ];
  const ss: [number, number] = [0, 2]; // hand of robot starts on "A"
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
  xtest('#1 it should exists', () => {
    expect(data).toBeDefined();
    expect(sampleData).toBeDefined();
  });
  xtest('#2 it should return the count of designs that are possible', () => {
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
  xtest('#3 it should return the count of designs that are possible', () => {
    expect(getPattern('98', nKeyPad, ns)).toEqual(['^^^A<A']);
  });
  xtest('#4 it should return the count of designs that are possible', () => {
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
  xtest('#5 it should return the count of designs that are possible', () => {
    expect(getPattern('029A', nKeyPad, ns)).toEqual([
      '<A^A^^>AvvvA',
      '<A^A^>^AvvvA',
      '<A^A>^^AvvvA',
    ]);
  });
  xtest('#6 it should return the count of designs that are possible', () => {
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
  xtest('#7 it should return the count of designs that are possible', () => {
    expect(
      getPattern('v<<A>>^A<A>A<AAv>A^Av<AAA^>A', sKeypad, ss).length,
    ).toEqual(2048);
    expect(
      getPattern('v<<A>>^A<A>A<AAv>A^Av<AAA^>A', sKeypad, ss)[0].length,
    ).toEqual(68);
  });
  xtest('#8 it should return the count of designs that are possible', () => {
    expect(myPattern('029A', 1)).toBe(28);
  });
  xtest('#9 it should return the count of designs that are possible', () => {
    expect(myPattern('029A', 2)).toBe(68);
  });
  xtest('#10 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities(['029A'])).toBe(1972);
  });
  xtest('#11 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities(['980A'])).toBe(58800);
  });
  xtest('#12 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities(['179A'])).toBe(179 * 68);
  });
  xtest('#13 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities(['456A'])).toBe(456 * 64);
  });
  xtest('#14 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities(['379A'])).toBe(379 * 64);
  });
  xtest('#15 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities(sampleData)).toBe(126384);
  });
  xtest('#16 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities(['964A'])).toBe(69408);
  });
  xtest('#17 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities(['246A'])).toBe(17220);
  });
  xtest('#17a it should return the count of designs that are possible', () => {
    expect(getPattern('246A', nKeyPad, ns)).toEqual([
      '^<A^<A>>AvvA',
      '^<A<^A>>AvvA',
      '<^A^<A>>AvvA',
      '<^A<^A>>AvvA',
    ]);
  });
  xtest('#17b it should return the count of designs that are possible', () => {
    expect(getPattern('^<A^<A>>AvvA', sKeypad, ss)).toEqual([
      '<Av<A>^>A<Av<A>^>AvAA^Av<AA^>A',
      '<Av<A>^>A<Av<A>^>AvAA^Av<AA>^A',
      '<Av<A>^>A<Av<A>^>AvAA^A<vAA^>A',
      '<Av<A>^>A<Av<A>^>AvAA^A<vAA>^A',
      '<Av<A>^>A<Av<A>>^AvAA^Av<AA^>A',
      '<Av<A>^>A<Av<A>>^AvAA^Av<AA>^A',
      '<Av<A>^>A<Av<A>>^AvAA^A<vAA^>A',
      '<Av<A>^>A<Av<A>>^AvAA^A<vAA>^A',
      '<Av<A>>^A<Av<A>^>AvAA^Av<AA^>A',
      '<Av<A>>^A<Av<A>^>AvAA^Av<AA>^A',
      '<Av<A>>^A<Av<A>^>AvAA^A<vAA^>A',
      '<Av<A>>^A<Av<A>^>AvAA^A<vAA>^A',
      '<Av<A>>^A<Av<A>>^AvAA^Av<AA^>A',
      '<Av<A>>^A<Av<A>>^AvAA^Av<AA>^A',
      '<Av<A>>^A<Av<A>>^AvAA^A<vAA^>A',
      '<Av<A>>^A<Av<A>>^AvAA^A<vAA>^A',
    ]);
  });
  xtest('#17c it should return the count of designs that are possible', () => {
    expect(
      getPattern('<Av<A>^>A<Av<A>^>AvAA^Av<AA^>A', sKeypad, ss).length,
    ).toEqual(131072);
  });
  xtest('#18 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities(['973A'])).toBe(66164);
  });
  xtest('#19 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities(['682A'])).toBe(46376);
  });
  xtest('#20 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities(['180A'])).toBe(13320);
  });
  xtest('#21 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities(data)).toBe(212488);
  });
  test('#22 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities2(['029A'])).toBe(1972);
  });
  test('#23 it should return the count of designs that are possible', () => {
    expect(sumOfComplexities2(data, 25)).toBe(258263972600402);
  });
});
