import fs from 'fs';
import { bestSeq, getData, getNextSecret, sumOfSecrets } from './day22';

describe('Day 22', () => {
  let data: number[];
  let sampleData: number[];
  beforeAll(async () => {
    data = await fs.promises
      .readFile('./src/day22/day22.txt')
      .then((bufferContent) => getData(bufferContent.toString()));
    sampleData = getData(`1
                          10
                          100
                          2024`);
  });

  test('#1 should initialize data and sampleData properly', () => {
    expect(data).toBeDefined();
    expect(sampleData).toBeDefined();
  });

  test('#2 it should return the next ten secret numbers correctly for a given initial value', () => {
    let result = getNextSecret(123n);
    expect(result).toBe(15887950n);
    result = getNextSecret(result);
    expect(result).toBe(16495136n);
    result = getNextSecret(result);
    expect(result).toBe(527345n);
    result = getNextSecret(result);
    expect(result).toBe(704524n);
    result = getNextSecret(result);
    expect(result).toBe(1553684n);
    result = getNextSecret(result);
    expect(result).toBe(12683156n);
    result = getNextSecret(result);
    expect(result).toBe(11100544n);
    result = getNextSecret(result);
    expect(result).toBe(12249484n);
    result = getNextSecret(result);
    expect(result).toBe(7753432n);
    result = getNextSecret(result);
    expect(result).toBe(5908254n);
  });

  test('#3 it should calculate the sum of secrets correctly for sampleData', () => {
    let result = sumOfSecrets(sampleData, 2000);
    expect(result).toBe(37327623);
  });

  test('#4 it should calculate the sum of secrets correctly for full data', () => {
    let result = sumOfSecrets(data, 2000);
    expect(result).toBe(13022553808);
  });

  test('#5 it should calculate the highest quantity of bananas for the sample', () => {
    let result = bestSeq([1, 2, 3, 2024]);
    expect(result).toBe(23);
  });

  test('#6 it should calculate the highest quantity of bananas for full data', () => {
    let result = bestSeq(data);
    expect(result).toBe(1555);
  });
});
