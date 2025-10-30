"use client";

import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  // Check authentication status
  const checkAuth = async () => {
    try {
      console.log("Checking authentication...");
      const response = await axios.get("/api/admin/verify");
      console.log("Auth check response:", response.data);

      if (response.data.authenticated) {
        console.log("User authenticated:", response.data.user);
        setUser(response.data.user);
        setAuthenticated(true);
      } else {
        console.log("User not authenticated");
        setUser(null);
        setAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      console.log("Auth check failed, user not authenticated");
      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      console.log("Sending login request...");
      const response = await axios.post("/api/admin/sign-in", {
        username,
        password,
      });

      console.log("Login response:", response.data);

      if (response.data.success) {
        console.log("Login successful, checking auth...");
        await checkAuth();
        console.log("Auth check completed");
        return { success: true };
      } else {
        return {
          success: false,
          error: response.data.error || "Login gagal",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.response?.data?.error || "Login gagal",
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/admin/logout");
      setUser(null);
      setAuthenticated(false);
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
      setAuthenticated(false);
      router.push("/sign-in");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    authenticated,
    loading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
