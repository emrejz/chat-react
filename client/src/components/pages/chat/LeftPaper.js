import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider
} from "@material-ui/core/";
import { useSelector, useDispatch } from "react-redux";
import { selectedRoom } from "../../../actions/socketAction";

export default function LeftPaper() {
  const classes = useStyles();
  const [tabID, setTabID] = React.useState(0);
  const dispatch = useDispatch();
  const { messageList, roomList, onlineList, socket } = useSelector(
    state => state.socketReducer
  );

  const addRoomButton = () => {
    let roomName = prompt("Enter room name.");
    if (roomName) {
      roomName = roomName.trim();
      if (roomName.length !== 0) {
        socket.emit("addRoom", roomName);
      }
    }
  };
  const selectRoomButton = name => {
    dispatch(selectedRoom(name));
    if (!messageList.hasOwnProperty(name)) {
      socket.emit("roomMessages", name);
    }
  };
  return (
    <div>
      <Paper className={classes.paper}>
        <Button
          onClick={() => setTabID(0)}
          className={classes.buttons}
          variant="outlined"
          color="primary"
        >
          Online
        </Button>
        <Button
          onClick={() => setTabID(1)}
          className={classes.buttons}
          variant="outlined"
          color="secondary"
        >
          Rooms
        </Button>
        <div className={classes.root}>
          {tabID === 0 ? (
            <React.Fragment>
              {onlineList.map(item => (
                <React.Fragment key={item.username}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar alt={item.username} src={item.picture} />
                    </ListItemAvatar>

                    <div>{item.username}</div>
                  </ListItem>
                  <Divider variant="fullWidth" />
                </React.Fragment>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {roomList.map(item => (
                <React.Fragment key={item.name}>
                  <ListItem button onClick={() => selectRoomButton(item.name)}>
                    <div>{item.name}</div>
                  </ListItem>
                  <Divider variant="fullWidth" />
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
        </div>
        <Button
          className={classes.addRoomBtn}
          onClick={() => addRoomButton()}
          variant="outlined"
        >
          Add Room
        </Button>
      </Paper>
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  paper: {
    position: "relative",
    padding: 10,
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRight: "1px solid black",
    height: "80vh"
  },
  root: {
    marginTop: 20,
    overflowY: "auto",
    width: "100%",
    height: "63vh",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper
  },
  buttons: {
    margin: 4
  },
  addRoomBtn: {
    position: "absolute ",
    bottom: "10px",
    left: "55px",
    color: "green",
    borderColor: "green"
  }
}));
