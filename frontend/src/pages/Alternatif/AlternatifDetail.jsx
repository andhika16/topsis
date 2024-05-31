/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";

export function AlternatifDetail() {
  const { state, deleteData } = useAlternatifContext();
  const { data: alternatifState } = state; // Mengambil data dari state

  const hapusData = async (id) => {
    await deleteData(id);
  };

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
                <td className="py-3 space-y-2 ">
                  <Link to={`/alternatif-edit/${item.id}`}>
                    <button className=" bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-1 px-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Edit
                    </button>
                  </Link>
                  <Link to={`/alternatifKriteria/${item.id}`}>
                    <button className=" bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Kriteria
                    </button>
                  </Link>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={() => hapusData(item.id)}
                  >
                    hapus
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
