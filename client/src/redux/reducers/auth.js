const initialState = {
  isAuth: false,
  message: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_REGISTRATION":
    case "REQUEST_LOGIN":
    case "REQUEST_AUTH":
    case "CLEAR_AUTH_MESSAGE":
    case "LOGOUT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default authReducer;
