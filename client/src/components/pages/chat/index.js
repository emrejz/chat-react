import React, { useEffect, useState } from "react";
import { withRouter, NavLink } from "react-router-dom";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { signedUser } from "../../../actions/signAction";
import ChatContent from "./ChatContent";
const Chat = ({ history }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const socket = io("http://localhost:3001/");
  useEffect(() => {
    socket.emit("userLogin");
    socket.on("a", data => {
      if (data.logged_in === false) {
        history.push("/signup");
      } else if (data._id) {
        setUser(data);
        dispatch(signedUser(data));
      }
    });
  }, []);
  const ChatPage = () => {
    if (user) return <ChatContent />;
    else return <div></div>;
  };
  return <ChatPage />;
};

export default withRouter(Chat);
