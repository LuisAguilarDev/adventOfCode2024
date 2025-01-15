// --- Day 23: LAN Party ---

export function getData(rawString: string): string[][] {
  return rawString.split('\n').map((str) => str.trim().split('-'));
}

// Part 1
export function getConectedPCS(edges: string[][]): number {
  const conns: { [key: string]: Set<string> } = {};
  for (const [n1, n2] of edges) {
    conns[n1] ??= new Set();
    conns[n2] ??= new Set();
    conns[n1].add(n2);
    conns[n2].add(n1);
  }
  let r = new Set();
  for (const n1 of Object.keys(conns)) {
    for (const n2 of conns[n1]) {
      for (const n3 of conns[n2]) {
        if (n1 !== n3 && conns[n3].has(n1)) {
          const hash = [n1, n2, n3]
            .sort((a, b) => a.localeCompare(b))
            .toString();
          if ([n1, n2, n3].some((node) => node.startsWith('t'))) {
            r.add(hash);
          }
        }
      }
    }
  }
  return r.size;
}
// Part 2
export function getLANCode(edges: string[][]): string {
  const conns: { [key: string]: Set<string> } = {};
  for (const [n1, n2] of edges) {
    conns[n1] ??= new Set();
    conns[n2] ??= new Set();
    conns[n1].add(n2);
    conns[n2].add(n1);
  }
  const passwords: Set<string> = new Set();
  for (const node of Object.keys(conns)) {
    passwords.add(search(node, conns, new Set([node])));
  }
  let longest = '';
  for (const value of passwords) {
    if (value.length > longest.length) {
      longest = value;
    }
  }
  return longest;
}
function search(
  node: string,
  conns: { [key: string]: Set<string> },
  req: Set<string>,
): string {
  for (const neighbor of conns[node]) {
    if (req.has(neighbor)) continue;
    for (const query of req) {
      if (!conns[neighbor].has(query)) {
        return [...req].sort((a, b) => a.localeCompare(b)).join(',');
      }
    }
    req.add(neighbor);
  }
  return search(node, conns, req);
}
