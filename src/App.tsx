import { BrowserRouter, Route, Routes } from "react-router-dom";
import SalesBills from "./pages/Bills/Bills";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/bill/:type/:submodule_id" element={<SalesBills />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
