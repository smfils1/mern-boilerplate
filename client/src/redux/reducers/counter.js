const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;
    case "SET_COUNTER":
      return action.payload;
    default:
      return state;
  }
};

export default counterReducer;
