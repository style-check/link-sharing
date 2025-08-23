import React from "react";

type Props = {
  invoice: any; // later we can create a TypeScript type for your full schema
  company: any;
};

const InvoiceTemplate: React.FC<Props> = ({ invoice, company }) => {
  // Convert string numbers to actual numbers
  const grandTotal = Number(invoice.grand_total);
  const subtotal = Number(invoice.subtotal);
  const totalTax = Number(invoice.total_tax);
  const receivedAmount = Number(invoice.received_amount);
  const totalQuantity = Number(invoice.total_quantity);
  const { business_name, gst_number, business_logo } = company;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 text-base font-sans">
      {/* Header with Logo and Company Details */}
      <div className="flex items-center justify-between border-b-2 border-gray-200 pb-4 mb-4">
        <div className="flex items-center">
          <img
            src={business_logo}
            alt={`${business_name} Logo`}
            className="h-16 w-auto mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {business_name}
            </h1>
            <p className="text-lg text-gray-600">{invoice.warehouse_name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg text-gray-700">GSTIN: {gst_number}</p>
          <p className="text-sm text-gray-500">Store Details</p>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <p className="text-xl font-semibold text-gray-800">TAX INVOICE</p>
        <div className="grid grid-cols-2 gap-4 mt-2 text-lg">
          <div>
            <p>
              <span className="font-medium">Invoice No:</span>{" "}
              {invoice.inv_number}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(invoice.date_timestamp).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p>
              <span className="font-medium">Customer ID:</span>{" "}
              {invoice.customer_id}
            </p>
            <p>
              <span className="font-medium">Cashier:</span>{" "}
              {invoice.salesperson_name}
            </p>
            <p>
              <span className="font-medium">Customer Name:</span>{" "}
              {invoice.customer_name}
            </p>
            <p>
              <span className="font-medium">Mobile No:</span>{" "}
              {invoice.phone_number}
            </p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full text-lg border-collapse mb-6">
        <thead className="bg-gray-100 border-b-2 border-gray-300">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Description
            </th>
            <th className="py-3 px-4 text-center font-semibold text-gray-700">
              Price
            </th>
            <th className="py-3 px-4 text-center font-semibold text-gray-700">
              Qty
            </th>
            <th className="py-3 px-4 text-center font-semibold text-gray-700">
              Unit Disc
            </th>
            <th className="py-3 px-4 text-center font-semibold text-gray-700">
              HSN-SAC
            </th>
            <th className="py-3 px-4 text-right font-semibold text-gray-700">
              Taxable Amt
            </th>
            <th className="py-3 px-4 text-right font-semibold text-gray-700">
              Net Amt
            </th>
          </tr>
        </thead>
        <tbody>
          {invoice.product_info.map((it: any, i: number) => {
            const taxableAmount = (it.mrp - it.discount) * it.quantity;
            const netAmount = taxableAmount + (taxableAmount * it.tax) / 100;
            return (
              <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-800">
                  {it.name} ({it.size}, {it.color}, {it.sku_code})
                </td>
                <td className="py-3 px-4 text-center text-gray-800">
                  {it.mrp.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-center text-gray-800">
                  {it.quantity}
                </td>
                <td className="py-3 px-4 text-center text-gray-800">
                  {it.discount.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-center text-gray-800">
                  {it.hsn_code}
                </td>
                <td className="py-3 px-4 text-right text-gray-800">
                  {taxableAmount.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right text-gray-800">
                  {netAmount.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Tax Breakdown */}
      <div className="mt-4 text-lg">
        <p className="font-medium text-gray-700">A) CGST@6% SGST@6%</p>
        {invoice.product_info.map((it: any, i: number) => {
          const taxAmount =
            (it.mrp - it.discount) * it.quantity * (it.tax / 100);
          return (
            <p key={i} className="ml-4 text-gray-800">
              {it.name} {taxAmount.toFixed(2)} {taxAmount.toFixed(2)}
            </p>
          );
        })}
        <p className="font-medium text-gray-700 mt-2">C) CGST@6% SGST@6%</p>
        {invoice.product_info.map((it: any, i: number) => {
          const taxAmount =
            (it.mrp - it.discount) * it.quantity * (it.tax / 100);
          return (
            <p key={i} className="ml-4 text-gray-800">
              {it.name} {taxAmount.toFixed(2)} {taxAmount.toFixed(2)}
            </p>
          );
        })}
      </div>

      {/* Totals */}
      <div className="flex justify-between items-center mt-6 text-lg">
        <span className="font-semibold text-gray-700">Gross Total</span>
        <span className="font-bold text-gray-900">{grandTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center mt-2 text-xl">
        <span className="font-semibold text-gray-700">
          Total Invoice Amount
        </span>
        <span className="font-bold text-gray-900">{grandTotal.toFixed(2)}</span>
      </div>

      {/* Tax Details */}
      <div className="mt-6">
        <table className="w-full text-lg border-collapse">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                GST
              </th>
              <th className="py-3 px-4 text-right font-semibold text-gray-700">
                Taxable
              </th>
              <th className="py-3 px-4 text-right font-semibold text-gray-700">
                COST
              </th>
              <th className="py-3 px-4 text-right font-semibold text-gray-700">
                CGST
              </th>
              <th className="py-3 px-4 text-right font-semibold text-gray-700">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 text-gray-800">A)</td>
              <td className="py-3 px-4 text-right text-gray-800">
                {(subtotal - totalTax).toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right text-gray-800">
                {(totalTax / 2).toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right text-gray-800">
                {(totalTax / 2).toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right text-gray-800">
                {grandTotal.toFixed(2)}
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 text-gray-800">C)</td>
              <td className="py-3 px-4 text-right text-gray-800">
                {(subtotal - totalTax).toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right text-gray-800">
                {(totalTax / 2).toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right text-gray-800">
                {(totalTax / 2).toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right text-gray-800">
                {grandTotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-700">Total</td>
              <td className="py-3 px-4 text-right text-gray-800">
                {(subtotal - totalTax).toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right text-gray-800">
                {totalTax.toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right text-gray-800">-</td>
              <td className="py-3 px-4 text-right text-gray-800">
                {grandTotal.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tender / Payment */}
      <div className="mt-6 border-t-2 border-gray-200 pt-4">
        <p className="text-lg font-semibold text-gray-700">PayTm</p>
        <p className="text-lg">
          Tender Detail: {receivedAmount.toFixed(2)} {invoice.payment_type}
        </p>
        <p className="text-lg font-medium">
          Total Received Amount: {grandTotal.toFixed(2)}
        </p>
        <p className="text-lg">No of Items: {totalQuantity}</p>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-lg text-gray-600">
        <p className="font-semibold">*** THANK YOU FOR SHOPPING ***</p>
        <p className="mt-2">
          Terms & Conditions: {invoice.return_exchange_terms} within{" "}
          {invoice.return_exchange_window} days of invoice date.
        </p>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
