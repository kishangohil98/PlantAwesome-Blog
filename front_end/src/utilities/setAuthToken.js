import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["blog-token"] = token;
  } else {
    delete axios.defaults.headers.common["blog-token"];
  }
};

export default setAuthToken;
