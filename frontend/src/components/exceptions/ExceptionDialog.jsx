"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";

export default function ExceptionDialog({
  open,
  exception,
  onClose,
  onSuccess,
}) {
  const [remarks, setRemarks] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (exception) {
      setRemarks(exception.remarks || "");
    }
  }, [exception]);

  if (!open || !exception) return null;

  const handleResolve = async () => {
    try {
      setSaving(true);

      await api.put(`/api/exceptions/${exception._id}/resolve`, {
        remarks,
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to resolve exception.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold">Exception Details</h2>

          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <Info label="PO Number" value={exception.poNumber} />
          <Info label="Vendor" value={exception.vendorName} />
          <Info label="Type" value={exception.type} />
          <Info label="Severity" value={exception.severity} />
          <Info label="Status" value={exception.status} />

          <div>
            <label className="font-semibold">Description</label>

            <p className="mt-2 text-gray-600">{exception.description}</p>
          </div>

          <div>
            <label className="font-semibold">Remarks</label>

            <textarea
              rows={4}
              className="w-full border rounded-lg mt-2 p-3"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t p-5">
          <button onClick={onClose} className="px-5 py-2 border rounded-lg">
            Close
          </button>

          {exception.status === "OPEN" && (
            <button
              onClick={handleResolve}
              disabled={saving}
              className="bg-green-600 text-white px-5 py-2 rounded-lg"
            >
              {saving ? "Saving..." : "Resolve"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-semibold">{label}</span>
      <span>{value || "-"}</span>
    </div>
  );
}
