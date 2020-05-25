const initialState = {
  username: "Guest",
  email: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;
