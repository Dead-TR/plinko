import { maxDotSize, maxRows, minDotSize, minRows } from "../config";

export const getDotSize = (currentRows: number) => {
  if (currentRows <= minRows) return maxDotSize;
  if (currentRows >= maxRows) return minDotSize;

  const sizeRange = maxDotSize - minDotSize;
  const rowRange = maxRows - minRows;
  const scaleFactor = (currentRows - minRows) / rowRange;

  return maxDotSize - sizeRange * scaleFactor;
};
