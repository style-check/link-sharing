import React from "react";
import FeedbackSection from "./FeedbackSection";
import AdCarousel from "./AdCarousel";
import BillingPoweredBy from "./BillingPoweredBy";
import DownloadBillButton from "./DownloadBillButton";

type Props = {
  submodule: any;
  company: any;
};

const SalesOrderTemplate: React.FC<Props> = ({ submodule, company }) => {
  // Convert string numbers to actual numbers
  const grandTotal = Number(submodule.grand_total || 0);
  const subtotal = Number(submodule.subtotal || 0);
  const totalTax = Number(submodule.total_tax || 0);
  const receivedAmount = Number(submodule.received_amount || 0);
  const totalQuantity = Number(submodule.total_quantity || 0);
  const { business_name, gst_number } = company;

  // Group products by tax category
  const getTaxCategory = (taxRate: number): string => {
    // Map tax rates to categories (A: 2.5%, B: 6%, C: 9%, etc.)
    if (taxRate === 2.5 || taxRate === 5) return "A";
    if (taxRate === 6 || taxRate === 12) return "B";
    if (taxRate === 9 || taxRate === 18) return "C";
    return "A"; // default
  };

  const getTaxRateLabel = (taxRate: number): string => {
    const cgstRate = taxRate / 2;
    return `CGST@${cgstRate}% SGST@${cgstRate}%`;
  };

  // Group products by tax category
  const productsByCategory: { [key: string]: any[] } = {};
  submodule.product_info?.forEach((it: any) => {
    const category = getTaxCategory(it.tax || 0);
    if (!productsByCategory[category]) {
      productsByCategory[category] = [];
    }
    productsByCategory[category].push(it);
  });

  // Calculate tax details for each category
  const calculateCategoryTotals = (category: string) => {
    const products = productsByCategory[category] || [];
    let taxableValue = 0;
    let totalAmount = 0;

    products.forEach((it: any) => {
      const discountAmount = (it.mrp * (it.discount || 0)) / 100;
      const itemTaxable = (it.mrp - discountAmount) * it.quantity;
      taxableValue += itemTaxable;
      totalAmount += itemTaxable + (itemTaxable * (it.tax || 0)) / 100;
    });

    const cgst = (totalAmount - taxableValue) / 2;
    const sgst = (totalAmount - taxableValue) / 2;

    return {
      taxableValue,
      cgst,
      sgst,
      cess: 0,
      totalAmount,
    };
  };

  // Format date and time
  const formatDateTime = (timestamp: string) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp);
    const dateStr = date.toISOString().split("T")[0].replace(/-/g, "-");
    const timeStr = date.toTimeString().split(" ")[0];
    return `${dateStr} ${timeStr}`;
  };

  return (
    <>
      <div className="invoice-container w-full max-w-[350px] mx-auto bg-white p-3 sm:p-4 text-[10px] sm:text-xs font-sans pb-20 sm:pb-24">
        {/* Ad Carousel */}
        <div className="mb-4 no-print">
          <AdCarousel autoPlayInterval={5000} />
        </div>

        {/* Company Header */}
        <div className="border-b border-dashed border-gray-400 pb-2 mb-2">
          <div className="text-center mb-1">
            <h1 className="text-sm sm:text-base font-bold text-gray-900">
              {business_name}
            </h1>
          </div>
          <div className="text-[9px] sm:text-[10px] text-gray-700 space-y-0.5">
            <p>
              <span className="font-semibold">Store Contact Number :</span>{" "}
              {submodule.store_contact || "NA"}
            </p>
            <p>
              <span className="font-semibold">Place Of Supply :</span>{" "}
              {submodule.warehouse_name ||
                submodule.warehouse_address ||
                company.business_address ||
                "N/A"}
            </p>
            {company.registered_address && (
              <p>
                <span className="font-semibold">Regd. Office -</span>{" "}
                {company.registered_address}
              </p>
            )}
            <p>
              <span className="font-semibold">GSTIN NO:</span> {gst_number}
            </p>
          </div>
        </div>

        {/* Feedback Section */}
        <FeedbackSection />

        {/* Sales Order Details */}
        <div className="border-b border-dashed border-gray-400 pb-2 mb-2">
          <p className="text-xs sm:text-sm font-bold text-gray-900 mb-1 text-center">
            SALES ORDER
          </p>
          <div className="text-[9px] sm:text-[10px] space-y-0.5">
            <div className="flex justify-between">
              <span>
                <span className="font-semibold">SO NO.:</span>{" "}
                {submodule.so_number}
              </span>
              <span>
                <span className="font-semibold">Date and Time:</span>{" "}
                {formatDateTime(submodule.so_timestamp)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>
                <span className="font-semibold">CUSTOMER ID :</span>{" "}
                {submodule.customer_id || "WALK-IN"}
              </span>
              <span>
                <span className="font-semibold">MOBILE NO :</span>{" "}
                {submodule.phone_no || submodule.phone_number || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>
                <span className="font-semibold">CUSTOMER NAME :</span>{" "}
                {submodule.customer_name || "N/A"}
              </span>
            </div>
            {submodule.so_status && (
              <div className="flex justify-between">
                <span>
                  <span className="font-semibold">STATUS :</span>{" "}
                  {submodule.so_status.toUpperCase()}
                </span>
              </div>
            )}
            {submodule.pmt_terms && (
              <div className="flex justify-between">
                <span>
                  <span className="font-semibold">PAYMENT TERMS :</span>{" "}
                  {submodule.pmt_terms}
                </span>
              </div>
            )}
            {submodule.payment_type && (
              <div className="flex justify-between">
                <span>
                  <span className="font-semibold">PAYMENT TYPE :</span>{" "}
                  {submodule.payment_type}
                </span>
              </div>
            )}
            {submodule.staff_name && (
              <div className="flex justify-between">
                <span>
                  <span className="font-semibold">PREPARED BY :</span>{" "}
                  {submodule.staff_name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Items Table - Mobile Optimized */}
        <div className="mb-3 overflow-x-auto print:overflow-visible">
          <table className="w-full text-[9px] sm:text-[10px] border-collapse min-w-full print:min-w-0 print:table-auto">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-1 px-1 text-left font-semibold text-gray-900">
                  Item
                </th>
                <th className="py-1 px-1 text-right font-semibold text-gray-900">
                  Price
                </th>
                <th className="py-1 px-1 text-center font-semibold text-gray-900">
                  Qty
                </th>
                <th className="py-1 px-1 text-right font-semibold text-gray-900">
                  Disc
                </th>
                <th className="py-1 px-1 text-right font-semibold text-gray-900">
                  Net
                </th>
                <th className="py-1 px-1 text-left font-semibold text-gray-900">
                  Desc
                </th>
                <th className="py-1 px-1 text-center font-semibold text-gray-900">
                  HSN
                </th>
                <th className="py-1 px-1 text-right font-semibold text-gray-900">
                  Taxable
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(productsByCategory)
                .sort()
                .map((category) => {
                  const products = productsByCategory[category];
                  const firstProduct = products[0];
                  const taxRate = firstProduct.tax || 0;
                  const taxLabel = getTaxRateLabel(taxRate);

                  return (
                    <React.Fragment key={category}>
                      <tr>
                        <td
                          colSpan={8}
                          className="py-0.5 px-1 font-semibold text-gray-900 bg-gray-50"
                        >
                          {category}) {taxLabel}
                        </td>
                      </tr>
                      {products.map((it: any, i: number) => {
                        const discountAmount = (it.mrp * (it.discount || 0)) / 100;
                        const taxableAmount =
                          (it.mrp - discountAmount) * it.quantity;
                        const netAmount =
                          taxableAmount + (taxableAmount * (it.tax || 0)) / 100;
                        return (
                          <tr
                            key={`${category}-${i}`}
                            className="border-b border-gray-200"
                          >
                            <td className="py-1 px-1 text-gray-900 break-words">
                              {it.sku_code || it.product_id || "-"}
                            </td>
                            <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                              ₹{it.mrp.toFixed(2)}
                            </td>
                            <td className="py-1 px-1 text-center text-gray-900">
                              {it.quantity}
                            </td>
                            <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                              {it.discount || 0}%
                            </td>
                            <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                              ₹{netAmount.toFixed(2)}
                            </td>
                            <td className="py-1 px-1 text-gray-900 break-words">
                              {it.name}
                              {it.size && ` (${it.size})`}
                              {it.color && ` (${it.color})`}
                            </td>
                            <td className="py-1 px-1 text-center text-gray-900">
                              {it.hsn_code || "-"}
                            </td>
                            <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                              ₹{taxableAmount.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Summary Totals */}
        <div className="mb-3 text-[9px] sm:text-[10px]">
          <div className="flex justify-between items-center py-0.5">
            <span className="font-semibold text-gray-900">Subtotal</span>
            <span className="font-semibold text-gray-900">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>
          {submodule.total_discount && Number(submodule.total_discount) > 0 && (
            <div className="flex justify-between items-center py-0.5">
              <span className="font-semibold text-gray-900">Discount</span>
              <span className="font-semibold text-gray-900">
                - ₹{Number(submodule.total_discount).toFixed(2)}
              </span>
            </div>
          )}
          {submodule.shipping_charges &&
            Number(submodule.shipping_charges) > 0 && (
              <div className="flex justify-between items-center py-0.5">
                <span className="font-semibold text-gray-900">Shipping</span>
                <span className="font-semibold text-gray-900">
                  ₹{Number(submodule.shipping_charges).toFixed(2)}
                </span>
              </div>
            )}
          {submodule.packing_charges &&
            Number(submodule.packing_charges) > 0 && (
              <div className="flex justify-between items-center py-0.5">
                <span className="font-semibold text-gray-900">Packing</span>
                <span className="font-semibold text-gray-900">
                  ₹{Number(submodule.packing_charges).toFixed(2)}
                </span>
              </div>
            )}
          {submodule.adjustments && Number(submodule.adjustments) !== 0 && (
            <div className="flex justify-between items-center py-0.5">
              <span className="font-semibold text-gray-900">Adjustments</span>
              <span className="font-semibold text-gray-900">
                ₹{Number(submodule.adjustments).toFixed(2)}
              </span>
            </div>
          )}
          {submodule.round_off && submodule.rounding_amount && (
            <div className="flex justify-between items-center py-0.5">
              <span className="font-semibold text-gray-900">Rounding</span>
              <span className="font-semibold text-gray-900">
                ₹{Number(submodule.rounding_amount).toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center py-0.5">
            <span className="font-semibold text-gray-900">Gross Total</span>
            <span className="font-semibold text-gray-900">
              ₹{grandTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="font-semibold text-gray-900">
              Total Sales Order Amount
            </span>
            <span className="font-semibold text-gray-900">
              ₹{grandTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Tax Details Table - Mobile Optimized */}
        <div className="mb-3 overflow-x-auto print:overflow-visible">
          <table className="w-full text-[9px] sm:text-[10px] border-collapse min-w-full print:min-w-0 print:table-auto">
            <thead>
              <tr className="border-b-2 border-gray-300 bg-gray-50">
                <th className="py-1 px-1 text-left font-semibold text-gray-900">
                  GST
                </th>
                <th className="py-1 px-1 text-right font-semibold text-gray-900">
                  Taxable
                </th>
                <th className="py-1 px-1 text-right font-semibold text-gray-900">
                  CGST
                </th>
                <th className="py-1 px-1 text-right font-semibold text-gray-900">
                  SGST
                </th>
                <th className="py-1 px-1 text-right font-semibold text-gray-900">
                  CESS
                </th>
                <th className="py-1 px-1 text-right font-semibold text-gray-900">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(productsByCategory)
                .sort()
                .map((category) => {
                  const totals = calculateCategoryTotals(category);
                  return (
                    <tr key={category} className="border-b border-gray-200">
                      <td className="py-1 px-1 text-gray-900">{category})</td>
                      <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                        ₹{totals.taxableValue.toFixed(2)}
                      </td>
                      <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                        ₹{totals.cgst.toFixed(2)}
                      </td>
                      <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                        ₹{totals.sgst.toFixed(2)}
                      </td>
                      <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                        ₹{totals.cess.toFixed(2)}
                      </td>
                      <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                        ₹{totals.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              <tr className="border-t-2 border-gray-300 font-semibold">
                <td className="py-1 px-1 text-gray-900">Total</td>
                <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                  ₹{(subtotal - totalTax).toFixed(2)}
                </td>
                <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                  ₹{(totalTax / 2).toFixed(2)}
                </td>
                <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                  ₹{(totalTax / 2).toFixed(2)}
                </td>
                <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                  ₹{0.0.toFixed(2)}
                </td>
                <td className="py-1 px-1 text-right text-gray-900 whitespace-nowrap">
                  ₹{grandTotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Details */}
        {receivedAmount > 0 && (
          <div className="mb-3 border-t border-dashed border-gray-400 pt-2">
            <p className="text-[9px] sm:text-[10px] text-gray-900">
              <span className="font-semibold">Received Amount:</span>{" "}
              ₹{receivedAmount.toFixed(2)}
            </p>
            {submodule.balance_due && (
              <p className="text-[9px] sm:text-[10px] font-semibold text-gray-900 mt-0.5">
                BALANCE DUE: ₹{Number(submodule.balance_due).toFixed(2)}
              </p>
            )}
          </div>
        )}

        {/* Order Summary */}
        <div className="mb-3 border-t border-dashed border-gray-400 pt-2 text-[9px] sm:text-[10px]">
          <p className="text-gray-900">
            <span className="font-semibold">NO OF ITEMS:</span> {totalQuantity}
          </p>
          <p className="text-gray-900">
            <span className="font-semibold">TOTAL QTY:</span>{" "}
            {totalQuantity.toFixed(2)}
          </p>
        </div>

        {/* Description */}
        {submodule.description && (
          <div className="mb-3 border-t border-dashed border-gray-400 pt-2 text-[9px] sm:text-[10px] text-gray-700">
            <p className="font-semibold mb-1">Description:</p>
            <p>{submodule.description}</p>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="mt-4 border-t border-dashed border-gray-400 pt-3 text-[9px] sm:text-[10px] text-gray-700">
          <p className="mb-1">All Offers are subject to applicable T&C.</p>
          <p className="mb-1">
            This sales order is valid and subject to payment terms:{" "}
            {submodule.pmt_terms || "As per agreement"}.
          </p>
          {submodule.return_exchange_terms && (
            <p className="mb-1">{submodule.return_exchange_terms}</p>
          )}
        </div>

        {/* Digital Billing Powered By */}
        <BillingPoweredBy />
      </div>

      {/* Sticky Download Button - Outside main container for proper sticky positioning */}
      <DownloadBillButton
        companyName={business_name}
        maxWidth="350px"
        buttonText="Download Sales Order"
      />
    </>
  );
};

export default SalesOrderTemplate;
