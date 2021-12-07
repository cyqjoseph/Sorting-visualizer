import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { getValue } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const CycleSort: React.FC<RenderSortBarProps> = function ({ settings }) {
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

  const BeginCycleSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      const len = sortBars.length;
      // Traverse arr and put elements on to their right places
      for (let cycle_start = 0; cycle_start <= len - 2; cycle_start++) {
        // Initialize item as starting pt
        let temp = sortBars[cycle_start];

        // Find position to put the item by counting all smaller elements on right side of item
        let pos = cycle_start;
        for (let i = cycle_start + 1; i < len; i++) {
          if (getValue(sortBars[i]) < getValue(temp)) {
            pos++;
          }
        }
        // If item is already in sorted position
        if (pos === cycle_start) {
          continue;
        }
        // Ignores duplicate elements
        while (getValue(temp) === getValue(sortBars[pos])) {
          pos += 1;
        }

        // Puts item in correct pos
        if (pos !== cycle_start) {
          [temp, sortBars[pos]] = [sortBars[pos], temp];
          await new Promise((resolve) => {
            setTimeout(resolve, iteration * 1000);
            setRenderedBars(sortBars);
            setFlag((prevState) => !prevState);
          });
        }
        // Rotates the rest of the cycle
        while (pos !== cycle_start) {
          pos = cycle_start;

          for (let i = cycle_start + 1; i < len; i++) {
            if (getValue(sortBars[i]) < getValue(temp)) {
              pos += 1;
            }
          }
          while (getValue(temp) === getValue(sortBars[pos])) {
            pos += 1;
          }
          if (getValue(temp) !== getValue(sortBars[pos])) {
            [temp, sortBars[pos]] = [sortBars[pos], temp];
            await new Promise((resolve) => {
              setTimeout(resolve, iteration * 1000);
              setRenderedBars(sortBars);
              setFlag((prevState) => !prevState);
            });
          }
        }
      }
      //   let iFlag = 0;
      //   let jFlag = 0;
      //   while (iFlag <= len - 1) {

      //     if (jFlag >= len - iFlag - 1) {
      //       // Exit out of nested loop
      //       sortBars[len - 1 - iFlag].color = "#58ff58";
      //       jFlag = 0;
      //       iFlag += 1;
      //     }
      //     if (compare(sortBars[jFlag], sortBars[jFlag + 1])) {
      //       // Swapping logic for bubble sort
      //       let temp: SortBar = sortBars[jFlag];
      //       sortBars[jFlag] = sortBars[jFlag + 1];
      //       sortBars[jFlag + 1] = temp;
      //       await new Promise((resolve) => {
      //         setTimeout(resolve, iteration * 1000);
      //         setRenderedBars(sortBars);
      //         setFlag((prevState) => !prevState);
      //       });
      //     }

      //     jFlag += 1;
      //   }
      sortBars.forEach((sortBar) => (sortBar.color = "#58ff58"));
      setRenderedBars(sortBars);
      completeArraySorting();
    },
    [completeArraySorting]
  );

  useEffect(() => {
    if (isLoading) {
      BeginCycleSort(renderedBars, settings.iteration);
    }
  }, [isLoading, BeginCycleSort, renderedBars, settings.iteration]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default CycleSort;
