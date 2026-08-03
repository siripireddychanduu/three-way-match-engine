"use client";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaBoxes,
  FaExclamationTriangle,
  FaTruck,
  FaFileInvoiceDollar,
} from "react-icons/fa";

export default function SummaryCard({ summary }) {
  if (!summary) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
        Summary not available.
      </div>
    );
  }

  const cards = [
    {
      title: "Total Ordered",
      value: summary.totalOrdered ?? 0,
      color: "bg-blue-100 text-blue-700",
      icon: <FaBoxes />,
    },
    {
      title: "Total Received",
      value: summary.totalReceived ?? 0,
      color: "bg-green-100 text-green-700",
      icon: <FaTruck />,
    },
    {
      title: "Total Invoiced",
      value: summary.totalInvoiced ?? 0,
      color: "bg-purple-100 text-purple-700",
      icon: <FaFileInvoiceDollar />,
    },
    {
      title: "Matched Items",
      value: summary.matchedItems ?? 0,
      color: "bg-green-100 text-green-700",
      icon: <FaCheckCircle />,
    },
    {
      title: "Mismatched Items",
      value: summary.mismatchedItems ?? 0,
      color: "bg-red-100 text-red-700",
      icon: <FaTimesCircle />,
    },
    {
      title: "Pending Delivery",
      value: summary.pendingDelivery ?? 0,
      color: "bg-yellow-100 text-yellow-700",
      icon: <FaExclamationTriangle />,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Three-Way Match Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">{card.title}</p>

                <h2 className="text-4xl font-bold mt-3">{card.value}</h2>
              </div>

              <div
                className={`${card.color} w-14 h-14 rounded-full flex items-center justify-center text-2xl`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Overall Match Status</h3>

        {summary.mismatchedItems > 0 ? (
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
            <FaTimesCircle />
            Mismatch Found
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            <FaCheckCircle />
            Fully Matched
          </div>
        )}
      </div>
    </div>
  );
}
