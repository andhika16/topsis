import React, { createContext, useReducer } from "react";

// Inisialisasi Context
export const KriteriaContext = createContext();

// Reducer untuk mengelola state
export const kriteriaReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA_KRITERIA":
      return action.payload;
    case "ADD_KRITERIA":
      return [...state, action.payload];
    case "UPDATE_KRITERIA":
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    case "DELETE_KRITERIA":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
      
  }
};

// Inisialisasi state awal
const initialKriteriaState = [];

// Wrapper untuk menyediakan state dan dispatch ke komponen di bawahnya
export const KriteriaProvider = ({ children }) => {
  const [kriteriaState, kriteriaDispatch] = useReducer(
    kriteriaReducer,
    initialKriteriaState
  );

  return (
    <KriteriaContext.Provider value={{ kriteriaState, kriteriaDispatch }}>
      {children}
    </KriteriaContext.Provider>
  );
};
