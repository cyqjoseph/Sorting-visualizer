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
    i: number,
    iteration: number
  ) {
    let max = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < size && getValue(sortBars[left]) > getValue(sortBars[max])) {
      max = left;
    }
    if (right < size && getValue(sortBars[right]) > getValue(sortBars[max])) {
      max = right;
    }

    if (max !== i) {
      let temp: SortBar = sortBars[i];
      sortBars[i] = sortBars[max];
      sortBars[max] = temp;
      Heapify(sortBars, size, max, iteration);
    }
    return sortBars;
  },
  []);

  const BeginHeapSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      const len = sortBars.length;
      let tempArr = sortBars;
      for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
        tempArr = Heapify(tempArr, len, i, iteration);
        await new Promise((resolve) => {
          setTimeout(resolve, iteration * 1000);
          setFlag((prevState) => !prevState);
          setRenderedBars(tempArr);
        });
      }

      for (let i = len - 1; i >= 0; i--) {
        let temp = tempArr[0];
        tempArr[0] = tempArr[i];
        tempArr[i] = temp;
        tempArr = Heapify(tempArr, i, 0, iteration);
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
