import { Action } from "../actions";
import { ActionType } from "../action-types";
import { SortArray } from "../../models/SortArray";
import { SortBar } from "../../models/SortBar";
// import produce from "immer";
interface SortArrayState {
  loading: boolean;
  data: SortBar[];
}

const initialState: SortArrayState = {
  loading: false,
  data: [],
};

const reducer = function (
  state: SortArrayState = initialState,
  action: Action
): SortArrayState {
  if (!state) {
    return initialState;
  }
  switch (action.type) {
    case ActionType.RANDOMIZE:
      return {
        ...state,
        data: new SortArray(action.payload).randomizeSortArray(),
      };
    case ActionType.SORT_START:
      return state;
    case ActionType.SORT_PENDING:
      return state;
    case ActionType.SORT_COMPLETE:
      return state;
    default:
      return state;
  }
};

export default reducer;
