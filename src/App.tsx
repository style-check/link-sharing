import { HashRouter, Route, Routes } from "react-router-dom";
import InvoiceBills from "./pages/InvoiceBills/InvoiceBills";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/bill/:invoice_id" element={<InvoiceBills />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
