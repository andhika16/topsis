import React, { useState, useEffect } from "react";
import { useNilaiContext } from "../../hooks/useNilaiContext";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";

const KriteriaSatu = () => {
  const [formData, setFormData] = useState({});
  const [alternatifId, setAlternatifId] = useState("");
  const { state: kategori ,addData} = useNilaiContext();
  const { state: alternatif } = useAlternatifContext();

  const kriteriaData = kategori.data;
  const alternatifData = alternatif.data;
  useEffect(() => {
    if (Array.isArray(kriteriaData) && kriteriaData.length > 0) {
      const initialFormData = kriteriaData.reduce((acc, curr) => {
        acc[curr.nama] = "";
        return acc;
      }, {});
      setFormData(initialFormData);
    }
  }, [kriteriaData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAlternatifChange = (e) => {
    setAlternatifId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = Object.entries(formData).map(([key, value]) => {
      const kriteria = kriteriaData.find((kriteria) => kriteria.nama === key);
      const opsiTerpilih = kriteria.opsi.find((option) => option.value === value);
    
      return {
        id_nilai: opsiTerpilih ? opsiTerpilih.id : null, // id opsi yang dipilih
        id_alternatif: parseInt(alternatifId),
        nilai: opsiTerpilih ? opsiTerpilih.value : 0, // nilai opsi yang dipilih
        normalisasi: 0, // Nilai ini perlu dihitung di server
        terbobot: 0, // Nilai ini perlu dihitung di server
        nilai_akhir: 0, // Nilai ini perlu dihitung di server
        rank: 0, // Nilai ini perlu dihitung di server
      };
    });

    try {
      // await addData(dataToSend)
      console.log(dataToSend);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Form Input Kriteria</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Pilih Alternatif
          </label>
          <select
            value={alternatifId}
            onChange={handleAlternatifChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Pilih Alternatif</option>
            {alternatifData.map((alt) => (
              <option key={alt.id} value={alt.id}>
                {alt.nama_alternatif}
              </option>
            ))}
          </select>
        </div>

        {Array.isArray(kriteriaData) && kriteriaData.length > 0 ? (
          kriteriaData.map((kriteria, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {kriteria.nama}
              </label>
              <select
                name={kriteria.nama}
                value={formData[kriteria.nama] || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Pilih {kriteria.nama}</option>
                {kriteria.opsi.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))
        ) : (
          <div className="text-gray-700 font-medium">
            Tidak ada data kriteria tersedia.
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default KriteriaSatu;
