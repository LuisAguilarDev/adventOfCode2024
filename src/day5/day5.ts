//Day 5: Print Queue
//First
//X|Y
//ORDERING RULES MAP(X,Y):MAP(number,Set<number>)   X goes before Y
//UPDATES number[]
//PRINTED PAGES MAP(X,Y)
//start by identifying which updates are already in the right order.
//Validate all X in order
//IF "OK" SUM MIDDLE IF PAIR BOTH?
export function getSumFromAllMiddlePagesOK(rawData: string): number {
  let sumOfMiddlePages = 0;
  const orderingRules: Map<number, Set<number>> = new Map();
  const updates: Array<number[]> = [];
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
    if (!isValidPage(reviewPages, goesBefore)) {
      return false;
    }
    reviewPages.add(pageX);
  }
  return true;
}
function isValidPage(
  pagesPrinted: Set<number>,
  currentPageGoesBefore: Set<number>,
): ConstrainBoolean {
  for (const pagePrinted of pagesPrinted) {
    if (currentPageGoesBefore.has(pagePrinted)) {
      return false;
    }
  }
  return true;
}
export function getSumFromAllMiddlePagesSorting(rawData: string): number {
  let sumOfMiddlePagesFromFixedUpdates = 0;
  const badUpdates = [];
  const orderingRules: Map<number, Set<number>> = new Map();
  const updates: Array<number[]> = [];
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
  for (const update of updates) {
    if (!isValidUpdate(update, orderingRules)) {
      badUpdates.push(update);
    }
  }
  const fixedUpdates: Array<number[]> = [];
  for (const badUpdate of badUpdates) {
    //como ordenar los updates??
    const fixedUpdate: number[] = [];
    for (let pageX of badUpdate) {
      if (fixedUpdate.length === 0) {
        fixedUpdate.push(pageX);
        continue;
      }
      const goesBefore = orderingRules.get(pageX) ?? new Set<number>();
      if (isValidPage(new Set(fixedUpdate), goesBefore)) {
        fixedUpdate.push(pageX);
        continue;
      }
      //SORT UNTIL CURRENT IS OK
      // 97,13,75,29,47
      // 97,75,29,13
      // 47

      let currentIndex = fixedUpdate.length;
      while (currentIndex > 0) {
        const currentPage = fixedUpdate[currentIndex - 1];
        fixedUpdate[currentIndex - 1] = pageX;
        fixedUpdate[currentIndex] = currentPage;
        const goesBefore = orderingRules.get(pageX) ?? new Set<number>();
        if (
          isValidPage(new Set(fixedUpdate.slice(0, currentIndex)), goesBefore)
        ) {
          break;
        } else {
          currentIndex--;
        }
      }
    }
    fixedUpdates.push(fixedUpdate);
  }
  for (const update of fixedUpdates) {
    const middle = Math.floor(update.length / 2);
    sumOfMiddlePagesFromFixedUpdates += update[middle];
  }
  return sumOfMiddlePagesFromFixedUpdates;
}
