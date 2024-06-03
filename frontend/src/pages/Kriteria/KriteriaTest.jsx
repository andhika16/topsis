import React, { useState } from "react";
import { useKriteriaContext } from "../../hooks/useKriteriaContext";
const KriteriaForm = () => {
  const { kriteriaDispatch } = useKriteriaContext();

  const [formData, setFormData] = useState({
    nama_kriteria: "",
    jenis: "benefit", // Default value
    bobot: "",
    keterangan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted: ", formData);
    

    // You can send the form data to the backend here
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Input Form for Kriteria</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="nama_kriteria">
            Nama Kriteria:
          </label>
          <input
            type="text"
            id="nama_kriteria"
            name="nama_kriteria"
            value={formData.nama_kriteria}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            maxLength="50"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="jenis">
            Jenis:
          </label>
          <select
            id="jenis"
            name="jenis"
            value={formData.jenis}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            required
          >
            <option value="benefit">Benefit</option>
            <option value="cost">Cost</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="bobot">
            Bobot:
          </label>
          <input
            type="number"
            id="bobot"
            name="bobot"
            value={formData.bobot}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="keterangan">
            Keterangan:
          </label>
          <input
            type="text"
            id="keterangan"
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            maxLength="100"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default KriteriaForm;
