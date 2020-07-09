import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./layout/Home";
import Login from "./layout/Login";
import Notfound from "./layout/Notfound";
import Register from "./layout/Register";
import setAuthToken from "./utilities/setAuthToken";
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import Navigation from "./components/Navigation";
import PrivateRoute from "./routing/PrivateRoute";
import "./css/nav.css";
import PostBlog from "./components/PostBlog";
import Mycontent from "./components/Mycontent";
import AlertComponent from "./components/AlertComponent";

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <AlertComponent />
      <Router>
        <Navigation />

        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute exact path="/post-blog" component={PostBlog} />

          <PrivateRoute exact path="/my-content" component={Mycontent} />

          <Route component={Notfound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
