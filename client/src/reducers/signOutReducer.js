import {
  SIGNOUT_LOCAL_PENDING,
  SIGNOUT_LOCAL_FULFILLED,
  SIGNOUT_LOCAL_REJECTED
} from "../actions/signAction";
const initState = {
  data: {},
  error: {},
  fetching: false,
  fetched: false
};
const signOutReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SIGNOUT_LOCAL_PENDING:
      return {
        ...state,
        fetching: true
      };
    case SIGNOUT_LOCAL_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: payload
      };
    case SIGNOUT_LOCAL_REJECTED:
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
export default signOutReducer;
