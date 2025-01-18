import fs from 'fs';
import { getData, getNumber, getWires } from './day24';

describe('Day 24', () => {
  let data: {
    inputs: Map<string, number>;
    operations: string[][];
  };
  let sampleData: {
    inputs: Map<string, number>;
    operations: string[][];
  };
  let sampleData2: {
    inputs: Map<string, number>;
    operations: string[][];
  };
  let sampleData3: {
    inputs: Map<string, number>;
    operations: string[][];
  };

  beforeAll(async () => {
    data = await fs.promises
      .readFile('./src/day24/day24.txt')
      .then((bufferContent) => getData(bufferContent.toString()));
    sampleData = getData(`x00: 1
                          x01: 1
                          x02: 1
                          y00: 0
                          y01: 1
                          y02: 0

                          x00 AND y00 -> z00
                          x01 XOR y01 -> z01
                          x02 OR y02 -> z02`);
    sampleData2 = getData(`x00: 1
                            x01: 0
                            x02: 1
                            x03: 1
                            x04: 0
                            y00: 1
                            y01: 1
                            y02: 1
                            y03: 1
                            y04: 1

                            ntg XOR fgs -> mjb
                            y02 OR x01 -> tnw
                            kwq OR kpj -> z05
                            x00 OR x03 -> fst
                            tgd XOR rvg -> z01
                            vdt OR tnw -> bfw
                            bfw AND frj -> z10
                            ffh OR nrd -> bqk
                            y00 AND y03 -> djm
                            y03 OR y00 -> psh
                            bqk OR frj -> z08
                            tnw OR fst -> frj
                            gnj AND tgd -> z11
                            bfw XOR mjb -> z00
                            x03 OR x00 -> vdt
                            gnj AND wpb -> z02
                            x04 AND y00 -> kjc
                            djm OR pbm -> qhw
                            nrd AND vdt -> hwm
                            kjc AND fst -> rvg
                            y04 OR y02 -> fgs
                            y01 AND x02 -> pbm
                            ntg OR kjc -> kwq
                            psh XOR fgs -> tgd
                            qhw XOR tgd -> z09
                            pbm OR djm -> kpj
                            x03 XOR y03 -> ffh
                            x00 XOR y04 -> ntg
                            bfw OR bqk -> z06
                            nrd XOR fgs -> wpb
                            frj XOR qhw -> z04
                            bqk OR frj -> z07
                            y03 OR x01 -> nrd
                            hwm AND bqk -> z03
                            tgd XOR rvg -> z12
                            tnw OR pbm -> gnj`);
  });

  test('#1 should initialize data and sampleData properly', () => {
    expect(data).toBeDefined();
    expect(sampleData).toBeDefined();
    expect(sampleData2).toBeDefined();
  });
  test('#2 it should return the decimal number does it output on the wires starting with z', () => {
    expect(getNumber(sampleData)).toBe(4);
  });
  test('#2 it should return the decimal number does it output on the wires starting with z', () => {
    expect(getNumber(sampleData2)).toBe(2024);
  });
  test('#3 it should return the decimal number does it output on the wires starting with z', () => {
    expect(getNumber(data)).toBe(60714423975686);
  });
  test('#4 it should return the names of the eight wires involved in a swap and then join those names with commas', () => {
    expect(getWires(data.operations)).toBe('cgh,frt,pmd,sps,tst,z05,z11,z23');
  });
});