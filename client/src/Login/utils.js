import { useHistory } from "react-router-dom";
import React from "react";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useHistory();
    return <Component navigate={navigate} {...props} />;
  };
  return Wrapper;
};
