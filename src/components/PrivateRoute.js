import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "../utils/hooks";

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useAuthState();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default PrivateRoute;
