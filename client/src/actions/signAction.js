import axios from "axios";
export const SIGNIN_LOCAL_PENDING = "SIGNIN_LOCAL_PENDING";
export const SIGNIN_LOCAL_FULFILLED = "SIGNIN_LOCAL_FULFILLED";
export const SIGNIN_LOCAL_REJECTED = "SIGNIN_LOCAL_REJECTED";

export const SIGNUP_LOCAL_PENDING = "SIGNUP_LOCAL_PENDING";
export const SIGNUP_LOCAL_FULFILLED = "SIGNUP_LOCAL_FULFILLED";
export const SIGNUP_LOCAL_REJECTED = "SIGNUP_LOCAL_REJECTED";

const SIGNIN_LOCAL = "SIGNIN_LOCAL";
const SIGNUP_LOCAL = "SIGNUP_LOCAL";
const SIGNED_USER = "SIGNED_USER";
export const signInActionLocal = data => dispatch => {
  dispatch({
    type: SIGNIN_LOCAL,
    payload: axios.post("http://localhost:3001/signin", data)
  });
};

export const signUpActionLocal = data => dispatch => {
  dispatch({
    type: SIGNUP_LOCAL,
    payload: axios.post("http://localhost:3001/signup", data)
  });
};
export const signedUser = data => ({
  type: SIGNED_USER,
  payload: data
});
