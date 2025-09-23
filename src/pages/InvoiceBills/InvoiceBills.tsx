import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InvoiceTemplate from "../../components/InvoiceTemplate";
import type { SalesModules } from "../../types/sales";

const SalesBills: React.FC = () => {
  const { submodule_id, type } = useParams<{
    submodule_id: string;
    type: SalesModules;
  }>();

  const [phone, setPhone] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [invoice, setInvoice] = useState<any | null>(null);
  const [company, setCompany] = useState<any | null>(null);
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
        console.log(res.data);
        setInvoice(res.data.invoice);
        setCompany(res.data.company);
      } else {
        setError("Invalid phone number or invoice not found.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isVerified) {
    return <InvoiceTemplate invoice={invoice} company={company} />;
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
