import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beranda from "./pages/Beranda";
import SideBar from "./components/SideBar";
import KriteriaForm from "./pages/Kriteria/KriteriaForm";
import MatriksForm from "./pages/Matriks/MatriksForm";
import AlternatifForm from "./pages/Alternatif/AlternatifForm";
import AlternatifKriteria from "./pages/Alternatif/AlternatifKriteria";
import DispatchData from "./pages/Dispatch/DispatchData";
import DispatchNilaiData from "./pages/Dispatch/DispatchNilaiData";

function App() {
  DispatchData(); // data untuk menjalanakan react context hook
  DispatchNilaiData();
  return (
    <div className="App">
      <BrowserRouter>
        <div className=""></div>
        <div className="flex">
          <SideBar />
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/kriteria_form" element={<KriteriaForm />} />
            <Route path="/matriks_form" element={<MatriksForm />} />
            <Route path="/alternatif_form" element={<AlternatifForm />} />
            <Route
              path="/alternatifKriteria/:id"
              element={<AlternatifKriteria />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
