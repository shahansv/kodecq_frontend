import { createContext, useEffect, useState } from "react";

export const userDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const saveUserData = (newUserData) => {
    localStorage.setItem("user", JSON.stringify(newUserData));
    setUserData(newUserData);
  };

  const saveTheme = (userTheme) => {
    localStorage.setItem("theme", userTheme);
    setTheme(userTheme);
  };

  return (
    <userDataContext.Provider
      value={{ userData, theme, saveUserData, saveTheme }}
    >
      {children}
    </userDataContext.Provider>
  );
};
