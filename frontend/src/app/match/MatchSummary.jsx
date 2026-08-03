"use client";

import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaBoxes,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

export default function MatchSummary({ summary }) {
  if (!summary) return null;

  const cards = [
    {
      title: "Total Items",
      value: summary.totalItems || 0,
      icon: <FaBoxes />,
      color: "blue",
    },
    {
      title: "Matched",
      value: summary.matchedItems || 0,
      icon: <FaCheckCircle />,
      color: "green",
    },
    {
      title: "Quantity Mismatch",
      value: summary.quantityMismatch || 0,
      icon: <FaExclamationTriangle />,
      color: "yellow",
    },
    {
      title: "Price Mismatch",
      value: summary.priceMismatch || 0,
      icon: <FaTimesCircle />,
      color: "red",
    },
    {
      title: "Missing in GRN",
      value: summary.missingInGRN || 0,
      icon: <FaTimesCircle />,
      color: "purple",
    },
    {
      title: "Missing in Invoice",
      value: summary.missingInInvoice || 0,
      icon: <FaTimesCircle />,
      color: "pink",
    },
  ];

  const percentage =
    summary.totalItems > 0
      ? Math.round((summary.matchedItems / summary.totalItems) * 100)
      : 0;

  const confidence =
    percentage >= 95 ? "High" : percentage >= 75 ? "Medium" : "Low";

  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
    pink: "bg-pink-100 text-pink-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}

      <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-slate-50 to-white">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">AI Match Summary</h2>

          <p className="text-gray-500 mt-1">
            Intelligent comparison results for this purchase order.
          </p>
        </div>

        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
          <FaRobot className="text-blue-600 text-2xl" />
        </div>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>

                <h3 className="text-3xl font-bold mt-3 text-gray-800">
                  {card.value}
                </h3>
              </div>

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${colorMap[card.color]}`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Accuracy */}

      <div className="px-6 pb-6">
        <div className="rounded-2xl bg-slate-50 border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Overall Match Accuracy
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                AI confidence based on document comparison.
              </p>
            </div>

            <div className="flex items-center gap-2 text-blue-600 font-semibold">
              <FaChartLine />

              {confidence}
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-green-600 h-4 rounded-full transition-all duration-700"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>

          <div className="flex justify-between mt-4">
            <span className="text-gray-600">Match Percentage</span>

            <span className="font-bold text-green-600 text-lg">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
