import React from "react";
import { makeStyles, Container } from "@material-ui/core/";
import LeftPaper from "./left";
import RightPaper from "./right";

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
