import React, { useEffect, createRef } from "react";
import { useSelector } from "react-redux";
import ListItemCustom from "./ListItemCustom";

export default function ChatPanel() {
  const { messageList, user, selectedRoom } = useSelector(
    state => state.socketReducer
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
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        flex: 1
      }}
      ref={ref}
    >
      {user &&
        messageList[selectedRoom] &&
        messageList[selectedRoom].map(item => {
          return item.username !== user.username ? (
            <ListItemCustom item={item} stranger={true} key={item.when} />
          ) : (
            <ListItemCustom item={item} stranger={false} key={item.when} />
          );
        })}
    </div>
  );
}
