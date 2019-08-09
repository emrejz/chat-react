import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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
  const classes = useStyles();
  const signIn = () => {
    props.history.push("/signin");
  };
  const signUp = () => {
    props.history.push("/signup");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.title}>
            <Button onClick={() => signIn()} color="inherit">
              SIGN IN
            </Button>
            <Button onClick={() => signUp()} color="inherit">
              SIGN UP
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default withRouter(Header);
