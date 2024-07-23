/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";
import { toast, ToastContainer } from "react-toastify";

const ITEMS_PER_PAGE = 10;

export default function AlternatifDetail() {
  const { state, deleteData, error, loading, fetchData } =
    useAlternatifContext();
  const { data: alternatifState } = state;
  const [localData, setLocalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (Array.isArray(alternatifState)) {
      const filteredData = alternatifState.filter((item) => item !== undefined);
      setLocalData(filteredData);
    }
  }, [alternatifState]);

  useEffect(() => {
    fetchData();
  }, []);

  const hapusData = async (id) => {
    await deleteData(id);
    toast.success("data berhasil dihapus", {
      className: "text-xl p-2 w-50",
      bodyClassName: "text-xl",
      autoClose: 3000,
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = localData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(localData.length / ITEMS_PER_PAGE);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="p-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-sm text-gray-100 text-center border-b-2 border-gray-700">

              <th className="py-2">No</th>
              <th className="py-2">Nama</th>
              <th className="py-2">Nomor KK</th>
              <th className="py-2">NIK</th>
              <th className="py-2">Jenis Kelamin</th>
              <th className="py-2">Tempat/Tanggal lahir</th>
              <th className="py-2">Pekerjaan</th>
              <th className="py-2">RT</th>
              <th className="py-2">RW</th>
              <th className="py-2">Jalan</th>
              <th className="py-2">Keterangan</th>
            </tr>
          </thead>
          {currentItems.length === 0 ? (
            <tbody>
              <tr className="border-b text-sm border-gray-200">
                <td colSpan="10">
                  <span className="text-center text-red-700 font-medium">
                    data penduduk belum terisi.
                  </span>
                  <br />
                  <span className="text-blue-700 text-center">
                    <Link to={"/alternatif_form"}>
                      silahkan isi data penduduk
                    </Link>
                  </span>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className="border-b text-sm border-gray-200">
                  <td className="py-1 px-2 text-left text-gray-200 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-1 px-2 text-left text-gray-200 whitespace-nowrap">
                    {item.nama_alternatif}
                  </td>
                  <td className="py-1 px-2 text-left text-gray-200 whitespace-nowrap">
                    {item.no_kk}
                  </td>
                  <td className="py-1 px-2 text-left text-gray-200 whitespace-nowrap">
                    {item.no_nik}
                  </td>
                  <td className="py-1 px-2 text-left text-gray-200 whitespace-nowrap">
                    {item.jenis_kelamin}
                  </td>
                  <td className="py-1 px-2 text-left text-gray-200">
                    {item.pekerjaan}
                  </td>
                  <td className="py-1 px-2 text-left text-gray-200">
                    {item.tempat_tgl_lahir}
                  </td>
                  <td className="py-1 px-2 text-left text-gray-200">
                    {item.RT}
                  </td>
                  <td className="py-1 px-2 text-left text-gray-200">
                    {item.RW}
                  </td>
                  <td className="py-1 px-2 text-left text-gray-200">
                    {item.jalan}
                  </td>
                  <td className="py-1 px-2 text-left text-gray-200">
                    <div className="flex space-x-2">
                      <Link to={`/alternatif-edit/${item.id}`}>
                        <button className="text-blue-600 hover:underline hover:text-blue-700">
                          Ubah
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
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
