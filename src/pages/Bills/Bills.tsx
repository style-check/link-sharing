import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import InvoiceTemplate from "../../components/InvoiceTemplate";
import type { SalesModules } from "../../types/Sales";
import QuoteTemplate from "../../components/QuoteTemplate";
import SalesOrderTemplate from "../../components/SalesOrderTemplate";
import CreditNoteTemplate from "../../components/CreditNoteTemplate";
import DeliveryChallanTemplate from "../../components/DeliveryChallan";
import InvoicePaymentTemplate from "../../components/InvoicePaymentTemplate";
import AdvancePaymentTemplate from "../../components/AdvancePaymentTemplate";
import ReturnExchangeTemplate from "../../components/REXTemplate";

const templates: Record<SalesModules, React.FC<any>> = {
  quote: QuoteTemplate,
  sales_order: SalesOrderTemplate,
  invoice: InvoiceTemplate,
  credit_note: CreditNoteTemplate,
  package: InvoiceTemplate,
  picklist: InvoiceTemplate,
  return_exchange: ReturnExchangeTemplate,
  advance_payment: AdvancePaymentTemplate,
  invoice_payment: InvoicePaymentTemplate,
  delivery_challan: DeliveryChallanTemplate,
};

const SalesBills: React.FC = () => {
  const { submodule_id, type } = useParams<{
    submodule_id: string;
    type: SalesModules;
  }>();

  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBill = async () => {
      if (!type || !submodule_id) return;

      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${API_BASE_URL}/share/sale/${type}/${submodule_id}`,
          {
            params: {
              phone,
            },
          }
        );

        if (res.data.success) {
          setData(res.data);
        } else {
          // Treat as not-found / 404 for this invoice/type
          setError("__NOT_FOUND__");
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          if (err.response.status === 404) {
            // Explicit 404 from backend
            setError("__NOT_FOUND__");
          } else {
            setError(err.response.data.message || "An Error Occured");
          }
        } else {
          setError("Something went wrong. Try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [API_BASE_URL, phone, submodule_id, type]);

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Loading bill...</p>
      </div>
    );
  }

  if (error === "__NOT_FOUND__") {
    return (
      <div className="flex flex-col gap-4 items-center justify-center w-full min-h-screen">
        <h1 className="text-5xl text-red-400 font-semibold">404 Not Found!</h1>
        <p className="text-black font-semibold text-2xl">
          No invoice or document found for this link.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-500">Error</h2>
          <p className="text-gray-800 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  if (data && type) {
    const SelectedTemplate = templates[type];
    return (
      <SelectedTemplate
        {...data} // pass invoice/quote data, company, etc.
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-lg font-semibold">Preparing your bill...</p>
    </div>
  );
};

export default SalesBills;
