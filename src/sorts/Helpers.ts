import { SortBar } from "../models/SortBar";

function getValue(element: SortBar): number {
  return element.height;
}

function compare(x: SortBar, y: SortBar): boolean {
  return getValue(x) >= getValue(y);
}

export function sleep(delay: number): Promise<void> {
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

// class Helpers {
//   public getValue(element: SortBar): number {
//     return element.height;
//   }

//   public compare(x: SortBar, y: SortBar): boolean {
//     return this.getValue(x) >= this.getValue(y);
//   }

//   public isSorted(elements: SortBar[]): boolean {
//     for (let i = 1; i < elements.length; i++) {
//       if (!this.compare(elements[i], elements[i - 1])) {
//         return false;
//       }
//     }
//     return true;
//   }

//   public sleep(delay: number): Promise<void> {
//     return new Promise((resolve) => {
//       setTimeout(resolve, delay);
//     });
//   }

//   public Swap(left: SortBar, right: SortBar): void {
//     setTimeout(() => {
//       let temp: SortBar = left;
//       left = right;
//       right = temp;
//     }, 1000);
//   }
// }
