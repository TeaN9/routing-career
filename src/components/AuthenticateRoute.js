import React from "react";
import { useAuthenticationContext } from "../context/Auth";
import { Navigate, useLocation } from "react-router-dom";
import { appPaths } from "../Constant";

export const AuthenticateRoute = ({ children }) => {
  const { isLoggedIn } = useAuthenticationContext();
  const location = useLocation();
  if (!isLoggedIn) {
    return (
      <Navigate
        to={appPaths.signIn}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <>{children}</>;
};

// High Order Component
// export const withAuthentication = (Component) => {
//   return (props) => {
//     const { isLoggedIn } = useAuthenticationContext();

//     if (!isLoggedIn) {
//       return <Navigate to={appPaths.signIn} />;
//     }

//     return <Component {...props} />;
//   };
// };
