import React from "react";
import { useSelector } from "react-redux";

const ErrorMessage = ({ signin, signup }) => {
  const store = useSelector(state => state);
  let {
    signInReducer: { error: signInError, data: signInData },
    signUpReducer: { error: signUpError, data: signUpData },
    signSocialReducer: { error: signSocialError, data: signSocialData }
  } = store;
  return (
    <div
      style={{
        color: "red",
        width: "100%",
        textAlign: "center",
        marginTop: "20px",
        fontSize: "22px",
        fontFamily: "monospace"
      }}
    >
      {signin
        ? signInError.message || (signInData.error && signInData.error.message)
        : ""}
      {signup
        ? signUpError.message || (signUpData.error && signUpData.error.message)
        : ""}
      {signSocialError.message ||
        (signSocialData.error && signSocialData.error.message)}
    </div>
  );
};
export default ErrorMessage;
