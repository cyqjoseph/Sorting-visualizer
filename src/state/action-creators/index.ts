import { ActionType } from "../action-types";
import { SortBar } from "../../models/SortBar";
import {
  Action,
  RandomizeAction,
  SortStartAction,
  SortCompleteAction,
} from "../actions";
import { Dispatch } from "react";
import { SortType } from "../../enums";
import { compare, isSorted, sleep } from "../../sorts/Helpers";
import { RootState } from "..";

export const randomize = function (length: number): RandomizeAction {
  return { type: ActionType.RANDOMIZE, payload: length }; //edit
};

export const startArraySorting = function (): SortStartAction {
  return {
    type: ActionType.SORT_START,
    payload: {
      loading: true,
    },
  };
};
export const completeArraySorting = function (): SortCompleteAction {
  console.log("Finished");
  return {
    type: ActionType.SORT_COMPLETE,
    payload: { loading: false }, // fix this
  };
};

export const pendingBubbleSorting = function (
  sortType: SortType,
  iFlag: number,
  jFlag: number
) {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    // Create an i, j flag
    const {
      sortArray: { data },
    } = getState();

    const len = data.length;

    while (iFlag <= len - 1) {
      const {
        sortArray: { data },
      } = getState();

      if (isSorted(data)) {
        break;
      }
      let tempData = data;
      if (jFlag >= len - iFlag - 1) {
        // Exit out of nested loop
        jFlag = 0;
        iFlag += 1;
      }
      if (compare(tempData[jFlag], tempData[jFlag + 1])) {
        // Swapping logic for bubble sort
        let temp: SortBar = tempData[jFlag];
        tempData[jFlag] = tempData[jFlag + 1];
        tempData[jFlag + 1] = temp;
        await new Promise((resolve) => {
          setTimeout(resolve, 1500);
          dispatch({
            type: ActionType.SORT_PENDING,
            payload: { sortType, data: tempData },
          });
        });
      }
      jFlag += 1;
    }
    completeArraySorting();
    dispatch({
      type: ActionType.SORT_COMPLETE,
      payload: { loading: false }, // fix this
    });
  };
};

export const renderBubbleSorting = function (
  sortType: SortType,
  data: SortBar[],
  iFlag: number,
  jFlag: number
) {
  pendingBubbleSorting(sortType, iFlag, jFlag);
  console.log("Render in BubbleSort Called");

  return {
    type: ActionType.SORT_RENDER,
    payload: { sortType, data },
  };
};
