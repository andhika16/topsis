import React, { useState } from "react";
import { useNilaiContext } from "../../hooks/useNilaiContext";
import { useNavigate, useParams } from "react-router-dom";

const NilaiUpdate = () => {
  const { id } = useParams();
  const { state, editNilai } = useNilaiContext();
  const { data: nilaiState } = state;
  const nilai = nilaiState?.find((item) => item.id == id);
  const navigate = useNavigate()
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
    await editNilai(id, updatedMatriks);
    
    navigate('/nilai_matriks')
  };

  return (
    <div className="overflow-x-auto text-gray-100">
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Nama</th>
            <th className="border border-gray-400 px-4 py-2">C1</th>
            <th className="border border-gray-400 px-4 py-2">C2</th>
            <th className="border border-gray-400 px-4 py-2">C3</th>
            <th className="border border-gray-400 px-4 py-2">C4</th>
            <th className="border border-gray-400 px-4 py-2">C5</th>
            <th className="border border-gray-400 px-4 py-2">C6</th>
            <th className="border border-gray-400 px-4 py-2">C7</th>
            <th className="border border-gray-400 px-4 py-2">C8</th>
            <th className="border border-gray-400 px-4 py-2">C9</th>
            <th className="border border-gray-400 px-4 py-2">C10</th>
            <th className="border border-gray-400 px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="border  border-gray-400 px-4 py-2">
              {nama_alternatif}
            </td>
            {Matriks.length > 0 ? (
              Matriks.map((matriks, i) => (
                <td className="border text-gray-800 border-gray-200 px-4 py-2" key={i}>
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
                className="px-4 py-2 bg-blue-500 text-black rounded"
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

export default NilaiUpdate;
