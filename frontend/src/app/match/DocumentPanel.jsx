"use client";

import {
  FaFileInvoice,
  FaCalendarAlt,
  FaUserTie,
  FaMoneyBillWave,
  FaHashtag,
  FaBoxes,
  FaCheckCircle,
} from "react-icons/fa";

export default function DocumentPanel({ title, color = "blue", data = {} }) {
  const theme = {
    blue: {
      header: "bg-blue-600",
      light: "bg-blue-50",
      icon: "text-blue-600",
    },
    green: {
      header: "bg-green-600",
      light: "bg-green-50",
      icon: "text-green-600",
    },
    purple: {
      header: "bg-purple-600",
      light: "bg-purple-50",
      icon: "text-purple-600",
    },
  };

  const current = theme[color];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header */}

      <div className={`${current.header} text-white p-5`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <FaFileInvoice className="text-2xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold">{title}</h2>

              <p className="text-sm text-white/80">
                Extracted Document Information
              </p>
            </div>
          </div>

          <FaCheckCircle className="text-2xl opacity-80" />
        </div>
      </div>

      {/* Content */}

      <div className="p-6 space-y-4">
        <InfoRow
          icon={<FaHashtag />}
          label="Document Number"
          value={data.poNumber || data.invoiceNumber || data.grnNumber || "-"}
          theme={current}
        />

        <InfoRow
          icon={<FaUserTie />}
          label="Vendor Name"
          value={data.vendorName || "-"}
          theme={current}
        />

        <InfoRow
          icon={<FaCalendarAlt />}
          label="Document Date"
          value={data.poDate || data.invoiceDate || data.grnDate || "-"}
          theme={current}
        />

        <InfoRow
          icon={<FaMoneyBillWave />}
          label="Total Amount"
          value={`₹ ${Number(data.totalAmount || 0).toLocaleString("en-IN")}`}
          theme={current}
        />

        <InfoRow
          icon={<FaBoxes />}
          label="Total Items"
          value={data.items?.length || 0}
          theme={current}
        />
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, theme }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4 hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg ${theme.light} flex items-center justify-center ${theme.icon}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {label}
          </p>

          <p className="font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
