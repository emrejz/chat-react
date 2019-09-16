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
  const { messageList, user, socket } = useSelector(
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
      socket.on("roomMesasges", messages => {
        dispatch(roomMessages(Object.assign(messageList, messages)));
      });
      socket.on("onlineList", users => {
        dispatch(onlineList(users));
      });
      socket.on("newMessage", data => {
        const { message, roomName, user } = data;
        messageList[roomName].push({ message, ...user });
        dispatch(roomMessages(messageList));
      });
    } else dispatch(setSocket(io(process.env.REACT_APP_SOCKET_URL)));
  }, [socket]);
  if (user && user.username) {
    return <ChatContent />;
  } else if (user && !user.logged_in) return <Redirect to="/signup"></Redirect>;
  else return <div> </div>;
};

export default withRouter(Chat);
