/* eslint-disable no-loop-func */
import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { compare } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const PancakeSort: React.FC<RenderSortBarProps> = function ({ settings }) {
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

  // Reverses sortBars[0:i]
  const flip = useCallback(async function (
    sortBars: SortBar[],
    k: number,
    iteration: number
  ) {
    let left = 0;
    while (left < k) {
      [sortBars[left], sortBars[k]] = [sortBars[k], sortBars[left]];
      await new Promise((resolve) => {
        setTimeout(resolve, iteration * 1000);
        setFlag((prevState) => !prevState);
        setRenderedBars(sortBars);
      });
      k--;
      left++;
    }
  },
  []);
  //Returns max index of element in array, could be optimised by decrementing non-sorted array length by 1 each time (i.e this function is not needed)
  const getMaxIndex = useCallback(function (
    sortBars: SortBar[],
    k: number
  ): number {
    let index = 0;
    for (let i = 0; i < k; i++) {
      if (compare(sortBars[i], sortBars[index])) {
        index = i;
      }
    }
    return index;
  },
  []);

  const BeginPancakeSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      let len = sortBars.length;
      // Start from complete array and reduce size by one
      while (len > 1) {
        let maxIndex = getMaxIndex(sortBars, len);
        // Move the max element to end of curr array if not already at end
        if (maxIndex !== len) {
          // Moves maximum number to beggining
          await flip(sortBars, maxIndex, iteration);
          // Moves max number to the end by reversing current array
          await flip(sortBars, len - 1, iteration);
        }
        len--;
      }
      sortBars.forEach((sortBar) => (sortBar.color = "#58ff58"));
      setRenderedBars(sortBars);
      completeArraySorting();
    },
    [completeArraySorting, getMaxIndex, flip]
  );

  useEffect(() => {
    if (isLoading) {
      BeginPancakeSort(renderedBars, settings.iteration);
    }
  }, [isLoading, BeginPancakeSort, renderedBars, settings.iteration]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default PancakeSort;
