import { SET_ALERT, CLEAR_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
export const clearSnackbar = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_ALERT" });
  };
};
