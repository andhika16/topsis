import React, { useEffect, useState } from "react";
import { useKriteriaContext } from "../../hooks/useKriteriaContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NilaiBobotUpdate() {
  const { state, updateData } = useKriteriaContext();
  const [localCategories, setLocalCategories] = useState([]);
  const [editMode, setEditMode] = useState(false); // State untuk menentukan apakah dalam mode edit atau tidak
  const navigate = useNavigate();
  useEffect(() => {
    setLocalCategories(state.data);
  }, [state.data]);

  const handleToggleEditMode = () => {
    setEditMode(!editMode); // Toggle mode edit
  };

  const handleBobotChange = (index, event) => {
    const newCategories = [...localCategories];
    const value = event.target.value;
    if (value === "" || (value >= 1 && value <= 5)) {
      newCategories[index].bobot = value;
      setLocalCategories(newCategories);
    }
  };

  const handleIncrease = (index) => {
    const newCategories = [...localCategories];
    const currentBobot = parseInt(newCategories[index].bobot, 10) || 0;
    const incrementedBobot = Math.min(currentBobot + 1, 5); // Ensure max 5
    newCategories[index].bobot = incrementedBobot.toString();
    setLocalCategories(newCategories);
  };

  const handleDecrease = (index) => {
    const newCategories = [...localCategories];
    const currentBobot = parseInt(newCategories[index].bobot, 10) || 0;
    const decrementedBobot = Math.max(currentBobot - 1, 1); // Ensure min 1
    newCategories[index].bobot = decrementedBobot.toString();
    setLocalCategories(newCategories);
  };

  const handleUpdate = () => {
    updateData(localCategories);
    toast.success("update berhasil!", {
      className: "bg-green-500 text-white",
      progressClassName: "bg-white",
      autoClose: 3000,
    });

    console.log(localCategories);
    // window.location.reload();
  };

  if (!localCategories.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto text-gray-100 p-4">
      <ToastContainer />
      <h1 className="text-3xl text-gray-100 font-bold mb-6">
        Penentuan Nilai Bobot Kriteria
      </h1>
      <table className="table-auto border-collapse border border-gray-400 w-full mb-6">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">No</th>
            <th className="border border-gray-400 px-4 py-2">Nama Kriteria</th>
            <th className="border border-gray-400 px-4 py-2">
              {editMode ? "Bobot" : "Nilai Bobot"}
            </th>
          </tr>
        </thead>
        <tbody>
          {localCategories.map((category, index) => (
            <tr key={category.id}>
              <td className="border border-gray-400 px-4 py-2">
                {category.id}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {category.nama}
              </td>
              <td
                className={`border border-gray-400 px-4 py-2  text-gray-${
                  editMode ? "900" : "100"
                }`}
              >
                {editMode ? (
                  <div className="flex items-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3"
                      onClick={() => handleDecrease(index)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={category.bobot}
                      onChange={(e) => handleBobotChange(index, e)}
                      className="w-full px-2 py-1 border text-center"
                      min="1"
                      max="5"
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3"
                      onClick={() => handleIncrease(index)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  category.bobot
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mb-4">
        <button
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ${
            editMode ? "" : "hidden"
          }`}
          onClick={handleUpdate}
        >
          Update All
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2"
          onClick={handleToggleEditMode}
        >
          {editMode ? "Kembali" : "Ubah Nilai Bobot"}
        </button>
      </div>
    </div>
  );
}

export default NilaiBobotUpdate;
