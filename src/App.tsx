import { BrowserRouter, Route, Routes } from "react-router-dom";
import SalesBills from "./pages/InvoiceBills/InvoiceBills";

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
