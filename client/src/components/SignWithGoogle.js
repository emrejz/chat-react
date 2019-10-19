import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
const SignWithGoogle = () => {
  const responseGoogle = res => {
    let { profileObj } = res;
    if (profileObj) {
      axios
        .post(
          "http://localhost:3001/isSocial",
          {
            email: profileObj.email,
            picture: profileObj.imageUrl
          },
          { withCredentials: true }
        )
        .then(res => console.log(res));
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
