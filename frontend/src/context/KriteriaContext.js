import React, { createContext, useReducer, useContext } from "react";

// Inisialisasi Context
const KriteriaContext = createContext();

// Reducer untuk mengelola state
const kriteriaReducer = (state, action) => {
  switch (action.type) {
    case "SET_KRITERIA":
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
const KriteriaProvider = ({ children }) => {
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

// Custom hook untuk menggunakan Context
const useKriteriaContext = () => {
  const context = useContext(KriteriaContext);
  if (!context) {
    throw new Error(
      "useKriteriaContext must be used within a KriteriaProvider"
    );
  }
  return context;
};

export { KriteriaProvider, useKriteriaContext };
