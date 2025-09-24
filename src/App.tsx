import { HashRouter, Route, Routes } from "react-router-dom";
import SalesBills from "./pages/Bills/Bills";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/bill/:type/:submodule_id" element={<SalesBills />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
