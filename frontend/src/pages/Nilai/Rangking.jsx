import React, { useState } from "react";
import { Link } from "react-router-dom";
const RankingTable = () => {
  const [rangking, setRangking] = useState(null);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false); // State untuk menandai apakah data sudah diambil

  const fetchDatarangking = async () => {
    try {
      const response = await fetch("http://localhost:4000/topsisdua/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setRangking(result.data);
      setDataFetched(true); // Tandai bahwa data sudah diambil
    } catch (error) {
      setError(error);
      console.error("Fetch data error: ", error.message);
    }
  };

  const handleClickFetch = () => {
    fetchDatarangking();
    console.log("test");
  };

  if (error) {
    return (
      <div className=" flex flex-col justify-center items-center mx-auto">
        <span className="text-gray-50 text-2xl font-semibold text-center mb-4">
          Mohon Maaf Silahkan isi kriteria data penduduk untuk memproses
          perangkingan
        </span>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
          <Link to={"/penilaian"}>form nilai</Link>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-900 text-white min-h-screen ">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl uppercase font-bold mb-4">
          Hasil Perhitungan sistem pendukung keputusan penduduk desa tatung
        </h2>
        {!dataFetched && (
          <div className="flex items-center justify-center h-screen">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleClickFetch}
            >
              Mulai Rangking
            </button>
          </div>
        )}
        {dataFetched && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border-collapse border border-gray-600  overflow-hidden">
              <thead className="bg-gray-700 border border-gray-600">
                <tr>
                  <th className="text-left py-3 px-4 sticky top-0 bg-gray-800 border border-gray-600">
                    No
                  </th>
                  <th className="text-left py-3 px-4 sticky top-0 bg-gray-800 border border-gray-600">
                    Alternatif
                  </th>
                  <th className="text-left py-3 px-4 sticky top-0 bg-gray-800 border border-gray-600">
                    Jarak Ideal Positif
                  </th>
                  <th className="text-left py-3 px-4 sticky top-0 bg-gray-800 border border-gray-600">
                    Jarak Ideal Negatif
                  </th>
                  <th className="text-left py-3 px-4 sticky top-0 bg-gray-800 border border-gray-600">
                    Skor Preferensi
                  </th>
                  <th className="text-left py-3 px-4 sticky top-0 bg-gray-800 border border-gray-600">
                    Ranking
                  </th>
                </tr>
              </thead>
              <tbody>
                {rangking.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                    } border border-gray-600 text-center`}
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{item.nama_alternatif}</td>
                    <td className="py-3 px-4">
                      {item.jarakPositif.toFixed(3)}
                    </td>
                    <td className="py-3 px-4">
                      {item.jarakNegatif.toFixed(3)}
                    </td>
                    <td className="py-3 px-4">{item.skor.toFixed(3)}</td>
                    <td className="py-3 px-4">{item.ranking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleClickFetch}
              >
                Refresh Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingTable;
