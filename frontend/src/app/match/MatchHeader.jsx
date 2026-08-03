"use client";

import {
  FaClipboardCheck,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaChartLine,
} from "react-icons/fa";

export default function MatchHeader({ poNumber, summary }) {
  const matched = summary?.matchedItems || 0;
  const mismatched = summary?.mismatchedItems || 0;
  const total = summary?.totalOrdered || matched + mismatched || 1;

  const percentage = Math.round((matched / total) * 100);

  const confidence =
    percentage >= 95 ? "High" : percentage >= 75 ? "Medium" : "Low";

  const getStatus = () => {
    if (mismatched === 0)
      return {
        text: "Fully Matched",
        color: "bg-green-100 text-green-700",
        icon: <FaCheckCircle />,
      };

    if (matched > 0)
      return {
        text: "Partial Match",
        color: "bg-yellow-100 text-yellow-700",
        icon: <FaExclamationTriangle />,
      };

    return {
      text: "Mismatch",
      color: "bg-red-100 text-red-700",
      icon: <FaTimesCircle />,
    };
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <FaClipboardCheck className="text-blue-600 text-3xl" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Three-Way Match Analysis
            </h1>

            <p className="text-gray-500 mt-2">
              Purchase Order :
              <span className="font-semibold text-gray-700 ml-2">
                {poNumber}
              </span>
            </p>
          </div>
        </div>

        <span
          className={`${status.color} px-5 py-3 rounded-full inline-flex items-center gap-2 font-semibold`}
        >
          {status.icon}

          {status.text}
        </span>
      </div>

      {/* Progress */}

      <div className="mt-8">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 font-medium">Match Accuracy</span>

          <span className="font-bold text-blue-600">{percentage}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-700"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
        <StatCard
          title="Matched Items"
          value={matched}
          color="text-green-600"
        />

        <StatCard title="Mismatched" value={mismatched} color="text-red-600" />

        <StatCard
          title="Confidence"
          value={confidence}
          color="text-blue-600"
          icon={<FaChartLine />}
        />

        <StatCard
          title="Last Updated"
          value={new Date().toLocaleDateString()}
          icon={<FaCalendarAlt />}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, color = "text-gray-700", icon }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md transition p-5">
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm font-medium">{title}</span>

        {icon && <div className="text-gray-400 text-lg">{icon}</div>}
      </div>

      <div className={`text-3xl font-bold mt-4 ${color}`}>{value}</div>
    </div>
  );
}
