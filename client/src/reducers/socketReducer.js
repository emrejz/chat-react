const initState = {
  user: null,
  onlineList: [],
  messageList: [],
  roomList: [],
  sendMesage: null,
  selectedRoom: null,
  socket: null
};
const socketReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "user":
      return { ...state, user: payload };
    case "onlineList":
      return { ...state, onlineList: payload };
    case "messageList":
      return { ...state, messageList: payload };
    case "roomList":
      return { ...state, roomList: payload };
    case "selectedRoom":
      return { ...state, selectedRoom: payload };
    case "sendMesage":
      return { ...state, sendMesage: payload };
    case "setSocket":
      return { ...state, socket: payload };
    case "roomMessages":
      return { ...state, messageList: payload };
    default:
      return state;
  }
};
export default socketReducer;
