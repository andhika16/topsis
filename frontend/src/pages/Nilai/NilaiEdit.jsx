import React, { useState } from "react";
import { useNilaiContext } from "../../hooks/useNilaiContext";
import { useParams } from "react-router-dom";

const NilaiUbah = () => {
  const { id } = useParams();
  const { nilaiState } = useNilaiContext(); // Add updateNilai to update the state
  const nilai = nilaiState.find((item) => item.id == id);

  // Local state for the values being edited
  const [editValues, setEditValues] = useState(
    nilai ? nilai.Matriks.map((matriks) => matriks.nilai) : []
  );

  // If nilai is not found, display a message or handle the error
  if (!nilai) {
    return <div>Data tidak ditemukan.</div>;
  }

  const { nama_alternatif, Matriks } = nilai;

  // Handler to change input values
  const handleChange = (index, event) => {
    const newValues = [...editValues];
    const value = event.target.value;
    if (value >= 1 && value <= 5) {
      newValues[index] = value;
    }
    setEditValues(newValues);
  };

  // Handler to save the changes
  const handleSave = async () => {
    const updatedMatriks = Matriks.map((matriks, index) => ({
      ...matriks,
      nilai: editValues[index],
    }));
    try {
      const response = await fetch(`http://localhost:4000/matriks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Matriks: updatedMatriks }),
      });

      if (!response.ok) {
        // Handle unsuccessful response
        throw new Error("Gagal menyimpan perubahan nilai");
      }
    } catch (error) {
      // Handle error if the request fails
      console.error("Gagal menyimpan perubahan nilai:", error);
      // Handle the error as needed, such as displaying an error message to the user
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Nama</th>
            <th className="border border-gray-400 px-4 py-2">C1</th>
            <th className="border border-gray-400 px-4 py-2">C2</th>
            <th className="border border-gray-400 px-4 py-2">C3</th>
            <th className="border border-gray-400 px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2">
              {nama_alternatif}
            </td>
            {Matriks.length > 0 ? (
              Matriks.map((matriks, i) => (
                <td className="border border-gray-400 px-4 py-2" key={i}>
                  <input
                    type="number"
                    pattern="[1-5]"
                    value={editValues[i]}
                    onChange={(e) => handleChange(i, e)}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
              ))
            ) : (
              <td className="border border-gray-400 px-4 py-2" colSpan={3}>
                belum ada nilai
              </td>
            )}
            <td className="border border-gray-400 px-4 py-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Simpan
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NilaiUbah;
