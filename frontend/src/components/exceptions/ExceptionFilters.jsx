"use client";

import { useState } from "react";

export default function ExceptionFilters({ exceptions, setFiltered }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("");
  const [type, setType] = useState("");

  const applyFilters = (
    newSearch = search,
    newStatus = status,
    newSeverity = severity,
    newType = type,
  ) => {
    let data = [...exceptions];

    if (newSearch) {
      const value = newSearch.toLowerCase();

      data = data.filter(
        (e) =>
          e.poNumber?.toLowerCase().includes(value) ||
          e.vendorName?.toLowerCase().includes(value),
      );
    }

    if (newStatus) {
      data = data.filter((e) => e.status === newStatus);
    }

    if (newSeverity) {
      data = data.filter((e) => e.severity === newSeverity);
    }

    if (newType) {
      data = data.filter((e) => e.type === newType);
    }

    setFiltered(data);
  };

  return (
    <div className="bg-white shadow rounded-xl p-5">
      <div className="grid md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search PO Number / Vendor"
          className="border rounded-lg px-4 py-2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            applyFilters(e.target.value, status, severity, type);
          }}
        />

        <select
          className="border rounded-lg px-4 py-2"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            applyFilters(search, e.target.value, severity, type);
          }}
        >
          <option value="">All Status</option>
          <option value="OPEN">Open</option>
          <option value="RESOLVED">Resolved</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2"
          value={severity}
          onChange={(e) => {
            setSeverity(e.target.value);
            applyFilters(search, status, e.target.value, type);
          }}
        >
          <option value="">All Severity</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            applyFilters(search, status, severity, e.target.value);
          }}
        >
          <option value="">All Types</option>
          <option value="QUANTITY_MISMATCH">Quantity Mismatch</option>
          <option value="PRICE_MISMATCH">Price Mismatch</option>
          <option value="MRP_MISMATCH">MRP Mismatch</option>
          <option value="GRN_MISSING">GRN Missing</option>
          <option value="INVOICE_MISSING">Invoice Missing</option>
          <option value="ITEM_MISSING_IN_PO">Item Missing In PO</option>
          <option value="UNMAPPED_MASTER_SKU">Unmapped SKU</option>
        </select>
      </div>
    </div>
  );
}
