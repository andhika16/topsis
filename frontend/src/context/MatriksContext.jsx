import React, { createContext, useReducer, useContext, useEffect } from "react";

export const MatriksContext = createContext();

const matriksReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA_MATRIKS":
      return { ...state, data: action.payload };
    case " ADD_DATA_MATRIKS":
      return { ...state, data: [...state.data, action.payload] };
    default:
      return state;
  }
};

export const MatriksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(matriksReducer, { data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/matriks/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        dispatch({
          type: "SET_DATA_MATRIKS",
          payload: result.data,
        });
      } catch (error) {
        console.error("Fetch data error: ", error);
      }
    };
    fetchData();
  }, []);

  const addData = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/matriks/", {
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
        type: "ADD_DATA_MATRIKS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Add data error: ", error);
    }
  };

  const updateData = async (id, newData) => {
    try {
      const response = await fetch(`http://localhost:4000/matriks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      dispatch({
        type: "SET_DATA_MATRIKS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Update data error: ", error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/matriks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      dispatch({
        type: "SET_DATA_MATRIKS",
        payload: state.data.filter((item) => item.id !== id),
      });
    } catch (error) {
      console.error("Delete data error: ", error);
    }
  };

  return (
    <MatriksContext.Provider
      value={{ state, dispatch, addData, updateData, deleteData }}
    >
      {children}
    </MatriksContext.Provider>
  );
};

export const useMatriksContext = () => useContext(MatriksContext);
