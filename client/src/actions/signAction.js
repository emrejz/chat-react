import axios from "axios";

export const SIGNIN_LOCAL_PENDING = "SIGNIN_LOCAL_PENDING";
export const SIGNIN_LOCAL_FULFILLED = "SIGNIN_LOCAL_FULFILLED";
export const SIGNIN_LOCAL_REJECTED = "SIGNIN_LOCAL_REJECTED";

export const SIGNUP_LOCAL_PENDING = "SIGNUP_LOCAL_PENDING";
export const SIGNUP_LOCAL_FULFILLED = "SIGNUP_LOCAL_FULFILLED";
export const SIGNUP_LOCAL_REJECTED = "SIGNUP_LOCAL_REJECTED";

export const SIGNOUT_ALL_PENDING = "SIGNOUT_ALL_PENDING";
export const SIGNOUT_ALL_FULFILLED = "SIGNOUT_ALL_FULFILLED";
export const SIGNOUT_ALL_REJECTED = "SIGNOUT_ALL_REJECTED";

const SIGNIN_LOCAL = "SIGNIN_LOCAL";
const SIGNUP_LOCAL = "SIGNUP_LOCAL";
const SIGNOUT_ALL = "SIGNOUT_ALL";
const SIGN_GOOGLE = "SIGN_GOOGLE";
export const signInActionLocal = data => dispatch => {
  dispatch({
    type: SIGNIN_LOCAL,
    payload: axios
      .post(process.env.REACT_APP_PROD_SERVER_URL + "signin", data, {
        withCredentials: true
      })
      .then(res => res.data)
  });
};

export const signUpActionLocal = data => dispatch => {
  dispatch({
    type: SIGNUP_LOCAL,
    payload: axios
      .post(process.env.REACT_APP_PROD_SERVER_URL + "signup", data, {
        withCredentials: true
      })
      .then(res => res.data)
  });
};
export const signOutAction = () => dispatch => {
  dispatch({
    type: SIGNOUT_ALL,
    payload: axios
      .get(process.env.REACT_APP_PROD_SERVER_URL + "signout", {
        withCredentials: true
      })
      .then(res => res.data)
  });
};
export const signGoogleAction = accessToken => dispatch => {
  // TODO active this strategy
  dispatch({
    type: SIGN_GOOGLE,
    payload: axios
      .get(process.env.REACT_APP_PROD_SERVER_URL + "logout", accessToken, {
        withCredentials: true
      })
      .then(res => res.data)
  });
};
