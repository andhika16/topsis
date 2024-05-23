import React from "react";
import { useNilaiContext } from "../../hooks/useNilaiContext";
import { Link } from "react-router-dom";

const NilaiMatriks = () => {
  const { nilaiState } = useNilaiContext();
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Nama</th>
            <th className="border border-gray-400 px-4 py-2">C1</th>
            <th className="border border-gray-400 px-4 py-2">C2</th>
            <th className="border border-gray-400 px-4 py-2">C3</th>
            <th className="border border-gray-400 px-4 py-2">Ket</th>
          </tr>
        </thead>
        <tbody>
          {nilaiState.map((item, i) => (
            <tr key={i}>
              <td className="border border-gray-400 px-4 py-2">
                {item.nama_alternatif}
              </td>
              {item.Matriks.length > 0 ? (
                item.Matriks.map((matriks, j) => (
                  <td className="border border-gray-400 px-4 py-2" key={j}>
                    {matriks.nilai}
                  </td>
                ))
              ) : (
                <td className="border border-gray-400 px-4 py-2" colSpan={3}>
                  belum ada nilai
                </td>
              )}
              <td className="border border-gray-400 px-4 py-2 text-sm">
                <Link to={`/nilai_matriks/${item.id}`}>ubah</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NilaiMatriks;
