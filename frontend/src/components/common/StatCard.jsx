"use client";

import { motion } from "framer-motion";
import {
  FaBox,
  FaFileInvoice,
  FaClipboardCheck,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartBar,
} from "react-icons/fa";

const cardConfig = {
  "Purchase Orders": {
    icon: FaBox,
    bg: "bg-blue-100",
    color: "text-blue-600",
    subtitle: "Total Purchase Orders",
  },
  GRNs: {
    icon: FaClipboardCheck,
    bg: "bg-green-100",
    color: "text-green-600",
    subtitle: "Goods Received Notes",
  },
  Invoices: {
    icon: FaFileInvoice,
    bg: "bg-orange-100",
    color: "text-orange-600",
    subtitle: "Vendor Invoices",
  },
  Audits: {
    icon: FaChartBar,
    bg: "bg-purple-100",
    color: "text-purple-600",
    subtitle: "Match Audit Records",
  },
  "Matched Items": {
    icon: FaCheckCircle,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
    subtitle: "Successfully Matched",
  },
  "Mismatched Items": {
    icon: FaExclamationTriangle,
    bg: "bg-red-100",
    color: "text-red-600",
    subtitle: "Require Attention",
  },
};

export default function StatCard({ title, value }) {
  const config = cardConfig[title] || {
    icon: FaChartBar,
    bg: "bg-gray-100",
    color: "text-gray-600",
    subtitle: "",
  };

  const Icon = config.icon;

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-500">{title}</p>

          <h2 className="text-4xl font-bold text-gray-800 mt-2">{value}</h2>

          <p className="text-xs text-gray-400 mt-2">{config.subtitle}</p>
        </div>

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${config.bg}`}
        >
          <Icon className={`text-2xl ${config.color}`} />
        </div>
      </div>

      <div className="mt-5 border-t pt-3 flex items-center justify-between">
        <span className="text-xs text-green-600 font-medium">▲ Active</span>

        <span className="text-xs text-gray-400">Updated now</span>
      </div>
    </motion.div>
  );
}
