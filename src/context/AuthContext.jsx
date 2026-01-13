import { createContext, useState } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.clear();
    setToken(null);
  };

  return (
    <authContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </authContext.Provider>
  );
};
