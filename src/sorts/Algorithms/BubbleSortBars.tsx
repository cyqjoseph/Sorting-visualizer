import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { isSorted, compare } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";

interface RenderSortBarProps {
  settings: {
    length: number;
    iteration: number;
    randomize: boolean;
    loading: boolean;
  };
}
const RenderSortBars: React.FC<RenderSortBarProps> = function ({ settings }) {
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

  const BeginBubbleSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      const len = sortBars.length;
      let firstRenderFlag = false;
      let iFlag = 0;
      let jFlag = 0;
      while (iFlag <= len - 1) {
        if (isSorted(sortBars)) {
          break;
        }
        if (firstRenderFlag) {
        }
        if (jFlag >= len - iFlag - 1) {
          // Exit out of nested loop
          sortBars[len - 1 - iFlag].color = "#58ff58";
          firstRenderFlag = true;

          jFlag = 0;
          iFlag += 1;
        }
        if (compare(sortBars[jFlag], sortBars[jFlag + 1])) {
          // Swapping logic for bubble sort
          let temp: SortBar = sortBars[jFlag];
          sortBars[jFlag] = sortBars[jFlag + 1];
          sortBars[jFlag + 1] = temp;
          await new Promise((resolve) => {
            setTimeout(resolve, iteration * 1000);
            setRenderedBars(sortBars);
            setFlag((prevState) => !prevState);
          });
        }

        jFlag += 1;
      }
      sortBars.forEach((sortBar) => (sortBar.color = "#58ff58"));
      setRenderedBars(sortBars);
      completeArraySorting();
    },
    [completeArraySorting]
  );

  useEffect(() => {
    if (isLoading) {
      BeginBubbleSort(renderedBars, settings.iteration);
    }
  }, [isLoading, BeginBubbleSort, renderedBars, settings.iteration]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default RenderSortBars;
