import React, { createContext, useReducer } from "react";

// Inisialisasi Context
export const NilaiContext = createContext();

// Reducer untuk mengelola state
export const nilaiReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA_NILAI":
      return action.payload;
    case "ADD_NILAI":
      return [...state, action.payload];
    case "UPDATE_NILAI":
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    case "DELETE_NILAI":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

// Inisialisasi state awal
const initialNilaiState = [];

// Wrapper untuk menyediakan state dan dispatch ke komponen di bawahnya
export const NilaiProvider = ({ children }) => {
  const [nilaiState, nilaiDispatch] = useReducer(
    nilaiReducer,
    initialNilaiState
  );

  return (
    <NilaiContext.Provider value={{ nilaiState, nilaiDispatch }}>
      {children}
    </NilaiContext.Provider>
  );
};
