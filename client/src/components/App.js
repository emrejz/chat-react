import React, { Fragment, useEffect, useState } from "react";
import "../stylesheets/App.css";
import Header from "./Header.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignIn from "./pages/signIn/";
import SignUp from "./pages/signUp/";
import Chat from "./pages/chat";
import Home from "./pages/home";
import Loading from "./pages/loading";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import fart from "../assets/fart.mp3";
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
          <Route path="/loading" component={Loading} />
        </Switch>
        {user && user.user && user.user.username ? (
          <Redirect to="/chat" />
        ) : user && user.user && user.user.logged_in === false ? (
          <Redirect to="/" />
        ) : (
          <Redirect to="/loading" />
        )}
      </Fragment>
    </BrowserRouter>
  );
};
function App() {
  const dispatch = useDispatch();
  const [audio] = useState(new Audio(fart));
  const store = useSelector(state => state);
  const [newMsgUser, setNewMsgUser] = useState(null);
  const [connectedSocket, setConnectedSocket] = useState(false);
  useEffect(() => {
    console.log("useEffect");
    let { messageList, socket, user: thisUser } = store.socketReducer;
    if (thisUser && newMsgUser && thisUser.username !== newMsgUser.username) {
      console.log("audio");
      setNewMsgUser(null);
      audio.play();
    }
    if (store.signOutReducer.data && store.signOutReducer.data.status) {
      store.signOutReducer.data = {};
      dispatch(setSocket(null));
    }
    if (socket && connectedSocket) {
      setConnectedSocket(false);
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
        setNewMsgUser(user);
        messageList[roomName].push({ message, ...user });
        dispatch(roomMessages(messageList));
      });
    }
    if (
      !socket &&
      store.signOutReducer.data &&
      !store.signOutReducer.data.status
    ) {
      dispatch(
        setSocket(
          io(process.env.REACT_APP_PROD_SERVER_URL, {
            transports: ["websocket"]
          })
        )
      );
      setConnectedSocket(true);
    }
    if (
      (store.signInReducer.data && store.signInReducer.data.user) ||
      (store.signUpReducer.data && store.signUpReducer.data.user)
    ) {
      console.log("login logup");
      store.signOutReducer.data = {};
      store.signInReducer.data = {};
      store.signUpReducer.data = {};
      dispatch(setSocket(null));
    }
  });
  return <Root user={store.socketReducer.user} />;
}
export default App;
