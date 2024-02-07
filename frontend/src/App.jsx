import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAlternatifContext } from "./hooks/useAlternatifContext";

import Beranda from "./pages/Beranda";
import SideBar from "./components/SideBar";
import Test from "./pages/Alternatif/Test";
import KriteriaForm from "./pages/Kriteria/KriteriaForm";
import MatriksForm from "./pages/Matriks/MatriksForm";
import Alternatif from "./pages/Alternatif/Alternatif";
function App() {
  const { alternatifDispatch } = useAlternatifContext();
  const url = "http://localhost:4000/alternatif/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
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
    fetchData();
  }, []); // Dependency array kosong agar hanya dijalankan sekali

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
            <Route path="/test" element={<Test />} />
            <Route path="/alternatif" element={<Alternatif />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
