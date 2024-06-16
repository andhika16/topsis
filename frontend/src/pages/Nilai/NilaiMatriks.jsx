import React, { useState, useEffect } from "react";
import { useNilaiContext } from "../../hooks/useNilaiContext";
import TableComponent from "../../components/TableComponent";

const NilaiMatriks = () => {
  const { state, fetchDataNilai, hapusNilai } = useNilaiContext();
  const { data: nilaiState } = state;
  const [activeTable, setActiveTable] = useState(null);
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    // Filter out any undefined values from the alternatifState and update localData
    if (Array.isArray(nilaiState)) {
      const filteredData = nilaiState.filter((item) => item.nilai !== 0);
      setLocalData(filteredData);
    }
  }, [nilaiState]);

  useEffect(() => {
    fetchDataNilai(); // Fetch data when the component mounts
  }, []);

  const headersNilai = [
    "Nilai Matriks",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "Detail",
  ];

  const headerNormalisasi = [
    "Nilai Normalisasi",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
  ];

  const headerTerbobot = [
    "Nilai Terbobot",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
  ];

  if (!activeTable) {
    setActiveTable("nilai");
  }
  const toggleTable = (tableName) => {
    setActiveTable(activeTable === tableName ? null : tableName);
  };

  return (
    <div className="container">
      <h2 className="uppercase text-gray-200 font-semibold m-2">
        Tabel {activeTable} Alternatif
      </h2>

      {activeTable === "normalisasi" && (
        <TableComponent
          headers={headerNormalisasi}
          data={localData}
          valueType={"normalisasi"}
        />
      )}
      {activeTable === "terbobot" && (
        <TableComponent
          headers={headerTerbobot}
          data={localData}
          valueType={"bobot"}
        />
      )}

      {activeTable === "nilai" && (
        <TableComponent
          headers={headersNilai}
          data={localData}
          valueType={"nilai"}
        />
      )}

      <button
        onClick={() => toggleTable("nilai")}
        className="mb-4 text-gray-200 px-4 py-2 hover:text-blue-800 "
      >
        Nilai Input Matriks
      </button>
      <button
        onClick={() => toggleTable("normalisasi")}
        className="mb-4 text-gray-200 px-4 py-2 hover:text-blue-800 "
      >
        Nilai Normalisasi
      </button>
      <button
        onClick={() => toggleTable("terbobot")}
        className="mb-4 text-gray-200 px-4 py-2 hover:text-blue-800 "
      >
        Nilai Terbobot
      </button>
    </div>
  );
};

export default NilaiMatriks;
