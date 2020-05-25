import React from "react";

import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  isPrivate = false,
  component: Component,
  ...props
}) => {
  const isAuth = false;
  return (
    <Route
      {...props}
      render={(props) => {
        if (isPrivate && isAuth) {
          return <Component {...props} />;
        } else if (isPrivate && !isAuth) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
