import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const AlternatifKriteria = () => {
  const [kriteriaAlternatif, setKriteriaAlternatif] = useState([]);
  const { id } = useParams();
  const url = `http://localhost:4000/alternatifKriteriaMatriks/${id}`;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });
        const { data } = await response.json();
        setKriteriaAlternatif(data);
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
  }, [url]);

  const hapusKriteria = async (kriteriaId) => {
    try {
      await fetch(`http://localhost:4000/kriteria/${kriteriaId}`, {
        method: "DELETE",
      });

      // Setelah penghapusan kriteria berhasil, kita perlu mengupdate state kriteriaAlternatif
      const updatedKriteria = kriteriaAlternatif.Kriteria.filter(
        (kriteria) => kriteria.id !== kriteriaId
      );
      setKriteriaAlternatif({
        ...kriteriaAlternatif,
        Kriteria: updatedKriteria,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="m-2 text-xl font-semibold text-gray-800"></div>
      <h1 className="m-2 text-2xl mb-4 font-bold text-gray-800">
        <p>Nama: {kriteriaAlternatif.nama_alternatif}</p>
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-500 text-white text-lg leading-normal">
              <th className="py-3 px-6 text-left">Nomor</th>
              <th className="py-3 px-6 text-left">Nama Kriteria</th>
              <th className="py-3 px-6 text-left">Bobot</th>
              <th className="py-3 px-6 text-left">Sifat</th>
              <th className="py-3 px-6 text-left">Nilai Matriks</th>
              <th className="py-3 px-6 text-left">Ket</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {kriteriaAlternatif.Kriteria ? (
              kriteriaAlternatif.Kriteria.map((kriteria, index) => (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100"
                  key={index}
                >
                  <td className="py-3 px-6 text-left text-lg font-semibold">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6 text-left text-lg font-semibold">
                    {kriteria.nama_kriteria}
                  </td>
                  <td className="py-3 px-6 text-left text-lg font-semibold">
                    {kriteria.bobot}
                  </td>
                  <td className="py-3 px-6 text-left text-lg font-semibold">
                    {kriteria.sifat}
                  </td>
                  <td className="py-3 px-6 text-left text-lg font-semibold">
                    {kriteria.Matriks
                      ? kriteria.Matriks.map((matriks, matriksIndex) => (
                          <span
                            key={matriksIndex}
                            className="inline-block mr-2"
                          >
                            {matriks.nilai}
                          </span>
                        ))
                      : "kosong"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button
                      className="font-semibold bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                      onClick={() => hapusKriteria(kriteria.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlternatifKriteria;
