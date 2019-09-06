import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core/";
import LeftPaper from "./LeftPaper";
import RightPaper from "./RightPaper";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0.2,
    backgroundColor: "yellow",
    marginTop: 20
  }
}));
export default function ChatContent({ user }) {
  const classes = useStyles();
  const socketData = useSelector(state => state.signedUserReducer);

  return (
    <div>
      {socketData && socketData.data && (
        <Container maxWidth="lg">
          <div className={classes.root}>
            <Grid container={true}>
              <Grid item xs={3}>
                <LeftPaper socketData={socketData} />
              </Grid>
              <Grid item xs={9}>
                <RightPaper socketData={socketData} />
              </Grid>
            </Grid>
          </div>
        </Container>
      )}
    </div>
  );
}
