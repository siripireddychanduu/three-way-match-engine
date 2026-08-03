"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import DocumentHeader from "@/components/document/DocumentHeader";
import DocumentTabs from "@/components/document/DocumentTabs";
import PODetails from "@/components/document/PODetails";
import PDFViewer from "@/components/document/PDFViewer";
import ItemsTable from "@/components/document/ItemsTable";
import SummaryCard from "@/components/document/SummaryCard";
import ExceptionPanel from "@/components/document/ExceptionPanel";
import api from "@/services/api";

export default function DocumentDetailsPage() {
  const { id } = useParams();

  const [document, setDocument] = useState(null);
  const [summary, setSummary] = useState(null);
  const [exceptions, setExceptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("po");

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  async function loadData() {
    try {
      setLoading(true);

      const docRes = await api.get(`/documents/${id}`);
      console.log("Document API:", docRes.data);
      const doc =
        docRes.data.data?.document ||
        docRes.data.document ||
        docRes.data.parsedData ||
        docRes.data.data ||
        docRes.data;

      setDocument(doc);

      if (doc.poNumber) {
        try {
          const summaryRes = await api.get(`/api/summary/${doc.poNumber}`);
          setSummary(
            summaryRes.data.summary || summaryRes.data.data || summaryRes.data,
          );
        } catch (err) {
          console.log("Summary not available");
        }

        try {
          const exRes = await api.get(
            `/api/exceptions?poNumber=${doc.poNumber}`,
          );

          setExceptions(Array.isArray(exRes.data.data) ? exRes.data.data : []);
        } catch (err) {
          console.log("No exceptions");
          setExceptions([]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return (
      <Layout>
        <div className="text-center py-20 text-xl">Loading...</div>
      </Layout>
    );

  if (!document)
    return (
      <Layout>
        <div className="text-center py-20">Document not found</div>
      </Layout>
    );

  return (
    <Layout>
      <div className="space-y-6">
        <DocumentHeader document={document} />

        <DocumentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="grid lg:grid-cols-2 gap-6">
          <PODetails document={document} />

          <PDFViewer id={id} />
        </div>

        {activeTab === "po" && (
          <>
            <ItemsTable items={document.items || []} />
            <ExceptionPanel exceptions={exceptions} />
          </>
        )}

        {activeTab === "summary" && <SummaryCard summary={summary} />}

        {activeTab === "invoice" && (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">Invoice Details</h2>
            <p className="text-gray-500">
              Invoice module will be implemented here.
            </p>
          </div>
        )}

        {activeTab === "grn" && (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">GRN Details</h2>
            <p className="text-gray-500">
              Delivery module will be implemented here.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
