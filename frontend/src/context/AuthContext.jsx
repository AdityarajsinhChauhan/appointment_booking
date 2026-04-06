import { createContext, useState } from "react";
import { logoutUser } from "../services/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

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
      console.error("Logout API failed");
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
