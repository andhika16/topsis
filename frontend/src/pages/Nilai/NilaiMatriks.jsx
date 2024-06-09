import React, { useState, useEffect } from "react";
import { useNilaiContext } from "../../hooks/useNilaiContext";
import TableComponent from "../../components/TableComponent";

const NilaiMatriks = () => {
  const { state, fetchDataNilai } = useNilaiContext();
  const { data: nilaiState } = state;
  const [activeTable, setActiveTable] = useState(null);

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
    setActiveTable("normalisasi");
  }
  const toggleTable = (tableName) => {
    setActiveTable(activeTable === tableName ? null : tableName);
  };

  return (
    <div className="container">
      <h2 className="uppercase font-semibold m-2">Tabel {activeTable} Alternatif</h2>

      {activeTable === "normalisasi" && (
        <TableComponent
          headers={headerNormalisasi}
          data={nilaiState}
          valueType={"normalisasi"}
        />
      )}
      {activeTable === "terbobot" && (
        <TableComponent
          headers={headerTerbobot}
          data={nilaiState}
          valueType={"bobot"}
        />
      )}

      {activeTable === "nilai" && (
        <TableComponent
          headers={headersNilai}
          data={nilaiState}
          valueType={"nilai"}
        />
      )}

      {/* FIXME:modifikasi atau percantik tampilan tombol */}
      <button
        onClick={() => toggleTable("nilai")}
        className="mb-4 px-4 py-2 hover:text-blue-800 "
      >
        Tabel Nilai Matriks
      </button>
      <button
        onClick={() => toggleTable("normalisasi")}
        className="mb-4 px-4 py-2 hover:text-blue-800 "
      >
        Tabel Nilai Normalisasi
      </button>
      <button
        onClick={() => toggleTable("terbobot")}
        className="mb-4 px-4 py-2 hover:text-blue-800 "
      >
        Tabel Nilai Terbobot
      </button>
    </div>
  );
};

export default NilaiMatriks;
