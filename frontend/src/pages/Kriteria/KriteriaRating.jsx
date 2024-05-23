// file: src/components/CriteriaRatingForm.js

import React, { useState } from "react";

const KriteriaRating = () => {
  const [ratings, setRatings] = useState({
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
    setRatings({
      ...ratings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data penilaian, misalnya mengirim ke backend
    console.log("Penilaian:", ratings);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl mb-6 text-center">Form Penilaian Kriteria</h2>
        {Object.keys(ratings).map((criteria) => (
          <div key={criteria} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
              {criteria.replace(/([A-Z])/g, " $1")}
            </label>
            <select
              name={criteria}
              value={ratings[criteria]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Pilih Penilaian</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default KriteriaRating;
