import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Container } from "@material-ui/core/";

export default function RightPaper() {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paper}>as</Paper>
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0.2,
    backgroundColor: "yellow",
    marginTop: 20
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "gray",
    height: "80vh"
  }
}));
