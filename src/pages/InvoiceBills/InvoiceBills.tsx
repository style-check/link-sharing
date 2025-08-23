import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InvoiceTemplate from "../../components/InvoiceTemplate";

const InvoiceBills: React.FC = () => {
  const { invoice_id } = useParams<{ invoice_id: string }>();

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

      const res = await axios.post(`${API_BASE_URL}/share/sale/${invoice_id}`, {
        phone_number: phone,
      });

      if (res.data.success) {
        setIsVerified(true);
        console.log(res.data);
        setInvoice(res.data.invoice);
        setCompany(res.data.company);
      } else {
        setError("Invalid phone number or invoice not found.");
      }

      // // ✅ Dummy check instead of API
      // if (phone === "9307275685") {
      //   const dummyInvoice = {
      //     invoice_id: "5e9e8ac7-e532-4af1-942c-26ef40c65836",
      //     inv_number: "INV-2025-010",
      //     date_timestamp: "2025-08-23T00:00:00.000Z",
      //     warehouse_id: "3050e5cf-be63-4ed9-a6f8-f0ce3231aa6d",
      //     warehouse_name: "Dusty Warehouse",
      //     return_exchange_terms: "Returns",
      //     return_exchange_window: "15",
      //     payment_terms: null,
      //     due_date: "2025-08-23T00:00:00.000Z",
      //     customer_id: "9cb6041d-6d32-4372-85a5-dc3b185dc963",
      //     customer_name: "Aniruddha Ahale",
      //     salesperson_id: "86ed6ea2-c632-4722-9ad5-e4e639b72650",
      //     salesperson_name: "ANNI",
      //     phone_number: "9307275685",
      //     eway_bill_no: "",
      //     product_info: [
      //       {
      //         mrp: 100,
      //         tax: 8,
      //         name: "Product 1",
      //         size: "L",
      //         color: "Red",
      //         discount: 10,
      //         hsn_code: "3401",
      //         quantity: 1,
      //         sku_code: "ABC123",
      //         image_path: "https://picsum.photos/200?random=1",
      //         product_id: "1",
      //       },
      //       {
      //         mrp: 100,
      //         tax: 8,
      //         name: "Product 1",
      //         size: "L",
      //         color: "Red",
      //         discount: 10,
      //         hsn_code: "3401",
      //         quantity: 1,
      //         sku_code: "ABC123",
      //         image_path: "https://picsum.photos/200?random=1",
      //         product_id: "1",
      //       },
      //       {
      //         mrp: 100,
      //         tax: 8,
      //         name: "Product 1",
      //         size: "L",
      //         color: "Red",
      //         discount: 10,
      //         hsn_code: "3401",
      //         quantity: 1,
      //         sku_code: "ABC123",
      //         image_path: "https://picsum.photos/200?random=1",
      //         product_id: "1",
      //       },
      //     ],
      //     item_discount: "0.000",
      //     total_tax: "7.200",
      //     total_quantity: "1.000",
      //     subtotal: "97.200",
      //     total_discount: "0.000",
      //     round_off: false,
      //     rounding_amount: "0.000",
      //     grand_total: "97.200",
      //     loyalty_points_used: "0.000",
      //     loyalty_points_value: "0.000",
      //     received_amount: "0.000",
      //     balance_due: "97.200",
      //     points_rewarded: "0.000",
      //     payment_type: "Cash",
      //     state_of_supply: "Maharashtra",
      //     description: "",
      //     media_links: [],
      //     billing_address: "",
      //     shipping_address: "",
      //     link_type: null,
      //     linked_list: null,
      //     invoice_status: "UNPAID",
      //     ref_qt_no: null,
      //     ref_qt_id: null,
      //     ref_so_no: null,
      //     ref_so_id: null,
      //     company_id: "9f718ad0-b81e-49f3-b7f2-419e85964003",
      //     created_at: "2025-08-23T07:32:00.727Z",
      //     created_by: {
      //       id: "69e96da0-f1f0-470a-90a4-036f34b3a038",
      //       owner_name: "ANIRUDDHA AHALE",
      //     },
      //     updated_at: "2025-08-23T07:32:00.727Z",
      //     updated_by: {
      //       id: "69e96da0-f1f0-470a-90a4-036f34b3a038",
      //       owner_name: "ANIRUDDHA AHALE",
      //     },
      //     shipping_charges: "0.000",
      //     packaging_charges: "0.000",
      //     adjustment_charges: "0.000",
      //     ref_dc_id: null,
      //     ref_dc_no: null,
      //     ref_cn_id: null,
      //     ref_cn_no: null,
      //     ref_ap_id: null,
      //     ref_ap_no: null,
      //     ref_ip_id: null,
      //     ref_ip_no: null,
      //   };

      //   setInvoice(dummyInvoice);
      // } else {
      //   setError("Invalid phone number.");
      // }
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

export default InvoiceBills;
