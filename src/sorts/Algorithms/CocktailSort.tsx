import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { compare } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const CocktailSort: React.FC<RenderSortBarProps> = function ({ settings }) {
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

  const BeginCocktailSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      const len = sortBars.length;
      let sorted = true;
      while (sorted) {
        // Reset swapped flag as it may be true from prev iteration
        sorted = false;
        // Loop from btm to top same as bubble sort
        for (let i = 0; i < len - 1; i++) {
          if (compare(sortBars[i], sortBars[i + 1])) {
            [sortBars[i], sortBars[i + 1]] = [sortBars[i + 1], sortBars[i]];
            await new Promise((resolve) => {
              setTimeout(resolve, iteration * 1000);
              setRenderedBars(sortBars);
              setFlag((prevState) => !prevState);
            });
            sorted = true;
          }
        }
        // Loop breaks if nothing is moved (array already sorted)
        if (!sorted) {
          break;
        }
        sorted = false;
        // Top to bottom, moves smallest element to front of array
        for (let j = len - 1; j > 0; j--) {
          if (compare(sortBars[j - 1], sortBars[j])) {
            [sortBars[j], sortBars[j - 1]] = [sortBars[j - 1], sortBars[j]];
            await new Promise((resolve) => {
              setTimeout(resolve, iteration * 1000);
              setRenderedBars(sortBars);
              setFlag((prevState) => !prevState);
            });
            sorted = true;
          }
        }
      }
      // if (len > 20) {
      //   for (let i = 0; i < len - 10; i++) {
      //     let tempArr = sortBars.slice(i, i + 10);
      //     let frontArr = sortBars.slice(0, i);
      //     let backArr = sortBars.slice(i + 10, len - 1);
      //     tempArr.forEach((sortBar) => (sortBar.color = "#58ff58"));
      //     await new Promise((resolve) => {
      //       setTimeout(resolve, iteration * 10000);
      //       setRenderedBars([...frontArr, ...tempArr, ...backArr]);
      //       setFlag((prevState) => !prevState);
      //     });
      //   }
      // }

      sortBars.forEach((sortBar) => (sortBar.color = "#58ff58"));
      setRenderedBars(sortBars);
      completeArraySorting();
    },
    [completeArraySorting]
  );

  useEffect(() => {
    if (isLoading) {
      BeginCocktailSort(renderedBars, settings.iteration);
    }
  }, [isLoading, BeginCocktailSort, renderedBars, settings.iteration]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default CocktailSort;
