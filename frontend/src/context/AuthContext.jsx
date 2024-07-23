// src/AuthContext.js

import React, { createContext, useReducer, useContext, useEffect } from "react";

// Inisialisasi state awal dari localStorage jika ada
const initialState = () => {
  const storedAuthState = localStorage.getItem("authState");
  return storedAuthState
    ? JSON.parse(storedAuthState)
    : {
        isLoggedIn: false,
        admin: null,
        error: null,
      };
};

// Membuat context untuk user
export const AuthContext = createContext();

// Action types untuk reducer
const actionTypes = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
};

// Reducer untuk mengelola state user
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        admin: action.payload,
        error: null,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        admin: null,
        error: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        admin: null,
        error: null,
      };
    default:
      return state;
  }
};

// Komponen provider untuk user context
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, initialState);

  // Efek untuk memuat data autentikasi dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedAuthState = localStorage.getItem("authState");
    if (storedAuthState) {
      try {
        const parsedAuthState = JSON.parse(storedAuthState);
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: parsedAuthState.admin, // Update disini untuk sesuai dengan struktur authState
        });
      } catch (error) {
        console.error("Failed to parse authState:", error);
      }
    }
  }, []);

  // Efek untuk menyimpan data autentikasi ke localStorage saat terjadi perubahan
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  const login = async (username, password) => {
    const data = { username, password };
    try {
      const response = await fetch("http://localhost:4000/admin/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Network response was not ok");
      }
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: result.admin,
      });
    } catch (error) {
      dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error.message });
    }
  };

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
    localStorage.removeItem("authState"); // Tambahkan ini untuk memastikan localStorage dihapus saat logout
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
