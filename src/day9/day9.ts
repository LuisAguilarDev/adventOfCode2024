//--- Day 9: Disk Fragmenter ---

//Part 1
export function getCheckSum(diskMap: string) {
  let checkSum = 0;
  //0 indexed 0-9
  const maxFileId = Math.round(diskMap.length / 2) - 1;
  let [start, end] = [0, diskMap.length - 1];
  let [isFileStart] = [diskMap.length % 2 > 0];
  let [fileId, index, movedFiles, fileToRelocate, availableSpace] = [
    0, 0, 0, 0, 0, 0,
  ];
  while (fileId <= maxFileId - movedFiles || fileToRelocate) {
    console.log(index, fileId, maxFileId - movedFiles);
    if (start > end) isFileStart = false;
    if (isFileStart) {
      let fileSpace = Number(diskMap[start++]);
      while (fileSpace--) checkSum += index++ * fileId;
      fileId++;
    } else {
      availableSpace += Number(diskMap[start++]);
    }
    isFileStart = !isFileStart;
    while (availableSpace > 0) {
      console.log(index, fileId, maxFileId - movedFiles);
      if (!fileToRelocate && start < end) {
        fileToRelocate = Number(diskMap[end]);
        end -= 2;
      }
      let lastId = maxFileId - movedFiles;
      while (fileToRelocate && availableSpace) {
        fileToRelocate--;
        availableSpace--;
        checkSum += index++ * lastId;
        if (!fileToRelocate) movedFiles++;
      }
      if (start >= end) break;
    }
  }
  return checkSum;
}
//Part 2 :S
