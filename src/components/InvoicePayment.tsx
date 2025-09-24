import React from "react";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

type Props = {
  submodule: any;
  company: any;
};

const InvoicePaymentTemplate: React.FC<Props> = ({ submodule, company }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-2 sm:py-10 sm:px-4">
      <div className="max-w-3xl mx-auto bg-white border shadow rounded-lg overflow-hidden print:shadow-none print:border-none">
        {/* Header */}
        <div className="px-6 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b gap-4 bg-gray-50">
          <div className="flex gap-4 items-center">
            {company?.business_logo && (
              <img
                src={company.business_logo}
                alt="Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain border rounded p-1 bg-white"
              />
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {company?.brand_name}
              </h1>
              <p className="text-sm text-gray-600">{company?.business_name}</p>
              <p className="text-sm text-gray-600">
                {company?.business_address}
              </p>
              <p className="text-sm text-gray-600">
                GSTIN: {company?.gst_number}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-gray-800">
              Invoice Payment
            </h2>
            <p className="text-sm text-gray-600">
              IP No: {submodule?.payment_number}
            </p>
            <p className="text-sm text-gray-600">
              Date: {formatDate(submodule?.date_timestamp)}
            </p>
            <p className="text-sm text-gray-600 capitalize">
              Status: {submodule?.payment_status || "-"}
            </p>
          </div>
        </div>

        {/* Customer & Salesperson */}
        <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Customer</h3>
            <p className="font-medium">{submodule?.customer_name}</p>
            <p className="text-sm text-gray-600">
              Contact: {submodule?.phone_number || "-"}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Salesperson</h3>
            <p className="font-medium">{submodule?.salesperson_name || "-"}</p>
            <p className="text-sm text-gray-600">
              Created by: {submodule?.created_by?.owner_name}
            </p>
            {submodule?.approved_at && (
              <p className="text-sm text-gray-600">
                Approved on: {formatDate(submodule?.approved_at)}
              </p>
            )}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="px-6 py-6">
          <h3 className="font-semibold text-gray-800 mb-3">Payment Details</h3>
          <div className="border rounded-lg overflow-hidden">
            <div className="flex justify-between p-3 border-b bg-gray-50">
              <span>Received Amount</span>
              <span className="font-medium text-gray-800">
                ₹{submodule?.received_amount || 0}
              </span>
            </div>
            <div className="flex justify-between p-3 border-b">
              <span>Discount</span>
              <span>₹{submodule?.discount_value || 0}</span>
            </div>
            <div className="flex justify-between p-3 border-b">
              <span>Grand Total</span>
              <span>₹{submodule?.grand_total || 0}</span>
            </div>
            <div className="flex justify-between p-3 border-b">
              <span>Payment Type</span>
              <span>{submodule?.payment_type || "-"}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50">
              <span>Draw Status</span>
              <span className="capitalize">
                {submodule?.draw_status || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {submodule?.description && (
          <div className="px-6 py-4 border-t text-sm text-gray-700">
            <h3 className="font-semibold mb-1">Notes</h3>
            <p>{submodule.description}</p>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="text-sm text-gray-600">
            <p>Generated on: {formatDate(submodule?.created_at)}</p>
            {submodule?.updated_at && (
              <p>Last Updated: {formatDate(submodule?.updated_at)}</p>
            )}
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-800">
              For: {company?.brand_name}
            </p>
            <p className="mt-16 border-t inline-block">Authorized Signatory</p>
          </div>
        </div>

        {/* Print Button */}
        <div className="px-6 py-4 text-center bg-gray-50 print:hidden">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 cursor-pointer bg-gray-800 text-white rounded text-sm font-medium hover:bg-gray-900"
          >
            Print Invoice Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePaymentTemplate;
