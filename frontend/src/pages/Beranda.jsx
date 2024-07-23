import React from "react";
import { useAlternatifContext } from "../hooks/useAlternatifContext";
import { useNilaiContext } from "../hooks/useNilaiContext";
import { Link } from "react-router-dom";

const Beranda = () => {
  const { state: alternatifState } = useAlternatifContext();
  const { state: nilaiState } = useNilaiContext();
  const totalAlternatif = alternatifState?.data?.length || 0;
  const totalNilai = nilaiState.data.filter((item) => item.Matriks?.length !== 0);

  
  

  

  return (
    <div className="w-full bg-slate-900 px-20 pt-10">
      <div className="flex  space-x-4 ">
        <Link
          to={"/data_penduduk"}
          className="w-80 shadow-md bg-red-900 rounded  mb-4  transition duration-300 ease-in-out relative"
        >
          <div className="flex flex-col text-white text-opacity-70 p-2 space-y-2">
            <span className="text-6xl  font-semibold">{totalAlternatif}</span>
            <span className="text-lg font-medium ">Data Penduduk</span>
          </div>
          <i className="fa-solid fa-users text-8xl text-gray-100 text-opacity-20 absolute top-5 right-6"></i>
          <div className="block text-center text-white border-t hover:bg-gray-800 text-opacity-70 space-x-2 mt-4 p-1   min-w-full">
            <span className="font-semibold ">Selanjutnya</span>
            <i className="fa-solid fa-sign-in-alt"></i>
          </div>
        </Link>
        <Link
          to={"/nilai_matriks"}
          className="w-80 shadow-md bg-yellow-900 rounded  mb-4  transition duration-300 ease-in-out relative"
        >
          <div className="flex flex-col text-white text-opacity-70 p-2 space-y-2">
            <span className="text-6xl  font-semibold">{totalNilai.length}</span>
            <span className="text-lg font-medium ">Data Topsis</span>
          </div>
          <i className="fa-solid fa-chart-line text-8xl text-gray-100 text-opacity-40 absolute top-5 right-6"></i>
          <div className="block text-center text-white border-t hover:bg-gray-800 text-opacity-70 space-x-2 mt-4 p-1  min-w-full">
            <span className="font-semibold ">Selanjutnya</span>
            <i className="fa-solid fa-sign-in-alt"></i>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Beranda;
