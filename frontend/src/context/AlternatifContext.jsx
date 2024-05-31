import React, { createContext, useReducer, useContext,useEffect } from "react";

export const AlternatifContext = createContext();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/alternatif/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        dispatch({
          type: "SET_DATA_ALTERNATIF",
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

  const updateData = async (id, newData) => {
    try {
      console.log(id);
      const response = await fetch(`http://localhost:4000/alternatif/${id}`, {
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
        type: "SET_DATA_ALTERNATIF",
        payload: result.data,
      });
    } catch (error) {
      console.error("Update data error: ", error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/alternatif/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      dispatch({
        type: "SET_DATA_ALTERNATIF",
        payload: state.data.filter((item) => item.id !== id),
      });
    } catch (error) {
      console.error("Delete data error: ", error);
    }
  };

  return (
    <AlternatifContext.Provider
      value={{ state, dispatch, addData, updateData, deleteData }}
    >
      {children}
    </AlternatifContext.Provider>
  );
};

export const useAlternatifContext = () => useContext(AlternatifContext);
