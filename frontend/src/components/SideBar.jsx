// Sidebar.js

import React, { useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const toggleSidebar = () => {
    setSidebarOpen(!isOpen);
  };

  return (
    <div
      className={`bg-gray-800 h-screen w-64 text-white p-4 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <button onClick={toggleSidebar} className="mb-4 text-white">
        {isOpen ? "Hide Sidebar" : "Show Sidebar"}
      </button>
      <h1 className="text-2xl font-semibold mb-4">Sidebar</h1>
      <ul>
        <li className="mb-2">
          <a href="#" className="hover:text-gray-300">
            Menu 1
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="hover:text-gray-300">
            Menu 2
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="hover:text-gray-300">
            Menu 3
          </a>
        </li>
        {/* Tambahkan menu lainnya sesuai kebutuhan */}
      </ul>
    </div>
  );
};

export default Sidebar;
