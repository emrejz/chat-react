import { combineReducers } from "redux";
import signInReducer from "./signInReducer";
import signUpReducer from "./signUpReducer";
import signedUserReducer from "./signedUserReducer";
export default combineReducers({
  signInReducer,
  signUpReducer,
  signedUserReducer
});
