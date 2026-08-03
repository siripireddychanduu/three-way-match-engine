"use client";

import {
  FaBug,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaUserCheck,
  FaClipboardList,
} from "react-icons/fa";

export default function ExceptionPanel({ exceptions }) {
  const exceptionList = Array.isArray(exceptions) ? exceptions : [];
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "HIGH":
        return {
          badge: "bg-red-100 text-red-700",
          icon: <FaTimesCircle className="text-red-600" />,
        };
      case "MEDIUM":
        return {
          badge: "bg-yellow-100 text-yellow-700",
          icon: <FaExclamationTriangle className="text-yellow-600" />,
        };
      default:
        return {
          badge: "bg-green-100 text-green-700",
          icon: <FaCheckCircle className="text-green-600" />,
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}

      <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-red-50 to-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
            <FaBug className="text-red-600 text-2xl" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Exception Summary
            </h2>

            <p className="text-gray-500 mt-1">
              Review mismatches detected during AI document comparison.
            </p>
          </div>
        </div>

        <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
          {exceptionList.length} Exception(s)
        </span>
      </div>

      {/* Empty State */}

      {exceptionList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <FaCheckCircle className="text-green-600 text-5xl" />
          </div>

          <h3 className="text-2xl font-bold mt-6 text-gray-800">
            No Exceptions Found
          </h3>

          <p className="text-gray-500 mt-3">
            All documents matched successfully.
          </p>
        </div>
      ) : (
        <div className="p-6 space-y-5">
          {exceptionList.map((ex) => {
            const severity = getSeverityStyle(ex.severity);

            return (
              <div
                key={ex._id}
                className="border border-gray-200 rounded-2xl hover:shadow-md transition overflow-hidden"
              >
                {/* Top */}

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 p-5 bg-gray-50">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{severity.icon}</div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {ex.type}
                      </h3>

                      <p className="text-gray-500 mt-2">{ex.description}</p>
                    </div>
                  </div>

                  <span
                    className={`${severity.badge} px-4 py-2 rounded-full text-sm font-semibold`}
                  >
                    {ex.severity}
                  </span>
                </div>

                {/* Details */}

                <div className="grid md:grid-cols-3 gap-5 p-5">
                  <InfoCard
                    icon={<FaClipboardList />}
                    title="Status"
                    value={ex.status || "-"}
                  />

                  <InfoCard
                    icon={<FaExclamationTriangle />}
                    title="Remarks"
                    value={ex.remarks || "-"}
                  />

                  <InfoCard
                    icon={<FaUserCheck />}
                    title="Resolved By"
                    value={ex.resolvedBy || "-"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 hover:bg-white transition">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        {icon}

        {title}
      </div>

      <div className="mt-3 font-semibold text-gray-800 break-words">
        {value}
      </div>
    </div>
  );
}
