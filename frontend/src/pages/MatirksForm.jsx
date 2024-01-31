import React, { useState, useEffect } from "react";
const KriteriaForm = ({ alternatif }) => {
  const [selectedAlternatif, setSelectedAlternatif] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [dataKriteria, setDataKriteria] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    const kriteria = async () => {
      try {
        const response = await fetch("http://localhost:4000/kriteria");
        if (response.ok) {
          const { data } = await response.json();
          setDataKriteria(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    kriteria();
  }, []);
  const handleSubmit = async () => {
    if (selectedValue !== "") {
      const data = {
        nilai: selectedValue,
        id_alternatif: selectedAlternatif,
        id_kriteria: selectedCriteria,
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
    <div className="m-5 p-4 rounded-lg  w-auto bg-slate-200">
      <label htmlFor="">Pilih Alternatif:</label>
      <select
        className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
        value={selectedCriteria}
        onChange={handleCriteriaChange}
      >
        <option value="">-- Pilih Kriteria --</option>
        {alternatif &&
          alternatif.map((nama) => (
            <option key={nama.id} value={nama.id}>
              {nama.nama_alternatif}
            </option>
          ))}
      </select>
      <label htmlFor="">Pilih Kriteria:</label>
      <select
        value={selectedAlternatif}
        onChange={handleAlternatifChange}
        className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
      >
        <option value="">-- Pilih Kriteria yang dinilai --</option>
        {dataKriteria &&
          dataKriteria.map((criteria, i) => (
            <option key={i} value={criteria.id}>
              {criteria.nama_kriteria}
            </option>
          ))}
      </select>

      <label>Pilih Nilai (1-5):</label>
      <select
        className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
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

export default KriteriaForm;
