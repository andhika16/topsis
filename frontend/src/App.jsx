import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlternatifForm from "./pages/AlternatifForm";
import KriteriaForm from "./pages/KriteriaForm";
import MatriksForm from "./pages/MatirksForm";
import AlternatifKriteria from "./pages/AlternatifKriteria";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alternatif" element={<AlternatifForm />} />
            <Route path="/kriteria" element={<KriteriaForm />} />
            <Route path="/matriks" element={<MatriksForm />} />
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
