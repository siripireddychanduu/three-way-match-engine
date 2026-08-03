"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import api from "@/services/api";

import {
  FaFilePdf,
  FaSearch,
  FaEye,
  FaDownload,
  FaSyncAlt,
  FaFileInvoice,
  FaBoxOpen,
  FaTruck,
  FaClipboardCheck,
  FaFolderOpen,
} from "react-icons/fa";

export default function DocumentsPage() {
  const router = useRouter();

  const [documents, setDocuments] = useState({
    purchaseOrders: [],
    grns: [],
    invoices: [],
  });

  const [activeTab, setActiveTab] = useState("purchaseOrders");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      setLoading(true);

      const res = await api.get("/documents");

      setDocuments(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const currentData = useMemo(() => {
    const list = documents?.[activeTab] || [];

    return list.filter((doc) => {
      const keyword = search.toLowerCase();

      return (
        doc.poNumber?.toLowerCase().includes(keyword) ||
        doc.invoiceNumber?.toLowerCase().includes(keyword) ||
        doc.grnNumber?.toLowerCase().includes(keyword) ||
        doc.vendorName?.toLowerCase().includes(keyword) ||
        doc.originalFileName?.toLowerCase().includes(keyword)
      );
    });
  }, [documents, activeTab, search]);

  const stats = [
    {
      title: "Purchase Orders",
      value: documents.purchaseOrders.length,
      icon: <FaBoxOpen />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "GRNs",
      value: documents.grns.length,
      icon: <FaTruck />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Invoices",
      value: documents.invoices.length,
      icon: <FaFileInvoice />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Total Documents",
      value:
        documents.purchaseOrders.length +
        documents.grns.length +
        documents.invoices.length,
      icon: <FaFolderOpen />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Document Management
            </h1>

            <p className="text-gray-500 mt-2">
              Search, review and manage uploaded Purchase Orders, Goods Receipt
              Notes and Vendor Invoices.
            </p>
          </div>

          <button
            onClick={loadDocuments}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
          >
            <FaSyncAlt />
            Refresh
          </button>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">{item.title}</p>

                  <h2 className="text-4xl font-bold mt-3 text-gray-800">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${item.color}`}
                >
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Documents Card */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          {/* Tabs */}

          <div className="flex flex-wrap gap-3 p-5 border-b">
            {[
              {
                label: "Purchase Orders",
                key: "purchaseOrders",
                count: documents.purchaseOrders.length,
              },
              {
                label: "GRNs",
                key: "grns",
                count: documents.grns.length,
              },
              {
                label: "Invoices",
                key: "invoices",
                count: documents.invoices.length,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 rounded-xl font-semibold transition ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {tab.label}

                <span className="ml-2 font-bold">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Search */}

          <div className="p-6 flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <FaSearch className="absolute left-4 top-4 text-gray-400" />

              <input
                className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Search number, vendor or filename..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="text-gray-500 flex items-center">
              Showing
              <span className="font-bold text-blue-600 mx-2">
                {currentData.length}
              </span>
              document(s)
            </div>
          </div>
          {/* Table */}

          {loading ? (
            <div className="p-10">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-16 bg-gray-100 rounded-xl animate-pulse mb-3"
                />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-y">
                  <tr className="text-gray-600">
                    <th className="px-6 py-4 text-left font-semibold">
                      Document No
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Vendor
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      PDF Document
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Status
                    </th>

                    <th className="px-6 py-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-20 text-center">
                        <FaFolderOpen className="mx-auto text-6xl text-gray-300 mb-5" />

                        <h3 className="text-2xl font-semibold text-gray-600">
                          No Documents Found
                        </h3>

                        <p className="text-gray-400 mt-2">
                          Upload Purchase Orders, GRNs or Invoices to start
                          processing.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    currentData.map((doc) => (
                      <tr
                        key={doc._id}
                        className="border-b hover:bg-blue-50 transition"
                      >
                        {/* Number */}

                        <td className="px-6 py-5 font-semibold text-gray-800">
                          {doc.poNumber || doc.invoiceNumber || doc.grnNumber}
                        </td>

                        {/* Vendor */}

                        <td className="px-6 py-5">
                          <div>
                            <p className="font-medium text-gray-800">
                              {doc.vendorName || "-"}
                            </p>
                          </div>
                        </td>

                        {/* File */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                              <FaFilePdf className="text-red-600 text-xl" />
                            </div>

                            <div>
                              <p className="font-medium text-gray-800">
                                {doc.originalFileName}
                              </p>

                              <p className="text-xs text-gray-500">
                                PDF Document
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Status */}

                        <td className="px-6 py-5">
                          <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                            ● Uploaded
                          </span>
                        </td>

                        {/* Actions */}

                        <td className="px-6 py-5">
                          <div className="flex justify-center gap-3">
                            {/* View */}

                            <button
                              title="View Document"
                              onClick={() =>
                                router.push("/documents/" + doc._id)
                              }
                              className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                            >
                              <FaEye />
                            </button>

                            {/* Download */}

                            <button
                              title="Download PDF"
                              onClick={async () => {
                                try {
                                  const response = await api.get(
                                    `/documents/${doc._id}/file`,
                                    {
                                      responseType: "blob",
                                    },
                                  );

                                  const url = window.URL.createObjectURL(
                                    new Blob([response.data]),
                                  );

                                  const link = document.createElement("a");
                                  link.href = url;
                                  link.download =
                                    doc.originalFileName ||
                                    doc.fileName ||
                                    `${doc.poNumber || doc.invoiceNumber || doc.grnNumber}.pdf`;

                                  document.body.appendChild(link);
                                  link.click();

                                  link.remove();
                                  window.URL.revokeObjectURL(url);
                                } catch (err) {
                                  console.error("Download failed", err);
                                }
                              }}
                              className="w-10 h-10 rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition flex items-center justify-center"
                            >
                              <FaDownload />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
