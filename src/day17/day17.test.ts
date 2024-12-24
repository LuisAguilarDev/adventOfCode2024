import fs from 'fs';
import { getOuputFromComputer, getStart, getValueOfRegisterA } from './day17';

describe('Day 17', () => {
  //prettier-ignore
  const data = `Register A: 27334280
                Register B: 0
                Register C: 0

                Program: 2,4,1,2,7,5,0,3,1,7,4,1,5,5,3,0`;
  const sampleData = `Register A: 729
                        Register B: 0
                        Register C: 0

                        Program: 0,1,5,4,3,0`;
  xtest('#1 the content should exist', () => {
    expect(data).toBeDefined();
  });
  xtest('#2 it should return the proper output from the computer', () => {
    expect(getOuputFromComputer([729, 0, 0], [0, 1, 5, 4, 3, 0]).output).toBe(
      '4,6,3,5,6,3,5,2,1,0',
    );
  });
  xtest('#3 it should set the proper value on the register', () => {
    expect(getOuputFromComputer([0, 0, 9], [2, 6]).registers['B']).toBe(1);
  });
  xtest('#4 it should return the proper output from the computer', () => {
    expect(getOuputFromComputer([10, 0, 0], [5, 0, 5, 1, 5, 4]).output).toBe(
      '0,1,2',
    );
  });
  xtest('#5 it should return the values expected', () => {
    const r = getOuputFromComputer([2024, 0, 0], [0, 1, 5, 4, 3, 0]);
    expect(r.output).toBe('4,2,5,6,7,7,7,7,3,1,0');
    expect(r.registers['A']).toBe(0);
  });
  xtest('#6 it should set the proper value on the register', () => {
    expect(getOuputFromComputer([0, 29, 0], [1, 7]).registers['B']).toBe(26);
  });
  xtest('#7 it should set the proper value on the register', () => {
    expect(getOuputFromComputer([0, 2024, 43690], [4, 0]).registers['B']).toBe(
      44354,
    );
  });
  xtest('#8 it should return the proper output from the computer', () => {
    expect(
      getOuputFromComputer(
        [27334280, 0, 0],
        [2, 4, 1, 2, 7, 5, 0, 3, 1, 7, 4, 1, 5, 5, 3, 0],
      ).output,
    ).toBe('7,6,5,3,6,5,7,0,4');
  });
  xtest('#9 it should return the proper output from the computer', () => {
    expect(
      getOuputFromComputer([117440, 0, 0], [0, 3, 5, 4, 3, 0]).output,
    ).toBe('0,3,5,4,3,0');
  });
  xtest('#10 it should return the proper output from the computer', () => {
    expect(getValueOfRegisterA([0, 3, 5, 4, 3, 0])).toBe(117440);
  });
  xtest('#11 it should return the proper output from the computer', () => {
    expect(
      getValueOfRegisterA([2, 4, 1, 2, 7, 5, 0, 3, 1, 7, 4, 1, 5, 5, 3, 0]),
    ).toBe(117440);
  });
  xtest('#12 it should return the proper output from the computer', () => {
    expect(getStart([4, 1, 5, 5, 3, 0])).toBe(177281);
  });
  xtest('#13 it should return the proper output from the computer', () => {
    expect(getStart([7, 4, 1, 5, 5, 3, 0])).toBe(1418248);
  });
  test('#13 it should return the proper output from the computer', () => {
    expect(getStart([1, 7, 4, 1, 5, 5, 3, 0])).toBe(1418248);
  });
  xtest('#14 it should return the proper output from the computer', () => {
    expect(getStart([2, 4, 1, 2, 7, 5, 0, 3, 1, 7, 4, 1, 5, 5, 3, 0])).toBe(
      177281,
    );
  });
});
