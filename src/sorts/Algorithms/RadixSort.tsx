/* eslint-disable no-loop-func */
import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { isSorted, getValue } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const RadixSort: React.FC<RenderSortBarProps> = function ({ settings }) {
  const [renderedBars, setRenderedBars] = useState<SortBar[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  const isLoading = useTypedSelector(({ sortArray: { loading } }) => {
    return loading;
  });
  const { completeArraySorting } = useActions();

  useEffect(() => {
    if (settings.randomize) {
      setRenderedBars(new SortArray(settings.length).randomizeSortArray());
      setLoadingFlag(false);
    }
    setRenderedBars(new SortArray(settings.length).randomizeSortArray());
  }, [settings.randomize, settings.length]);

  const BeginRadixSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      const noIterations =
        sortBars.length > 100 ? 3 : sortBars.length > 10 ? 2 : 1;
      let len = sortBars.length;
      let j = 0;
      let i = 1;
      let storeArr = sortBars;
      let tempStoreArr = [...storeArr];
      let bucketArray: SortBar[][] = Array.from({ length: 10 }, () => []);

      while (i <= noIterations) {
        while (j < len) {
          const sortBar = storeArr[j];
          const location = Math.floor((getValue(sortBar) / 10 ** (i - 1)) % 10);

          let bucketLoc = bucketArray[location];
          bucketLoc.push(sortBar);
          bucketArray[location] = bucketLoc;
          bucketArray.splice(location, 1, bucketLoc);
          tempStoreArr.splice(tempStoreArr.indexOf(sortBar), 1);

          await new Promise((resolve) => {
            setTimeout(resolve, iteration * 1000);
            setFlag((prevState) => !prevState);
            setRenderedBars([...bucketArray.flat(), ...tempStoreArr]);
          });
          j++;
        }

        await new Promise((resolve) => {
          storeArr = bucketArray.flat();
          tempStoreArr = [...storeArr];
          setTimeout(resolve, iteration * 1000);
          setFlag((prevState) => !prevState);
          setRenderedBars(storeArr);
        });
        i++;
        j = 0;
        bucketArray = Array.from({ length: 10 }, () => []);
      }

      if (isSorted(storeArr)) {
        storeArr.forEach((sortBar) => (sortBar.color = "#58ff58"));
        setRenderedBars(storeArr);
        completeArraySorting();
        return;
      } else {
        storeArr.sort((a, b) => {
          const firstVal = a.height;
          const secondVal = b.height;
          if (firstVal < secondVal) {
            return -1;
          } else {
            return 1;
          }
        });
        storeArr.forEach((sortBar) => (sortBar.color = "#58ff58"));
        setRenderedBars(storeArr);
        completeArraySorting();
        setLoadingFlag(false);
        return;
      }
    },
    [completeArraySorting]
  );

  useEffect(() => {
    if (isLoading && !loadingFlag) {
      setLoadingFlag(true);
      BeginRadixSort(renderedBars, settings.iteration);
    }
  }, [
    isLoading,
    BeginRadixSort,
    renderedBars,
    settings.iteration,
    loadingFlag,
  ]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default RadixSort;
