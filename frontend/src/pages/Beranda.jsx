import React from "react";
import { useAlternatifContext } from "../hooks/useAlternatifContext";
import { Link } from "react-router-dom";
const Beranda = () => {
  const { state } = useAlternatifContext();
  const totalAlternatif = state.data.length;
  return (
    <div className="w-full bg-slate-200 px-20 pt-10">
      <div className="flex space-x-3.5">
        <Link
          to={"/data_penduduk"}
          className="block bg-yellow-500 shadow-md rounded-lg p-6 mb-4 text-xl text-left font-mono  hover:bg-gray-100 transition-colors duration-300"
        >
          Total Penduduk: {totalAlternatif}
        </Link>
      </div>
    </div>
  );
};

export default Beranda;
