import React, { useState, useEffect } from "react";
import { TextField, Button, Container } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import { signUpActionLocal } from "../../../actions/signAction";
import { setSocket } from "../../../actions/socketAction";

const CssTextField = withStyles({
  root: {
    marginTop: 30,
    borderWidth: 3,
    backgroundColor: "white",
    overFlow: "hidden",
    "& label.Mui-focused": {
      color: "green"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderWidth: 2,
        borderColor: "black"
      },
      "&.Mui-focused fieldset": {
        borderColor: "green"
      }
    }
  }
})(TextField);
const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(0,0,0,.3)",
    margin: "auto",
    // padding: 10,
    border: "2px solid white",
    borderRadius: 4,
    marginTop: "120px",
    display: "flex",
    width: "40vw",
    minWidth: "200px",
    flexWrap: "nowrap",
    flexDirection: "column"
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: 200,

    fontSize: 16,
    alignSelf: "center"
  },
  errorMessage: {
    color: "red",
    marginTop: "60px",
    textAlign: "center",
    marginBottom: "-86px",
    fontSize: "22px",
    fontFamily: "monospace"
  }
});

const SignIn = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const dispatch = useDispatch();
  const signUpReducer = useSelector(state => state.signUpReducer);
  const classes = useStyles();

  const onSubmit = e => {
    e.preventDefault();
    if (password === passwordC)
      dispatch(signUpActionLocal({ username, password }));
  };
  useEffect(() => {
    if (signUpReducer.data.user) dispatch(setSocket(null));
  }, [signUpReducer.data]);
  return (
    <Container maxWidth="sm">
      {signUpReducer.error.message || signUpReducer.data.error ? (
        <div className={classes.errorMessage}>
          {signUpReducer.error.message || signUpReducer.data.error}
        </div>
      ) : (
        ""
      )}
      <form
        onSubmit={e => onSubmit(e)}
        className={classes.root}
        disabled={true}
      >
        <CssTextField
          style={{ marginTop: 0 }}
          label="Enter username"
          variant="outlined"
          id="email"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
        />
        <CssTextField
          label="Enter password"
          variant="outlined"
          id="password"
          required
          error={password !== passwordC}
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
        <CssTextField
          label="Re-enter the password"
          variant="outlined"
          id="passwordC"
          required
          error={password !== passwordC}
          value={passwordC}
          onChange={e => setPasswordC(e.target.value)}
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          SIGN UP
        </Button>
      </form>
      <div
        style={{
          textAlign: "center",
          marginBottom: 10,
          marginTop: 14,
          color: "white"
        }}
      >
        OR
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <a
          className={"googleButton"}
          href={process.env.REACT_APP_GOOGLE_REDIRECT_URL}
        >
          GOOGLE
        </a>
      </div>
    </Container>
  );
};

export default SignIn;
