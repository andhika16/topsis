import React from "react";
import { Link } from "react-router-dom";
import { useNilaiContext } from "../hooks/useNilaiContext";
import { toast, ToastContainer } from "react-toastify";
// TODO: tambahkan nomor urut untuk tiap table
const generateTableHeaders = (headers) => {
  return headers.map((header, index) => (
    <th
      key={index}
      className="border border-gray-100 text-sm font-semibold text-gray-900 py-2 px-4 text-center"
    >
      {header}
    </th>
  ));
};

const TableComponent = ({ headers, data, valueType }) => {
  const { hapusNilai } = useNilaiContext();
  const hapusDataNilai = async (id) => {
    await hapusNilai(id);
    toast.success("data berhasil dihapus", {
      className: "text-xl p-2 w-50",
      bodyClassName: "text-xl",
      autoClose: 3000,
    });
  };
  const getValue = (matriks) => {
    switch (valueType) {
      case "normalisasi":
        return matriks.normalisasi;
      case "bobot":
        return matriks.terbobot;
      case "nilai":
      default:
        return matriks.nilai;
    }
  };

  return (
    <div className="overflow-x-auto">
      <ToastContainer />
      <table className=" lg:min-w-full table-auto border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-200">{generateTableHeaders(headers)}</tr>
        </thead>
        <tbody>
          {data?.map((item, i) => (
            <tr key={i} className="hover:bg-gray-900 text-center">
              <td className="border border-gray-500 text-gray-100 text-sm py-2 px-4 text-left">
                {item.nama_alternatif}
              </td>
              {item.Matriks.length > 0 ? (
                item.Matriks.map((matriks, j) => (
                  <td
                    key={j}
                    className="border border-gray-500 text-sm py-2 px-4 text-center text-gray-100"
                  >
                    {getValue(matriks)}
                  </td>
                ))
              ) : (
                <td
                  colSpan={headers.length - 2}
                  className="border border-gray-500 text-sm py-2 px-4 text-center text-gray-100"
                >
                  Nilai belum terinput
                </td>
              )}
              {valueType === "nilai" && (
                <td className="border border-gray-500 py-2 px-4 text-sm text-left">
                  <div className="flex space-x-3">
                    <Link to={`/alternatif_kriteria/${item.id}`}>
                      <button className="text-blue-600 hover:underline hover:text-blue-700">
                        Detail
                      </button>
                    </Link>
                    <Link
                      to={`/nilai_matriks/${item.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Ubah
                    </Link>
                    <button
                      className="text-red-600 hover:underline hover:text-red-700"
                      onClick={() => hapusDataNilai(item.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
