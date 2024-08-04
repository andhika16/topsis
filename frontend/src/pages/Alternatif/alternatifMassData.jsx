import React, { useState } from "react";

export default function AlternatifMassData() {
  const [nama_alternatif, setNama] = useState("");
  const [no_kk, setNoKk] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [no_nik, setNoNik] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [tempat_tgl_lahir, setTempatTglLahir] = useState("");
  const [RT, setRt] = useState("");
  const [RW, setRw] = useState("");
  const [jalan, setJalan] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      nama_alternatif,
      no_kk,
      jenis_kelamin,
      no_nik,
      pekerjaan,
      tempat_tgl_lahir,
      RT,
      jalan,
      RW,
    };

    const response = await fetch(
      "http://localhost:4000/alternatif/data-banyak",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100  items-center justify-center">
      <h1 className="bg-white uppercase text-lg">Input banyak data</h1>
      <div className="bg-white p-6 rounded-lg  shadow-lg ">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 space-x-4 grid grid-cols-3"
        >
          <div>
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-700"
            >
              Nama
            </label>
            <textarea
              id="nama"
              className="w-full p-2 border border-gray-300 rounded"
              value={nama_alternatif}
              onChange={(e) => setNama(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="noKk"
              className="block text-sm font-medium text-gray-700"
            >
              No. KK
            </label>
            <textarea
              id="noKk"
              className="w-full p-2 border border-gray-300 rounded"
              value={no_kk}
              onChange={(e) => setNoKk(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="jenisKelamin"
              className="block text-sm font-medium text-gray-700"
            >
              Jenis Kelamin
            </label>
            <textarea
              id="jenisKelamin"
              className="w-full p-2 border border-gray-300 rounded"
              value={jenis_kelamin}
              onChange={(e) => setJenisKelamin(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="noNik"
              className="block text-sm font-medium text-gray-700"
            >
              No. NIK
            </label>
            <textarea
              id="noNik"
              className="w-full p-2 border border-gray-300 rounded"
              value={no_nik}
              onChange={(e) => setNoNik(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="pekerjaan"
              className="block text-sm font-medium text-gray-700"
            >
              Pekerjaan
            </label>
            <textarea
              id="pekerjaan"
              className="w-full p-2 border border-gray-300 rounded"
              value={pekerjaan}
              onChange={(e) => setPekerjaan(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="tempatTglLahir"
              className="block text-sm font-medium text-gray-700"
            >
              Tempat & Tanggal Lahir
            </label>
            <textarea
              id="tempatTglLahir"
              className="w-full p-2 border border-gray-300 rounded"
              value={tempat_tgl_lahir}
              onChange={(e) => setTempatTglLahir(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="rt"
              className="block text-sm font-medium text-gray-700"
            >
              RT
            </label>
            <textarea
              id="rt"
              className="w-full p-2 border border-gray-300 rounded"
              value={RT}
              onChange={(e) => setRt(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="rw"
              className="block text-sm font-medium text-gray-700"
            >
              RW
            </label>
            <textarea
              id="rw"
              className="w-full p-2 border border-gray-300 rounded"
              value={RW}
              onChange={(e) => setRw(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="jalan"
              className="block text-sm font-medium text-gray-700"
            >
              Jalan
            </label>
            <textarea
              id="jalan"
              className="w-full p-2 border border-gray-300 rounded"
              value={jalan}
              onChange={(e) => setJalan(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
