import React, { useEffect } from "react";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";

const AlternatifDispatch = () => {
  const { alternatifDispatch } = useAlternatifContext();

  useEffect(() => {
    const fetchData = async (url, dispatchFunction) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { data } = await response.json();
        dispatchFunction({
          type: "SET_DATA_ALTERNATIF",
          payload: data,
        });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetching data was cancelled");
        } else {
          console.error("Fetch error: ", error);
        }
      }
    };

    fetchData("http://localhost:4000/alternatif/", alternatifDispatch);
  }, [alternatifDispatch]);

  return <div>alternatifDispatch</div>;
};

export default AlternatifDispatch;
