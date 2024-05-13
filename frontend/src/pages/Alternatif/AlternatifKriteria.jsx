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

  const hapusKriteria = async (id) => {
    try {
      await fetch(`http://localhost:4000/kriteria/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="m-2 text-xl font-semibold">
        <p>Nama : {kriteriaAlternatif.nama_alternatif}</p>
      </div>
      <h1 className="m-2 text-xl mb-4">Table Alternatif Kriteria</h1>
      <table className="container mx-auto">
        <thead>
          <tr className="bg-blue-500 border text-white">
            <th>Nomor</th>
            <th>Nama Kriteria</th>
            <th>Bobot</th>
            <th>Sifat</th>
            <th>Nilai Matriks</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody className="">
          {kriteriaAlternatif.Kriteria ? (
            kriteriaAlternatif.Kriteria.map((kriteria, index) => (
              <tr className="space-x-3 text-center" key={index}>
                <td>{index}</td>
                <td className="">{kriteria.nama_kriteria}</td>
                <td className="">{kriteria.bobot}</td>
                <td className="">{kriteria.sifat}</td>
                <td className="">
                  {kriteria.Matriks ? (
                    kriteria.Matriks.map((matriks, index) => matriks.nilai)
                  ) : (
                    <td>kosong</td>
                  )}
                </td>
                <td>
                  <button
                    className="font-semibold w-11 rounded text-red-600"
                    onClick={() => hapusKriteria(kriteria.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Tidak ada data</td>
            </tr>
          )}
        </tbody>
      </table>
      <Link
        to="/"
        className="w-[200px] text-center mt-4 block bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Kembali
      </Link>
    </div>
  );
};

export default AlternatifKriteria;
