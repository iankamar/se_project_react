import React, { createContext, useState, useContext } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};
