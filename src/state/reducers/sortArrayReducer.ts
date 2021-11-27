import { Action } from "../actions";
import { ActionType } from "../action-types";
import { SortArray } from "../../models/SortArray";
import { SortBar } from "../../models/SortBar";
import { SortType } from "../../enums";
// import produce from "immer";

interface SortArrayState {
  loading: boolean;
  data: SortBar[];
  sortType: SortType;
}

const initialState: SortArrayState = {
  loading: false,
  data: [],
  sortType: SortType.BUBBLE,
};

const reducer = function (
  state: SortArrayState = initialState,
  action: Action
): SortArrayState {
  switch (action.type) {
    case ActionType.RANDOMIZE:
      return {
        ...state,
        data: new SortArray(action.payload).randomizeSortArray(),
      };
    case ActionType.SORT_START:
      console.log("Started");
      return {
        ...state,
        loading: action.payload.loading,
      };
    case ActionType.SORT_COMPLETE:
      return { ...state, loading: action.payload.loading };

    default:
      return state;
  }
};

export default reducer;
