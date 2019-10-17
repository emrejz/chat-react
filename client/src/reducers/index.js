import { combineReducers } from "redux";
import signInReducer from "./signInReducer";
import signUpReducer from "./signUpReducer";
import signOutReducer from "./signOutReducer";
import socketReducer from "./socketReducer";
export default combineReducers({
  signInReducer,
  signUpReducer,
  socketReducer,
  signOutReducer
});
