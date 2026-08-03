"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import api from "@/services/api";

import { FaBoxOpen, FaPlus, FaTags } from "react-icons/fa";

import SKUTable from "@/components/sku/SKUTable";
import SKUDialog from "@/components/sku/SKUDialog";

export default function SKUMasterPage() {
  const [skus, setSkus] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedSKU, setSelectedSKU] = useState(null);

  useEffect(() => {
    loadSKUs();
  }, []);

  async function loadSKUs() {
    try {
      const res = await api.get("/masters/sku");
      setSkus(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
              <FaBoxOpen className="text-blue-600 text-3xl" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">SKU Master</h1>

              <p className="text-gray-500 mt-1">
                Manage product master records used during AI document matching.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedSKU(null);
              setOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
          >
            <FaPlus />
            Add SKU
          </button>
        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total SKUs</p>

                <h2 className="text-4xl font-bold mt-2 text-gray-800">
                  {loading ? "--" : skus.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <FaBoxOpen className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Active Records</p>

                <h2 className="text-4xl font-bold mt-2 text-green-600">
                  {loading ? "--" : skus.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                <FaTags className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Master Status</p>

                <h2 className="text-2xl font-bold mt-3 text-blue-600">
                  Healthy
                </h2>
              </div>

              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                <FaBoxOpen className="text-purple-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b bg-gradient-to-r from-slate-50 to-white">
            <h2 className="text-xl font-bold text-gray-800">SKU Records</h2>

            <p className="text-gray-500 mt-1">
              View, edit and maintain your product master information.
            </p>
          </div>

          <SKUTable
            loading={loading}
            skus={skus}
            onEdit={(sku) => {
              setSelectedSKU(sku);
              setOpen(true);
            }}
            reload={loadSKUs}
          />
        </div>

        {/* Dialog */}

        <SKUDialog
          open={open}
          sku={selectedSKU}
          onClose={() => setOpen(false)}
          onSuccess={loadSKUs}
        />
      </div>
    </Layout>
  );
}
