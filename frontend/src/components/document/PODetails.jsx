"use client";

import {
  FaFileInvoiceDollar,
  FaUserTie,
  FaCalendarAlt,
  FaHashtag,
  FaMoneyBillWave,
  FaBuilding,
} from "react-icons/fa";

export default function PODetails({ document }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Purchase Order Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InfoCard
          icon={<FaHashtag />}
          title="PO Number"
          value={document.poNumber || "-"}
        />

        <InfoCard
          icon={<FaUserTie />}
          title="Vendor"
          value={document.vendorName || "-"}
        />

        <InfoCard
          icon={<FaCalendarAlt />}
          title="PO Date"
          value={document.poDate || "-"}
        />

        <InfoCard
          icon={<FaMoneyBillWave />}
          title="Currency"
          value={document.currency || "INR"}
        />

        <InfoCard
          icon={<FaBuilding />}
          title="Buyer"
          value={document.buyerName || "-"}
        />

        <InfoCard
          icon={<FaFileInvoiceDollar />}
          title="Total Amount"
          value={document.totalAmount ? `₹ ${document.totalAmount}` : "-"}
        />
      </div>
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow transition">
      <div className="flex items-center gap-2 text-gray-500 mb-2">
        {icon}
        <span>{title}</span>
      </div>

      <div className="text-lg font-semibold text-gray-800">{value}</div>
    </div>
  );
}
