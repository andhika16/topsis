import { useEffect, useState } from "react";
import AlternatifForm from "./Alternatif/AlternatifForm";
import KriteriaForm from "./Kriteria/KriteriaForm";
import MatriksForm from "./Matriks/MatirksForm";
import { AlternatifDetail } from "../components/AlternatifDetail";
const Home = () => {
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

  return (
    <div className="beranda ">
      <div className="flex flex-wrap">
        <AlternatifForm />
        <KriteriaForm alternatif={allData} />
        <MatriksForm alternatif={allData} />
      </div>
      <div className="flex flex-wrap">
        {allData &&
          allData.map((alternatif, i) => (
            <AlternatifDetail key={i} alternatif={alternatif} />
          ))}
      </div>
    </div>
  );
};

export default Home;
