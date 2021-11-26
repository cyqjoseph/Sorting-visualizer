import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { isSorted, compare } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
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
  const [isRandomize, setIsRandomize] = useState<boolean>(settings.randomize);
  const [flag, setFlag] = useState<boolean>(false);
  const isLoading = useTypedSelector(({ sortArray: { loading } }) => {
    return loading;
  });
  useEffect(() => {
    if (isRandomize) {
      setRenderedBars(new SortArray(settings.length).randomizeSortArray());
      setIsRandomize(false);
    }
    setRenderedBars(new SortArray(settings.length).randomizeSortArray());
  }, [isRandomize, settings.length]);

  const BeginBubbleSort = useCallback(async function (sortBars: SortBar[]) {
    const len = sortBars.length;

    let iFlag = 0;
    let jFlag = 0;
    while (iFlag <= len - 1) {
      if (isSorted(sortBars)) {
        break;
      }
      if (jFlag >= len - iFlag - 1) {
        // Exit out of nested loop
        jFlag = 0;
        iFlag += 1;
      }
      if (compare(sortBars[jFlag], sortBars[jFlag + 1])) {
        // Swapping logic for bubble sort
        let temp: SortBar = sortBars[jFlag];
        sortBars[jFlag] = sortBars[jFlag + 1];
        sortBars[jFlag + 1] = temp;
        await new Promise((resolve) => {
          setTimeout(resolve, 1);
          setRenderedBars(sortBars);
          setFlag((prevState) => !prevState);
          // console.log("re-sorting...", sortBars);
        });
      }
      jFlag += 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading) {
      BeginBubbleSort(renderedBars);
    }
  }, [isLoading, BeginBubbleSort, renderedBars]);

  useEffect(() => {}, [renderedBars]);
  // useEffect(() => {
  //   if (isLoading) {
  //     console.log("inside timer");
  //     let timer = setTimeout(() => setRenderedBars(renderedBars), 1500);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [renderedBars, isLoading]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default RenderSortBars;
