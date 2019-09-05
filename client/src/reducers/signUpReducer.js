import {
  SIGNUP_LOCAL_PENDING,
  SIGNUP_LOCAL_FULFILLED,
  SIGNUP_LOCAL_REJECTED
} from "../actions/signAction";
const initState = {
  signUp: {},
  error: {},
  fetching: false,
  fetched: false
};
const signUpReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SIGNUP_LOCAL_PENDING:
      return {
        ...state,
        fetching: true
      };
    case SIGNUP_LOCAL_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        signIn: payload
      };
    case SIGNUP_LOCAL_REJECTED:
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: payload
      };
    default:
      return state;
  }
};
export default signUpReducer;
