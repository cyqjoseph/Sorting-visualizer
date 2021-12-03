import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { getValue } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const ShellSort: React.FC<RenderSortBarProps> = function ({ settings }) {
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

  const BeginShellSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      const len = sortBars.length;
      let i: number;
      let j: number;
      let key: SortBar;
      let gap = ~~(len / 2);

      while (gap > 0) {
        i = gap;
        while (i < len) {
          key = sortBars[i];
          key.color = "#4765fc";
          j = i;
          while (j >= gap && getValue(sortBars[j - gap]) > getValue(key)) {
            let temp: SortBar = sortBars[j];
            sortBars[j] = sortBars[j - gap];
            sortBars[j - gap] = temp;
            await new Promise((resolve) => {
              setTimeout(resolve, iteration * 1000);
              setFlag((prevState) => !prevState);
              setRenderedBars(sortBars);
            });
            j -= gap;
          }
          key.color = "#e66465";

          i++;
        }
        gap = ~~(gap / 2);
      }

      sortBars.forEach((sortBar) => (sortBar.color = "#58ff58"));
      setRenderedBars(sortBars);
      completeArraySorting();
    },
    [completeArraySorting]
  );

  useEffect(() => {
    if (isLoading) {
      BeginShellSort(renderedBars, settings.iteration);
    }
  }, [isLoading, BeginShellSort, renderedBars, settings.iteration]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default ShellSort;
