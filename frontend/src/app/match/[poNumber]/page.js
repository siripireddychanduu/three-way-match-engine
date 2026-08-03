"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import MatchHeader from "@/app/match/MatchHeader";
import DocumentPanel from "@/app/match/DocumentPanel";
import ComparisonTable from "@/app/match/ComparisonTable";
import MatchSummary from "@/app/match/MatchSummary";
import ExceptionPanel from "@/components/document/ExceptionPanel";
import api from "@/services/api";

export default function MatchPage() {
  const { poNumber } = useParams();

  const [matchData, setMatchData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [exceptions, setExceptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const matchRes = await api.get(`/api/match/${poNumber}`);
      setMatchData(matchRes.data);

      const summaryRes = await api.get(`/api/summary/${poNumber}`);
      console.log("Summary API:", summaryRes.data);
      setSummary(summaryRes.data.summary || summaryRes.data);

      const exRes = await api.get(`/api/exceptions?poNumber=${poNumber}`);
      console.log("Match API:", matchRes.data);
      const exceptions = Array.isArray(exRes.data.data) ? exRes.data.data : [];

      setExceptions(exceptions);

      const exData = exRes.data.exceptions ?? exRes.data;

      setExceptions(Array.isArray(exData) ? exData : []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="space-y-6 animate-pulse">
          <div className="h-20 bg-gray-200 rounded-2xl"></div>

          <div className="grid grid-cols-3 gap-6">
            <div className="h-56 bg-gray-200 rounded-2xl"></div>
            <div className="h-56 bg-gray-200 rounded-2xl"></div>
            <div className="h-56 bg-gray-200 rounded-2xl"></div>
          </div>

          <div className="h-96 bg-gray-200 rounded-2xl"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <MatchHeader poNumber={poNumber} summary={summary} />

        <div className="grid lg:grid-cols-3 gap-6">
          <DocumentPanel
            title="Purchase Order"
            color="blue"
            data={matchData.purchaseOrder}
          />

          <DocumentPanel
            title="Invoice"
            color="green"
            data={matchData.invoice}
          />

          <DocumentPanel title="GRN" color="purple" data={matchData.grn} />
        </div>

        <ComparisonTable rows={matchData.comparison || []} />

        <MatchSummary summary={summary} />

        <ExceptionPanel exceptions={exceptions} />
      </div>
    </Layout>
  );
}
