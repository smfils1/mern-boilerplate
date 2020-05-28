const initialState = {
  maxPages: 0,
  logs: [],
  error: "",
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_HISTORY":
    case "HISTORY_UPDATE_ERROR":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default historyReducer;
