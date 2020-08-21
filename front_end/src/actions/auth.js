import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_POST,
} from "../actions/types";
import setAuthToken from "../utilities/setAuthToken";
import { setAlert } from "../actions/alert";
//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
  }
};

//Register User
export const register = ({ firstname, lastname, email, password }) => async (
  dispatch
) => {
  console.log("Auth Action called");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ firstname, lastname, email, password });

  try {
    const res = await axios.post("/api/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
    dispatch(setAlert("Registeration Successful", "success"));
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err,
    });
    dispatch(setAlert("Registration Fail", "danger"));
  }
};

//Login User
export const login = (email, password) => async (dispatch) => {
  console.log("Auth Action called");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setAlert("Login Successful", "success"));
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err,
    });
    dispatch(setAlert("Please enter Registered Email & Password", "danger"));
    console.log(err);
  }
};

//log out user
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_POST });
  dispatch({ type: LOGOUT });
};
