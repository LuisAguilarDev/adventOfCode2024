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
//Second;
export function countSafeReportsWithDampener(rawData: string) {
  let totalSafeReports = 0;
  const reports = rawData.split('\n');
  reports.forEach((report: string) => {
    const reportData = report.trim().split(/\s+/).map(Number);
    if (isSafeWithDampener(reportData)) {
      totalSafeReports++;
    }
  });
  return totalSafeReports;
}

function isSafeWithDampener(reportData: number[]): boolean {
  if (isSafeReport(reportData)) return true;
  let isSafe = false;
  for (let i = 0; i < reportData.length; i++) {
    const copyReportData = reportData.slice();
    copyReportData.splice(i, 1);
    isSafe = isSafeReport(copyReportData);
    if (isSafe) break;
  }
  return isSafe;
}
