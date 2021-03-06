import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core/";

import InputMessage from "./InputMessage";
import ChatPanel from "./ChatPanel";
import ButtonCustom from "../ButtonCustom";

export default function RightPaper() {
  const classes = useStyles();
  const { selectedRoom } = useSelector((state) => state.socketReducer);
  return (
    <Paper className={classes.paper}>
      <ButtonCustom signOut={true} />
      <div className={classes.namePanel}>
        {selectedRoom
          ? "Chat room name is " + selectedRoom
          : "No selected room!"}
      </div>
      <Paper className={classes.chatPanel}>
        <ChatPanel />
      </Paper>
      <InputMessage></InputMessage>
    </Paper>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0.2,
    backgroundColor: "yellow",
    marginTop: 20,
  },
  paper: {
    padding: 10,
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "white",
    position: "relative",
    height: "80vh",
  },
  namePanel: {
    height: "8vh",
    fontSize: 22,
    fontWeight: "600",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
  chatPanel: {
    height: "60vh",
  },
}));
