import React, { createContext, useReducer, useContext } from "react";

const AlternatifContext = createContext();

const alternatifReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA_ALTERNATIF":
      return { ...state, data: action.payload };
    case "ADD_DATA_ALTERNATIF":
      return { ...state, data: [...state.data, action.payload] };
    default:
      return state;
  }
};

export const AlternatifProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alternatifReducer, { data: [] });

  const addData = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/alternatif/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      dispatch({
        type: "ADD_DATA_ALTERNATIF",
        payload: result.data,
      });
    } catch (error) {
      console.error("Add data error: ", error);
    }
  };

  const addKriteria = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/kriteria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result.data.id; // Return kriteria ID
    } catch (error) {
      console.error("Add kriteria error: ", error);
    }
  };

  const addMatriks = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/matriks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await response.json();
    } catch (error) {
      console.error("Add matriks error: ", error);
    }
  };

  return (
    <AlternatifContext.Provider
      value={{ state, dispatch, addData, addKriteria, addMatriks }}
    >
      {children}
    </AlternatifContext.Provider>
  );
};

export const useAlternatifContext = () => useContext(AlternatifContext);
