import { find, getOuputFromComputer, getValueOfRegisterA } from './day17';

describe('Day 17', () => {
  //prettier-ignore
  const data = `Register A: 27334280
                Register B: 0
                Register C: 0

                Program: 2,4,1,2,7,5,0,3,1,7,4,1,5,5,3,0`;

  test('#1 the content should exist', () => {
    expect(data).toBeDefined();
  });
  test('#2 it should return the proper output from the computer', () => {
    expect(getOuputFromComputer([729, 0, 0], [0, 1, 5, 4, 3, 0]).output).toBe(
      '4,6,3,5,6,3,5,2,1,0',
    );
  });
  test('#3 it should set the proper value on the register', () => {
    expect(getOuputFromComputer([0, 0, 9], [2, 6]).r['C']).toBe(9);
  });
  test('#4 it should return the proper output from the computer', () => {
    expect(getOuputFromComputer([10, 0, 0], [5, 0, 5, 1, 5, 4]).output).toBe(
      '0,1,2',
    );
  });
  test('#5 it should return the values expected', () => {
    const r = getOuputFromComputer([2024, 0, 0], [0, 1, 5, 4, 3, 0]);
    expect(r.output).toBe('4,2,5,6,7,7,7,7,3,1,0');
    expect(r.r['A']).toBe(0);
  });
  test('#6 it should set the proper value on the register', () => {
    expect(getOuputFromComputer([0, 29, 0], [1, 7]).r['B']).toBe(26);
  });
  test('#7 it should set the proper value on the register', () => {
    expect(getOuputFromComputer([0, 2024, 43690], [4, 0]).r['B']).toBe(44354);
  });
  test('#8 it should return the proper output from the computer', () => {
    expect(
      getOuputFromComputer(
        [27334280, 0, 0],
        [2, 4, 1, 2, 7, 5, 0, 3, 1, 7, 4, 1, 5, 5, 3, 0],
      ).output,
    ).toBe('7,6,5,3,6,5,7,0,4');
  });
  test('#9 it should return the proper output from the computer', () => {
    expect(
      getOuputFromComputer([117440, 0, 0], [0, 3, 5, 4, 3, 0]).output,
    ).toBe('0,3,5,4,3,0');
  });
  // test('#10 it should return the proper output from the computer', () => {
  //   expect(getValueOfRegisterA([0, 3, 5, 4, 3, 0])).toBe(117440);
  // });
  test('#12 it should return the proper output from the computer', () => {
    expect(find([4, 1, 5, 5, 3, 0])).toBe(BigInt(177281));
  });
  test('#13 it should return the proper output from the computer', () => {
    expect(find([7, 4, 1, 5, 5, 3, 0])).toBe(BigInt(1418248));
  });
  test('#14 it should return the proper output from the computer', () => {
    expect(find([1, 7, 4, 1, 5, 5, 3, 0])).toBe(BigInt(11361574));
  });
  test('#15 it should return the proper output from the computer', () => {
    expect(find([2, 4, 1, 2, 7, 5, 0, 3, 1, 7, 4, 1, 5, 5, 3, 0])).toBe(
      BigInt(190615597431823),
    );
  });
});
