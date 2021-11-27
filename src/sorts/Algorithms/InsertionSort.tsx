import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { isSorted, compare } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const InsertionSort: React.FC<RenderSortBarProps> = function ({ settings }) {
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

  const BeginInsertionSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      const len = sortBars.length;
      let i = 1;
      let j: number;
      let key: SortBar;
      while (i <= len - 1) {
        if (isSorted(sortBars)) {
          break;
        }
        key = sortBars[i];
        j = i - 1;
        key.color = "#4765fc";

        while (j >= 0 && compare(sortBars[j], key)) {
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
        sortBars[j + 1] = key;
        key.color = "#e66465";
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
      BeginInsertionSort(renderedBars, settings.iteration);
    }
  }, [isLoading, BeginInsertionSort, renderedBars, settings.iteration]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default InsertionSort;
