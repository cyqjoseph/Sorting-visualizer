import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { compare } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const OddEvenSort: React.FC<RenderSortBarProps> = function ({ settings }) {
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

  const BeginOddEvenSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      const len = sortBars.length;
      let sorted = false;

      while (!sorted) {
        sorted = true;
        for (let i = 1; i < len - 1; i += 2) {
          if (compare(sortBars[i], sortBars[i + 1])) {
            let temp: SortBar = sortBars[i];
            sortBars[i] = sortBars[i + 1];
            sortBars[i + 1] = temp;
            await new Promise((resolve) => {
              setTimeout(resolve, iteration * 1000);
              setFlag((prevState) => !prevState);
              setRenderedBars(sortBars);
            });
            sorted = false;
          }
        }
        for (let i = 0; i < len - 1; i += 2) {
          if (compare(sortBars[i], sortBars[i + 1])) {
            let temp: SortBar = sortBars[i];
            sortBars[i] = sortBars[i + 1];
            sortBars[i + 1] = temp;
            await new Promise((resolve) => {
              setTimeout(resolve, iteration * 1000);
              setFlag((prevState) => !prevState);
              setRenderedBars(sortBars);
            });
            sorted = false;
          }
        }
      }

      sortBars.forEach((sortBar) => (sortBar.color = "#58ff58"));
      setRenderedBars(sortBars);
      completeArraySorting();
    },
    [completeArraySorting]
  );

  useEffect(() => {
    if (isLoading) {
      BeginOddEvenSort(renderedBars, settings.iteration);
    }
  }, [isLoading, BeginOddEvenSort, renderedBars, settings.iteration]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default OddEvenSort;
