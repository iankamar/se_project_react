import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ isLoggedIn, children, ...props }) {
  return (
    <Route {...props}>{isLoggedIn ? children : <Redirect to={"/"} />}</Route>
  );
}

export default PrivateRoute;
