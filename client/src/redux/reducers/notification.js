const initialState = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { ...state, ...action.payload };
    case "CLEAR_NOTIFICATION":
      return action.payload;
    default:
      return state;
  }
};
export default notificationReducer;
