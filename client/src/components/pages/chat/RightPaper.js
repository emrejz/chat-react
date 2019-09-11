import React from "react";
import InputMessage from "./InputMessage";
import ChatPanel from "./ChatPanel";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core/";

export default function RightPaper({ newMessage }) {
  const classes = useStyles();
  const { selectedRoom, getRoomMessages } = useSelector(
    state => state.socketReducer
  );
  return (
    <Paper className={classes.paper}>
      <div className={classes.namePanel}>
        {selectedRoom ? selectedRoom : "No selected room!"}
      </div>
      <Paper className={classes.chatPanel}>
        <ChatPanel getRoomMessages={getRoomMessages} />
      </Paper>
      <InputMessage newMessage={newMessage}></InputMessage>
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
