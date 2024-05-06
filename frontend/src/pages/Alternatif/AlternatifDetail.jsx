/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";

export function AlternatifDetail({ alternatif }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const hapusData = async (id) => {
    try {
      await fetch(`http://localhost:4000/alternatif/${id}`, {
        method: "DELETE",
      });
      setIsDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (isDeleted) {
    return true;
  }
  return (
    <div className="w-auto h-auto">
      <div className="bg-slate-800 m-2 p-3 text-xs rounded-md text-white font-mono">
        <p> nama : {alternatif.nama_alternatif}</p>
        <p> Nomor KK :{alternatif.no_kk}</p>
        <p> NIK :{alternatif.no_telp}</p>
        <p> Jenis kelamin :{alternatif.jenis_kelamin}</p>
        <p>alamat :{alternatif.alamat}</p>
        <p>Pekerjaan : {alternatif.pekerjaan}</p>
        <button
          className="button bg-red-800 p-2 rounded"
          onClick={() => hapusData(alternatif.id)}
        >
          delete
        </button>
        <Link to={`/alternatifKriteria/${alternatif.id}`}>
          <button className="button bg-blue-500 mx-2 p-2 rounded">
            View Alternatif & Kriteria
          </button>
        </Link>
      </div>
    </div>
  );
}
