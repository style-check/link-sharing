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

const DeliveryChallanTemplate: React.FC<Props> = ({ submodule, company }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-2 sm:py-10 sm:px-4">
      <div className="max-w-4xl mx-auto bg-white border shadow-md p-4 sm:p-8 print:shadow-none print:border-none print:p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6 gap-4">
          <div className="flex gap-4">
            {company?.business_logo && (
              <img
                src={company.business_logo}
                alt="Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded"
              />
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                {company?.brand_name}
              </h1>
              <p className="text-sm text-gray-700">{company?.business_name}</p>
              <p className="text-sm text-gray-700">
                {company?.business_address}
              </p>
              <p className="text-sm text-gray-700">
                GSTIN: {company?.gst_number}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
              Delivery Challan
            </h2>
            <p className="text-sm">DC No: {submodule?.dc_number}</p>
            <p className="text-sm">
              Date: {formatDate(submodule?.dc_timestamp)}
            </p>
            <p className="text-sm">Status: {submodule?.dc_status || "-"}</p>
          </div>
        </div>

        {/* Customer & Salesperson */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-1">Customer</h3>
            <p className="font-medium">{submodule?.customer_name}</p>
            <p className="text-sm text-gray-600">
              Contact: {submodule?.phone_number || "-"}
            </p>
            <p className="text-sm text-gray-600">
              State: {submodule?.state_of_supply || "-"}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Salesperson</h3>
            <p className="font-medium">{submodule?.salesperson_name}</p>
            <p className="text-sm text-gray-600">
              Created by: {submodule?.created_by?.owner_name}
            </p>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-300 mb-6 min-w-[600px]">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "#",
                  "Product",
                  "SKU",
                  "HSN",
                  "Size",
                  "Color",
                  "Qty",
                  "MRP",
                  "Discount",
                  "Tax %",
                  "Total",
                ].map((h) => (
                  <th key={h} className="border border-gray-300 p-2 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {submodule?.product_info?.map((item: any, idx: number) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 p-2 text-center">
                    {idx + 1}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex items-center gap-2">
                      {item.image_path && (
                        <img
                          src={item.image_path}
                          alt={item.name || "Product"}
                          className="w-10 h-10 object-cover border rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">
                          {item.name || "Unnamed Product"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.sku_code || "-"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.hsn_code || "-"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.size || "-"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.color || "-"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.quantity || 0}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    ₹{item.mrp || 0}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.discount ? `${item.discount}%` : "0%"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.tax ? `${item.tax}%` : "0%"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.total ??
                      (() => {
                        const discountedPrice =
                          item.mrp * (1 - (item.discount || 0) / 100);
                        const totalBeforeTax = discountedPrice * item.quantity;
                        const taxAmount =
                          totalBeforeTax * ((item.tax || 0) / 100);
                        return (totalBeforeTax + taxAmount).toFixed(2);
                      })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-full sm:w-80 border border-gray-300">
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
              <span>₹{submodule?.shipping || 0}</span>
            </div>
            <div className="flex justify-between p-2 border-b">
              <span>Packaging</span>
              <span>₹{submodule?.packaging || 0}</span>
            </div>
            <div className="flex justify-between p-2 border-b">
              <span>Adjustments</span>
              <span>₹{submodule?.adjustments || 0}</span>
            </div>
            {submodule?.roundoff && (
              <div className="flex justify-between p-2 border-b">
                <span>Rounding</span>
                <span>₹{submodule?.rounding_amount}</span>
              </div>
            )}
            <div className="flex justify-between p-2 font-bold bg-gray-100 border-t">
              <span>Grand Total</span>
              <span>₹{submodule?.grand_total}</span>
            </div>
            <div className="flex justify-between p-2 border-t">
              <span>Received</span>
              <span>₹{submodule?.received_amount || 0}</span>
            </div>
            <div className="flex justify-between p-2 border-t">
              <span>Balance Due</span>
              <span>₹{submodule?.balance_due || 0}</span>
            </div>
          </div>
        </div>

        {/* Return / Exchange Info */}
        <div className="mb-6 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Return/Exchange Window:</span>{" "}
            {submodule?.return_exchange_window} days
          </p>
          <p>
            <span className="font-semibold">Terms:</span>{" "}
            {submodule?.return_exchange_terms || "-"}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="text-sm text-gray-600 max-w-md">
            <p>{submodule?.description || ""}</p>
          </div>
          <div className="text-right">
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
            Print Delivery Challan
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryChallanTemplate;
