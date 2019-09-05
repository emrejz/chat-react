import React, { useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import io from "socket.io-client";
const Chat = () => {
  const socket = io("http://localhost:3001/");
  useEffect(() => {
    socket.emit("userLogin");
    socket.on("a", data => console.log(data));
  }, []);
  return (
    <div>
      <NavLink path={"http://localhost:3001/auth/google"} replace>
        aasfa
      </NavLink>
      <a href="http://localhost:3001/auth/google"> FAQ </a>
      />
    </div>
  );
};

export default Chat;
