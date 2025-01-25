//--- Day 2: Red-Nosed Reports ---
//First;
export function countSafeReports(rawData: string) {
  let totalSafeReports = 0;
  const reports = rawData.split('\n');
  reports.forEach((report: string) => {
    const reportData = report.trim().split(/\s+/).map(Number);
    if (isSafeReport(reportData)) {
      totalSafeReports++;
    }
  });
  return totalSafeReports;
}

//Second;
export function countSafeReportsRemovingOne(rawData: string) {
  let totalSafeReports = 0;
  const reports = rawData.split('\n');
  reports.forEach((report: string) => {
    const reportData = report.trim().split(/\s+/).map(Number);
    if (isSafeRemovingOne(reportData)) {
      totalSafeReports++;
    }
  });
  return totalSafeReports;
}

function isSafeRemovingOne(reportData: number[]): boolean {
  if (isSafeReport(reportData)) return true;
  for (let i = 0; i < reportData.length; i++) {
    if (isSafeReport2([...reportData.slice(0, i), ...reportData.slice(i + 1)]))
      return true;
  }
  return false;
}

function isSafeReport(reportData: number[]): boolean {
  let isIncreasing: boolean | undefined = undefined;
  for (let i = 1; i < reportData.length; i++) {
    let diference = reportData[i] - reportData[i - 1];
    if (Math.abs(diference) > 3 || diference === 0) {
      return false;
    }
    const isCurrentlyIncreasing = diference > 0;
    if (isIncreasing !== undefined && isIncreasing !== isCurrentlyIncreasing) {
      return false;
    }
    isIncreasing ??= isCurrentlyIncreasing;
  }
  return true;
}
//another aproach
function isSafeReport2(reportData: number[]): boolean {
  const pairs: Array<[number, number]> = reportData
    .slice(0, -1)
    .map((value, index) => [value, reportData[index + 1]]);
  let c1 = pairs.every(([x, y]: [number, number]) => {
    return x > y && x - y <= 3;
  });
  let c2 = pairs.every(([x, y]: [number, number]) => {
    return x < y && y - x <= 3;
  });
  return c1 || c2;
}
