import React from "react";
import { Link } from "react-router-dom";

const generateTableHeaders = (headers) => {
  return headers.map((header, index) => (
    <th
      key={index}
      className="border border-gray-300 text-sm font-semibold text-gray-700 py-2 px-4 text-center"
    >
      {header}
    </th>
  ));
};

const TableComponent = ({ headers, data, valueType }) => {
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
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">{generateTableHeaders(headers)}</tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="hover:bg-gray-100 text-center">
              <td className="border border-gray-300 text-sm py-2 px-4 text-left">
                {item.nama_alternatif}
              </td>
              {item.Matriks.length > 0 ? (
                item.Matriks.map((matriks, j) => (
                  <td
                    key={j}
                    className="border border-gray-300 text-sm py-2 px-4 text-center text-gray-700"
                  >
                    {getValue(matriks)}
                  </td>
                ))
              ) : (
                <td
                  colSpan={headers.length - 2}
                  className="border border-gray-300 text-sm py-2 px-4 text-center text-gray-700"
                >
                  -
                </td>
              )}
              {valueType === "nilai" && (
                <td className="border border-gray-300 py-2 px-4 text-sm text-left">
                  <div className="flex space-x-3">
                    <Link
                      to={`/alternatifKriteria/${item.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Detail
                    </Link>
                    <Link
                      to={`/nilai_matriks/${item.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Ubah
                    </Link>
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
