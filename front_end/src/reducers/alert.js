import { SET_ALERT, CLEAR_ALERT } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        successSnackbarOpen: true,
        msg: payload.msg,
        alertType: payload.alertType,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        successSnackbarOpen: false,
        errorSnackbarOpen: false,
        infoSnackbarOpen: false,
      };
    default:
      return state;
  }
}
