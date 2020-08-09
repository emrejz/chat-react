const initState = {
  user: null,
  onlineList: [],
  messageList: {},
  roomList: [],
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
      return {
        ...state,
        messageList: { ...state.messageList, payload }
      };
    case "roomList":
      return { ...state, roomList: payload };
    case "selectedRoom":
      return { ...state, selectedRoom: payload };
    case "setSocket":
      return { ...state, socket: payload, user: null };
    case "roomMessages":
      return { ...state, messageList: payload };
    case "newRoom":
      return { ...state, roomList: [...state.roomList, payload] };
    default:
      return state;
  }
};
export default socketReducer;
