import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { isSorted, sleep } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const BogoSort: React.FC<RenderSortBarProps> = function ({ settings }) {
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

  const BeginBogoSort = useCallback(
    async function (iteration: number) {
      let temp: SortBar[] = renderedBars;
      while (!isSorted(temp)) {
        if (isSorted(temp)) {
          completeArraySorting();
        }
        temp = new SortArray(settings.length).randomizeSortArray();
        // eslint-disable-next-line no-loop-func
        await new Promise((resolve) => {
          setRenderedBars(temp);
          setTimeout(resolve, iteration * 1000);
          setFlag((prevState) => !prevState);
        });
      }
      temp.forEach((sortBar) => (sortBar.color = "#58ff58"));
      setRenderedBars(temp);
      setFlag((prevState) => !prevState);
    },
    [completeArraySorting, settings.length, renderedBars]
  );

  useEffect(() => {
    if (isLoading) {
      BeginBogoSort(settings.iteration);
      completeArraySorting();
    }
  }, [isLoading, BeginBogoSort, settings.iteration, completeArraySorting]);
  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default BogoSort;
