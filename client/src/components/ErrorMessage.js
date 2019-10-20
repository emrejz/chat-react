import React from "react";
import { useSelector } from "react-redux";

const ErrorMessage = ({ signin, signup }) => {
  const store = useSelector(state => state);

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
        ? store.signInReducer.error.message || store.signInReducer.data.error
        : ""}
      {signup
        ? store.signUpReducer.error.message || store.signUpReducer.data.error
        : ""}
      {store.signSocialReducer.error.message ||
        store.signSocialReducer.data.error}
    </div>
  );
};
export default ErrorMessage;
