//--- Day 9: Disk Fragmenter ---

//Part 1
//O(n/2) Files get assigned IDs in order. Free spaces are represented by '.'.
export function buildLayout(diskMap: string): Array<string | number> {
  let currentFileID = 0;
  const layout = [];

  for (let i = 0; i < Math.ceil(diskMap.length / 2); i++) {
    const fileLen = Number(diskMap[i * 2]);
    const freeLen = Number(diskMap[i * 2 + 1]);

    if (fileLen > 0) {
      for (let i = 0; i < fileLen; i++) {
        layout.push(currentFileID);
      }
      currentFileID++;
    }

    for (let i = 0; i < freeLen; i++) {
      layout.push('.');
    }
  }

  return layout;
}

// Move rightmost file block into the leftmost free space.
export function compactLayout(layout: Array<string | number>) {
  while (true) {
    // Find the leftmost '.' (free space)
    const leftmostFree = layout.indexOf('.');
    if (leftmostFree === -1) {
      // No free spaces at all
      break;
    }

    // Find the rightmost file block.
    const rightmostFile = findRightmostFile(layout);

    if (rightmostFile === -1 || rightmostFile < leftmostFree) {
      // No file blocks to move or all file blocks are to the left of free spaces already
      break;
    }

    // Move the block at rightmostFile to the position of leftmostFree
    layout[leftmostFree] = layout[rightmostFile];
    layout[rightmostFile] = '.';
  }
}

export function findRightmostFile(layout: Array<string | number>) {
  // Find the rightmost element that is not '.'
  for (let i = layout.length - 1; i >= 0; i--) {
    if (layout[i] !== '.') return i;
  }
  return -1;
}

export function getCheckSum(diskMap: string) {
  // Get the current layout
  let layout = buildLayout(diskMap);

  //move the files
  compactLayout(layout);

  //get the checksum
  let checksum = 0;
  for (let i = 0; i < layout.length; i++) {
    const block = layout[i];
    if (block !== '.' && typeof block === 'number') {
      checksum += i * block;
    }
  }
  return checksum;
}
// First approach
// export function getCheckSum(diskMap: string) {
//   let checkSum = 0;
//   //0 indexed 0-9
//   const maxFileId = Math.round(diskMap.length / 2) - 1;
//   let [start, end] = [0, diskMap.length - 1];
//   let [isFileStart] = [diskMap.length % 2 > 0];
//   let [fileId, index, movedFiles, fileToRelocate, availableSpace] = [
//     0, 0, 0, 0, 0, 0,
//   ];
//   while (fileId <= maxFileId - movedFiles || fileToRelocate) {
//     console.log(index, fileId, maxFileId - movedFiles);
//     if (start > end) isFileStart = false;
//     if (isFileStart) {
//       let fileSpace = Number(diskMap[start++]);
//       while (fileSpace--) checkSum += index++ * fileId;
//       fileId++;
//     } else {
//       availableSpace += Number(diskMap[start++]);
//     }
//     isFileStart = !isFileStart;
//     while (availableSpace > 0) {
//       console.log(index, fileId, maxFileId - movedFiles);
//       if (!fileToRelocate && start < end) {
//         fileToRelocate = Number(diskMap[end]);
//         end -= 2;
//       }
//       let lastId = maxFileId - movedFiles;
//       while (fileToRelocate && availableSpace) {
//         fileToRelocate--;
//         availableSpace--;
//         checkSum += index++ * lastId;
//         if (!fileToRelocate) movedFiles++;
//       }
//       if (start >= end) break;
//     }
//   }
//   return checkSum;
// }

//Part 2 :S
