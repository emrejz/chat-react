import React from "react";
import { makeStyles, Button } from "@material-ui/core/";
import { useSelector, useDispatch } from "react-redux";

import { signOutAction } from "../../store/actions/signAction";

const SignOutButton = ({ online, rooms, addRoom, signOut, setTabID }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socketReducer);
  const addRoomButton = () => {
    let roomName = prompt("Enter room name.");
    if (roomName) {
      roomName = roomName.trim();
      if (roomName.length !== 0) {
        socket.emit("addRoom", roomName);
      }
    }
  };
  const signOutFun = () => {
    dispatch(signOutAction());
    window.location.reload();
  };
  return (
    <React.Fragment>
      {online && (
        <Button
          variant="outlined"
          color="primary"
          className={classes.buttons}
          onClick={() => setTabID(0)}
        >
          ONLINE
        </Button>
      )}
      {rooms && (
        <Button
          variant="outlined"
          color="secondary"
          className={classes.buttons}
          onClick={() => setTabID(1)}
        >
          ROOMS
        </Button>
      )}
      {addRoom && (
        <Button
          variant="outlined"
          className={classes.addRoomBtn}
          onClick={() => addRoomButton()}
        >
          ADD ROOM
        </Button>
      )}
      {signOut && (
        <Button
          variant="outlined"
          color="secondary"
          className={classes.signOut}
          onClick={() => signOutFun()}
        >
          SIGN OUT
        </Button>
      )}
    </React.Fragment>
  );
};
const useStyles = makeStyles((theme) => ({
  signOut: {
    position: "absolute",
    top: "-50px",
    right: 0,
  },
  buttons: {
    margin: 4,
    padding: 2,
  },
  addRoomBtn: {
    color: "green",
    padding: 2,
    marginRight: 10,
    borderColor: "green",
  },
}));
export default SignOutButton;
