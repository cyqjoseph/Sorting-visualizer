/* eslint-disable no-loop-func */
import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { compare, minRunLength, getValue } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const TimSort: React.FC<RenderSortBarProps> = function ({ settings }) {
  const [renderedBars, setRenderedBars] = useState<SortBar[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const isLoading = useTypedSelector(({ sortArray: { loading } }) => {
    return loading;
  });
  const { completeArraySorting } = useActions();
  const MIN_MERGE = 32;
  useEffect(() => {
    if (settings.randomize) {
      setRenderedBars(new SortArray(settings.length).randomizeSortArray());
    }
    setRenderedBars(new SortArray(settings.length).randomizeSortArray());
  }, [settings.randomize, settings.length]);

  const insertionSort = useCallback(async function (
    sortBars: SortBar[],
    left: number,
    right: number,
    iteration: number
  ) {
    for (let i = left + 1; i <= right; i++) {
      let temp = sortBars[i];
      let j = i - 1;
      while (j >= left && compare(sortBars[j], temp)) {
        let temp: SortBar = sortBars[j];
        sortBars[j] = sortBars[j + 1];
        sortBars[j + 1] = temp;
        j--;
        await new Promise((resolve) => {
          setTimeout(resolve, iteration * 1000);
          setFlag((prevState) => !prevState);
          setRenderedBars(sortBars);
        });
      }
      sortBars[j + 1] = temp;
    }
    return sortBars;
  },
  []);

  const merge = useCallback(async function (
    sortBars: SortBar[],
    l: number,
    m: number,
    r: number
  ) {
    let len1 = m - l + 1;
    let len2 = r - m;
    let left = new Array(len1);
    let right = new Array(len2);
    for (let x = 0; x < len1; x++) {
      left[x] = sortBars[l + x];
    }
    for (let x = 0; x < len2; x++) {
      right[x] = sortBars[m + 1 + x];
    }
    let i = 0;
    let j = 0;
    let k = l;
    // Merge process
    while (i < len1 && j < len2) {
      if (getValue(left[i]) <= getValue(right[j])) {
        sortBars[k] = left[i];
        i++;
      } else {
        sortBars[k] = right[j];
        j++;
      }
      k++;
    }
    while (i < len1) {
      sortBars[k] = left[i];
      i++;
      k++;
    }
    while (j < len2) {
      sortBars[k] = right[j];
      j++;
      k++;
    }

    return sortBars;
  },
  []);

  // Iterative timsort similar to merge sort
  const BeginTimSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      const multiplier = iteration <= 0.01 ? 100000 : 10000;
      const len = sortBars.length;
      let tempArr = sortBars;
      let minRun = minRunLength(MIN_MERGE);
      // Sort individual subarrays with size RUN
      for (let i = 0; i < len; i += minRun) {
        tempArr = await insertionSort(
          tempArr,
          i,
          Math.min(i + MIN_MERGE - 1, len - 1),
          iteration
        );
      }
      // Start mergin from size RUN. Will merge to form size 64, 126, etc
      for (let size = minRun; size < len; size = 2 * size) {
        // Pick starting pt of left subarray
        // Merge sortBar[left:left+size-1] and sortBar[left+size: left+2*size-1]
        for (let left = 0; left < len; left += 2 * size) {
          // Find ending pt of left subarray, mid+1 is starting pt of right sub-array
          let mid = left + size - 1;
          let right = Math.min(left + 2 * size - 1, len - 1);
          if (mid < right) {
            tempArr = await merge(tempArr, left, mid, right);
            await new Promise((resolve) => {
              setTimeout(resolve, iteration * multiplier);
              setFlag((prevState) => !prevState);
              setRenderedBars(tempArr);
            });
          }
        }
      }

      tempArr.forEach((sortBar) => (sortBar.color = "#58ff58"));
      setRenderedBars(tempArr);
      completeArraySorting();
    },
    [completeArraySorting, merge, insertionSort]
  );

  useEffect(() => {
    if (isLoading) {
      BeginTimSort(renderedBars, settings.iteration);
    }
  }, [isLoading, BeginTimSort, renderedBars, settings.iteration]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default TimSort;
