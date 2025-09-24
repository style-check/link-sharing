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

const QuoteTemplate: React.FC<Props> = ({ submodule, company }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white border shadow-md p-8 print:shadow-none print:border-none print:p-4">
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-4 mb-6">
          <div className="flex gap-4">
            {company?.business_logo && (
              <img
                src={company.business_logo}
                alt="Logo"
                className="w-20 h-20 object-contain border rounded"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">{company?.brand_name}</h1>
              <p className="text-sm text-gray-700">{company?.business_name}</p>
              <p className="text-sm text-gray-700">
                {company?.business_address}
              </p>
              <p className="text-sm text-gray-700">
                GSTIN: {company?.gst_number}
              </p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold uppercase tracking-wide">
              Quote
            </h2>
            <p className="text-sm">Quote No: {submodule?.quote_number}</p>
            <p className="text-sm">
              Date: {formatDate(submodule?.quote_timestamp)}
            </p>
            <p className="text-sm">
              Expiry: {formatDate(submodule?.expiry_date)}
            </p>
          </div>
        </div>

        {/* Customer & Staff */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-1">Estimate For</h3>
            <p className="font-medium">{submodule?.customer_name}</p>
            <p className="text-sm text-gray-600">
              Contact: {submodule?.phone_no}
            </p>
            <p className="text-sm text-gray-600">
              State: {submodule?.state_of_supply}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Prepared By</h3>
            <p className="font-medium">{submodule?.staff_name}</p>
            <p className="text-sm text-gray-600">
              Created by: {submodule?.created_by?.owner_name}
            </p>
          </div>
        </div>

        {/* Product Table */}
        <table className="w-full text-sm border border-gray-300 mb-6">
          <thead className="bg-gray-100">
            <tr>
              {[
                "#",
                "Product",
                "SKU",
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
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.color} | {item.size}
                    </p>
                  </div>
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.sku_code}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.quantity}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  ₹{item.mrp}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {item.discount}%
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.tax}%
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  ₹{item.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-80 border border-gray-300">
            <div className="flex justify-between p-2 border-b">
              <span>Subtotal</span>
              <span>₹{submodule?.subtotal}</span>
            </div>
            <div className="flex justify-between p-2 border-b">
              <span>Discount</span>
              <span>- ₹{submodule?.total_discount}</span>
            </div>
            <div className="flex justify-between p-2 border-b">
              <span>Tax</span>
              <span>₹{submodule?.total_tax}</span>
            </div>
            <div className="flex justify-between p-2 border-b">
              <span>Shipping</span>
              <span>₹{submodule?.shipping_charges}</span>
            </div>
            <div className="flex justify-between p-2 border-b">
              <span>Packing</span>
              <span>₹{submodule?.packing_charges}</span>
            </div>
            <div className="flex justify-between p-2 border-b">
              <span>Adjustments</span>
              <span>₹{submodule?.adjustments}</span>
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
        <div className="mt-10 flex justify-between items-end">
          <div className="text-sm text-gray-600 max-w-md">
            <p>{submodule?.description}</p>
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
            className="px-6 py-2 border rounded text-sm font-medium hover:bg-gray-100"
          >
            Print Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteTemplate;
