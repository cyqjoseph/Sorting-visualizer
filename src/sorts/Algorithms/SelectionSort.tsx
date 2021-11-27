import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { isSorted, compare } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const SelectionSort: React.FC<RenderSortBarProps> = function ({ settings }) {
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

  const BeginSelectionSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      const len = sortBars.length;
      let i = 0;
      let j: number; // will traverse array as pointer to find smallest element
      let minIndex: number;
      while (i < len) {
        if (isSorted(sortBars)) {
          break;
        }
        // point on last element
        minIndex = i;

        for (j = i + 1; j < len; j++) {
          if (compare(sortBars[minIndex], sortBars[j])) {
            minIndex = j;
          }
        } // put smallest element selected at correct index
        if (i !== minIndex) {
          let temp: SortBar = sortBars[i];
          sortBars[i] = sortBars[minIndex];
          sortBars[minIndex] = temp;
        }
        await new Promise((resolve) => {
          setTimeout(resolve, iteration * 1000);
          setFlag((prevState) => !prevState);
          setRenderedBars(sortBars);
        });

        sortBars[i].color = "#58ff58";
        i += 1;
      }
      sortBars.forEach((sortBar) => (sortBar.color = "#58ff58"));
      setRenderedBars(sortBars);
      completeArraySorting();
    },
    [completeArraySorting]
  );

  useEffect(() => {
    if (isLoading) {
      BeginSelectionSort(renderedBars, settings.iteration);
    }
  }, [isLoading, BeginSelectionSort, renderedBars, settings.iteration]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default SelectionSort;

// not adaptive and not stable (will not preserve the order)
