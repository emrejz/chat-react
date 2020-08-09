import React from "react";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";

import { signGoogleAction } from "../store/actions/signAction";

const SignWithGoogle = () => {
  const dispatch = useDispatch();
  const responseGoogle = (res) => {
    let { profileObj } = res;
    if (profileObj) {
      dispatch(
        signGoogleAction({
          email: profileObj.email,
          picture: profileObj.imageUrl,
        })
      );
    }
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_PRD_GOOGLE_CLIEN_ID}
      buttonText="GOOGLE"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};
export default SignWithGoogle;
