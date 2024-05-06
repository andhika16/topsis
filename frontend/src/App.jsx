import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Beranda from "./pages/Beranda";
import SideBar from "./components/SideBar";
import Test from "./pages/Alternatif/Test";
import KriteriaForm from "./pages/Kriteria/KriteriaForm";
import MatriksForm from "./pages/Matriks/MatriksForm";
import { useAlternatifContext } from "./hooks/useAlternatifContext";
import AlternatifForm from "./pages/Alternatif/AlternatifForm";
import AlternatifKriteria from "./pages/Alternatif/AlternatifKriteria";
import { useKriteriaContext } from "./hooks/useKriteriaContext";
function App() {
  const { alternatifDispatch } = useAlternatifContext();
  useEffect(() => {
    const fetchDataAlternatif = async () => {
      try {
        const response = await fetch("http://localhost:4000/alternatif/");
        const { data } = await response.json();
        alternatifDispatch({ type: "SET_ALTERNATIF", payload: data });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetching data was cancelled");
        } else {
          throw error;
        }
      }
    };
    fetchDataAlternatif();
  }, []); // Dependency array kosong agar hanya dijalankan sekali
  const { kriteriaDispatch } = useKriteriaContext();
  useEffect(() => {
    const fetchDataAlternatif = async () => {
      try {
        const response = await fetch("http://localhost:4000/kriteria/");
        const { data } = await response.json();
        kriteriaDispatch({ type: "SET_KRITERIA", payload: data });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetching data was cancelled");
        } else {
          throw error;
        }
      }
    };
    fetchDataAlternatif();
  }, []);

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
