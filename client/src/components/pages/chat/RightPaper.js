import React from "react";
import InputMessage from "./InputMessage";
import ChatPanel from "./ChatPanel";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Container, TextField, Button } from "@material-ui/core/";

export default function RightPaper({ socketData }) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.namePanel}>Room name</div>
      <Paper className={classes.chatPanel}>
        <ChatPanel socketData={socketData} />
      </Paper>
      <InputMessage></InputMessage>
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
  }
}));
