import React, { createContext, useReducer, useContext, useEffect } from "react";

export const NilaiContext = createContext();

const nilaiReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA_NILAI":
      return { ...state, data: action.payload };
    case " ADD_DATA_NILAI":
      return { ...state, data: [...state.data, action.payload] };
    default:
      return state;
  }
};

export const NilaiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(nilaiReducer, { data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/kategori-opsi/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        dispatch({
          type: "SET_DATA_NILAI",
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
      const response = await fetch("http://localhost:4000/nilai/", {
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
        type: "ADD_DATA_NILAI",
        payload: result.data,
      });
    } catch (error) {
      console.error("Add data error: ", error);
    }
  };

  return (
    <NilaiContext.Provider value={{ state, dispatch ,addData}}>
      {children}
    </NilaiContext.Provider>
  );
};

export const useNilaiContext = () => useContext(NilaiContext);
