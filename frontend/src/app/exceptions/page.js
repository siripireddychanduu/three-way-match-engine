"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import api from "@/services/api";
import ExceptionStats from "@/components/exceptions/ExceptionStats";
import ExceptionFilters from "@/components/exceptions/ExceptionFilters";
import ExceptionTable from "@/components/exceptions/ExceptionTable";

export default function ExceptionsPage() {
  const [exceptions, setExceptions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExceptions();
  }, []);

  async function loadExceptions() {
    try {
      const res = await api.get("/api/exceptions");

      const data = res.data.exceptions || [];

      setExceptions(data);
      setFiltered(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Exception Management</h1>

        <ExceptionStats exceptions={exceptions} />

        <ExceptionFilters exceptions={exceptions} setFiltered={setFiltered} />

        <ExceptionTable
          loading={loading}
          exceptions={filtered}
          reload={loadExceptions}
        />
      </div>
    </Layout>
  );
}
