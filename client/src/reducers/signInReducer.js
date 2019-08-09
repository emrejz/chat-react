import {
  SIGNIN_PENDING,
  SIGNIN_FULFILLED,
  SIGNIN_REJECTED
} from "../actions/signInAction";
const initState = {
  signIn: {},
  error: {},
  fetching: false,
  fetched: false
};
const signInReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SIGNIN_PENDING:
      return {
        ...state,
        fetching: true
      };
    case SIGNIN_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        signIn: payload
      };
    case SIGNIN_REJECTED:
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
