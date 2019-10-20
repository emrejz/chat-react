import {
  SIGNIN_SOCIAL_PENDING,
  SIGNIN_SOCIAL_FULFILLED,
  SIGNIN_SOCIAL_REJECTED
} from "../actions/signAction";
const initState = {
  data: {},
  error: {},
  fetching: false,
  fetched: false
};
const signSocialReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SIGNIN_SOCIAL_PENDING:
      return {
        ...state,
        fetching: true
      };
    case SIGNIN_SOCIAL_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: payload
      };
    case SIGNIN_SOCIAL_REJECTED:
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
export default signSocialReducer;
