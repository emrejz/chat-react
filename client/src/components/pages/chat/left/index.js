import React from "react";
import { makeStyles, Paper } from "@material-ui/core/";
import { useSelector, useDispatch } from "react-redux";
import { selectedRoom } from "../../../../actions/socketAction";
import ButtonCustom from "../ButtonCustom";
import OnlineUserItem from "./OnlineUserItem";
import RoomItem from "./RoomItem";
export default function LeftPaper() {
  const classes = useStyles();
  const [tabID, setTabID] = React.useState(0);
  const dispatch = useDispatch();
  const { messageList, roomList, onlineList, socket } = useSelector(
    state => state.socketReducer
  );

  const selectRoomButton = name => {
    dispatch(selectedRoom(name));
    if (!messageList.hasOwnProperty(name)) {
      socket.emit("roomMessages", name);
    }
  };
  return (
    <div>
      <Paper className={classes.paper}>
        <ButtonCustom online={true} setTabID={setTabID} />
        <ButtonCustom rooms={true} setTabID={setTabID} />
        <div className={classes.root}>
          {tabID === 0 ? (
            <React.Fragment>
              {onlineList.map(item => (
                <OnlineUserItem item={item} key={item.username} />
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {roomList.map(item => (
                <RoomItem
                  item={item}
                  key={item.name}
                  selectRoomButton={selectRoomButton}
                />
              ))}
            </React.Fragment>
          )}
        </div>
        <div className={classes.addRoomBtnCont}>
          <ButtonCustom addRoom={true} />
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
  addRoomBtnCont: {
    position: "absolute ",
    bottom: "10px",
    width: "90%"
  }
}));
