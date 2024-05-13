import React from "react";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";
import { useKriteriaContext } from "../../hooks/useKriteriaContext";
import { useMatriksContext } from "../../hooks/useMatriksContext";
import { useEffect } from "react";

const DispatchData = () => {
  const { alternatifDispatch } = useAlternatifContext();
  const { kriteriaDispatch } = useKriteriaContext();
  const { matriksDispatch } = useMatriksContext();

  useEffect(() => {
    const fetchData = async (url, dispatchFunction) => {
      try {
        const response = await fetch(url);
        const { data } = await response.json();
        switch (dispatchFunction) {
          case alternatifDispatch:
            return dispatchFunction({
              type: "SET_DATA_ALTERNATIF",
              payload: data,
            });
          case kriteriaDispatch:
            return dispatchFunction({
              type: "SET_DATA_KRITERIA",
              payload: data,
            });
          case matriksDispatch:
            return dispatchFunction({
              type: "SET_DATA_MATRIKS",
              payload: data,
            });
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetching data was cancelled");
        } else {
          throw error;
        }
      }
    };

    fetchData("http://localhost:4000/alternatif/", alternatifDispatch);
    fetchData("http://localhost:4000/matriks/", matriksDispatch);
    fetchData("http://localhost:4000/kriteria/", kriteriaDispatch);
  }, [alternatifDispatch, kriteriaDispatch, matriksDispatch]);

  return <div>DispatchData</div>;
};

export default DispatchData;
