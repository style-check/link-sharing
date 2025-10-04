import React from "react";

type Props = {
  submodule: any;
  company: any;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ReturnExchangeTemplate: React.FC<Props> = ({ submodule, company }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-2 sm:py-10 sm:px-4">
      <div className="max-w-5xl mx-auto bg-white border shadow-lg p-6 sm:p-10 rounded-xl print:shadow-none print:border-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b pb-4 mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {company?.business_logo && (
              <img
                src={company.business_logo}
                alt="Logo"
                className="w-20 h-20 object-contain border rounded"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">{company?.brand_name}</h1>
              <p className="text-gray-700">{company?.business_name}</p>
              <p className="text-sm text-gray-600">
                {company?.business_address}
              </p>
              <p className="text-sm text-gray-600">
                GSTIN: {company?.gst_number}
              </p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold tracking-wide text-blue-600">
              RETURN / EXCHANGE
            </h2>
            <p className="text-sm font-medium">
              REX No: {submodule?.rex_number}
            </p>
            <p className="text-sm">
              Date: {formatDate(submodule?.date_timestamp)}
            </p>
            <p className="text-sm">Linked Invoice: {submodule?.ref_inv_no}</p>
            <p className="text-sm">Status: {submodule?.rex_status}</p>
          </div>
        </div>

        {/* Customer & Warehouse Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-1">Customer</h3>
            <p className="font-medium">{submodule?.customer_name}</p>
            <p className="text-sm text-gray-600">
              Phone: {submodule?.phone_number}
            </p>
            <p className="text-sm text-gray-600">
              State: {submodule?.state_of_supply}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Warehouse</h3>
            <p className="font-medium">{submodule?.warehouse_name}</p>
            <p className="text-sm text-gray-600">
              Terms: {submodule?.return_exchange_terms}
            </p>
            <p className="text-sm text-gray-600">
              Return Window: {submodule?.return_exchange_window} days
            </p>
          </div>
        </div>

        {/* Old Products Table */}
        <div className="mb-6">
          <h3 className="font-semibold text-red-600 mb-2">Returned Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-300">
              <thead className="bg-red-50">
                <tr>
                  {[
                    "#",
                    "Product",
                    "SKU",
                    "Qty",
                    "MRP",
                    "Discount",
                    "Tax %",
                  ].map((h) => (
                    <th
                      key={h}
                      className="border border-gray-300 p-2 text-left"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submodule?.product_info?.old_products?.map(
                  (item: any, idx: number) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border p-2 text-center">{idx + 1}</td>
                      <td className="border p-2">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.color} | {item.size}
                        </p>
                      </td>
                      <td className="border p-2 text-center">
                        {item.sku_code}
                      </td>
                      <td className="border p-2 text-center">
                        {item.quantity}
                      </td>
                      <td className="border p-2 text-right">₹{item.mrp}</td>
                      <td className="border p-2 text-right">
                        {item.discount}%
                      </td>
                      <td className="border p-2 text-center">{item.tax}%</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Products Table */}
        <div className="mb-6">
          <h3 className="font-semibold text-green-600 mb-2">
            Revised Products
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-300">
              <thead className="bg-green-50">
                <tr>
                  {[
                    "#",
                    "Product",
                    "SKU",
                    "Qty",
                    "MRP",
                    "Discount",
                    "Tax %",
                  ].map((h) => (
                    <th
                      key={h}
                      className="border border-gray-300 p-2 text-left"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submodule?.product_info?.new_products?.map(
                  (item: any, idx: number) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border p-2 text-center">{idx + 1}</td>
                      <td className="border p-2">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.color} | {item.size}
                        </p>
                      </td>
                      <td className="border p-2 text-center">
                        {item.sku_code}
                      </td>
                      <td className="border p-2 text-center">
                        {item.quantity}
                      </td>
                      <td className="border p-2 text-right">₹{item.mrp}</td>
                      <td className="border p-2 text-right">
                        {item.discount}%
                      </td>
                      <td className="border p-2 text-center">{item.tax}%</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-full sm:w-80 border border-gray-300 rounded-md">
            <div className="flex justify-between p-2 border-b">
              <span>Subtotal</span>
              <span>₹{submodule?.subtotal || 0}</span>
            </div>
            <div className="flex justify-between p-2 border-b">
              <span>Discount</span>
              <span>- ₹{submodule?.total_discount || 0}</span>
            </div>
            <div className="flex justify-between p-2 border-b">
              <span>Tax</span>
              <span>₹{submodule?.total_tax || 0}</span>
            </div>
            <div className="flex justify-between p-2 border-b">
              <span>Shipping</span>
              <span>₹{submodule?.shipping_charges || 0}</span>
            </div>
            <div className="flex justify-between p-2 border-b">
              <span>Packing</span>
              <span>₹{submodule?.packaging_charges || 0}</span>
            </div>
            <div className="flex justify-between p-2 border-b">
              <span>Adjustments</span>
              <span>₹{submodule?.adjustment_charges || 0}</span>
            </div>
            {submodule?.round_off && (
              <div className="flex justify-between p-2 border-b">
                <span>Rounding</span>
                <span>₹{submodule?.rounding_amount}</span>
              </div>
            )}
            <div className="flex justify-between p-2 font-bold bg-gray-100 border-t">
              <span>Grand Total</span>
              <span>₹{submodule?.grand_total}</span>
            </div>
            <div className="flex justify-between p-2">
              <span>Received</span>
              <span>₹{submodule?.received_amount}</span>
            </div>
            <div className="flex justify-between p-2 border-t font-semibold">
              <span>Balance Due</span>
              <span>₹{submodule?.balance_due}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="text-sm text-gray-600 max-w-md">
            <p>{submodule?.description || "No additional remarks."}</p>
          </div>
          <div className="text-right w-full sm:w-auto">
            <p className="font-semibold">For: {company?.brand_name}</p>
            <p className="mt-16 border-t inline-block">Authorized Signatory</p>
          </div>
        </div>

        {/* Print Button */}
        <div className="mt-8 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 cursor-pointer border rounded text-sm font-medium hover:bg-gray-100"
          >
            Print REX
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnExchangeTemplate;
