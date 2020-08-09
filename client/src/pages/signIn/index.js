import React, { useState } from "react";
import { TextField, Button, Container } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

import { signInActionLocal } from "../../store/actions/signAction";
import SignWithGoogle from "../../components/SignWithGoogle";
import ErrorMessage from "../../components/ErrorMessage";

const SignIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const onSubmit = (e) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0) {
      dispatch(
        signInActionLocal({
          username,
          password,
        })
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={(e) => onSubmit(e)} className={classes.root}>
        <CssTextField
          style={{ marginTop: 0 }}
          label="Enter username"
          variant="outlined"
          required
          id="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <CssTextField
          label="Enter password"
          variant="outlined"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          SIGN IN
        </Button>
      </form>
      <div
        style={{
          textAlign: "center",
          marginBottom: 10,
          marginTop: 14,
          color: "white",
        }}
      >
        OR
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SignWithGoogle />
      </div>
      <ErrorMessage signin={true} />
    </Container>
  );
};

export default SignIn;

const CssTextField = withStyles({
  root: {
    marginTop: 30,
    borderWidth: 3,
    backgroundColor: "white",
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderWidth: 2,
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);
const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(0,0,0,.3)",
    margin: "auto",
    // padding: 10,
    border: "2px solid white",
    borderRadius: 4,
    marginTop: "90px",
    display: "flex",
    width: "40vw",
    minWidth: 200,
    flexWrap: "nowrap",
    flexDirection: "column",
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: 200,

    fontSize: 16,
    alignSelf: "center",
  },
});
