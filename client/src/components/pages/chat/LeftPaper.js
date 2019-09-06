import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Container,
  Button,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Tabs,
  Tab
} from "@material-ui/core/";

export default function LeftPaper({ socketData }) {
  const classes = useStyles();
  const [tabID, setTabID] = React.useState(0);
  const [roomList, setRoomList] = React.useState([]);
  const [onlineList, setOnlineList] = React.useState([]);
  useEffect(() => {
    const { socket } = socketData.data;
    socket.on("firstConnect", data => setRoomList(data));
    socket.on("newRoom", data => {
      setRoomList(data);
    });
    socket.on("onlineList", users => {
      console.log(users);
      setOnlineList(users);
    });
  }, []);
  const addRoom = () => {
    let roomName = prompt("Enter room name.");
    if (roomName) {
      roomName = roomName.trim();
      if (roomName.length !== 0) {
        socketData.data.socket.emit("addRoom", roomName);
      }
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
                <React.Fragment>
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
                <React.Fragment>
                  <ListItem button onClick={() => alert(item.name)}>
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
          onClick={() => addRoom()}
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
