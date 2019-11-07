import React, { Fragment, useEffect, useState } from "react";
import "../stylesheets/App.css";
import Header from "./Header.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignIn from "./pages/signIn/";
import SignUp from "./pages/signUp/";
import Chat from "./pages/chat/";
import Home from "./pages/home";
import Loading from "./pages/loading";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import msgNotification from "../assets/msgNotification.mp3";
import {
  getUser,
  onlineList,
  getRoomList,
  setSocket,
  roomMessages,
  newRoom
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
  const [audio] = useState(new Audio(msgNotification));
  const store = useSelector(state => state);
  const [newMsgUser, setNewMsgUser] = useState(null);
  const [connectedSocket, setConnectedSocket] = useState(false);

  useEffect(() => {
    let { messageList, socket, user: thisUser } = store.socketReducer;
    if (thisUser && newMsgUser && thisUser.username !== newMsgUser.username) {
      setNewMsgUser(null);
      audio.play();
    }
    if (store.signOutReducer.data && store.signOutReducer.data.status) {
      store.signOutReducer.data = {};
      socket.disconnect();
      dispatch(setSocket(null));
    }
    if (socket && connectedSocket) {
      socket.emit("startEvent");
      socket.on("userInfo", data => {
        dispatch(getUser(data));
        socket.emit("newUser", data);
      });
      socket.on("roomList", data => dispatch(getRoomList(data)));
      socket.on("newRoom", data => {
        dispatch(newRoom(data));
      });
      socket.on("roomMesasges", messages => {
        dispatch(roomMessages(Object.assign(messageList, messages)));
      });
      socket.on("onlineList", users => {
        dispatch(onlineList(users));
      });
      socket.on("newMessage", data => {
        const { message, roomName, user } = data;
        if (!newMsgUser) {
          setNewMsgUser(user);
        }
        messageList[roomName].push({ message, ...user });
        dispatch(roomMessages(messageList));
      });
      setConnectedSocket(false);
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
          }).emit("startEmit")
        )
      );
      setConnectedSocket(true);
    }
    if (
      (store.signInReducer.data && store.signInReducer.data.user) ||
      (store.signUpReducer.data && store.signUpReducer.data.user) ||
      (store.signSocialReducer.data && store.signSocialReducer.data.user)
    ) {
      store.signInReducer.data = {};
      store.signUpReducer.data = {};
      store.signSocialReducer.data = {};
      dispatch(setSocket(null));
    }
  });

  return <Root user={store.socketReducer.user} />;
}
export default App;
