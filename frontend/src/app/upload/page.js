"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaUpload,
} from "react-icons/fa";

import Layout from "@/components/layout/Layout";
import api from "@/services/api";

export default function UploadPage() {
  const [documentType, setDocumentType] = useState("PO");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  const uploadFile = async () => {
    if (!file) {
      toast.error("Please select a PDF document.");
      return;
    }

    const formData = new FormData();
    formData.append("documentType", documentType);
    formData.append("file", file);

    try {
      setLoading(true);
      setUploading(true);
      setProgress(0);
      setStatus("Uploading PDF...");

      const res = await api.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (event) => {
          if (!event.total) return;

          const percent = Math.round(
            (event.loaded * 100) / event.total
          );

          setProgress(percent);

          if (percent < 100) {
            setStatus("Uploading PDF...");
          }
        },
      });

      // AI Processing Animation

      setProgress(100);

      setStatus("🤖 Extracting data using Gemini AI...");
      await new Promise((r) => setTimeout(r, 1000));

      setStatus("🔍 Validating extracted fields...");
      await new Promise((r) => setTimeout(r, 900));

      setStatus("📦 Matching SKU Master...");
      await new Promise((r) => setTimeout(r, 900));

      setStatus("💾 Saving document...");
      await new Promise((r) => setTimeout(r, 900));

      setStatus("✅ Upload Completed");

      toast.success(
        res.data.message || "Document uploaded successfully."
      );

      setTimeout(() => {
        setUploading(false);
        setProgress(0);
        setStatus("");
      }, 1500);

      setFile(null);
      setDocumentType("PO");
    } catch (err) {
      setUploading(false);

      toast.error(
        err.response?.data?.message || "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Upload Documents
          </h1>

          <p className="text-gray-500 mt-2">
            Upload Purchase Orders, Goods Receipt Notes and Vendor
            Invoices for AI powered Three-Way Matching.
          </p>
        </div>

        {/* Upload Card */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

          {/* Document Type */}

          <div className="mb-8">

            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Document Type
            </label>

            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="PO">Purchase Order</option>

              <option value="GRN">Goods Receipt Note</option>

              <option value="INVOICE">Invoice</option>

            </select>

          </div>

          {/* Drop Zone */}

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition ${
              isDragActive
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
            }`}
          >
            <input {...getInputProps()} />

            <FaCloudUploadAlt className="mx-auto text-6xl text-blue-600 mb-5" />

            <h2 className="text-xl font-semibold text-gray-800">

              {isDragActive
                ? "Drop your PDF here"
                : "Drag & Drop your PDF"}

            </h2>

            <p className="text-gray-500 mt-3">
              or click anywhere to browse
            </p>

            <p className="text-sm text-gray-400 mt-4">
              Supported format: PDF
            </p>

          </div>

          {/* Selected File */}

          {file && (
            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">

                  <FaFilePdf className="text-red-600 text-3xl" />

                </div>

                <div>

                  <h3 className="font-semibold text-gray-800">
                    {file.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>

                </div>

              </div>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                Ready
              </span>

            </div>
          )}

          {/* Upload Progress */}

          {uploading && (
            <div className="mt-8 bg-slate-50 rounded-2xl border border-gray-200 p-6">

              <div className="flex justify-between mb-3">

                <span className="font-semibold text-gray-700">
                  {status}
                </span>

                <span className="font-bold text-blue-600">
                  {progress}%
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-700 h-4 rounded-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>
          )}

          {/* Upload Button */}

          <div className="mt-8">

            <button
              onClick={uploadFile}
              disabled={uploading || !file}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white font-semibold transition ${
                uploading || !file
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >

              <FaUpload />

              {uploading
                ? "Please Wait..."
                : "Upload Document"}

            </button>

          </div>

        </div>

      </div>
    </Layout>
  );
}
