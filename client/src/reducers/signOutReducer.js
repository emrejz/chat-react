import {
  SIGNOUT_ALL_PENDING,
  SIGNOUT_ALL_FULFILLED,
  SIGNOUT_ALL_REJECTED
} from "../actions/signAction";
const initState = {
  data: {},
  error: {},
  fetching: false,
  fetched: false
};
const signOutReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SIGNOUT_ALL_PENDING:
      return {
        ...initState,
        fetching: true
      };
    case SIGNOUT_ALL_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: payload
      };
    case SIGNOUT_ALL_REJECTED:
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
