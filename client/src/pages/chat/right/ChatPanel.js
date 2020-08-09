import React, { useEffect, createRef } from "react";
import { useSelector } from "react-redux";

import MessageListItem from "./MessageListItem";

export default function ChatPanel() {
  const { messageList, user, selectedRoom } = useSelector(
    (state) => state.socketReducer
  );
  const ref = createRef();
  const leng = messageList[selectedRoom]
    ? messageList[selectedRoom].length
    : null;
  const scrollToBottom = () => {
    ref.current.scrollTop = ref.current.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [leng]);
  return (
    <div
      style={{
        height: "60vh",
        backgroundColor: "#fbf9ed",
        overflow: "hidden",
      }}
    >
      <div
        className="scrollbar"
        id="style-13"
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
        ref={ref}
      >
        {user &&
          messageList[selectedRoom] &&
          messageList[selectedRoom].map((item) => {
            return item.username !== user.username ? (
              <MessageListItem item={item} stranger={true} key={item.when} />
            ) : (
              <MessageListItem item={item} stranger={false} key={item.when} />
            );
          })}
      </div>
    </div>
  );
}
