import axios from "axios";
export const SIGNIN_LOCAL_PENDING = "SIGNIN_LOCAL_PENDING";
export const SIGNIN_LOCAL_FULFILLED = "SIGNIN_LOCAL_FULFILLED";
export const SIGNIN_LOCAL_REJECTED = "SIGNIN_LOCAL_REJECTED";

export const SIGNIN_GOOGLE_PENDING = "SIGNIN_GOOGLE_PENDING";
export const SIGNIN_GOOGLE_FULFILLED = "SIGNIN_GOOGLE_FULFILLED";
export const SIGNIN_GOOGLE_REJECTED = "SIGNIN_GOOGLE_REJECTED";

const SIGNIN_LOCAL = "SIGNIN_LOCAL";
const SIGNIN_GOOGLE = "SIGNIN_GOOGLE";
export const signInActionLocal = data => dispatch => {
  dispatch({
    type: SIGNIN_LOCAL,
    payload: axios.post("http://localhost:3001/signin", data)
  });
};

export const signInActionGoogle = access_token => dispatch => {
  console.log(access_token);
  dispatch({
    type: SIGNIN_GOOGLE,
    payload: axios.post("http://localhost:3001/auth/google", { access_token })
  });
};
