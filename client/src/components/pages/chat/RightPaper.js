import React from "react";
import InputMessage from "./InputMessage";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Container, TextField, Button } from "@material-ui/core/";

export default function RightPaper() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Paper className={classes.namePanel}>Room name</Paper>
      <Paper className={classes.chatPanel}>window</Paper>
      <InputMessage inputPanel={classes.inputPanel}></InputMessage>
    </Paper>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0.2,
    backgroundColor: "yellow",
    marginTop: 20
  },
  paper: {
    padding: 10,
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "white",
    height: "80vh"
  },
  namePanel: {
    height: "8vh"
  },
  chatPanel: {
    height: "60vh"
  },
  inputPanel: {
    marginTop: 16,
    height: "14vh"
  }
}));
