import React, { useState } from "react";
import { TextField, Button, Container, Grid } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
//import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { signInAction } from "../../actions/signInAction";
const CssTextField = withStyles({
  root: {
    marginTop: 30,
    borderWidth: 3,
    backgroundColor: "inherit",
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
    marginLeft: 10,
    display: "flex",
    width: "40vw",
    minWidth: 120,
    flexWrap: "nowrap",
    flexDirection: "column",
    overflow: "hidden"
  },
  button: {
    margin: "20px"
  }
});

const SignIn = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const onSubmit = e => {
    e.preventDefault();
    console.log("emre");
    dispatch(signInAction({ email, password }));
  };
  return (
    <Container>
      <Grid container spacing={8}>
        <Grid item style={{ backgroundColor: "blue" }} xs={6}>
          <form onSubmit={e => onSubmit(e)} className={classes.root}>
            <CssTextField
              label="Enter email"
              variant="outlined"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
            />
            <CssTextField
              label="Enter password"
              variant="outlined"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
            <Button
              onClick={e => onSubmit(e)}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Primary
            </Button>
          </form>
        </Grid>

        <Grid item style={{ backgroundColor: "yellow" }} xs={6}>
          a
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;
