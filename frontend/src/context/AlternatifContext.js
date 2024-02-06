import React, { createContext, useReducer, useContext } from "react";

// Inisialisasi Context
const AlternatifContext = createContext();

// Reducer untuk mengelola state
const alternatifReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALTERNATIF":
      return action.payload;
    case "ADD_ALTERNATIF":
      return [...state, action.payload];
    case "UPDATE_ALTERNATIF":
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    case "DELETE_ALTERNATIF":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

// Inisialisasi state awal
const initialAlternatifState = [];

// Wrapper untuk menyediakan state dan dispatch ke komponen di bawahnya
const AlternatifProvider = ({ children }) => {
  const [alternatifState, alternatifDispatch] = useReducer(
    alternatifReducer,
    initialAlternatifState
  );

  return (
    <AlternatifContext.Provider value={{ alternatifState, alternatifDispatch }}>
      {children}
    </AlternatifContext.Provider>
  );
};

// Custom hook untuk menggunakan Context
const useAlternatifContext = () => {
  const context = useContext(AlternatifContext);
  if (!context) {
    throw new Error(
      "useAlternatifContext must be used within an AlternatifProvider"
    );
  }
  return context;
};

export { AlternatifProvider, useAlternatifContext };
