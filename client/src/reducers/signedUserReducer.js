const initState = {
  user: {}
};
const signedUserReducer = (state = initState, { payload }) => {
  return { ...state, user: payload };
};
export default signedUserReducer;
