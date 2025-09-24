import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InvoiceTemplate from "../../components/InvoiceTemplate";
import type { SalesModules } from "../../types/Sales";
import QuoteTemplate from "../../components/QuoteTemplate";
import SalesOrderTemplate from "../../components/SalesOrderTemplate";

const templates: Record<SalesModules, React.FC<any>> = {
  quote: QuoteTemplate,
  sales_order: SalesOrderTemplate,
  invoice: InvoiceTemplate,
  credit_note: InvoiceTemplate,
  package: InvoiceTemplate,
  picklist: InvoiceTemplate,
  return_exchange: InvoiceTemplate,
  advance_payment: InvoiceTemplate,
  invoice_payment: InvoiceTemplate,
  delivery_challan: InvoiceTemplate,
};

const SalesBills: React.FC = () => {
  const { submodule_id, type } = useParams<{
    submodule_id: string;
    type: SalesModules;
  }>();

  const [phone, setPhone] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleVerify = async () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${API_BASE_URL}/share/sale/${type}/${submodule_id}`,
        {
          phone_number: phone,
        }
      );

      if (res.data.success) {
        setIsVerified(true);
        setData(res.data);
      } else {
        setError("Invalid phone number or data not found.");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "An Error Occured");
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (type && !(type in templates)) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center w-full min-h-screen">
        <h1 className="text-5xl text-red-400 font-semibold">404 Not Found!</h1>
        <p className="text-black font-semibold text-2xl">
          Invalid Document Type
        </p>
      </div>
    );
  }

  if (isVerified && type) {
    const SelectedTemplate = templates[type];
    return (
      <SelectedTemplate
        {...data} // pass invoice/quote data, company, etc.
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Enter Phone Number</h2>
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default SalesBills;
