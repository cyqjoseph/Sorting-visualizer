import React from "react";
import { SortBar } from "../../models/SortBar";
import { useEffect, useState, useCallback } from "react";
import { isSorted, compare, getValue } from "../Helpers";
import { SortArray } from "../../models/SortArray";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useActions } from "../../hooks/use-actions";
import { RenderSortBarProps } from "../../enums";

const MergeSort: React.FC<RenderSortBarProps> = function ({ settings }) {
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

  // const merge = useCallback(function (
  //   sortBars: SortBar[],
  //   low: number,
  //   mid: number,
  //   high: number
  // ) {
  //   let i = low;
  //   let j = mid + 1;
  //   let tempArr: SortBar[] = [];
  //   // console.log(`Low: ${low}, Mid: ${mid}, High: ${high}`);
  //   // console.log(`Merging at ${i} i and ${j} j`);
  //   while (i <= mid && j <= high) {
  //     if (getValue(sortBars[i]) < getValue(sortBars[j])) {
  //       tempArr.push(sortBars[i]);
  //       i++;
  //     } else {
  //       tempArr.push(sortBars[j]);
  //       j++;
  //     }
  //   }

  //   for (; i <= mid; i++) {
  //     tempArr.push(sortBars[i]);
  //     //   tempArr[k++] = sortBars[i];
  //   }
  //   for (; j <= high; j++) {
  //     tempArr.push(sortBars[j]);
  //   }
  //   return tempArr;
  // },
  // []);
  // not being modified in place hence error
  const BeginMergeSort = useCallback(
    async function (sortBars: SortBar[], iteration: number) {
      //       iterative
      let low: number, p: number, high: number, mid: number;
      for (p = 2; p <= sortBars.length; p = p * 2) {
        for (let i = 0; i + p - 1 < sortBars.length; i = i + p) {
          low = i;
          high = i + p - 1;
          mid = ~~((low + high) / 2);

          // Merging logic here
          let j = mid + 1;
          let tempArr: SortBar[] = [];
          console.log(`Low: ${low}, Mid: ${mid}, High: ${high}`);
          console.log(`Merging at ${i} i and ${j} j`);
          while (i <= mid && j <= high) {
            if (getValue(sortBars[i]) < getValue(sortBars[j])) {
              // i is smaller so append it to start of the ;ist
              let temp: SortBar = sortBars[j];
              sortBars[j] = sortBars[j + 1];
              sortBars[j + 1] = temp;
              tempArr.push(sortBars[i]);
              i++;
            } else {
              tempArr.push(sortBars[j]);
              j++;
            }
          }

          for (; i <= mid; i++) {
            tempArr.push(sortBars[i]);
            //   tempArr[k++] = sortBars[i];
          }
          for (; j <= high; j++) {
            tempArr.push(sortBars[j]);
          }

          const frontArr = sortBars.slice(0, low);
          const backArr = sortBars.slice(high + 1, sortBars.length);
          const combinedArr = [...frontArr, ...tempArr, ...backArr];
          console.log(combinedArr);
          await new Promise((resolve) => {
            setTimeout(resolve, iteration * 1000);
            setFlag((prevState) => !prevState);
            setRenderedBars(sortBars);
          });
        }
      }
      // for odd length of array
      // if (p / 2 < sortBars.length) {
      //   merge(sortBars, 0, ~~(p / 2 - 1), sortBars.length);
      //   await new Promise((resolve) => {
      //     setTimeout(resolve, iteration * 1000);
      //     setFlag((prevState) => !prevState);
      //     setRenderedBars(sortBars);
      //   });
      // }
      if (isSorted(sortBars)) {
        sortBars.forEach((sortBar) => (sortBar.color = "#58ff58"));
        setRenderedBars(sortBars);
        completeArraySorting();
        return;
      }
    },
    [completeArraySorting]
  );

  useEffect(() => {
    if (isLoading) {
      BeginMergeSort(renderedBars, settings.iteration);
    }
  }, [
    isLoading,
    BeginMergeSort,
    renderedBars,
    settings.iteration,
    settings.length,
  ]);

  return (
    <React.Fragment>
      {flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
      {!flag && renderedBars.map((sortBar: SortBar) => sortBar.renderSortBar())}
    </React.Fragment>
  );
};

export default MergeSort;

// if (low < high) {
//   let mid = Math.floor((low + high) / 2);
//   await BeginMergeSort(sortBars, low, mid, iteration);
//   await BeginMergeSort(sortBars, mid + 1, high, iteration);
//   const tempMerged = merge(sortBars, low, mid, high);
//   await new Promise((resolve) => {
//     setTimeout(resolve, iteration * 1000);
//     setFlag((prevState) => !prevState);
//     setRenderedBars(sortBars);
//   });
// }

// recursive merge
// const merge = useCallback(function (left: SortBar[], right: SortBar[]) {
//   let tempArr: SortBar[] = [];
//   while (left.length && right.length) {
//     if (getValue(left[0]) < getValue(right[0])) {
//       tempArr.push(left.shift()!);
//     } else {
//       tempArr.push(right.shift()!);
//     }
//   }
//   return [...tempArr, ...left, ...right];
// }, []);

// if (start >= end - 1) return;
//       const mid = start + ~~((end - start) / 2); // Math.floor()
//       await BeginMergeSort(sortBars, start, mid, iteration);
//       await BeginMergeSort(sortBars, mid, end, iteration);

//       let cache = Array(end - start).fill(sortBars[0]);
//       let k = mid;

//       for (let i = start, r = 0; i < mid; r++, i++) {
//         while (k < end && getValue(sortBars[k]) < getValue(sortBars[i])) {
//           cache[r] = sortBars[k];
//           r++;
//           k++;
//         }
//         cache[r] = sortBars[i];
//       }
//       console.log(cache);
//       for (let i = 0; i < k - start; i++) {
//         sortBars[i + start] = cache[i];
//         await new Promise((resolve) => {
//           setTimeout(resolve, iteration * 1000);
//           setFlag((prevState) => !prevState);
//           setRenderedBars(sortBars);
//         });
//       }
