import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Note from "./Note";

import Login from "./Login/Login";
import Register from "./Login/Register";
import TodoApp from "./toDo/toDo";
import LoadingPage from "./Loading/Loading.jsx";

import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
const crypto = require("crypto");

const App = () => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("hasLoaded")) {
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 3300);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 3300);
  }, []);

  if (loading && !loaded) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/note" exact component={Note} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/todo" component={TodoApp} />

          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
