"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/common/StatCard";
import api from "@/services/api";

import {
  FaUpload,
  FaExchangeAlt,
  FaFileAlt,
  FaExclamationTriangle,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const router = useRouter();

  const [dashboard, setDashboard] = useState({
    purchaseOrders: 0,
    grns: 0,
    invoices: 0,
    audits: 0,
    totalItems: 0,
    matchedItems: 0,
    mismatchedItems: 0,
    quantityMismatch: 0,
    missingInGRN: 0,
    missingInInvoice: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await api.get("/api/dashboard");
      setDashboard(res.data.dashboard);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const matchPercentage =
    dashboard.totalItems === 0
      ? 0
      : Math.round((dashboard.matchedItems / dashboard.totalItems) * 100);

  const chartData = [
    {
      name: "PO",
      value: dashboard.purchaseOrders,
    },
    {
      name: "GRN",
      value: dashboard.grns,
    },
    {
      name: "Invoice",
      value: dashboard.invoices,
    },
    {
      name: "Matched",
      value: dashboard.matchedItems,
    },
    {
      name: "Mismatch",
      value: dashboard.mismatchedItems,
    },
  ];

  const quickActions = [
    {
      title: "Upload",
      icon: FaUpload,
      color: "bg-blue-500",
      path: "/upload",
    },
    {
      title: "Run Match",
      icon: FaExchangeAlt,
      color: "bg-green-500",
      path: "/match",
    },
    {
      title: "Documents",
      icon: FaFileAlt,
      color: "bg-orange-500",
      path: "/documents",
    },
    {
      title: "Exceptions",
      icon: FaExclamationTriangle,
      color: "bg-red-500",
      path: "/exceptions",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

              <p className="text-gray-500 mt-2">
                Monitor procurement workflow and document matching status.
              </p>
            </div>

            <button
              onClick={() => router.push("/upload")}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-xl font-semibold"
            >
              Upload Documents
            </button>
          </div>
        </div>

        {/* KPI */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <StatCard title="Purchase Orders" value={dashboard.purchaseOrders} />

          <StatCard title="GRNs" value={dashboard.grns} />

          <StatCard title="Invoices" value={dashboard.invoices} />

          <StatCard title="Audits" value={dashboard.audits} />

          <StatCard title="Matched Items" value={dashboard.matchedItems} />

          <StatCard
            title="Mismatched Items"
            value={dashboard.mismatchedItems}
          />
        </div>

        {/* Middle Section */}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Match Accuracy */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-green-100 p-3 rounded-xl">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>

              <div>
                <h2 className="font-bold text-lg">Match Accuracy</h2>

                <p className="text-sm text-gray-500">
                  Overall matching performance
                </p>
              </div>
            </div>

            <div className="text-5xl font-bold text-green-600">
              {matchPercentage}%
            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full mt-6 overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-700"
                style={{
                  width: `${matchPercentage}%`,
                }}
              />
            </div>

            <div className="grid grid-cols-2 mt-6 gap-4">
              <div className="text-center bg-green-50 rounded-xl p-4">
                <h3 className="text-2xl font-bold text-green-700">
                  {dashboard.matchedItems}
                </h3>

                <p className="text-sm text-gray-500">Matched</p>
              </div>

              <div className="text-center bg-red-50 rounded-xl p-4">
                <h3 className="text-2xl font-bold text-red-700">
                  {dashboard.mismatchedItems}
                </h3>

                <p className="text-sm text-gray-500">Mismatch</p>
              </div>
            </div>
          </div>
          {/* Quick Actions */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FaChartLine className="text-blue-600 text-xl" />
              </div>

              <div>
                <h2 className="text-lg font-bold">Quick Actions</h2>

                <p className="text-sm text-gray-500">
                  Navigate to frequently used modules
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.title}
                    onClick={() => router.push(action.path)}
                    className="border rounded-xl p-5 hover:shadow-md hover:border-blue-400 transition-all"
                  >
                    <div
                      className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-white ${action.color}`}
                    >
                      <Icon className="text-xl" />
                    </div>

                    <p className="mt-3 font-semibold">{action.title}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-5">System Summary</h2>

            <div className="space-y-5">
              <SummaryItem
                title="Total Items"
                value={dashboard.totalItems}
                color="text-blue-600"
              />

              <SummaryItem
                title="Quantity Mismatch"
                value={dashboard.quantityMismatch}
                color="text-orange-600"
              />

              <SummaryItem
                title="Missing in GRN"
                value={dashboard.missingInGRN}
                color="text-red-600"
              />

              <SummaryItem
                title="Missing in Invoice"
                value={dashboard.missingInInvoice}
                color="text-red-600"
              />
            </div>
          </div>
        </div>

        {/* Procurement Overview */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Procurement Overview</h2>

              <p className="text-gray-500 text-sm">
                Overall document processing statistics
              </p>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function SummaryItem({ title, value, color }) {
  return (
    <div className="flex justify-between items-center border-b pb-3">
      <span className="text-gray-600">{title}</span>

      <span className={`font-bold text-lg ${color}`}>{value}</span>
    </div>
  );
}
