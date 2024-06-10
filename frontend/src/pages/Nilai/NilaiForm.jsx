import React, { useState, useEffect } from "react";
import { useNilaiContext } from "../../hooks/useNilaiContext";
import { toast, ToastContainer } from "react-toastify";

const NilaiForm = () => {
  const [formData, setFormData] = useState({});
  const [alternatifId, setAlternatifId] = useState("");
  const { state, addData,fetchDataNilai } = useNilaiContext();
  const { kategoriOpsi: kriteria_data } = state;

  const nama_matriks = state.data.filter((item) => item.Matriks.length === 0);

  useEffect(() => {
    if (Array.isArray(kriteria_data) && kriteria_data.length > 0) {
      const initialFormData = kriteria_data.reduce((acc, curr) => {
        acc[curr.nama] = { value: "", id: null };
        return acc;
      }, {});
      setFormData(initialFormData);
    }
  }, [kriteria_data]);

  useEffect(() => {
    fetchDataNilai()
  },[])

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;
    const id = selectedOptions[0]?.getAttribute("data-id");

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { value: value, id: parseInt(id) },
    }));
  };

  const handleAlternatifChange = (e) => {
    setAlternatifId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let kriteria of kriteria_data) {
      if (nama_matriks.length === 0 || formData[kriteria.nama].value === "") {
        toast.error(`Silakan lengkapi semua formulir kriteria `, {
          className: "text-xl p-2 w-50",
          bodyClassName: "text-xl",
          autoClose: 3000,
        });
        return;
      }
    }

    const dataToSend = Object.entries(formData).map(([key, { value, id }]) => ({
      id_nilai: id ? parseInt(id) : null,
      id_alternatif: parseInt(alternatifId),
      nilai: parseInt(value),
      normalisasi: 0,
      terbobot: 0,
      nilai_akhir: 0,
      rank: 0,
    }));

    try {
      await addData(dataToSend);
      toast.success("Data telah berhasil ditambahkan!", {
        className: "bg-green-500 text-white",
        progressClassName: "bg-white",
        autoClose: 3000,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Terjadi kesalahan saat menambahkan data. Silakan coba lagi."
      );
    }
  };

  const handleReset = () => {
    const resetFormData = kriteria_data.reduce((acc, curr) => {
      acc[curr.nama] = { value: "", id: null };
      return acc;
    }, {});
    setFormData(resetFormData);
    setAlternatifId("");
  };

  return (
    <div className="p-4 max-w-xl ml-10">
      <ToastContainer />
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
            {nama_matriks.map((alt) => (
              <option key={alt.id} value={alt.id}>
                {alt.nama_alternatif}
              </option>
            ))}
          </select>
        </div>
        {Array.isArray(kriteria_data) && kriteria_data.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-y-0 gap-x-2">
            {kriteria_data.map((kriteria, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  {kriteria.nama}
                </label>
                <select
                  name={kriteria.nama}
                  value={formData[kriteria.nama]?.value || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Pilih {kriteria.nama}</option>
                  {kriteria.opsi.map((option, idx) => (
                    <option key={idx} value={option.value} data-id={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Reset
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-700 font-medium">
            Tidak ada data kriteria tersedia.
          </div>
        )}
      </form>
    </div>
  );
};

export default NilaiForm;
