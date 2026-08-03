"use client";

import { useMemo, useState } from "react";
import { FaSearch, FaBoxOpen, FaCheckCircle } from "react-icons/fa";

export default function ItemsTable({ items = [] }) {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const keyword = search.toLowerCase();

    return items.filter((item) => {
      return (
        item.sku?.toLowerCase().includes(keyword) ||
        item.vendorSku?.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword)
      );
    });
  }, [items, search]);

  return (
    <div className="bg-white rounded-xl shadow-md">
      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold">Purchase Order Items</h2>

          <p className="text-gray-500 mt-1">
            Total Items : {filteredItems.length}
          </p>
        </div>

        <div className="relative mt-4 md:mt-0">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search SKU / Description..."
            className="border rounded-lg pl-10 pr-4 py-2 w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">#</th>

              <th className="p-4 text-left">SKU</th>

              <th className="p-4 text-left">Vendor SKU</th>

              <th className="p-4 text-left">Description</th>

              <th className="p-4 text-center">Qty</th>

              <th className="p-4 text-center">Price</th>

              <th className="p-4 text-center">MRP</th>

              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-12 text-gray-400">
                  <FaBoxOpen className="mx-auto mb-3 text-4xl" />
                  No Items Found
                </td>
              </tr>
            ) : (
              filteredItems.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4 font-semibold">{item.sku || "-"}</td>

                  <td className="p-4">{item.vendorSku || "-"}</td>

                  <td className="p-4">{item.description}</td>

                  <td className="p-4 text-center">{item.quantity}</td>

                  <td className="p-4 text-center">₹ {item.price}</td>

                  <td className="p-4 text-center">₹ {item.mrp}</td>

                  <td className="p-4 text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full inline-flex items-center gap-2">
                      <FaCheckCircle />
                      Available
                    </span>
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
