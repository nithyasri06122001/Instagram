import { combineReducers } from "redux";
import { users } from "./users";

const Reducers = combineReducers({
  userState: users,
});

export default Reducers;
