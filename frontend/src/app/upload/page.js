"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { FaCloudUploadAlt, FaFilePdf, FaUpload } from "react-icons/fa";

import Layout from "@/components/layout/Layout";
import api from "@/services/api";

export default function UploadPage() {
  const [documentType, setDocumentType] = useState("PO");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

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

      const res = await api.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message || "Document uploaded successfully.");

      setFile(null);
      setDocumentType("PO");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold text-gray-800">Upload Documents</h1>

          <p className="text-gray-500 mt-2">
            Upload Purchase Orders, Goods Receipt Notes, and Vendor Invoices for
            three-way matching.
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
              {isDragActive ? "Drop your PDF here" : "Drag & Drop your PDF"}
            </h2>

            <p className="text-gray-500 mt-3">or click anywhere to browse</p>

            <p className="text-sm text-gray-400 mt-4">Supported format: PDF</p>
          </div>

          {/* Selected File */}

          {file && (
            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                  <FaFilePdf className="text-red-600 text-3xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">{file.name}</h3>

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

          {/* Upload Button */}

          <div className="mt-8">
            <button
              onClick={uploadFile}
              disabled={loading || !file}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white font-semibold transition ${
                loading || !file
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <FaUpload />

              {loading ? "Uploading Document..." : "Upload Document"}
            </button>
          </div>
        </div>

        {/* Upload Guidelines */}

        
      </div>
    </Layout>
  );
}
