//--- Day 13: Claw Contraption ---
// Button A: X+69, Y+23
// Button B: X+27, Y+71
// Prize: X=18641, Y=10279

//Input ((x,y),(x,y),      (x,y)   )
//Input (  a  ,  b  ,price location)
export class Point {
  x: number;
  y: number;
  c?: number;
  constructor(x: number, y: number, c?: number) {
    this.x = x;
    this.y = y;
    this.c = c;
  }
}
export function getInput(rawData: string): Point[][] {
  const data: Point[][] = [];
  const input: Point[] = [];
  rawData.split('\n').forEach((row) => {
    row = row.trim();
    if (!row) return;
    if (row.startsWith('Button A')) {
      const regex = /\d+/g;
      const [x, y] = row.match(regex)?.map(Number) ?? [0, 0];
      const A = new Point(x, y, 3);
      input.push(A);
      return;
    }
    if (row.startsWith('Button B')) {
      const regex = /\d+/g;
      const [x, y] = row.match(regex)?.map(Number) ?? [0, 0];
      const B = new Point(x, y, 1);
      input.push(B);
      return;
    }
    if (row.startsWith('Prize:')) {
      const regex = /\d+/g;
      const [x, y] = row.match(regex)?.map(Number) ?? [0, 0];
      const Prize = new Point(x, y);
      input.push(Prize);
      if (input.length === 3) {
        data.push([...input]);
        input.length = 0;
      }
    }
  });
  console.log(data);
  return data;
}
export function getFixedInput(rawData: string): Point[][] {
  const data: Point[][] = [];
  const input: Point[] = [];
  rawData.split('\n').forEach((row) => {
    row = row.trim();
    if (!row) return;
    if (row.startsWith('Button A')) {
      const regex = /\d+/g;
      const [x, y] = row.match(regex)?.map(Number) ?? [0, 0];
      const A = new Point(x, y, 3);
      input.push(A);
      return;
    }
    if (row.startsWith('Button B')) {
      const regex = /\d+/g;
      const [x, y] = row.match(regex)?.map(Number) ?? [0, 0];
      const B = new Point(x, y, 1);
      input.push(B);
      return;
    }
    if (row.startsWith('Prize:')) {
      const fix = 10000000000000;
      const regex = /\d+/g;
      const [x, y] = row.match(regex)?.map(Number) ?? [0, 0];
      const Prize = new Point(fix + x, fix + y);
      input.push(Prize);
      if (input.length === 3) {
        data.push([...input]);
        input.length = 0;
      }
    }
  });
  console.log(data);
  return data;
}

export function getAllFewestToken(data: Point[][]): number {
  let tokens = 0;
  for (const input of data) {
    const t = getFewestToken(input);
    tokens += t > 0 ? t : 0;
  }
  return tokens;
}

// Coeficientes de las ecuaciones
// 94x + 34y = 8400x,5400y
// 22x + 67y = 8400x,5400y
// times presed a(ta) => (94*ta) + (22*tb) = target x 
// times presed b(tb) => (34*tb) + (67*tb) = target y
// get minimum both ta and tb like integer otherwise wont be posible
export function getFewestToken([a, b, p]: Point[]): number {
  // prettier-ignore
  const tax = a.x, tbx = b.x, tx = p.x; //ta times presed a and so on //t1 x + t2 x = x
  // prettier-ignore
  const tay = a.y, tby = b.y, ty = p.y; //tb times presed b and so on//t1 y + t1 y = y
  const result = solveEquations(tax, tbx, tx, tay, tby, ty);
  if (typeof result !== 'object') {
    return 0;
  }
  return result.a * a.c! + result.b * b.c!;
}

function solveEquations(
  tax: number,
  tbx: number,
  tx: number,
  a2: number,
  b2: number,
  ty: number,
) {
  // Determinante principal
  const determinant = tax * b2 - a2 * tbx;

  if (determinant === 0) {
    return 'No tiene solución única o no tiene solución.';
  }

  // Resolver para a y b
  const a = (tx * b2 - ty * tbx) / determinant;
  const b = (tax * ty - a2 * tx) / determinant;

  // Verificar si x y y son enteros
  if (Number.isInteger(a) && Number.isInteger(b)) {
    return { a, b };
  } else {
    return 'No hay solución en números enteros.';
  }
}
