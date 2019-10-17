import React, { Fragment, useEffect, useState } from "react";
import "../stylesheets/App.css";
import Header from "./Header.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignIn from "./pages/signIn/";
import SignUp from "./pages/signUp/";
import Chat from "./pages/chat";
import Home from "./pages/home";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import fart from "../assets/fart.mp3";
import { DotLoader } from "react-spinners";
import {
  getUser,
  onlineList,
  getRoomList,
  setSocket,
  roomMessages
} from "../actions/socketAction";

const Root = user => {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/signin" render={() => <SignIn />} />
          <Route path="/signup" render={() => <SignUp />} />
          <Route path="/chat" render={() => <Chat />} />
        </Switch>
        {user.user && user.user.username ? (
          <Redirect to="/chat" />
        ) : (
          <Redirect to="/" />
        )}
      </Fragment>
    </BrowserRouter>
  );
};
function App() {
  const dispatch = useDispatch();

  const [audio] = useState(new Audio(fart));
  const { messageList, socket, user: thisUser } = useSelector(
    state => state.socketReducer
  );
  const [newMsgUser, setNewMsgUser] = useState(null);
  useEffect(() => {
    if (thisUser && thisUser.username !== newMsgUser.username) {
      audio.play();
    }
  }, [newMsgUser]);

  useEffect(() => {
    if (socket) {
      socket.on("userInfo", data => {
        dispatch(getUser(data));
        if (data.logged_in === false) {
          socket.disconnect();
        }
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
        setNewMsgUser(user);

        messageList[roomName].push({ message, ...user });
        dispatch(roomMessages(messageList));
      });
    } else dispatch(setSocket(io(process.env.REACT_APP_PROD_SERVER_URL)));
  }, [socket]);
  return (
    <Fragment>
      {thisUser ? (
        <Root user={thisUser} />
      ) : (
        <div
          style={{
            width: "100%",
            marginTop: "200px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <DotLoader sizeUnit={"px"} size={120} color={"white"} />
        </div>
      )}
    </Fragment>
  );
}

export default App;
