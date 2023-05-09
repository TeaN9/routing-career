import { createContext, useState, useContext } from "react";

export const LogInStatusContext = createContext();

export const useAuthenticationContext = () => {
  const context = useContext(LogInStatusContext);

  if (!context) {
    throw new Error(
      "useAuthenticationContext should be wrapped AuthContextProvider"
    );
  }

  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogIn = (data) => {
    setUser(data);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <LogInStatusContext.Provider
      value={{
        isLoggedIn,
        user,
        handleLogIn,
        handleLogout,
      }}
    >
      {children}
    </LogInStatusContext.Provider>
  );
};
