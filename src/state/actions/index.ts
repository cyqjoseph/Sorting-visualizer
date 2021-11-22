import { ActionType } from "../action-types";
import { SortType } from "../../enums";

export interface SortStartAction {
  type: ActionType.SORT_START;
  payload: {
    loading: boolean;
    sortType: SortType;
  };
}

export interface SortPendingAction {
  type: ActionType.SORT_PENDING;
  payload: {};
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

export type Action =
  | SortCompleteAction
  | SortPendingAction
  | SortStartAction
  | RandomizeAction;
