"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBoxOpen, FaRupeeSign, FaTimes, FaSave } from "react-icons/fa";
import api from "@/services/api";

const initialForm = {
  internalSku: "",
  vendorSku: "",
  description: "",
  agreedRate: 0,
  mrp: 0,
  priceTolerance: 0.05,
  hsnCode: "",
  uom: "",
  eanCode: "",
};

export default function SKUDialog({ open, sku, onClose, onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (sku) {
      setForm({
        internalSku: sku.internalSku || "",
        vendorSku: sku.vendorSku || "",
        description: sku.description || "",
        agreedRate: sku.agreedRate || 0,
        mrp: sku.mrp || 0,
        priceTolerance: sku.priceTolerance ?? 0.05,
        hsnCode: sku.hsnCode || "",
        uom: sku.uom || "",
        eanCode: sku.eanCode || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [sku, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const validate = () => {
    if (!form.internalSku.trim()) {
      toast.error("Internal SKU is required");
      return false;
    }

    if (!form.description.trim()) {
      toast.error("Description is required");
      return false;
    }

    if (Number(form.agreedRate) < 0) {
      toast.error("Agreed Rate cannot be negative");
      return false;
    }

    if (Number(form.mrp) < 0) {
      toast.error("MRP cannot be negative");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const loadingToast = toast.loading(
      sku ? "Updating SKU..." : "Creating SKU...",
    );

    try {
      setSaving(true);

      if (sku) {
        await api.patch(`/masters/sku/${sku._id}`, form);

        toast.success("SKU updated successfully", {
          id: loadingToast,
        });
      } else {
        await api.post("/masters/sku", form);

        toast.success("SKU created successfully", {
          id: loadingToast,
        });
      }

      onSuccess?.();
      onClose?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to save SKU", {
        id: loadingToast,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}

        <div className="flex justify-between items-center px-8 py-6 border-b bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <FaBoxOpen className="text-blue-600 text-2xl" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {sku ? "Edit SKU" : "Create SKU"}
              </h2>

              <p className="text-gray-500 mt-1">
                Maintain SKU master information.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-200 transition flex items-center justify-center"
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        {/* Body */}

        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto bg-white">
          {/* Basic Information */}

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">
              Basic Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Internal SKU *"
                name="internalSku"
                value={form.internalSku}
                onChange={handleChange}
                disabled={!!sku}
              />

              <Input
                label="Vendor SKU"
                name="vendorSku"
                value={form.vendorSku}
                onChange={handleChange}
              />

              <div className="md:col-span-2">
                <Input
                  label="Description *"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">
              Pricing
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <CurrencyInput
                label="Agreed Rate"
                name="agreedRate"
                value={form.agreedRate}
                onChange={handleChange}
              />

              <CurrencyInput
                label="MRP"
                name="mrp"
                value={form.mrp}
                onChange={handleChange}
              />

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Price Tolerance
                </label>

                <select
                  name="priceTolerance"
                  value={form.priceTolerance}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                >
                  <option value={0}>0%</option>
                  <option value={0.02}>2%</option>
                  <option value={0.05}>5%</option>
                  <option value={0.1}>10%</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Details */}

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">
              Product Details
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <Input
                label="HSN Code"
                name="hsnCode"
                value={form.hsnCode}
                onChange={handleChange}
              />

              <Input
                label="Unit of Measure"
                name="uom"
                value={form.uom}
                onChange={handleChange}
              />

              <Input
                label="EAN Code"
                name="eanCode"
                value={form.eanCode}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 px-8 py-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition disabled:opacity-50"
          >
            <FaSave />

            {saving ? "Saving..." : sku ? "Update SKU" : "Create SKU"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, disabled = false, ...props }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        {...props}
        disabled={disabled}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition disabled:bg-gray-100 disabled:text-gray-500"
      />
    </div>
  );
}

function CurrencyInput({ label, disabled = false, ...props }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <FaRupeeSign className="absolute left-4 top-4 text-gray-400 text-sm" />

        <input
          {...props}
          type="number"
          disabled={disabled}
          className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
        />
      </div>
    </div>
  );
}
