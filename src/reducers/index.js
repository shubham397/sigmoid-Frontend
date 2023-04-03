import currentUser from "./currentUser";
import { combineReducers } from "redux";
import { tableData, barData, pieData } from "./data";

const rootReducer = combineReducers({
  currentUser,
  tableData,
  barData,
  pieData,
});

export default rootReducer;
