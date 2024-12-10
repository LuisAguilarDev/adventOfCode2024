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

// The eager amphipod already has a new plan: rather than move individual blocks, he'd like to try compacting the files on his disk by moving whole files instead.

// This time, attempt to move whole files to the leftmost span of free space blocks that could fit the file. Attempt to move each file exactly once in order of decreasing file ID number starting with the file with the highest file ID number. If there is no span of free space to the left of a file that is large enough to fit the file, the file does not move.

// The first example from above now proceeds differently:

// 00...111...2...333.44.5555.6666.777.888899
// 0099.111...2...333.44.5555.6666.777.8888..
// 0099.1117772...333.44.5555.6666.....8888..
// 0099.111777244.333....5555.6666.....8888..
// 00992111777.44.333....5555.6666.....8888..
// The process of updating the filesystem checksum is the same; now, this example's checksum would be 2858.

// Start over, now compacting the amphipod's hard drive using this new method instead. What is the resulting filesystem checksum?
function findFreeSpan(
  layout: Array<string | number>,
  lengthNeeded: number,
  end: number,
): null | number {
  // find enough '.' of at least lengthNeeded
  // between indices [start, end]

  // handle bad inputs
  if (end < 0 || lengthNeeded <= 0) return null;

  let currentCount = 0;
  let currentStart: number | undefined;

  for (let i = 0; i < end; i++) {
    if (layout[i] === '.') {
      currentStart ??= i;
      currentCount++;
      if (currentCount >= lengthNeeded) {
        //space found at location
        return currentStart;
      }
    } else {
      // reset count
      [currentCount, currentStart] = [0, undefined];
    }
  }

  return null;
}

export function getCheckSum2(diskMap: string) {
  let layout = buildLayout(diskMap);
  const maxFileId = Math.round(diskMap.length / 2) - 1;
  for (let fid = maxFileId; fid >= 0; fid--) {
    //get the last file blocks
    const positions = [];
    for (let i = layout.length - 1; i > 0; i--) {
      if (layout[i] === fid) positions.push(i);
    }
    if (positions.length === 0) continue;

    const fileStart = positions[0];
    const fileLength = positions.length;

    //find free space to the left of fileStart that can fit fileLength blocks
    const freeSpan = findFreeSpan(layout, fileLength, fileStart);
    if (freeSpan === null) {
      //not enough free space to move this file
      continue;
    }

    //moving the file
    //clean the current location of file
    for (let pos of positions) {
      layout[pos] = '.';
    }

    //put the file blocks at the new location
    for (let i = 0; i < fileLength; i++) {
      layout[freeSpan + i] = fid;
    }
  }

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
