export const getUser = user => {
  return {
    type: "user",
    payload: user
  };
};
export const getRoomList = rooms => {
  return {
    type: "roomList",
    payload: rooms
  };
};
export const getMessageList = messages => {
  return {
    type: "messageList",
    payload: messages
  };
};
export const onlineList = users => {
  return {
    type: "onlineList",
    payload: users
  };
};
export const selectedRoom = room => {
  return {
    type: "selectedRoom",
    payload: room
  };
};

export const setSocket = socket => {
  return {
    type: "setSocket",
    payload: socket
  };
};
export const roomMessages = messages => {
  return {
    type: "roomMessages",
    payload: messages
  };
};
