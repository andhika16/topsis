import React from "react";

const alternatif = () => {
  const [allData, setAllData] = useState([]); // State untuk menyimpan semua data
  const url = "http://localhost:4000/alternatif/";
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });
        const { data } = await response.json();
        setAllData(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetching data was cancelled");
        } else {
          throw error;
        }
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []); // Dependency array kosong agar hanya dijalankan sekali

  return <div>alternatif</div>;
};

export default alternatif;
