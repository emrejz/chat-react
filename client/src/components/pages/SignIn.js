import React, { useState } from "react";
import { TextField, Button, Container } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { signInActionLocal } from "../../actions/signAction";
const CssTextField = withStyles({
  root: {
    marginTop: 30,
    borderWidth: 3,
    backgroundColor: "white",
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
    minWidth: 200,
    flexWrap: "nowrap",
    flexDirection: "column"
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: 200,

    fontSize: 16,
    alignSelf: "center"
  }
});

const SignIn = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  const onSubmit = e => {
    e.preventDefault();

    dispatch(signInActionLocal({ email, password }));
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={e => onSubmit(e)} className={classes.root}>
        <CssTextField
          style={{ marginTop: 0 }}
          label="Enter email"
          variant="outlined"
          disabled={true}
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
        />
        <CssTextField
          disabled={true}
          label="Enter password"
          variant="outlined"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />

        <Button
          onClick={e => {
            //onSubmit(e)
          }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Not working yet
        </Button>
        <div style={{ textAlign: "center", marginBottom: 10, color: "white" }}>
          You can only enter with Google
        </div>
        {/* <div style={{ textAlign: "center", marginBottom: 10, color: "white" }}>
          OR
        </div> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a
            className={"googleButton"}
            href={process.env.REACT_APP_GOOGLE_REDIRECT_URL}
          >
            GOOGLE
          </a>
        </div>
      </form>
    </Container>
  );
};

export default SignIn;
