import React, { Component } from "react";
import Home from "./Home";
import Note from "./Note";

import Login from "./Login/Login";
import Register from "./Login/Register";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/note" exact component={Note} />
            <Route path="/login" component={Login} />
            <Route path="/register" element={Register} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
