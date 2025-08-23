import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InvoiceBills: React.FC = () => {
  const { invoice_id } = useParams<{ invoice_id: string }>();

  const [phone, setPhone] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      setLoading(true);
      setError("");

      // Example API call (you’ll replace with your backend endpoint)
      const res = await axios.post("/api/verify-phone", {
        invoice_id,
        phone_no: phone,
      });

      if (res.data.success) {
        setIsVerified(true);
      } else {
        setError("Invalid phone number.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Invoice #{invoice_id}</h1>
        <p className="text-gray-600 mt-2">✅ Authenticated successfully</p>
        {/* Later replace this with the actual bill UI */}
      </div>
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
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default InvoiceBills;
