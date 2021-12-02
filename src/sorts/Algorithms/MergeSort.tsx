/* eslint-disable no-loop-func */
import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { isSorted, getValue } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const MergeSort: React.FC<RenderSortBarProps> = function ({ settings }) {
  const [renderedBars, setRenderedBars] = useState<SortBar[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  const isLoading = useTypedSelector(({ sortArray: { loading } }) => {
    return loading;
  });
  const { completeArraySorting } = useActions();

  useEffect(() => {
    if (settings.randomize) {
      setRenderedBars(new SortArray(settings.length).randomizeSortArray());
      setLoadingFlag(false);
    }
    setRenderedBars(new SortArray(settings.length).randomizeSortArray());
  }, [settings.randomize, settings.length]);
  const BeginMergeSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      let firstPointer: number;
      let secondPointer: number;
      let high: number;
      let mid: number;

      let storeArr = sortBars;
      let p = 2; // step-length of sub-arrays

      while (p <= sortBars.length) {
        let i = 0; // pointer to the first sub-array
        while (i + p - 1 < sortBars.length) {
          let tempArr: SortBar[] = [];
          firstPointer = i; // 0 in first iteration
          high = i + p - 1; // 3 in first iteration
          mid = Math.floor((firstPointer + high) / 2); // 1 in first ieration
          secondPointer = mid + 1; // 2 in first iteration

          if (high + p > sortBars.length) {
            high = sortBars.length - 1;
            tempArr = sortBars.slice(i, high + 1).sort((a, b) => {
              const firstVal = a.height;
              const secondVal = b.height;
              if (firstVal < secondVal) {
                return -1;
              } else {
                return 1;
              }
            });
          } else {
            while (firstPointer <= mid && secondPointer <= high) {
              if (
                getValue(storeArr[firstPointer]) <
                getValue(storeArr[secondPointer])
              ) {
                // i is smaller so append it to start of the ;ist
                tempArr.push(storeArr[firstPointer]);
                firstPointer++;
              } else {
                tempArr.push(storeArr[secondPointer]);
                secondPointer++;
              }
            }
            for (; firstPointer <= mid; firstPointer++) {
              tempArr.push(storeArr[firstPointer]);
            }
            for (; secondPointer <= high; secondPointer++) {
              tempArr.push(storeArr[secondPointer]);
            }
          }

          const frontArr = storeArr.slice(0, i);
          const backArr = storeArr.slice(high + 1, storeArr.length);
          storeArr = [...frontArr, ...tempArr, ...backArr];
          await new Promise((resolve) => {
            setTimeout(resolve, iteration * 1000);
            setFlag((prevState) => !prevState);
            setRenderedBars(storeArr);
          });

          i = i + p;
        }
        p = p * 2;
      }

      if (isSorted(storeArr)) {
        storeArr.forEach((sortBar) => (sortBar.color = "#58ff58"));
        setRenderedBars(storeArr);
        completeArraySorting();
        setLoadingFlag(false);
        return;
      }
    },
    [completeArraySorting]
  );

  useEffect(() => {
    if (isLoading && !loadingFlag) {
      setLoadingFlag(true);
      BeginMergeSort(renderedBars, settings.iteration);
    }
  }, [
    isLoading,
    BeginMergeSort,
    renderedBars,
    settings.iteration,
    settings.length,
    loadingFlag,
  ]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default MergeSort;
