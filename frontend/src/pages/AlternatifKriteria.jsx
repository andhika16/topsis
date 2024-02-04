import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const AlternatifKriteria = () => {
  const { id } = useParams();
  const [kriteriaAlternatif, setKriteriaAlternatif] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/alternatifKriteriaMatriks/${id}`
        );
        if (response.ok) {
          const { data } = await response.json();
          setKriteriaAlternatif(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
    <div className="container mx-auto ">
      <div className="m-2 text-xl font-semibold">
        <p>Nama : {kriteriaAlternatif.nama_alternatif}</p>
      </div>
      <h1 className="m-2 text-xl mb-4">Table Alternatif Kriteria</h1>
      <table className="container mx-auto">
        <thead>
          <tr className="bg-blue-500 border text-white">
            <th>Nomor</th>
            <th>Nama Kriteria</th>
            <th>bobot</th>
            <th>sifat</th>
            <th>Nilai Matriks</th>
            <th>aksi</th>
          </tr>
        </thead>
        <tbody className="">
          {kriteriaAlternatif.Kriteria ? (
            kriteriaAlternatif.Kriteria.map((kriteria, i) => (
              <tr className="space-x-3 text-center" key={i}>
                <td>{i}</td>
                <td className="">{kriteria.nama_kriteria}</td>
                <td className=""> {kriteria.bobot}</td>
                <td className="">{kriteria.sifat}</td>
                <td className="">
                  {kriteria.Matriks ? (
                    kriteria.Matriks.map((m, i) => m.nilai)
                  ) : (
                    <td>kosong</td>
                  )}
                </td>
                <td>
                  <button
                    className=" font-semibold  w-11 rounded text-red-600"
                    onClick={() => {
                      hapusKriteria(kriteria.id);
                    }}
                  >
                    {" "}
                    hapus{" "}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>tidak ada data</td>
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
