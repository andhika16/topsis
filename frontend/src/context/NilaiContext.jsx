import React, { createContext, useReducer, useContext, useEffect } from "react";

export const NilaiContext = createContext();

const nilaiReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA_NILAI":
      return { ...state, data: action.payload };
    case "SET_DATA_KATEGORI_OPSI":
      return { ...state, kategoriOpsi: action.payload };
    case "ADD_DATA_NILAI":
      return { ...state, data: [...state.data, action.payload] };
    default:
      return state;
  }
};

export const NilaiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(nilaiReducer, {
    data: [],
    kategoriOpsi: [],
  });

  const fetchDataNilai = async () => {
    try {
      const response = await fetch("http://localhost:4000/nilai/");
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

  const fetchDataKategoriOpsi = async () => {
    try {
      const response = await fetch("http://localhost:4000/kategori-opsi/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      dispatch({
        type: "SET_DATA_KATEGORI_OPSI",
        payload: result.data,
      });
    } catch (error) {
      console.error("Fetch data error: ", error);
    }
  };

  useEffect(() => {
    fetchDataNilai();
    fetchDataKategoriOpsi();
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

  const editNilai = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:4000/matriks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Matriks: data }),
      });


      if (!response.ok) {
        // Handle unsuccessful response
        throw new Error("Gagal menyimpan perubahan nilai");
      }
      const result = await response.json();
      dispatch({
        type: "SET_DATA_NILAI",
        payload: result.data,
      });
    } catch (error) {
      // Handle error if the request fails
      console.error("Gagal menyimpan perubahan nilai:", error);
      // Handle the error as needed, such as displaying an error message to the user
    }
  };

  const hapusNilai = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/matriks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

    } catch (error) {
      console.error("Gagal menghapus data Matriks:", error);
      alert("Gagal menghapus data Matriks");
    }
  };

  return (
    <NilaiContext.Provider
      value={{
        state,
        dispatch,
        hapusNilai,
        addData,
        fetchDataNilai,
        fetchDataKategoriOpsi,
        editNilai,
      }}
    >
      {children}
    </NilaiContext.Provider>
  );
};

export const useNilaiContext = () => useContext(NilaiContext);
