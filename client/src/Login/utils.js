import { useHistory } from "react-router-dom";
import React from "react";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useHistory();

    return <Component navigate={history.push} {...props} />;
  };
  return Wrapper;
};
