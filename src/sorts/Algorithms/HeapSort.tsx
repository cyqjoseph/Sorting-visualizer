/* eslint-disable no-loop-func */
import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { getValue } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const HeapSort: React.FC<RenderSortBarProps> = function ({ settings }) {
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

  const Heapify = useCallback(function (
    sortBars: SortBar[],
    size: number,
    i: number
  ) {
    // siftDown approach, moves element to correct location by swapping with its children
    let max = i;
    // Indexes of left and right child
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < size && getValue(sortBars[left]) > getValue(sortBars[max])) {
      max = left;
    }
    // right child bigger than left child (more precedence)
    if (right < size && getValue(sortBars[right]) > getValue(sortBars[max])) {
      max = right;
    }
    // will not run if value of element at i is greater than its children
    if (max !== i) {
      let temp: SortBar = sortBars[i];
      sortBars[i] = sortBars[max];
      sortBars[max] = temp;
      // called recursively to sift largest element to top (left of array)
      Heapify(sortBars, size, max);
    }
    return sortBars;
  },
  []);

  const BeginHeapSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      const len = sortBars.length;
      let tempArr = sortBars;
      // Builds the initial max heap as a complete binary tree
      for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
        tempArr = Heapify(tempArr, len, i);
        await new Promise((resolve) => {
          setTimeout(resolve, iteration * 1000);
          setFlag((prevState) => !prevState);
          setRenderedBars(tempArr);
        });
      }

      for (let i = len - 1; i >= 0; i--) {
        //Swaps the first element of the list (max value) with the final element
        let temp = tempArr[0];
        tempArr[0] = tempArr[i];
        tempArr[i] = temp;
        // Call siftDown on the array to sift the new first element to its appropriate index in the heap
        tempArr = Heapify(tempArr, i, 0);
        await new Promise((resolve) => {
          setTimeout(resolve, iteration * 1000);
          setFlag((prevState) => !prevState);
          setRenderedBars(tempArr);
        });
      }
      tempArr.forEach((sortBar) => (sortBar.color = "#58ff58"));
      setRenderedBars(tempArr);
      completeArraySorting();
    },
    [completeArraySorting, Heapify]
  );

  useEffect(() => {
    if (isLoading) {
      BeginHeapSort(renderedBars, settings.iteration);
    }
  }, [isLoading, BeginHeapSort, renderedBars, settings.iteration]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default HeapSort;
