import { SortBar } from "../models/SortBar";

export function getValue(element: SortBar): number {
  return element.height;
}

export function getQuickSortValue(element: SortBar | undefined): number {
  if (element) {
    return element.height;
  } else {
    return 502;
  }
}

// Returns true if value of x is greater/equal than y
export function compare(x: SortBar, y: SortBar): boolean {
  return getValue(x) >= getValue(y);
}

export function isSorted(elements: SortBar[]): boolean {
  for (let i = 1; i < elements.length; i++) {
    if (!compare(elements[i], elements[i - 1])) {
      return false;
    }
  }
  return true;
}

export const minRunLength = function (n: number): number {
  let MIN_MERGE = 32;
  // Becomes 1 if any 1 bits are shifted off
  let r = 0;
  while (n >= MIN_MERGE) {
    r |= n & 1;
    n >>= 1;
  }
  return n + r;
};
