"use client";

import { useMemo, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaBoxOpen,
  FaRupeeSign,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import api from "@/services/api";

export default function SKUTable({ loading, skus = [], onEdit, reload }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return skus;

    const keyword = search.toLowerCase();

    return skus.filter(
      (item) =>
        item.internalSku?.toLowerCase().includes(keyword) ||
        item.vendorSku?.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword),
    );
  }, [search, skus]);

  const handleDelete = async (sku) => {
    const result = await Swal.fire({
      title: "Delete SKU?",
      text: `Are you sure you want to delete "${sku.internalSku}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/masters/sku/${sku._id}`);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "SKU deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      reload();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.response?.data?.message || "Something went wrong.",
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-10">
        <div className="animate-pulse space-y-5">
          <div className="h-10 bg-gray-200 rounded w-72"></div>

          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}

      <div className="flex flex-col lg:flex-row justify-between items-center gap-5 p-6 border-b">
        <div className="relative w-full lg:w-96">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search by SKU, Vendor SKU or Description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="text-gray-600 font-medium">
          Showing
          <span className="font-bold text-blue-600 mx-2">
            {filtered.length}
          </span>
          SKU(s)
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-sm uppercase text-gray-700">
              <th className="px-6 py-4 text-left">Internal SKU</th>

              <th className="px-6 py-4 text-left">Vendor SKU</th>

              <th className="px-6 py-4 text-left">Description</th>

              <th className="px-6 py-4 text-center">Agreed Rate</th>

              <th className="px-6 py-4 text-center">MRP</th>

              <th className="px-6 py-4 text-center">Tolerance</th>

              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-20 text-center">
                  <FaBoxOpen className="mx-auto text-6xl text-gray-300 mb-5" />

                  <h3 className="text-2xl font-semibold text-gray-700">
                    No SKU Found
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Try another keyword or add a new SKU.
                  </p>
                </td>
              </tr>
            ) : (
              filtered.map((sku) => (
                <tr
                  key={sku._id}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="px-6 py-5 font-semibold text-blue-700">
                    {sku.internalSku}
                  </td>

                  <td className="px-6 py-5">{sku.vendorSku || "-"}</td>

                  <td className="px-6 py-5">{sku.description}</td>

                  <td className="px-6 py-5 text-center font-medium">
                    <div className="flex justify-center items-center gap-1">
                      <FaRupeeSign className="text-gray-400 text-xs" />

                      {Number(sku.agreedRate || 0).toLocaleString("en-IN")}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center font-medium">
                    <div className="flex justify-center items-center gap-1">
                      <FaRupeeSign className="text-gray-400 text-xs" />

                      {Number(sku.mrp || 0).toLocaleString("en-IN")}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {(sku.priceTolerance * 100).toFixed(0)}%
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(sku)}
                        className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                      >
                        <FaEdit className="mx-auto" />
                      </button>

                      <button
                        onClick={() => handleDelete(sku)}
                        className="w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition"
                      >
                        <FaTrash className="mx-auto" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
