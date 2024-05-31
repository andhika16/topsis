import React, { useState } from "react";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";
import {
  penghasilanAttributes,
  pekerjaanAttributes,
  pendidikanAttributes,
  criteriaOptions,
} from "../../assets/atributKriteria";

const KriteriaForm = () => {
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedAlternatif, setSelectedAlternatif] = useState("");
  const [bobot, setBobot] = useState(3); // Nilai tetap 3
  const [nilaiMatriks, setNilaiMatriks] = useState("");

  const { state, addKriteria, addMatriks } = useAlternatifContext();

  const handleSubmit = async () => {
    if (
      selectedAlternatif &&
      selectedCriteria &&
      selectedAttribute &&
      nilaiMatriks !== ""
    ) {
      const kriteriaData = {
        nama_kriteria: selectedCriteria,
        AlternatifId: selectedAlternatif,
        sifat: selectedAttribute,
        bobot: bobot,
      };

      try {
        const kriteriaId = await addKriteria(kriteriaData);
        if (kriteriaId) {
          const matriksData = {
            KriteriaId: kriteriaId,
            AlternatifId: selectedAlternatif,
            nilai: nilaiMatriks,
          };
          await addMatriks(matriksData);
          // Reset form setelah submit sukses, jika perlu
          setSelectedCriteria("");
          setSelectedAttribute("");
          setNilaiMatriks("");
        } else {
          console.error("Gagal mendapatkan ID kriteria baru.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Harap lengkapi data");
    }
  };

  const handleAlternatifChange = (e) => {
    setSelectedAlternatif(e.target.value);
  };

  const handleCriteriaChange = (e) => {
    const selectedCriteria = e.target.value;
    setSelectedCriteria(selectedCriteria);
    setSelectedAttribute("");
  };

  const handleAttributeChange = (e) => {
    setSelectedAttribute(e.target.value);
  };

  const handleNilaiMatriksChange = (e) => {
    setNilaiMatriks(e.target.value);
  };

  return (
    <div className="m-5">
      <table className="w-full">
        <tbody>
          <tr>
            <td>
              <label htmlFor="alternatif" className="block mb-1">
                Pilih penduduk yang akan dinilai:
              </label>
            </td>
            <td>
              <select
                id="alternatif"
                className="form-select mb-3 w-full px-3 py-2 rounded-md shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                value={selectedAlternatif}
                onChange={handleAlternatifChange}
              >
                <option value="">-- Pilih Alternatif --</option>
                {state.data &&
                  state.data.map((nama) => (
                    <option key={nama.id} value={nama.id}>
                      {nama.nama_alternatif}
                    </option>
                  ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="kriteria" className="block mb-1">
                Pilih Kriteria:
              </label>
            </td>
            <td>
              <select
                id="kriteria"
                className="form-select mb-3 w-full px-3 py-2 rounded-md shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
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
            </td>
          </tr>
          {selectedCriteria && (
            <>
              <tr>
                <td>
                  <label htmlFor="sifat" className="block mb-1">
                    Pilih Sifat:
                  </label>
                </td>
                <td>
                  <select
                    id="sifat"
                    className="form-select mb-3 w-full px-3 py-2 rounded-md shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
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
                </td>
              </tr>
              {selectedAttribute && (
                <tr>
                  <td>
                    <label htmlFor="nilaiMatriks" className="block mb-1">
                      Pilih Nilai Matriks:
                    </label>
                  </td>
                  <td>
                    <select
                      id="nilaiMatriks"
                      className="form-select mb-3 w-full px-3 py-2 rounded-md shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                      value={nilaiMatriks}
                      onChange={handleNilaiMatriksChange}
                    >
                      <option value="">-- Pilih Nilai Matriks --</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>

      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
        onClick={handleSubmit}
        disabled={
          !(selectedAlternatif && selectedCriteria && selectedAttribute && nilaiMatriks !== "")
        }
      >
        Submit
      </button>
    </div>
  );
};

export default KriteriaForm;
