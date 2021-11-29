import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { isSorted, getValue, getQuickSortValue } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const QuickSort: React.FC<RenderSortBarProps> = function ({ settings }) {
  const [renderedBars, setRenderedBars] = useState<SortBar[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const isLoading = useTypedSelector(({ sortArray: { loading } }) => {
    return loading;
  });
  const { completeArraySorting } = useActions();
  useEffect(() => {
    if (settings.randomize) {
      setRenderedBars(new SortArray(settings.length).randomizeSortArray());
    }
    setRenderedBars(new SortArray(settings.length).randomizeSortArray());
  }, [settings.randomize, settings.length]);

  // will be called recursively
  const BeginQuickSort = useCallback(
    async function (
      sortBars: SortBar[],
      start: number | undefined,
      end: number,
      iteration: number
    ) {
      if (start === undefined) {
        start = 0;
        end = sortBars.length - 1;
      } else if (start >= end) {
        return sortBars;
      } else if (start === sortBars.length) {
        console.log("Equality error");
        return;
      }
      const rStart = start;
      const rEnd = end;

      const pivot =
        sortBars[Math.floor(Math.random() * (end - start + 1) + start)];

      try {
        while (start < end) {
          // 2 pointers, from start and end
          // if pivot value is greater than elements on left, continue to increment start

          // Special get value has to be added in case of start being sortBar.length, which is out of bounds of the sortBar array and hence returns undefined
          // If this is the case, the special function will return a large number to handle this edge case
          while (getQuickSortValue(sortBars[start]) <= getValue(pivot)) start++;

          // if pivot value is less than elements on right, continue to decrement end

          while (getValue(sortBars[end]) > getValue(pivot)) end--;

          if (start < end) {
            // swap two elements
            const temp = sortBars[start];
            sortBars[start] = sortBars[end];
            sortBars[end] = temp;
          }
        }
      } catch (e: any) {
        console.log(sortBars[start], start, sortBars.length); // start equals to sortbars length
        console.error(e);
      }
      await new Promise((resolve) => {
        setTimeout(resolve, iteration * 1000);
        setFlag((prevState) => !prevState);

        sortBars.forEach((sortBar) => {
          if (sortBar === pivot) {
            sortBar.color = "#4765fc";
          } else {
            sortBar.color = "#e66465";
          }
        });
        setRenderedBars(sortBars);
      });
      // Call recursively on both sides
      await BeginQuickSort(sortBars, rStart, start - 1, iteration);
      await BeginQuickSort(sortBars, start, rEnd, iteration);
      if (isSorted(sortBars)) {
        sortBars.forEach((sortBar) => (sortBar.color = "#58ff58"));
        setRenderedBars(sortBars);
        completeArraySorting();
        return;
      }
    },
    [completeArraySorting]
  );
  // useEffect(() => {
  //   if (isSorted(renderedBars)) {
  //     renderedBars.forEach((sortBar) => (sortBar.color = "#58ff58"));
  //     setRenderedBars(renderedBars);
  //     completeArraySorting();
  //   }
  // }, [completeArraySorting, renderedBars]);
  useEffect(() => {
    if (isLoading) {
      BeginQuickSort(renderedBars, undefined, 0, settings.iteration);
    }
  }, [isLoading, BeginQuickSort, renderedBars, settings.iteration]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default QuickSort;

// not adaptive and not stable (will not preserve the order)
