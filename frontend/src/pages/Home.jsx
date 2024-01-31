import { useEffect, useState } from "react";
import { AlternatifDetail } from "../components/AlternatifDetail";
import AlternatifForm from "./AlternatifForm";
import KriteriaForm from "./KriteriaForm";
import MatriksForm from "./MatirksForm";

const Home = () => {
  const [allData, setAllData] = useState([]); // State untuk menyimpan semua data
  useEffect(() => {
    // Fetch semua data pada saat komponen pertama kali dimount

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/alternatif");
        if (response.ok) {
          const { data } = await response.json();
          setAllData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
