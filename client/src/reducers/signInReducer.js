import {
  SIGNIN_LOCAL_PENDING,
  SIGNIN_LOCAL_FULFILLED,
  SIGNIN_LOCAL_REJECTED
} from "../actions/signInAction";
const initState = {
  signIn: {},
  error: {},
  fetching: false,
  fetched: false
};
const signInReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SIGNIN_LOCAL_PENDING:
      return {
        ...state,
        fetching: true
      };
    case SIGNIN_LOCAL_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        signIn: payload
      };
    case SIGNIN_LOCAL_REJECTED:
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
export default signInReducer;
