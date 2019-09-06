const initState = {
  data: {}
};
const signedUserReducer = (state = initState, { payload }) => {
  return { ...state, data: payload };
};
export default signedUserReducer;
