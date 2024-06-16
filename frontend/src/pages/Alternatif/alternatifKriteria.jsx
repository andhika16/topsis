import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AlternatifKriteria = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Ambil nilai id dari params
  useEffect(() => {
    fetch(`http://localhost:4000/alternatifKriteria/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.success) {
    return <div>No data available</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl mb-4">
        Nama Penduduk: {data.data.nama_alternatif}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Nilai
              </th>
              <th className="px-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Kriteria
              </th>
              <th className="px-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Label
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {data.data.Matriks.map((item, x) => (
              <tr key={x} className="hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap">{x + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.nilai}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.Opsi.kategori.nama}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.Opsi.label}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlternatifKriteria;
