import React from "react";
import { useNilaiContext } from "../../hooks/useNilaiContext";
import { Link } from "react-router-dom";

const generateTableHeaders = (headers) => {
  return headers.map((header, index) => (
    <th
      key={index}
      className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700"
    >
      {header}
    </th>
  ));
};

const NilaiMatriks = () => {
  const { state } = useNilaiContext();
  const { data: nilaiState } = state;
  console.log(nilaiState);
  const headers = [
    "Data Matriks",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "Detail",
  ];

  return (
    <div className="container">
      <table className="min-w-full table-fixed border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">{generateTableHeaders(headers)}</tr>
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
                <td
                  className="border border-gray-300 px-4 py-2 text-sm text-gray-700"
                  colSpan="10"
                >
                  -
                </td>
              )}
              <td className="border border-gray-300 px-4 py-2 text-sm space-x-3 text-blue-600 hover:text-blue-800">
                <Link to={`/alternatifKriteria/${item.id}`}>Detail</Link>
                <Link to={`/nilai_matriks/${item.id}`}>Ubah</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="min-w-full table-fixed border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">{generateTableHeaders(headers)}</tr>
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
                    {matriks.normalisasi}
                  </td>
                ))
              ) : (
                <td
                  className="border border-gray-300 px-4 py-2 text-sm text-gray-700"
                  colSpan="10"
                >
                  -
                </td>
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
