import React, { useState, useEffect } from "react";
import { useNilaiContext } from "../../hooks/useNilaiContext";
import TableComponent from "../../components/TableComponent";
import { Link } from "react-router-dom";

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

  const nama_matriks = state.data.filter((item) => item.Matriks?.length === 0);

  useEffect(() => {
    fetchDataNilai(); // Fetch data when the component mounts
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Jumlah item per halaman

  const totalPages = Math.ceil(localData.length / itemsPerPage);

  const paginateData = (data, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  };

  const currentData = paginateData(localData, currentPage, itemsPerPage);

  const headersNilai = [
    "No",
    "Nama",
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

  const headerNormalisasi = [
    "No",
    "Nama",
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
    "No",
    "Nama",
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
    setCurrentPage(1); // Reset halaman saat mengganti tabel
  };

  return (
    <div className="container">
      <h2 className="uppercase text-gray-200 font-semibold m-2">
        Tabel {activeTable} Alternatif
      </h2>
      <button
        onClick={() => toggleTable("nilai")}
        className="m-2 mb-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Nilai Input Matriks
      </button>
      <button
        onClick={() => toggleTable("normalisasi")}
        className="m-2 mb-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Nilai Normalisasi
      </button>
      <button
        onClick={() => toggleTable("terbobot")}
        className="m-2 mb-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Nilai Terbobot
      </button>
      <Link
        to={"/rangking"}
        className="m-2 mb-4 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        hasil Peringkat
      </Link>

      {activeTable === "normalisasi" && (
        <TableComponent
          headers={headerNormalisasi}
          data={currentData}
          valueType={"normalisasi"}
        />
      )}
      {activeTable === "terbobot" && (
        <TableComponent
          headers={headerTerbobot}
          data={currentData}
          valueType={"bobot"}
        />
      )}

      {activeTable === "nilai" && (
        <TableComponent
          headers={headersNilai}
          data={currentData}
          valueType={"nilai"}
        />
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage > 1 ? prevPage - 1 : prevPage
              )
            }
            disabled={currentPage === 1}
            className="mx-1 px-3 py-1 rounded  text-gray-100 font-semibold"
          >
            Previous
          </button>
          <span className="mx-1 px-3 py-1  text-gray-100 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage < totalPages ? prevPage + 1 : prevPage
              )
            }
            disabled={currentPage === totalPages}
            className="mx-1 px-3 py-1 rounded  text-gray-100 font-semibold"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NilaiMatriks;
