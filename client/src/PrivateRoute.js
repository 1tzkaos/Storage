import React from "react";
import { Route, Redirect } from "react-router-dom";

const crypto = require("crypto");

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      crypto
        .createHash("sha256")
        .update(localStorage.getItem("token"))
        .digest("hex") === localStorage.getItem("owner") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
