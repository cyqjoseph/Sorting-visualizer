import { ActionType } from "../action-types";
// import { SortBar } from "../../models/SortBar";
// import { SortArray } from "../../models/SortArray";
import {
  // SortCompleteAction,
  // SortPendingAction,
  // SortStartAction,
  // Action,
  RandomizeAction,
} from "../actions";

export const randomize = function (length: number): RandomizeAction {
  return { type: ActionType.RANDOMIZE, payload: length }; //edit

  // return function (dispatch: Dispatch<Action>) {
  //   dispatch({ type: ActionType.RANDOMIZE, payload: length });
  // };
};
