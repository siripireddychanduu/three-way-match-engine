"use client";

import { useState } from "react";
import ExceptionDialog from "./ExceptionDialog";

import { FaEye, FaCheckCircle } from "react-icons/fa";

export default function ExceptionTable({ loading, exceptions, reload }) {
  const [selectedException, setSelectedException] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const resolveException = async (id) => {
    try {
      // Replace with your backend API
      // await api.put(`/api/exceptions/${id}/resolve`);

      alert("Resolve API will be connected here.");

      if (reload) reload();
    } catch (err) {
      console.error(err);
    }
  };

  const badge = (value, type) => {
    const styles = {
      status: {
        OPEN: "bg-red-100 text-red-700",
        RESOLVED: "bg-green-100 text-green-700",
      },
      severity: {
        HIGH: "bg-red-100 text-red-700",
        MEDIUM: "bg-yellow-100 text-yellow-700",
        LOW: "bg-green-100 text-green-700",
      },
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          styles[type][value] || "bg-gray-100"
        }`}
      >
        {value}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        Loading exceptions...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-5 border-b">
        <h2 className="text-xl font-bold">Exception List</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">PO Number</th>

              <th className="p-4 text-left">Vendor</th>

              <th className="p-4 text-left">Type</th>

              <th className="p-4 text-center">Severity</th>

              <th className="p-4 text-center">Status</th>

              <th className="p-4 text-left">Description</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {exceptions.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-500">
                  No exceptions found.
                </td>
              </tr>
            ) : (
              exceptions.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{item.poNumber}</td>

                  <td className="p-4">{item.vendorName}</td>

                  <td className="p-4">{item.type.replaceAll("_", " ")}</td>

                  <td className="p-4 text-center">
                    {badge(item.severity, "severity")}
                  </td>

                  <td className="p-4 text-center">
                    {badge(item.status, "status")}
                  </td>

                  <td className="p-4 max-w-xs truncate">{item.description}</td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedException(item);
                          setDialogOpen(true);
                        }}
                        className="bg-blue-600 text-white px-3 py-2 rounded"
                      >
                        <FaEye />
                      </button>

                      {item.status === "OPEN" && (
                        <button
                          onClick={() => resolveException(item._id)}
                          className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                          title="Resolve"
                        >
                          <FaCheckCircle />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ExceptionDialog
        open={dialogOpen}
        exception={selectedException}
        onClose={() => setDialogOpen(false)}
        onSuccess={reload}
      />
    </div>
  );
}
