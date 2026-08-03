"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { FaExternalLinkAlt, FaDownload, FaFilePdf } from "react-icons/fa";

export default function PDFViewer({ id }) {
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let objectUrl = null;

    const loadPdf = async () => {
      try {
        const response = await api.get(`/documents/${id}/file`, {
          responseType: "blob",
        });

        objectUrl = URL.createObjectURL(response.data);

        setPdfUrl(objectUrl);
      } catch (err) {
        console.error("Failed to load PDF", err);
      } finally {
        setLoading(false);
      }
    };

    loadPdf();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">Loading PDF...</div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaFilePdf className="text-red-500" />
          PDF Preview
        </h2>

        <div className="flex gap-3">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaExternalLinkAlt />
            Open
          </a>

          <a
            href={pdfUrl}
            download
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaDownload />
            Download
          </a>
        </div>
      </div>

      <iframe
        src={pdfUrl}
        title="Document Preview"
        className="w-full h-[700px] border rounded-lg"
      />
    </div>
  );
}
