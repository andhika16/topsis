// src/pages/NotFound.js

import React from 'react';

const NotFound = () => {
  return (
    <div className="flex  items-center justify-center w-screen h-screen bg-gray-900 text-white">
      <div className="text-center">
        <i className="fas fa-exclamation-triangle text-yellow-500 text-[250px] "></i>
        <h1 className="text-8xl font-bold mb-2">404</h1>
        <p className="text-5xl font-semibold  mb-16">Maaf, halaman yang anda cari tidak ditemukan</p>
        <a
          href="/"
          className="text-lg bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
        >
          Kembali ke menu utama
        </a>
      </div>
    </div>
  );
};

export default NotFound;
