import React, { useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  onlineList,
  getRoomList,
  setSocket,
  roomMessages
} from "../../../actions/socketAction";
import ChatContent from "./ChatContent";
const Chat = ({ history }) => {
  const dispatch = useDispatch();
  const { user, selectedRoom, sendMesage, socket } = useSelector(
    state => state.socketReducer
  );

  useEffect(() => {
    if (socket) {
      socket.on("userInfo", data => {
        dispatch(getUser(data));
        socket.emit("newUser", data);
      });
      socket.on("roomList", data => dispatch(getRoomList(data)));
      socket.on("newRoom", data => {
        dispatch(getRoomList(data));
      });
      socket.on("roomMesasges", messages => dispatch(roomMessages(messages)));
      socket.on("onlineList", users => {
        dispatch(onlineList(users));
      });
    } else dispatch(setSocket(io("http://localhost:3001/")));
  }, [socket]);

  const newMessage = () => {
    socket.emit("newMessage", {
      roomName: selectedRoom,
      message: sendMesage,
      user
    });
    //  socket.on("roomMesasges", messages => dispatch(getMessageList(messages)));
  };

  if (user && user.username) {
    return <ChatContent newMessage={newMessage} />;
  } else if (user && !user.logged_in) return <Redirect to="/signup"></Redirect>;
  else return <div></div>;
};

export default withRouter(Chat);
