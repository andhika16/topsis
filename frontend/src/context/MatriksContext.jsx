import React, { createContext, useReducer } from "react";

// Inisialisasi Context
export const MatriksContext = createContext();

// Reducer untuk mengelola state
export const matriksReducer = (state, action) => {
  switch (action.type) {
    case "SET_MATRIKS":
      return action.payload;
    case "ADD_MATRIKS":
      return [...state, action.payload];
    case "UPDATE_MATRIKS":
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    case "DELETE_MATRIKS":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

// Inisialisasi state awal
const initialMatriksState = [];

// Wrapper untuk menyediakan state dan dispatch ke komponen di bawahnya
export const MatriksProvider = ({ children }) => {
  const [matriksState, matriksDispatch] = useReducer(
    matriksReducer,
    initialMatriksState
  );

  return (
    <MatriksContext.Provider value={{ matriksState, matriksDispatch }}>
      {children}
    </MatriksContext.Provider>
  );
};

// Custom hook untuk menggunakan Context
