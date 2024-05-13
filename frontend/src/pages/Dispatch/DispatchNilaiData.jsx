import React from "react";
import { useNilaiContext } from "../../hooks/useNilaiContext";
import { useEffect } from "react";

const DispatchNilaiData = (req, res) => {
  const { nilaiDispatch } = useNilaiContext();
  useEffect(() => {
    const fetchData = async (url, dispatchFunction) => {
      try {
        const response = await fetch(url);
        const { data } = await response.json();
        return dispatchFunction({
          type: "SET_DATA_NILAI",
          payload: data,
        });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetching data was cancelled");
        } else {
          throw error;
        }
      }
    };

    fetchData(`http://localhost:4000/nilai/`, nilaiDispatch);
  }, [nilaiDispatch]);
};

export default DispatchNilaiData;
