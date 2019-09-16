import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core/";
import LeftPaper from "./LeftPaper";

import RightPaper from "./RightPaper";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex: 1,
    flexWrap: "nowrap",
    backgroundColor: "black",
    marginTop: 20
  }
}));
export default function ChatContent() {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="lg">
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
