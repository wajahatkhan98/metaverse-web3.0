import {
  ADD_WALLET,
  REMOVE_WALLET,
  LOGIN,
  LOGOUT,
  SAVE_USER_DATA,
  DELETE_USER_DATA,
  SAVE_TIME,
  DELETE_TIME,
} from "./userDefinedActions";
const states = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          email: action.payload.email,
          userName: action.payload.userName,
          signature: action.payload.signature
        },
      };
    case LOGOUT: {
      delete state["user"];
      return { ...state };
    }

    case ADD_WALLET:
      return { ...state, wallet_info: action.payload.wallet_info };
    case REMOVE_WALLET:
      delete state["wallet_info"];
      return { ...state };
    case SAVE_TIME:
      console.log("save time ", action.payload.time);
      return { ...state, loginTime: action.payload.time };
    case DELETE_TIME:
      delete state["loginTime"];
      return { ...state };

    case SAVE_USER_DATA:
      return {
        ...state,
        avatar: action.payload.avatar,
      };
    case DELETE_USER_DATA:
      return {
        ...state,
        avatar: "",
      };

    default:
      return state;
  }
};

export default states;
