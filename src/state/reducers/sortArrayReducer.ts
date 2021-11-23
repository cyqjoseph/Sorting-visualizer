import { Action } from "../actions";
import { ActionType } from "../action-types";
import { SortArray } from "../../models/SortArray";
import { SortBar } from "../../models/SortBar";
import { SortType } from "../../enums";
// import produce from "immer";
import { BubbleSort } from "../../sorts/Algorithms/BubbleSort";
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
      console.log("Started");
      return {
        ...state,
        loading: action.payload.loading,
        sortType: action.payload.sortType,
      };
    case ActionType.SORT_PENDING:
      const { data, sortType } = action.payload;
      switch (sortType) {
        case SortType.BUBBLE:
          console.log("Pending");
          const sortedArr = BubbleSort(data);
          return { ...state, data: sortedArr };
        default:
          return state;
      }
    // Mutate data here somehow?
    case ActionType.SORT_COMPLETE:
      console.log("Completed");
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
};

export default reducer;
