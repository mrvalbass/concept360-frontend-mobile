// authReducer.js
const initialState = {
  isLoggedIn: false,
  user: null,
  //token: null,
  error: null,
  photo: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        photo: action.payload.photo,
        //token: action.payload.token,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        photo: "",
        //token: null,
        error: action.payload.error,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        photo: "",
        //token: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
