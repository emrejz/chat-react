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

export const SIGNIN_SOCIAL_PENDING = "SIGNIN_SOCIAL_PENDING";
export const SIGNIN_SOCIAL_FULFILLED = "SIGNIN_SOCIAL_FULFILLED";
export const SIGNIN_SOCIAL_REJECTED = "SIGNIN_SOCIAL_REJECTED";

const SIGNIN_LOCAL = "SIGNIN_LOCAL";
const SIGNUP_LOCAL = "SIGNUP_LOCAL";
const SIGNOUT_ALL = "SIGNOUT_ALL";
const SIGNIN_SOCIAL = "SIGNIN_SOCIAL";
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
export const signGoogleAction = user => dispatch => {
  dispatch({
    type: SIGNIN_SOCIAL,
    payload: axios
      .post(process.env.REACT_APP_PROD_SERVER_URL + "isSocial", user, {
        withCredentials: true
      })
      .then(res => res.data)
  });
};
