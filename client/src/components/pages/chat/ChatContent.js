import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core/";
import LeftPaper from "./LeftPaper";
import { signOutAction } from "../../../actions/signAction";
import { setSocket } from "../../../actions/socketAction";
import RightPaper from "./RightPaper";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex: 1,
    flexWrap: "nowrap",
    backgroundColor: "black",
    marginTop: 60
  },
  signOut: {
    position: "absolute",
    top: 10,
    right: 32
  }
}));
export default function ChatContent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const signOutFun = () => {
    signOutAction().then(res => {
      if (res.data.status) {
        dispatch(setSocket(null));
      }
    });
  };
  return (
    <div>
      <Container maxWidth="lg">
        <Button
          variant="outlined"
          color="secondary"
          className={classes.signOut}
          onClick={() => signOutFun()}
        >
          SIGN OUT
        </Button>
        <div className={classes.root}>
          {
            <div style={{ width: "20%", minWidth: 90 }}>
              <LeftPaper />
            </div>
          }
          <div style={{ flex: 1 }}>
            <RightPaper />
          </div>
        </div>
      </Container>
    </div>
  );
}
