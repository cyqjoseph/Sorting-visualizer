export enum SortType {
  BUBBLE = "BubbleSort",
  INSERTION = "InsertionSort",
  MERGE = "MergeSort",
  SELECTION = "SelectionSort",
  QUICK = "QuickSort",
  COUNT = "CountSort",
}

export interface RenderSortBarProps {
  settings: {
    length: number;
    iteration: number;
    randomize: boolean;
    loading: boolean;
  };
}
