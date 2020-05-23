const initialState = {
  isAuth: false,
  message: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_AUTH":
    case "REQUEST_AUTH":
    case "CLEAR_AUTH_MESSAGE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default authReducer;
