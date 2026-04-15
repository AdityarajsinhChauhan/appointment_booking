import { createContext, useState } from "react";
import { logoutUser } from "../services/auth.service";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("user",JSON.stringify(user));
  }, [user])
  

  const login = (data) => {
    const payload = data.data
    localStorage.setItem("access_token", payload.access_token);
    localStorage.setItem("refresh_token", payload.refresh_token);

    localStorage.setItem("user", JSON.stringify(payload.user));

    setUser(payload.user);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,setUser,  login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
