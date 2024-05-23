import React, { useState, useEffect } from "react";
import {
  penghasilanAttributes,
  pekerjaanAttributes,
  pendidikanAttributes,
  criteriaOptions,
  bobotValues,
} from "../../assets/atributKriteria";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";
const KriteriaForm = ({ alternatif }) => {
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedAlternatif, setSelectedAlternatif] = useState("");
  const [bobot, setBobot] = useState("");
  const { alternatifState } = useAlternatifContext();
  const handleSubmit = async () => {
    if (
      selectedAlternatif &&
      selectedCriteria &&
      selectedAttribute &&
      bobot !== ""
    ) {
      const data = {
        nama_kriteria: selectedCriteria,
        AlternatifId: selectedAlternatif,
        sifat: selectedAttribute,
        bobot: bobot,
      };
      try {
        const response = await fetch("http://localhost:4000/kriteria", {
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
    } else {
      console.log("harap lengkapi data");
      console.log(selectedAlternatif);
      console.log(selectedAttribute);
      console.log(selectedCriteria);
    }
  };

  const handleAlternatifChange = (e) => {
    const selectedAlternatif = e.target.value;
    setSelectedAlternatif(selectedAlternatif);
  };

  const handleCriteriaChange = (e) => {
    const selectedCriteria = e.target.value;
    setSelectedCriteria(selectedCriteria);
    setSelectedAttribute("");
    setBobot("");
  };

  const handleAttributeChange = (e) => {
    const selectedAttribute = e.target.value;
    setSelectedAttribute(selectedAttribute);
    setBobot(bobotValues[selectedCriteria][selectedAttribute]);
  };

  return (
    <div className="m-5">
      <label htmlFor="">Pilih penduduk yang akan dinilai:</label>
      <select
        className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
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
        className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
        value={selectedCriteria}
        onChange={handleCriteriaChange}
      >
        <option value="">-- Pilih Kriteria --</option>
        {criteriaOptions.map((criteria) => (
          <option key={criteria} value={criteria}>
            {criteria}
          </option>
        ))}
      </select>

      {selectedCriteria && (
        <>
          <label>Pilih Sifat:</label>
          <select
            className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
            value={selectedAttribute}
            onChange={handleAttributeChange}
          >
            <option value="">-- Pilih Sifat --</option>
            {selectedCriteria === "Pekerjaan" &&
              pekerjaanAttributes.map((attribute) => (
                <option key={attribute} value={attribute}>
                  {attribute}
                </option>
              ))}
            {selectedCriteria === "Pendidikan" &&
              pendidikanAttributes.map((attribute) => (
                <option key={attribute} value={attribute}>
                  {attribute}
                </option>
              ))}
            {selectedCriteria === "Penghasilan" &&
              penghasilanAttributes.map((attribute) => (
                <option key={attribute} value={attribute}>
                  {attribute}
                </option>
              ))}
          </select>

          {selectedAttribute && (
            <>
              <label>
                Bobot Nilai:
                <input
                  className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
                  type="text"
                  value={bobot}
                  readOnly
                />
              </label>

              <button
                className="p-2 my-2 rounded-md bg-green-500"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default KriteriaForm;
