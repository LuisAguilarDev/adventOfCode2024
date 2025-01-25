// JavaScript program to find convex hull of a set of
// points. Refer
// https://www.geeksforgeeks.org/orientation-3-ordered-points/
// for explanation of orientation()
// A class used to store the x and y coordinates of points
// A estudiar :S
// cuenta las puntas
class Point {
  constructor(x = null, y = null) {
    this.x = x;
    this.y = y;
  }
}

// A global point needed for sorting points with reference
// to the first point
let p0 = new Point(0, 0);

// A utility function to find next to top in a stack
function nextToTop(S) {
  return S[S.length - 2];
}

// A utility function to return square of distance
// between p1 and p2
function distSq(p1, p2) {
  return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orientation(p, q, r) {
  let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val == 0) return 0; // collinear
  else if (val > 0) return 1; // clock wise
  else return 2; // counterclock wise
}

// A function used by cmp_to_key function to sort an array
// of points with respect to the first point
function compare(p1, p2) {
  // Find orientation
  let o = orientation(p0, p1, p2);
  if (o == 0) {
    if (distSq(p0, p2) >= distSq(p0, p1)) return -1;
    else return 1;
  } else {
    if (o == 2) return -1;
    else return 1;
  }
}

// Prints convex hull of a set of n points.
function convexHull(points, n) {
  // Find the bottommost point
  let ymin = points[0].y;
  let min = 0;
  for (var i = 1; i < n; i++) {
    let y = points[i].y;

    // Pick the bottom-most or choose the left
    // most point in case of tie
    if (y < ymin || (ymin == y && points[i].x < points[min].x)) {
      ymin = points[i].y;
      min = i;
    }
  }

  // Place the bottom-most point at first position
  points[0], (points[min] = points[min]), points[0];

  // Sort n-1 points with respect to the first point.
  // A point p1 comes before p2 in sorted output if p2
  // has larger polar angle (in counterclockwise
  // direction) than p1
  let p0 = points[0];
  points.sort(compare);

  // If two or more points make same angle with p0,
  // Remove all but the one that is farthest from p0
  // Remember that, in above sorting, our criteria was
  // to keep the farthest point at the end when more than
  // one points have same angle.
  let m = 1; // Initialize size of modified array
  for (var i = 1; i < n; i++) {
    // Keep removing i while angle of i and i+1 is same
    // with respect to p0
    while (i < n - 1 && orientation(p0, points[i], points[i + 1]) == 0) i += 1;

    points[m] = points[i];
    m += 1; // Update size of modified array
  }

  // If modified array of points has less than 3 points,
  // convex hull is not possible
  if (m < 3) return;

  // Create an empty stack and push first three points
  // to it.
  let S = [];
  S.push(points[0]);
  S.push(points[1]);
  S.push(points[2]);

  // Process remaining n-3 points
  for (var i = 3; i < m; i++) {
    // Keep removing top while the angle formed by
    // points next-to-top, top, and points[i] makes
    // a non-left turn
    while (true) {
      if (S.length < 2) break;
      if (orientation(nextToTop(S), S[S.length - 1], points[i]) >= 2) break;
      S.pop();
    }

    S.push(points[i]);
  }

  // Now stack has the output points,
  // print contents of stack
  return S;
  // while (S.length > 0) {
  //   let p = S[S.length - 1];
  //   console.log('(' + p.x + ', ' + p.y + ')');
  //   S.pop();
  // }
}

// Driver Code
let points = [
  new Point(0, 0),
  new Point(1, 0),
  new Point(0, 1),
  new Point(1, 1),
  new Point(0, 2),
  new Point(1, 2),
  new Point(0, 3),
  new Point(1, 3),
  new Point(2, 3),
  new Point(2, 4),
  new Point(2, 2),
  new Point(3, 2),
];

let n = points.length;

// This code is contributed by phasing17
function calcularLados(puntos) {
  if (puntos.length < 2) {
    return puntos.length; // 0 o 1 punto no forman un polígono
  }

  let lados = 0;
  for (let i = 0; i < puntos.length; i++) {
    const p1 = puntos[i];
    const p2 = puntos[(i + 1) % puntos.length]; // El siguiente punto, usando módulo para volver al inicio

    // Check for degenerate edges (collinear points)
    if (p1.x != p2.x || p1.y != p2.y) {
      lados++;
    }
  }
  return lados;
}
