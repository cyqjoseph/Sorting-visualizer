import { ActionType } from "../action-types";

import {
  RandomizeAction,
  SortStartAction,
  SortCompleteAction,
} from "../actions";

export const randomize = function (length: number): RandomizeAction {
  return { type: ActionType.RANDOMIZE, payload: length };
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
  return {
    type: ActionType.SORT_COMPLETE,
    payload: { loading: false }, // fix this
  };
};
