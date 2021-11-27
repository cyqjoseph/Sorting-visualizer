import { ActionType } from "../action-types";

export interface SortStartAction {
  type: ActionType.SORT_START;
  payload: {
    loading: true;
  };
}

export interface SortCompleteAction {
  type: ActionType.SORT_COMPLETE;
  payload: {
    loading: false;
  };
}
export interface RandomizeAction {
  type: ActionType.RANDOMIZE;
  payload: number;
}

export type Action = SortCompleteAction | SortStartAction | RandomizeAction;
