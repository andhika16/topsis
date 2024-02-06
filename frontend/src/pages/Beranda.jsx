import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
const Beranda = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-4 ${isSidebarOpen ? "" : "ml-64"}`}>
        <button onClick={toggleSidebar} className="mb-4 text-black">
          {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
        </button>
        {/* Konten utama aplikasi akan ditampilkan di sini */}
        <h1>Main Content</h1>
      </div>
    </div>
  );
};

export default Beranda;
