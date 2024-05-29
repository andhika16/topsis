import React from "react";
import { useNilaiContext } from "../../hooks/useNilaiContext";
import { Link } from "react-router-dom";

const NilaiMatriks = () => {
  const { nilaiState } = useNilaiContext();
  return (
    <div className="container">
      <table className="min-w-full table-fixed border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Nama
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
              C1
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
              C2
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
              C3
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Detail
            </th>
          </tr>
        </thead>
        <tbody>
          {nilaiState.map((item, i) => (
            <tr key={i} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                {item.nama_alternatif}
              </td>
              {item.Matriks.length > 0 ? (
                item.Matriks.map((matriks, j) => (
                  <td
                    className="border border-gray-300 px-4 py-2 text-sm text-gray-700"
                    key={j}
                  >
                    {matriks.nilai}
                  </td>
                ))
              ) : (
                <>
                  <td
                    className="border border-gray-300 px-4 py-2 text-sm text-gray-700"
                    colSpan="3"
                  >
                    -
                  </td>
                </>
              )}
              <td className="border border-gray-300 px-4 py-2 text-sm space-x-3 text-blue-600 hover:text-blue-800">
                <Link to={`/alternatifKriteria/${item.id}`}>Detail</Link>
                <Link to={`/nilai_matriks/${item.id}`}>Ubah</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NilaiMatriks;
