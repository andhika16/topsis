import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beranda from "./pages/Beranda";
import SideBar from "./components/SideBar";
import NilaiMatriks from "./pages/Nilai/NilaiMatriks";
import NilaiUpdate from "./pages/Nilai/NilaiUpdate";
import NilaiForm from "./pages/Nilai/NilaiForm";
import AlternatifForm from "./pages/Alternatif/AlternatifForm";
import { AlternatifDetail } from "./pages/Alternatif/AlternatifDetail";
import AlternatifUpdate from "./pages/Alternatif/AlternatifUpdate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className=""></div>
        <div className="flex">
          <SideBar />
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/alternatif_form" element={<AlternatifForm />} />
            <Route path="/alternatif-edit/:id" element={<AlternatifUpdate />} />
            <Route path="/data_penduduk" element={<AlternatifDetail />} />
            <Route path="/nilai_matriks" element={<NilaiMatriks />} />
            <Route path="/penilaian" element={<NilaiForm />} />
            <Route path="/nilai_matriks/:id" element={<NilaiUpdate />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
