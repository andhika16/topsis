// file: src/components/Kriteria.js

import React, { useState } from "react";

const Kriteria = () => {
  const [criteria, setCriteria] = useState({
    penghasilan: "",
    luasRumah: "",
    jenisDinding: "",
    lantai: "",
    pekerjaan: "",
    pendidikan: "",
    hartaBenda: "",
    peneranganRumah: "",
    jumlahKeluarga: "",
    aksesKesehatan: "",
  });

  const handleChange = (e) => {
    setCriteria({
      ...criteria,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data kriteria, misalnya mengirim ke backend
    console.log("Kriteria:", criteria);
  };

  return (
    <div className="flex space-x-3 mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl mb-6 text-center">Form Kriteria</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Penghasilan:
          </label>
          <select
            name="penghasilan"
            value={criteria.penghasilan}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Penghasilan</option>
            <option value="rendah">Rendah</option>
            <option value="sedang">Sedang</option>
            <option value="tinggi">Tinggi</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Luas Rumah:
          </label>
          <select
            name="luasRumah"
            value={criteria.luasRumah}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Luas Rumah</option>
            <option value="kecil">Kecil</option>
            <option value="sedang">Sedang</option>
            <option value="besar">Besar</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Jenis Dinding:
          </label>
          <select
            name="jenisDinding"
            value={criteria.jenisDinding}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Jenis Dinding</option>
            <option value="bambu">Bambu</option>
            <option value="kayu">Kayu</option>
            <option value="bata">Bata</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Lantai:
          </label>
          <select
            name="lantai"
            value={criteria.lantai}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Jenis Lantai</option>
            <option value="tanah">Tanah</option>
            <option value="semen">Semen</option>
            <option value="keramik">Keramik</option>
          </select>
        </div>
      </form>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Pekerjaan:
          </label>
          <select
            name="pekerjaan"
            value={criteria.pekerjaan}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Pekerjaan</option>
            <option value="pengangguran">Pengangguran</option>
            <option value="pekerjaKasual">Pekerja Kasual</option>
            <option value="pekerjaTetap">Pekerja Tetap</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Pendidikan:
          </label>
          <select
            name="pendidikan"
            value={criteria.pendidikan}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Pendidikan</option>
            <option value="sd">SD</option>
            <option value="smp">SMP</option>
            <option value="sma">SMA</option>
            <option value="sarjana">Sarjana</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Harta Benda:
          </label>
          <select
            name="hartaBenda"
            value={criteria.hartaBenda}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Harta Benda</option>
            <option value="sedikit">Sedikit</option>
            <option value="sedang">Sedang</option>
            <option value="banyak">Banyak</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Penerangan Rumah:
          </label>
          <select
            name="peneranganRumah"
            value={criteria.peneranganRumah}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Penerangan Rumah</option>
            <option value="listrik">Listrik</option>
            <option value="lampuMinyak">Lampu Minyak</option>
            <option value="tanpaPenerangan">Tanpa Penerangan</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Jumlah Keluarga:
          </label>
          <select
            name="jumlahKeluarga"
            value={criteria.jumlahKeluarga}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Jumlah Keluarga</option>
            <option value="sedikit">Sedikit</option>
            <option value="sedang">Sedang</option>
            <option value="banyak">Banyak</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Akses Kesehatan:
          </label>
          <select
            name="aksesKesehatan"
            value={criteria.aksesKesehatan}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Pilih Akses Kesehatan</option>
            <option value="mudah">Mudah</option>
            <option value="sedang">Sedang</option>
            <option value="sulit">Sulit</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Kriteria;
