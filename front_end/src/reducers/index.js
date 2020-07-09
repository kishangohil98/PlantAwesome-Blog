import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";
import alert from "./alert";

export default combineReducers({
  auth,
  post,
  alert,
});
