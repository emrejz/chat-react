import axios from "axios";
export const SIGNIN_PENDING = "SIGNIN_PENDING";
export const SIGNIN_FULFILLED = "SIGNIN_FULFILLED";
export const SIGNIN_REJECTED = "SIGNIN_REJECTED";
const SIGNIN = "SIGNIN";
export const signInAction = data => dispatch => {
  dispatch({
    type: SIGNIN,
    payload: axios
      .post("http://localhost:3001/signin", data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  });
};
