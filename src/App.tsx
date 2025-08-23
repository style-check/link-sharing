import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvoiceBills from "./pages/InvoiceBills/InvoiceBills";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/bill/:invoice_id" element={<InvoiceBills />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
