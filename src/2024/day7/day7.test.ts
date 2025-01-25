import fs from 'fs';
import {
  getCalibrationResult,
  getCalibrationResultWithAditionalOperator,
  getCalibrationsEquations,
} from './day7';

describe('Day 7', () => {
  //prettier-ignore
  const sampleData =   `190: 10 19
                        3267: 81 40 27
                        83: 17 5
                        156: 15 6
                        7290: 6 8 6 15
                        161011: 16 10 13
                        192: 17 8 14
                        21037: 9 7 18 13
                        292: 11 6 16 20`;
  const sampleCalibrationEquations = getCalibrationsEquations(sampleData);
  let calibrationEquations: Array<number[]>;
  beforeAll(async () => {
    const rawData = await fs.promises
      .readFile('./src/day7/day7.txt')
      .then((bufferContent) => bufferContent.toString());

    calibrationEquations = getCalibrationsEquations(rawData);
  });
  test('#1 the content should exist', () => {
    expect(sampleData).toBeDefined();
  });
  test('#2 it should return the calibration result', () => {
    expect(getCalibrationResult(sampleCalibrationEquations)).toEqual(3749);
  });
  test('#3it should return the calibration result', () => {
    expect(getCalibrationResult(calibrationEquations)).toEqual(12839601725877);
  });
  test('#4 it should return the calibration result with an additional operator', () => {
    expect(
      getCalibrationResultWithAditionalOperator(sampleCalibrationEquations),
    ).toEqual(11387);
  });
  test('#5 it should return the calibration result with an additional operator', () => {
    expect(
      getCalibrationResultWithAditionalOperator(calibrationEquations),
    ).toEqual(149956401519484);
  });
});
