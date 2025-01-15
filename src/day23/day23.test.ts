import fs from 'fs';
import { getConectedPCS, getData, getLANCode } from './day23';

describe('Day 23', () => {
  let data: string[][];

  let sampleData = getData(`kh-tc
  qp-kh
  de-cg
  ka-co
  yn-aq
  qp-ub
  cg-tb
  vc-aq
  tb-ka
  wh-tc
  yn-cg
  kh-ub
  ta-co
  de-co
  tc-td
  tb-wq
  wh-td
  ta-ka
  td-qp
  aq-cg
  wq-ub
  ub-vc
  de-ta
  wq-aq
  wq-vc
  wh-yn
  ka-de
  kh-ta
  co-tc
  wh-qp
  tb-vc
  td-yn`);
  beforeAll(async () => {
    data = await fs.promises
      .readFile('./src/day23/day23.txt')
      .then((bufferContent) => getData(bufferContent.toString()));
  });

  test('#1 should initialize data and sampleData properly', () => {
    expect(data).toBeDefined();
    expect(sampleData).toBeDefined();
  });
  test('#2 it should return the number of  sets of three computers connected with a "t" computer', () => {
    expect(getConectedPCS(sampleData)).toBe(7);
  });
  test('#3 it should return the number of  sets of three computers connected with a "t" computer', () => {
    expect(getConectedPCS(data)).toBe(1000);
  });
  test('#4 it should return the password to get into the LAN party', () => {
    expect(getLANCode(sampleData)).toBe('co,de,ka,ta');
  });
  test('#5 it should return the password to get into the LAN party', () => {
    expect(getLANCode(data)).toBe('cf,ct,cv,cz,fi,lq,my,pa,sl,tt,vw,wz,yd');
  });
});
