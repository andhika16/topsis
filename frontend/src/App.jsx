import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beranda from "./pages/Beranda";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route path="/" element={<Beranda />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
