import React from "react";
import HomePage from "../pages/HomePage.js";
import { Route, Routes, useLocation } from "react-router-dom";
import DetailPage from "../pages/DetailPage.js";
import SignInPage from "../pages/SignInPage.js";
import NotFound from "../components/NotFound.js";
import { AuthenticateRoute } from "../components/AuthenticateRoute.js";
import { appPaths } from "../Constant";

const AppRoutes = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Routes>
        <Route
          path={appPaths.home}
          element={<HomePage />}
          location={background || location}
        >
          <Route path={appPaths.signIn} element={<SignInPage />} />
          <Route
            path={appPaths.jobDetail}
            element={
              <AuthenticateRoute>
                <DetailPage />
              </AuthenticateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {background && (
        <Route
          path={appPaths.jobDetail}
          element={
            <AuthenticateRoute>
              <DetailPage />
            </AuthenticateRoute>
          }
        />
      )}
    </>
  );
};

export default AppRoutes;
