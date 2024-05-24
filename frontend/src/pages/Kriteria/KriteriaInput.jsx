import React, { useState } from "react";

const CriteriaForm = () => {
  const [criteriaName, setCriteriaName] = useState("");
  const [traits, setTraits] = useState([""]);

  const handleCriteriaNameChange = (e) => {
    setCriteriaName(e.target.value);
  };

  const handleTraitChange = (index, e) => {
    const newTraits = [...traits];
    newTraits[index] = e.target.value;
    setTraits(newTraits);
  };

  const addTrait = () => {
    setTraits([...traits, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Criteria Name:", criteriaName);
    console.log("Traits:", traits);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Form Kriteria</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Kriteria:</label>
          <input
            type="text"
            value={criteriaName}
            onChange={handleCriteriaNameChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Sifat:</label>
          {traits.map((trait, index) => (
            <input
              key={index}
              type="text"
              value={trait}
              onChange={(e) => handleTraitChange(index, e)}
              className="w-full px-3 py-2 border rounded-md mt-2"
            />
          ))}
          <button
            type="button"
            onClick={addTrait}
            className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            Tambah Sifat
          </button>
        </div>
        <button
          type="submit"
          className="w-full px-3 py-2 bg-green-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CriteriaForm;
