import {
  LOGIN,
  SAVE_USER_DATA,
  // USER_PERSONAL_DATA,
  LOGOUT,
  ADD_WALLET,
  REMOVE_WALLET,
  DELETE_USER_DATA,
  DELETE_TIME,
  SAVE_TIME,
  // SAVE_ETH,
  // DELETE_ETH,
} from "./userDefinedActions";

export const LoginUser = (email, userName, password,signature) => async (dispatch) => {
  dispatch({ type: LOGIN, payload: { email, userName, password, signature } });
};
export const LogoutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
export const addWallet = (wallet_info) => async (dispatch) => {
  dispatch({ type: ADD_WALLET, payload: { wallet_info } });
};
export const saveUserData = (avatar) => async (dispatch) => {
  dispatch({ type: SAVE_USER_DATA, payload: { avatar } });
};
export const deleteUserData = (avatar) => async (dispatch) => {
  dispatch({ type: DELETE_USER_DATA });
};
export const SaveTime = (time) => async (dispatch) => {
  dispatch({
    type: SAVE_TIME,
    payload: { time },
  });
};
export const DeleteTime = () => async (dispatch) => {
  dispatch({
    type: DELETE_TIME,
  });
};

export const removeWallet = () => async (dispatch) => {
  dispatch({ type: REMOVE_WALLET });
};
