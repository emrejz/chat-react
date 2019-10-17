import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar
} from "@material-ui/core/";
import { useSelector, useDispatch } from "react-redux";
import { selectedRoom } from "../../../actions/socketAction";
import defaultImg from "../../../assets/uniSex.jpg";

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
                <div
                  style={{ position: "relative", height: "56px" }}
                  key={item.username}
                >
                  <ListItem className={classes.listItem} button>
                    <ListItemAvatar>
                      <Avatar
                        alt={item.username}
                        src={item.picture ? item.picture : defaultImg}
                      />
                    </ListItemAvatar>
                    <div>{item.username}</div>
                  </ListItem>
                </div>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {roomList.map(item => (
                <React.Fragment key={item.name}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "34px"
                    }}
                  >
                    <ListItem
                      className={classes.listItem}
                      button
                      onClick={() => selectRoomButton(item.name)}
                    >
                      <div>{item.name}</div>
                    </ListItem>
                  </div>
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
        </div>
        <div className={classes.addRoomBtnCont}>
          <Button
            className={classes.addRoomBtn}
            onClick={() => addRoomButton()}
            variant="outlined"
          >
            Add Room
          </Button>
        </div>
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
    borderRight: "1px solid grey",
    height: "80vh"
  },
  root: {
    marginTop: 20,
    overflowY: "auto",
    overflowX: "hidden",
    width: "100%",
    height: "63vh",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper
  },
  buttons: {
    margin: 4,
    padding: 2
  },
  addRoomBtn: {
    color: "green",
    padding: 2,
    marginRight: 10,
    borderColor: "green"
  },
  addRoomBtnCont: {
    position: "absolute ",
    bottom: "10px",
    width: "90%"
  },
  listItem: {
    transition: ".2s ease",
    borderBottom: "1px solid gray",
    zIndex: 10,
    borderBottom: "inset",
    "&:hover": {
      width: "auto !important",
      minWidth: "16% ",
      position: "fixed",
      textDecoration: "none",
      backgroundColor: "greenyellow",
      fontSize: "20px",
      transition: ".2s ease",
      borderRadius: "0px 20px 20px 0px",
      borderBottom: "none"
    }
  }
}));
