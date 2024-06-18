import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beranda from "./pages/Beranda";
import SideBar from "./components/SideBar";
import NilaiMatriks from "./pages/Nilai/NilaiMatriks";
import NilaiUpdate from "./pages/Nilai/NilaiUpdate";
import NilaiForm from "./pages/Nilai/NilaiForm";
import NilaiBobotUpdate from "./pages/Nilai/NilaiBobotUpdate";
import AlternatifForm from "./pages/Alternatif/AlternatifForm";
import AlternatifDetail from "./pages/Alternatif/AlternatifDetail";
import AlternatifUpdate from "./pages/Alternatif/AlternatifUpdate";
import AlternatifKriteria from "./pages/Alternatif/alternatifKriteria";
import RankingTable from "./pages/Nilai/Rangking";

function App() {
  return (
    <div className="App bg-gray-900">
      <BrowserRouter>
        <div className=""></div>
        <div className="flex">
          <SideBar />
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/alternatif_form" element={<AlternatifForm />} />
            <Route path="/data_penduduk" element={<AlternatifDetail />} />
            <Route path="/alternatif-edit/:id" element={<AlternatifUpdate />} />
            <Route
              path="/alternatif_kriteria/:id"
              element={<AlternatifKriteria />}
            />
            <Route path="/bobot" element={<NilaiBobotUpdate />} />
            <Route path="/nilai_matriks" element={<NilaiMatriks />} />
            <Route path="/nilai_matriks/:id" element={<NilaiUpdate />} />
            <Route path="/penilaian" element={<NilaiForm />} />
            <Route path="/rangking" element={<RankingTable />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
