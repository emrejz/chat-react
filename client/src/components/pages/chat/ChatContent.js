import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core/";
import LeftPaper from "./LeftPaper";
import { useCookies } from "react-cookie";

import RightPaper from "./RightPaper";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex: 1,
    flexWrap: "nowrap",
    backgroundColor: "black",
    marginTop: 60
  }
}));
export default function ChatContent() {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <div>
      <Container maxWidth="lg">
        <button onClick={() => removeCookie("connect.sid")}>del</button>
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
