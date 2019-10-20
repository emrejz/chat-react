import { combineReducers } from "redux";
import signInReducer from "./signInReducer";
import signUpReducer from "./signUpReducer";
import signOutReducer from "./signOutReducer";
import socketReducer from "./socketReducer";
import signInSocialReducer from "./signInSocialReducer";
export default combineReducers({
  signInReducer,
  signUpReducer,
  socketReducer,
  signOutReducer,
  signInSocialReducer
});
