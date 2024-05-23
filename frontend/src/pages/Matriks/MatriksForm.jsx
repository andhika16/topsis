import React, { useState, useEffect } from "react";
import { useNilaiContext } from "../../hooks/useNilaiContext";

const MatriksForm = () => {
  const [selectedAlternatif, setSelectedAlternatif] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [alternatifKriteria, setAlternatifKriteria] = useState([]);
  const { nilaiState } = useNilaiContext();

  // Update daftar kriteria terkait saat memilih alternatif
  const handleAlternatifChange = (e) => {
    const selectedAlternatif = e.target.value;
    setSelectedAlternatif(selectedAlternatif);

    const alternatif = nilaiState.find(
      (item) => item.nama_alternatif === selectedAlternatif
    );
    if (alternatif) {
      // Ambil kriteria dari alternatif yang dipilih
      const kriteriaAlternatif = alternatif.Kriteria;
      setAlternatifKriteria(kriteriaAlternatif);
    } else {
      setAlternatifKriteria([]);
    }
  };

  // Fungsi untuk mengirim data ke server
  const handleSubmit = async () => {
    if (
      selectedValue !== "" &&
      selectedAlternatif !== "" &&
      selectedCriteria !== ""
    ) {
      const alternatif = nilaiState.find(
        (item) => item.nama_alternatif === selectedAlternatif
      );
      if (alternatif) {
        const data = {
          nilai: selectedValue,
          AlternatifId: alternatif.id, // Menggunakan id alternatif
          KriteriaId: selectedCriteria,
        };
        // Periksa data sebelum dikirim ke server
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
    }
  };

  // Fungsi untuk mengubah nilai kriteria yang dipilih
  const handleCriteriaChange = (e) => {
    const selectedCriteria = e.target.value;
    setSelectedCriteria(selectedCriteria);
  };

  // Fungsi untuk mengubah nilai matriks yang dipilih
  const handleDropdownChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className="mt-5">
      <label htmlFor="">Pilih Alternatif:</label>
      <select
        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
        value={selectedAlternatif}
        onChange={handleAlternatifChange}
      >
        <option value="">-- Pilih Alternatif --</option>
        {nilaiState &&
          nilaiState.map((item) => (
            <option key={item.id} value={item.nama_alternatif}>
              {item.nama_alternatif}
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
        {alternatifKriteria.map((list, i) => (
          <option key={i} value={list.id}>
            {list.nama_kriteria}
          </option>
        ))}
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
