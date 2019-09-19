import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { getUser } from "../actions/socketAction";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background:
      "linear-gradient(225deg, rgba(34,193,195,1) 0%, rgba(253,45,105,1) 100%) !important"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    position: "absolute",
    right: 18
  }
}));

const Header = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { user } = useSelector(state => state.socketReducer);
  const signIn = () => {
    props.history.push("/signin");
  };
  const signUp = () => {
    props.history.push("/signup");
  };
  // const signOut = () => {
  //   document.cookie = "connect.sid" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  //   dispatch(getUser(""));
  //   props.history.push("/signin");
  // };

  return (
    <React.Fragment>
      {!user || user.logged_in == false ? (
        <AppBar className={classes.root} position="static">
          <Toolbar>
            <div className={classes.title}>
              <React.Fragment>
                <Button onClick={() => signIn()} color="inherit">
                  SIGN IN
                </Button>
                <Button onClick={() => signUp()} color="inherit">
                  SIGN UP
                </Button>
              </React.Fragment>
            </div>
          </Toolbar>
        </AppBar>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
};
export default withRouter(Header);
