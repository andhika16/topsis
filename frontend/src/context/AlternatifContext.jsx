import React, { createContext, useReducer } from "react";

// Inisialisasi Context
export const AlternatifContext = createContext();

// Reducer untuk mengelola state
export const alternatifReducer = (state, action) => {
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
export const AlternatifProvider = ({ children }) => {
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
