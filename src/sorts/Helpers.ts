import { SortBar } from "../models/SortBar";

function getValue(element: SortBar): number {
  return element.height;
}

function compare(x: SortBar, y: SortBar): boolean {
  return getValue(x) >= getValue(y);
}

export async function sleep(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function swap(left: SortBar, right: SortBar): void {
  let temp: SortBar = left;
  left = right;
  right = temp;
}

export function isSorted(elements: SortBar[]): boolean {
  for (let i = 1; i < elements.length; i++) {
    if (!compare(elements[i], elements[i - 1])) {
      return false;
    }
  }
  return true;
}
