import React, { Component } from "react";
import Home from "./Home";
import Note from "./Note";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/note" exact component={Note} />
            <PrivateRoute path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
