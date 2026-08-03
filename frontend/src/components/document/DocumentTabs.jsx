"use client";

import {
  FaShoppingCart,
  FaFileInvoice,
  FaTruck,
  FaChartPie,
} from "react-icons/fa";

const tabs = [
  {
    id: "po",
    label: "Purchase Order",
    icon: <FaShoppingCart />,
  },
  {
    id: "invoice",
    label: "Fulfillment",
    icon: <FaFileInvoice />,
  },
  {
    id: "grn",
    label: "Delivery",
    icon: <FaTruck />,
  },
  {
    id: "summary",
    label: "Summary",
    icon: <FaChartPie />,
  },
];

export default function DocumentTabs({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-2">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium
            ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {tab.icon}

            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
