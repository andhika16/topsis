import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AlternatifForm = ({ editMode, initialData }) => {
  const { addData, updateData, state, loading, error } = useAlternatifContext();
  const { data: alternatifData } = state;
  const navigate = useNavigate();

  const initialFormData = {
    nama_alternatif: "",
    no_kk: "",
    jenis_kelamin: "laki-laki",
    alamat: "",
    no_nik: "",
    pekerjaan: "",
  };


  const [formData, setFormData] = useState(initialFormData);
  useEffect(() => {
    if (editMode && initialData) {
      setFormData(initialData);
    }
  }, [editMode, initialData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async () => {
    const invalidFields = validateFormData(formData);

    if (invalidFields.length > 0) {
      invalidFields.forEach((field) => {
        toast.error(`Harap isi field ${field}.`, {
          className: "text-xl p-2 w-50",
          bodyClassName: "text-xl",
          autoClose: 3000,
        });
      });
      return;
    }

    // Validasi untuk menambah data baru
    if (!editMode && isDuplicate(formData)) {
      toast.error(`Nik atau KK sudah terdaftar `, {
        className: "text-xl p-2 w-50",
        bodyClassName: "text-xl",
        autoClose: 3000,
      });
      return;
    }

    try {
      if (editMode) {
        await updateData(initialData.id, formData);
      } else {
        await addData(formData);
      }
      toast.success(
        editMode
          ? "Data telah berhasil diupdate!"
          : "Data telah berhasil ditambahkan!",
        {
          className: "bg-green-500 text-white",
          progressClassName: "bg-white",
          autoClose: 3000,
        }
      );

      navigate("/data_penduduk");
    } catch (error) {
      console.error("Error while submitting:", error);
      toast.error("Gagal menambahkan data.");
    }
  };

  const validateFormData = (data) => {
    const invalidFields = [];
    const { nama_alternatif, no_kk, no_nik, jenis_kelamin, alamat, pekerjaan } =
      data;
    if (!nama_alternatif) invalidFields.push("Nama Penduduk");
    if (!no_kk) invalidFields.push("Nomor KK");
    if (!no_nik) invalidFields.push("No NIK");
    if (!jenis_kelamin) invalidFields.push("Jenis Kelamin");
    if (!alamat) invalidFields.push("Alamat");
    if (!pekerjaan) invalidFields.push("Pekerjaan");

    return invalidFields;
  };

  const isDuplicate = (data = null) => {
    const { no_kk, no_nik } = data;
    return alternatifData.some(
      (item) => item.no_kk === no_kk || item.no_nik === no_nik
    );
  };

  const handleReset = () => {
    setFormData(editMode && initialData ? initialData : initialFormData);
  };

  return (
    <div className="mx-12 mt-5">
      <ToastContainer />
      <div className="text-lg text-gray-100 font-semibold">
        <h1>
          {editMode ? "Edit" : "Tambah"} Form Penduduk Sistem Pendukung
          Keputusan
        </h1>
      </div>
      <form className="text-gray-100 font-semibold" action="">
        <label htmlFor="nama_alternatif">Nama Penduduk:</label>
        <input
          className="flex text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset w-full h-10 sm:max-w-md"
          type="text"
          id="nama_alternatif"
          name="nama_alternatif"
          onChange={handleChange}
          value={formData.nama_alternatif}
          required
        />

        <label htmlFor="no_kk">Nomor KK:</label>
        <input
          className="flex text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset w-full h-10 sm:max-w-md"
          type="text"
          id="no_kk"
          name="no_kk"
          maxLength={16}
          onChange={handleChange}
          value={formData.no_kk}
          required
        />
        <label htmlFor="no_nik">No NIK:</label>
        <input
          className="flex text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset w-full h-10 sm:max-w-md"
          type="text"
          id="no_nik"
          name="no_nik"
          maxLength={16}
          onChange={handleChange}
          value={formData.no_nik}
          required
        />
        <label>Jenis Kelamin :</label>
        <select
          value={formData.jenis_kelamin}
          className="flex text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset w-full h-10 sm:max-w-md"
          onChange={handleChange}
          name="jenis_kelamin"
          id="jenisKelamin"
        >
          <option value="laki-laki">laki-laki</option>
          <option value="perempuan">perempuan</option>
        </select>

        <label htmlFor="alamat">Alamat:</label>
        <input
          className="flex text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset w-full h-10 sm:max-w-md"
          id="alamat"
          name="alamat"
          onChange={handleChange}
          value={formData.alamat}
          required
        />

        <label htmlFor="pekerjaan">Pekerjaan:</label>
        <input
          className="flex text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset w-full h-10 sm:max-w-md"
          type="text"
          id="pekerjaan"
          name="pekerjaan"
          onChange={handleChange}
          value={formData.pekerjaan}
          required
        />

        <div className="flex space-x-4 py-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white  shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            type="button"
            onClick={handleSubmit}
          >
            {editMode ? "Simpan Perubahan" : "Submit"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white  shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlternatifForm;
