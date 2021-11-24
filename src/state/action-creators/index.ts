import { ActionType } from "../action-types";
import { SortBar } from "../../models/SortBar";
import { Action, RandomizeAction } from "../actions";
import { Dispatch } from "react";
import { SortType } from "../../enums";
import { BubbleSort } from "../../sorts";
import { isSorted } from "../../sorts/Helpers";
export const randomize = function (length: number): RandomizeAction {
  return { type: ActionType.RANDOMIZE, payload: length }; //edit
};

export const startArraySorting = function (sortType: SortType) {
  return {
    type: ActionType.SORT_START,
    payload: {
      loading: true,
      sortType,
    },
  };
};

export const pendingArraySorting = function (
  sortType: SortType,
  data: SortBar[]
) {
  // Check if array sorted
  if (isSorted(data)) {
    completeArraySorting();
  } else {
    console.log("Call to render");
    renderArraySorting(sortType, data);
  }

  // If array sorted dispatch complete array
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SORT_RENDER,
      payload: { sortType, data },
    }); //dispatch in sort
  };
};

export const renderArraySorting = function (
  sortType: SortType,
  data: SortBar[]
) {
  const sorted = BubbleSort(data);
  console.log("Call back to pending");
  pendingArraySorting(sortType, data);
  return {
    type: ActionType.SORT_PENDING,
    payload: { sortType, data: sorted },
  };
};

export const completeArraySorting = function () {
  console.log("Finished");
  return {
    type: ActionType.SORT_COMPLETE,
    payload: { loading: false },
  };
};
