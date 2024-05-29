/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";

export function AlternatifDetail() {
  const { alternatifState } = useAlternatifContext();

  const [isDeleted, setIsDeleted] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);

  const hapusData = async (id) => {
    try {
      await fetch(`http://localhost:4000/alternatif/${id}`, {
        method: "DELETE",
      });
      setIsDeleted(true);
      setDeletedItemId(id); // Menandai item yang dihapus
    } catch (error) {
      console.log(error);
    }
  };

  if (isDeleted && deletedItemId) {
    // Menampilkan pesan atau tindakan setelah penghapusan
    return (
      <div className="container mx-auto p-4">
        <p>Data dengan ID {deletedItemId} berhasil dihapus.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="p-6 bg-white shadow-md rounded-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className=" text-black text-lg leading-normal">
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">Nomor KK</th>
              <th className="py-3 px-6 text-left">NIK</th>
              <th className="py-3 px-6 text-left">Jenis Kelamin</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Pekerjaan</th>
              <th className="py-3 px-6 text-left">Keterangan</th>
            </tr>
          </thead>
          {alternatifState.map((item, index) => (
            <tbody className="text-sm text-gray-800" key={index}>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{item.nama_alternatif}</td>
                <td className="py-3 px-6 text-left">{item.no_kk}</td>
                <td className="py-3 px-6 text-left">{item.no_telp}</td>
                <td className="py-3 px-6 text-left">{item.jenis_kelamin}</td>
                <td className="py-3 px-6 text-left">{item.alamat}</td>
                <td className="py-3 px-6 text-left">{item.pekerjaan}</td>
                <td className="py-3 px-6 flex space-x-2">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={() => hapusData(item.id)}
                  >
                    hapus
                  </button>
                  <Link to={`/alternatifKriteria/${item.id}`}>
                    <button className=" bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Kriteria
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
