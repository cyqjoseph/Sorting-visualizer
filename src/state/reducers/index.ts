import { combineReducers } from "redux";
import sortArrayReducer from "./sortArrayReducer";
const rootReducer = combineReducers({
  sortArray: sortArrayReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
