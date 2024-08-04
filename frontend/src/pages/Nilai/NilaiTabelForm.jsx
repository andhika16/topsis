import React, { useState, useEffect } from "react";
import { useNilaiContext } from "../../hooks/useNilaiContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
// FIXME:masih belum selesai
const NilaiTabelForm = () => {
  const { state, addData, fetchDataNilai } = useNilaiContext();
  const { kategoriOpsi: kriteria_data } = state;
  const nama_matriks = state.data.filter((item) => item.Matriks?.length === 0);
  const check_alternatif = state.data.length === 0;

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (
      Array.isArray(kriteria_data) &&
      kriteria_data.length > 0 &&
      nama_matriks.length > 0
    ) {
      const initialFormData = nama_matriks.reduce((acc, alt) => {
        acc[alt.id] = kriteria_data.reduce((kAcc, kriteria) => {
          kAcc[kriteria.nama] = { value: "", id: null };
          return kAcc;
        }, {});
        return acc;
      }, {});
      setFormData(initialFormData);
    }
  }, [kriteria_data, nama_matriks]);

  useEffect(() => {
    fetchDataNilai();
  }, []);

  const handleChange = (e, altId) => {
    const { name, value, selectedOptions } = e.target;
    const id = selectedOptions[0]?.getAttribute("data-id");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [altId]: {
        ...prevFormData[altId],
        [name]: { value: value, id: parseInt(id) },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let altId in formData) {
      for (let kriteria of kriteria_data) {
        if (formData[altId][kriteria.nama].value === "") {
          toast.error(
            `Silakan lengkapi semua formulir kriteria untuk alternatif ${altId}`,
            {
              className: "text-xl p-2 w-50",
              bodyClassName: "text-xl",
              autoClose: 3000,
            }
          );
          return;
        }
      }
    }

    const dataToSend = [];

    for (let altId in formData) {
      for (let [key, { value, id }] of Object.entries(formData[altId])) {
        dataToSend.push({
          id_nilai: id ? parseInt(id) : null,
          id_alternatif: parseInt(altId),
          nilai: parseInt(value),
          normalisasi: 0,
          terbobot: 0,
          nilai_akhir: 0,
          rank: 0,
        });
      }
    }

    try {
      await addData(dataToSend);

      toast.success("Data telah berhasil ditambahkan!", {
        className: "bg-green-500 text-white",
        progressClassName: "bg-white",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Terjadi kesalahan saat menambahkan data. Silakan coba lagi."
      );
    }
  };

  const handleReset = () => {
    const resetFormData = nama_matriks.reduce((acc, alt) => {
      acc[alt.id] = kriteria_data.reduce((kAcc, kriteria) => {
        kAcc[kriteria.nama] = { value: "", id: null };
        return kAcc;
      }, {});
      return acc;
    }, {});
    setFormData(resetFormData);
  };

  return (
    <div className="p-4 ml-10">
      <ToastContainer />
      <h2 className="text-xl text-gray-200 font-bold mb-4">
        Form Input Kriteria
      </h2>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Nama Alternatif</th>
              {kriteria_data.map((kriteria) => (
                <th key={kriteria.nama}>{kriteria.nama}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {check_alternatif || nama_matriks.length === 0 ? (
              <tr className="border-b text-sm border-gray-200">
                <td colSpan={kriteria_data.length + 1}>
                  <span className="text-center text-red-700 font-medium">
                    Tidak ada data, silakan isi data penduduk atau tambahkan
                    alternatif yang belum terisi nilai matriks
                  </span>
                  <br />
                  <span className="text-blue-700 text-center">
                    <Link to={"/alternatif_form"}>
                      Silahkan isi data penduduk
                    </Link>
                  </span>
                  <br />
                  <span className="text-blue-700 text-center">
                    <Link to={"/penilaian"}>Silahkan isi data nilai</Link>
                  </span>
                </td>
              </tr>
            ) : (
              nama_matriks.map((alt) => (
                <tr key={alt.id}>
                  <td>{alt.nama_alternatif}</td>
                  {kriteria_data.map((kriteria, index) => (
                    <td key={index}>
                      <select
                        value={formData[alt.id]?.[kriteria.nama]?.value}
                        onChange={(e) => handleChange(e, alt.id)}
                        className="w-full px-3 py-2 border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option name={kriteria.nama} value="">
                          {kriteria.nama}
                        </option>
                        {kriteria.opsi.map((option, idx) => (
                          <option
                            key={idx}
                            value={option.value}
                            data-id={option.id}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default NilaiTabelForm;
