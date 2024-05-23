import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beranda from "./pages/Beranda";
import SideBar from "./components/SideBar";
import AlternatifKriteria from "./pages/Alternatif/AlternatifKriteria";
import DispatchData from "./pages/Dispatch/DispatchData";
import NilaiMatriks from "./pages/Nilai/NilaiMatriks";
import NilaiEdit from "./pages/Nilai/NilaiEdit";
import Penilaian from "./pages/Nilai/Penilaian";
import AlternatifForm from "./pages/Alternatif/AlternatifForm";

function App() {
  DispatchData(); // data untuk menjalanakan react context hook
  return (
    <div className="App">
      <BrowserRouter>
        <div className=""></div>
        <div className="flex">
          <SideBar />
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/alternatif_form" element={<AlternatifForm />} />
            <Route path="/nilai_matriks" element={<NilaiMatriks />} />
            <Route path="/penilaian" element={<Penilaian />} />
            <Route
              path="/alternatifKriteria/:id"
              element={<AlternatifKriteria />}
            />
            <Route path="/nilai_matriks/:id" element={<NilaiEdit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
