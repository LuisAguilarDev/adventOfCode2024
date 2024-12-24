//--- Day 17: Chronospatial Computer ---
//Part 1
export function getOuputFromComputer(
  r: number[],
  program: number[],
): {
  output: string;
  r: {
    [key: string]: number;
  };
} {
  const computer = new ChronospatialComputer();
  computer.loadProgram(program);
  computer.storeInR(r);
  computer.executeProgram();
  return { output: computer.getOutput(), r: computer.getR() };
}

class ChronospatialComputer {
  #r: {
    [key: string]: number;
  };
  readonly #instructionSet: {
    [key: number]: Function;
  };
  #ram: number[];
  #instructionPointer: number;
  #output = '';
  constructor() {
    this.#r = { A: 0, B: 0, C: 0 };
    this.#ram = [];
    this.#instructionPointer = 0;
    this.#instructionSet = {
      0: this.#adv.bind(this),
      1: this.#bxl.bind(this),
      2: this.#bst.bind(this),
      3: this.#jnz.bind(this),
      4: this.#bxc.bind(this),
      5: this.#out.bind(this),
      6: this.#bdv.bind(this),
      7: this.#cdv.bind(this),
    };
  }
  #adv(operand: number) {
    this.#r['A'] = this.#r['A'] >> this.getLiteralOperand(operand);
  }
  #bxl(operand: number) {
    this.#r['B'] = this.#r['B'] ^ this.getLiteralOperand(operand);
  }
  #bst(operand: number) {
    this.#r['B'] = this.getLiteralOperand(operand) % 8;
  }
  #jnz(operand: number) {
    this.#instructionPointer =
      this.#r['A'] === 0
        ? this.#instructionPointer + 2
        : this.getLiteralOperand(operand);
  }

  #bxc(_: number) {
    this.#r['B'] = this.#r['B'] ^ this.#r['C'];
  }
  #out(operand: number) {
    if (!this.#output) {
      this.#output = (this.getLiteralOperand(operand) % 8).toString();
      return;
    }
    this.#output += ',' + (this.getLiteralOperand(operand) % 8).toString();
  }
  #bdv(operand: number) {
    this.#r['B'] = this.#r['A'] >> this.getLiteralOperand(operand);
  }
  #cdv(operand: number) {
    this.#r['C'] = this.#r['A'] >> this.getLiteralOperand(operand);
  }
  getLiteralOperand(num: number): number {
    if (num <= 3) {
      return num;
    }
    if (num === 4) {
      return this.#r['A'];
    }
    if (num === 5) {
      return this.#r['B'];
    }
    if (num === 6) {
      return this.#r['C'];
    }
    if (num === 7) {
      return 7;
    }
    return -1; //invalid
  }
  getOutput(): string {
    return this.#output;
  }
  setOutput(str: string): void {
    this.#output = str;
  }
  getR() {
    return this.#r;
  }

  loadProgram(program: number[]) {
    this.#ram = program;
  }
  storeInR(nums: number[]) {
    this.#r['A'] = nums[0];
    this.#r['B'] = nums[1];
    this.#r['C'] = nums[2];
    this.#output = '';
  }
  executeProgram() {
    this.#instructionPointer = 0;
    while (true) {
      const opcode = this.#ram[this.#instructionPointer];
      const operand = this.#ram[this.#instructionPointer + 1];
      if (opcode === undefined || operand === undefined) break;
      this.#instructionSet[opcode](operand);
      if (opcode === 3) continue;
      this.#instructionPointer += 2;
    }
  }
}

//Part 2
//Slow
export function getValueOfRegisterA(program: number[]) {
  const computer = new ChronospatialComputer();
  computer.loadProgram(program);
  for (let i = 0; i < Infinity; i++) {
    // console.log(i);
    const r = [i * 8, 0, 0];
    computer.storeInR(r);
    computer.executeProgram();
    if (computer.getOutput() === program.toString()) return i * 8;
  }
}

function currentProgram(a: number) {
  // 2,4 => bst(a)
  let b = a % 8;
  // posible values b = [0,1,2,3,4,5,6,7]

  // 1,2 => bxl(2)
  b = b ^ 2;
  // posible values b = [2,3,0,1,6,7,4,5]

  // 7,5 => cdv(b)
  let c = a >> b;

  // 0,3 => adv(3)
  a = a >> 3;

  // 1,7 => bxl(7)
  b = b ^ 7;

  // 4,1 => bxc()
  b = b ^ c;

  // 5,5 => out(B)
  console.log(b % 8);
  return a;
}

function find(program: number[], ans = 0): number | undefined {
  if (!program.length) return ans;
  console.log('Current program:', program, 'Current ans:', ans);
  for (let ib = 0; ib < 8; ib++) {
    // let b = a % 8;
    // posible values b = [0,1,2,3,4,5,6,7]
    // 2,4 => reversed bst(a)
    let a = ans * 8 + ib;
    // let ag = 8 * ans + ib;
    let b = a % 8;
    b = b ^ 2;
    let c = a >> b;
    b = b ^ 7;
    b = b ^ c;
    if (b % 8 === program.at(-1)) {
      let sub = find(program.slice(0, -1), a);
      if (!sub) continue;
      return sub;
    }
  }
}

const program = [2, 4, 1, 2, 7, 5, 0, 3, 1, 7, 4, 1, 5, 5, 3, 0];
// const program = [3, 1, 7, 4, 1, 5, 5, 3, 0]; //1, 7, 4, 1, 5, 5,
// const answer = getValue(program);
// console.log('answer', answer);

console.log('ans', find(program));
// console.log('printed', returnPrintedValue(5), 0);
