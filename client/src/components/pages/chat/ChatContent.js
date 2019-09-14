import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core/";
import LeftPaper from "./LeftPaper";
import RightPaper from "./RightPaper";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0.2,
    backgroundColor: "yellow",
    marginTop: 20
  }
}));
export default function ChatContent() {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container={true}>
            <Grid item xs={3}>
              <LeftPaper />
            </Grid>
            <Grid item xs={9}>
              <RightPaper />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
