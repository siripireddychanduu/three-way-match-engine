"use client";

import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaBalanceScale,
  FaBoxOpen,
} from "react-icons/fa";

export default function ComparisonTable({ rows = [] }) {
  const getStatus = (row) => {
    if (row.status === "MATCH")
      return {
        text: "Matched",
        className: "bg-green-100 text-green-700",
        icon: <FaCheckCircle />,
      };

    if (row.status === "QUANTITY_MISMATCH" || row.status === "PRICE_MISMATCH")
      return {
        text: row.status.replaceAll("_", " "),
        className: "bg-yellow-100 text-yellow-700",
        icon: <FaExclamationTriangle />,
      };

    return {
      text: row.status || "Mismatch",
      className: "bg-red-100 text-red-700",
      icon: <FaTimesCircle />,
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}

      <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
            <FaBalanceScale className="text-blue-600 text-2xl" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Three-Way Comparison
            </h2>

            <p className="text-gray-500 mt-1">
              Compare Purchase Order, GRN and Invoice line items.
            </p>
          </div>
        </div>

        <div className="hidden md:block text-right">
          <p className="text-gray-500 text-sm">Total Items</p>

          <p className="text-3xl font-bold text-blue-600">{rows.length}</p>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100 sticky top-0">
            <tr className="text-gray-700 text-sm uppercase">
              <th className="px-6 py-4 text-left">SKU</th>

              <th className="px-6 py-4 text-left">Description</th>

              <th className="px-6 py-4 text-center">PO Qty</th>

              <th className="px-6 py-4 text-center">GRN Qty</th>

              <th className="px-6 py-4 text-center">Invoice Qty</th>

              <th className="px-6 py-4 text-center">PO Price</th>

              <th className="px-6 py-4 text-center">Invoice Price</th>

              <th className="px-6 py-4 text-center">Result</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-20 text-center">
                  <FaBoxOpen className="mx-auto text-6xl text-gray-300 mb-5" />

                  <h3 className="text-2xl font-semibold text-gray-600">
                    No Comparison Data
                  </h3>

                  <p className="text-gray-400 mt-2">
                    Upload matching documents to generate comparison results.
                  </p>
                </td>
              </tr>
            ) : (
              rows.map((row, index) => {
                const status = getStatus(row);

                return (
                  <tr
                    key={index}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    {/* SKU */}

                    <td className="px-6 py-5 font-semibold text-blue-700">
                      {row.sku}
                    </td>

                    {/* Description */}

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-medium text-gray-800">
                          {row.description}
                        </p>
                      </div>
                    </td>

                    {/* PO Qty */}

                    <td className="px-6 py-5 text-center font-semibold">
                      {row.poQty}
                    </td>

                    {/* GRN Qty */}

                    <td className="px-6 py-5 text-center">
                      {row.grnQty ?? "-"}
                    </td>

                    {/* Invoice Qty */}

                    <td className="px-6 py-5 text-center">
                      {row.invoiceQty ?? "-"}
                    </td>

                    {/* PO Price */}

                    <td className="px-6 py-5 text-center font-medium">
                      ₹ {Number(row.poPrice || 0).toLocaleString("en-IN")}
                    </td>

                    {/* Invoice Price */}

                    <td className="px-6 py-5 text-center font-medium">
                      {row.invoicePrice != null
                        ? `₹ ${Number(row.invoicePrice).toLocaleString("en-IN")}`
                        : "-"}
                    </td>

                    {/* Status */}

                    <td className="px-6 py-5 text-center">
                      <span
                        className={`${status.className} inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold`}
                      >
                        {status.icon}

                        {status.text}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
