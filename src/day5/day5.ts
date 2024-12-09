//Day 5: Print Queue

export function getInput(rawData: string): {
  orderingRules: Map<number, Set<number>>;
  updates: Array<number[]>;
} {
  const orderingRules: Map<number, Set<number>> = new Map();
  const updates: Array<number[]> = [];

  //Get the data
  for (const rawRow of rawData.split('\n')) {
    const parsedRom = rawRow.trim().split('|');
    if (parsedRom.length === 2) {
      //ADD to Ordering Rules
      const pageX = Number(parsedRom[0]);
      const pageY = Number(parsedRom[1]);
      const exists = orderingRules.get(pageX);
      if (exists === undefined) {
        orderingRules.set(pageX, new Set([pageY]));
      } else {
        orderingRules.set(pageX, exists.add(pageY));
      }
    } else {
      if (!parsedRom[0]) continue;
      const update = parsedRom[0].split(',').map(Number);
      updates.push(update);
    }
  }
  return { orderingRules, updates };
}

//First
//X|Y
//ORDERING RULES MAP(X,Y):MAP(number,Set<number>)   X goes before Y
//UPDATES number[]
//PRINTED PAGES MAP(X,Y)
//start by identifying which updates are already in the right order.
//Validate all X in order
//IF "OK" SUM MIDDLE IF PAIR BOTH?
export function getSumFromAllMiddlePages({
  orderingRules,
  updates,
}: {
  orderingRules: Map<number, Set<number>>;
  updates: Array<number[]>;
}): number {
  //chek if update report is valid and sum
  let sumOfMiddlePages = 0;
  for (const update of updates) {
    if (isValidUpdate(update, orderingRules)) {
      const middle = Math.floor(update.length / 2);
      sumOfMiddlePages += update[middle];
    }
  }
  return sumOfMiddlePages;
}

function isValidUpdate(
  update: number[],
  orderingRules: Map<number, Set<number>>,
): boolean {
  const reviewPages = new Set<number>();
  for (const pageX of update) {
    if (reviewPages.size === 0) {
      reviewPages.add(pageX);
      continue;
    }
    const goesBefore = orderingRules.get(pageX) ?? new Set<number>();
    if (getIntersection(reviewPages, goesBefore).size !== 0) {
      return false;
    }
    reviewPages.add(pageX);
  }
  return true;
}

function getIntersection(
  pagesPrinted: Set<number> | number[],
  currentPageGoesBefore: Set<number>,
): Set<number> {
  const intersection = new Set<number>();
  for (const pagePrinted of pagesPrinted) {
    if (currentPageGoesBefore.has(pagePrinted)) {
      intersection.add(pagePrinted);
    }
  }
  return intersection;
}

export function getSumFromAllMiddlePages2({
  orderingRules,
  updates,
}: {
  orderingRules: Map<number, Set<number>>;
  updates: Array<number[]>;
}): number {
  //Get the bad updates
  const badUpdates = [];
  for (const update of updates) {
    if (!isValidUpdate(update, orderingRules)) {
      badUpdates.push(update);
    }
  }

  let sum = 0;

  //SORT AND VALIDATE IF SORTING ALL
  for (const badUpdate of badUpdates) {
    const fixedUpdate: number[] = [];
    //como ordenar los updates??
    for (let pageX of badUpdate) {
      const goesBefore = orderingRules.get(pageX) ?? new Set<number>();
      if (getIntersection(fixedUpdate, goesBefore).size === 0) {
        fixedUpdate.push(pageX);
        continue;
      }

      let currentIndex = fixedUpdate.length;
      while (currentIndex > 0) {
        const currentPage = fixedUpdate[currentIndex - 1];
        fixedUpdate[currentIndex - 1] = pageX;
        fixedUpdate[currentIndex] = currentPage;
        const goesBefore = orderingRules.get(pageX) ?? new Set<number>();
        if (
          getIntersection(fixedUpdate.slice(0, currentIndex), goesBefore)
            .size === 0
        ) {
          break;
        } else {
          currentIndex--;
        }
      }
    }
    if (fixedUpdate.length === badUpdate.length) {
      const middle = Math.floor(fixedUpdate.length / 2);
      sum += fixedUpdate[middle];
    }
  }
  return sum;
}

//Rehacer con conjuntos con las operaciones correctas (topological sort)
