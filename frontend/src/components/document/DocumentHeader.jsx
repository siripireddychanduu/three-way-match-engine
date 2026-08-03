"use client";

import {
  FaFileInvoice,
  FaCalendarAlt,
  FaUserTie,
  FaCheckCircle,
} from "react-icons/fa";

export default function DocumentHeader({ document }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <FaFileInvoice className="text-blue-600 text-3xl" />

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {document.poNumber ||
                  document.invoiceNumber ||
                  document.grnNumber}
              </h1>

              <p className="text-gray-500">Purchase Document</p>
            </div>
          </div>
        </div>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
          <FaCheckCircle />
          Uploaded
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <FaUserTie />
            Vendor
          </div>

          <h3 className="font-semibold text-lg">
            {document.vendorName || "-"}
          </h3>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <FaCalendarAlt />
            Document Date
          </div>

          <h3 className="font-semibold text-lg">
            {document.poDate || document.invoiceDate || document.grnDate || "-"}
          </h3>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-gray-500 mb-2">Total Amount</div>

          <h3 className="font-bold text-2xl text-blue-600">
            ₹ {document.totalAmount || 0}
          </h3>
        </div>
      </div>
    </div>
  );
}
