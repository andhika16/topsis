import React, { useState, useEffect } from "react";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";
const MatriksForm = () => {
  const [selectedAlternatif, setSelectedAlternatif] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [kriteriaAlternatif, setKriteriaAlternatif] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const { alternatifState } = useAlternatifContext();
  const handleSubmit = async () => {
    if (selectedValue !== "") {
      const data = {
        nilai: selectedValue,
        AlternatifId: selectedAlternatif,
        KriteriaId: selectedCriteria,
      };
      // Kirim data ke server
      try {
        const response = await fetch("http://localhost:4000/matriks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          await response.json();
        } else {
          console.error("Gagal mengirim data ke server.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleAlternatifChange = (e) => {
    const selectedAlternatif = e.target.value;
    setSelectedAlternatif(selectedAlternatif);
  };

  const handleCriteriaChange = (e) => {
    const selectedCriteria = e.target.value;
    setSelectedCriteria(selectedCriteria);
  };

  const handleDropdownChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className="w-1/2 mt-5 mx-12">
      <label htmlFor="">Pilih Alternatif:</label>
      <select
        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
        value={selectedAlternatif}
        onChange={handleAlternatifChange}
      >
        <option value="">-- Pilih Alternatif --</option>
        {alternatifState &&
          alternatifState.map((nama, i) => (
            <option key={i} value={nama.id}>
              {nama.nama_alternatif}
            </option>
          ))}
      </select>

      <label htmlFor="">Pilih Kriteria:</label>
      <select
        value={selectedCriteria}
        onChange={handleCriteriaChange}
        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
      >
        <option value="">-- Pilih Kriteria yang dinilai --</option>
        {kriteriaAlternatif ? (
          kriteriaAlternatif.Kriteria.map((criteria, i) => (
            <option key={i} value={criteria.id}>
              {criteria.nama_kriteria}
            </option>
          ))
        ) : (
          <option value="">kosong</option>
        )}
      </select>

      <label>Pilih Nilai (1-5):</label>
      <select
        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
        value={selectedValue}
        onChange={handleDropdownChange}
      >
        <option value="">-- Pilih Nilai --</option>
        {[1, 2, 3, 4, 5].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <button
        className="p-2 my-2 rounded-md bg-green-500"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default MatriksForm;
