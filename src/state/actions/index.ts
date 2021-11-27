import { ActionType } from "../action-types";

export interface SortStartAction {
  type: ActionType.SORT_START;
  payload: {
    loading: boolean;
  };
}

export interface SortCompleteAction {
  type: ActionType.SORT_COMPLETE;
  payload: {
    loading: boolean;
  };
}
export interface RandomizeAction {
  type: ActionType.RANDOMIZE;
  payload: number;
}

export type Action = SortCompleteAction | SortStartAction | RandomizeAction;
