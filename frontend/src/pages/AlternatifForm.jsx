import React, { useEffect, useState } from "react";

const AlternatifForm = () => {
  const [formData, setFormData] = useState({
    nama_alternatif: "",
    no_kk: "",
    jenis_kelamin: "laki-laki",
    alamat: "",
    no_telp: "",
    pekerjaan: "",
  });

  useEffect(() => {
    window.location.reload;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    fetch("http://localhost:4000/alternatif", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data Alternatif berhasil dikirim:", data);
        // Tambahkan logika atau pembaruan UI sesuai kebutuhan
      })
      .catch((error) => {
        console.error("Gagal mengirim data Alternatif:", error);
      });
  };

  return (
    <div className="w-auto m-5 p-4 rounded-lg  bg-slate-200">
      <form className="" action="">
        <label htmlFor="nama_alternatif">Nama Alternatif:</label>
        <input
          className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
          type="text"
          id="nama_alternatif"
          name="nama_alternatif"
          onChange={handleChange}
          value={formData.nama_alternatif}
          required
        />

        <label htmlFor="no_kk">Nomor KK:</label>
        <input
          className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
          type="text"
          id="no_kk"
          name="no_kk"
          onChange={handleChange}
          value={formData.no_kk}
          required
        />

        <label>Jenis Kelamin :</label>
        <select
          value={formData.jenis_kelamin}
          className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
          onChange={handleChange}
          name="jenis_kelamin"
          id="jenisKelamin"
        >
          <option value="laki-laki">laki-laki</option>
          <option value="perempuan">perempuan</option>
        </select>

        <label htmlFor="alamat">Alamat:</label>
        <input
          className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
          id="alamat"
          name="alamat"
          onChange={handleChange}
          value={formData.alamat}
          required
        />

        <label htmlFor="no_telp">Nomor Telepon:</label>
        <input
          className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
          type="text"
          id="no_telp"
          name="no_telp"
          onChange={handleChange}
          value={formData.no_telp}
          required
        />

        <label htmlFor="pekerjaan">Pekerjaan:</label>
        <input
          className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full h-10 sm:max-w-md"
          type="text"
          id="pekerjaan"
          name="pekerjaan"
          onChange={handleChange}
          value={formData.pekerjaan}
          required
        />

        {/* Tambahan input sesuai kebutuhan (misalnya, tanggal lahir, dll.) */}

        <button
          className="bg-green-400 my-3 rounded-lg px-5 py-2 "
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AlternatifForm;
