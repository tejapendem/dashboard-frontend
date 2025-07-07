import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });
      const { access, refresh } = res.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      setUser(jwtDecode(access));
      return true;
    } catch (err) {
      console.error("Login failed", err.response?.data || err.message);
      return false;
    }
  };

  const signup = async (username, email, password) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/signup/", {
        username,
        email,
        password,
      });
      return await login(username, password);
    } catch (err) {
      console.error("Signup failed", err.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  const checkToken = useCallback(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
