import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./useAuth";
import type { User } from "../types/userTypes";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const refreshAccessToken = async () => {
  try {
    await axios.post(
      `${apiUrl}/api/v1/auth/refresh-token`,
      {},
      { withCredentials: true }
    );
  } catch (err) {
    console.error("Error refreshing access token:", err);
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedUser && storedAuth === "true") {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("logoutFlag", "false");
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem(
      "lastChecked",
      Math.floor(Date.now() / 1000).toString()
    );
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("lastChecked");
    sessionStorage.removeItem("solutions");
    sessionStorage.removeItem("numbers");

    try {
      await axios.post(
        `${apiUrl}/api/v1/auth/signout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error("Error during logout:", err);
    }
    localStorage.setItem("logoutFlag", "true");
  };

  useEffect(() => {
    const logoutFlag = localStorage.getItem("logoutFlag");

    if (logoutFlag === "true") return;

    const lastChecked: number = localStorage.getItem("lastChecked")
      ? parseInt(localStorage.getItem("lastChecked")!)
      : 0;
    const currentTime: number = Math.floor(Date.now() / 1000);

    // refresh access token every 2 hours
    if (!lastChecked || currentTime - lastChecked >= 6900) {
      refreshAccessToken();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
