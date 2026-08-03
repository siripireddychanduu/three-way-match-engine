"use client";

import Layout from "@/components/layout/Layout";
import {
  FaChartPie,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileInvoice,
  FaPercentage,
} from "react-icons/fa";

export default function SummaryPage() {
  const cards = [
    {
      title: "Total Documents",
      value: 156,
      icon: <FaFileInvoice />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Matched",
      value: 132,
      icon: <FaCheckCircle />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Exceptions",
      value: 24,
      icon: <FaExclamationTriangle />,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Accuracy",
      value: "92%",
      icon: <FaPercentage />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const recentActivity = [
    {
      po: "PO-1001",
      vendor: "ABC Pvt Ltd",
      status: "Matched",
    },
    {
      po: "PO-1002",
      vendor: "XYZ Industries",
      status: "Partial",
    },
    {
      po: "PO-1003",
      vendor: "Global Tech",
      status: "Exception",
    },
    {
      po: "PO-1004",
      vendor: "Bright Solutions",
      status: "Matched",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Executive Summary
          </h1>

          <p className="text-gray-600 mt-2 text-lg">
            High-level overview of document processing, AI matching performance
            and exceptions.
          </p>
        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-bold text-gray-900 mt-3">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${card.color}`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* AI Summary */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <FaChartPie className="text-blue-600 text-2xl" />

              <h2 className="text-2xl font-bold text-gray-900">
                AI Processing Summary
              </h2>
            </div>

            <p className="text-gray-600 mb-8">
              Overall matching performance across all uploaded documents.
            </p>

            <Progress title="Matched" value={92} color="bg-green-500" />

            <Progress title="Partial Match" value={6} color="bg-yellow-500" />

            <Progress title="Exceptions" value={2} color="bg-red-500" />
          </div>

          {/* Recent Activity */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Match Activity
            </h2>

            <p className="text-gray-600 mb-6">
              Latest AI document matching results.
            </p>

            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div
                  key={item.po}
                  className="flex justify-between items-center border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {item.po}
                    </p>

                    <p className="text-gray-600">{item.vendor}</p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      item.status === "Matched"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Partial"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Progress({ title, value, color }) {
  return (
    <div className="mb-7">
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-gray-900">{title}</span>

        <span className="font-bold text-gray-800">{value}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`${color} h-3 rounded-full transition-all duration-700`}
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}
