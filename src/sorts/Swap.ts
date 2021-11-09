import { SortBar } from "../models/SortBar";
export function Swap(left: SortBar, right: SortBar): void {
  let temp: SortBar = left;
  left = right;
  right = temp;
}
