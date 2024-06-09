/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";

export function AlternatifDetail() {
  const { state, deleteData, error, loading, fetchData } =
    useAlternatifContext();
  const { data: alternatifState } = state;
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    // Filter out any undefined values from the alternatifState and update localData
    if (Array.isArray(alternatifState)) {
      const filteredData = alternatifState.filter((item) => item !== undefined);
      setLocalData(filteredData);
    }
  }, [alternatifState]);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const hapusData = async (id) => {
    await deleteData(id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="p-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-sm text-center border-b-2 border-gray-700">
              <th className="py-2">Nama</th>
              <th className="py-2">Nomor KK</th>
              <th className="py-2">NIK</th>
              <th className="py-2">Jenis Kelamin</th>
              <th className="py-2">Alamat</th>
              <th className="py-2">Pekerjaan</th>
              <th className="py-2">Keterangan</th>
            </tr>
          </thead>
          {localData.length === 0 ? (
            <tbody>
              <tr className="border-b text-sm border-gray-200">
                <td
                  colSpan="7"
                  className="py-2 px-4 text-center text-gray-700 font-medium"
                >
                  Tidak ada data kriteria tersedia.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {localData.map((item, index) => (
                <tr key={index} className="border-b text-sm border-gray-200">
                  <td className="py-1 px-2 text-left whitespace-nowrap">
                    {item.nama_alternatif}
                  </td>
                  <td className="py-1 px-2 text-left whitespace-nowrap">
                    {item.no_kk}
                  </td>
                  <td className="py-1 px-2 text-left whitespace-nowrap">
                    {item.no_nik}
                  </td>
                  <td className="py-1 px-2 text-left whitespace-nowrap">
                    {item.jenis_kelamin}
                  </td>
                  <td className="py-1 px-2 text-left">{item.alamat}</td>
                  <td className="py-1 px-2 text-left">{item.pekerjaan}</td>
                  <td className="py-1 px-2 text-left">
                    <div className="flex space-x-2">
                      <Link to={`/alternatif-edit/${item.id}`}>
                        <button className="text-blue-600 hover:underline hover:text-blue-700">
                          Ubah
                        </button>
                      </Link>
                      <Link to={`/alternatifKriteria/${item.id}`}>
                        <button className="text-blue-600 hover:underline hover:text-blue-700">
                          Detail
                        </button>
                      </Link>
                      <button
                        className="text-red-600 hover:underline hover:text-red-700"
                        onClick={() => hapusData(item.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
