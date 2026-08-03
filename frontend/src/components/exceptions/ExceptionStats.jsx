"use client";

import StatCard from "@/components/common/StatCard";

export default function ExceptionStats({ exceptions }) {
  const total = exceptions.length;

  const open = exceptions.filter((e) => e.status === "OPEN").length;

  const resolved = exceptions.filter((e) => e.status === "RESOLVED").length;

  const high = exceptions.filter((e) => e.severity === "HIGH").length;

  return (
    <div className="grid md:grid-cols-4 gap-5">
      <StatCard title="Total Exceptions" value={total} />

      <StatCard title="Open" value={open} />

      <StatCard title="Resolved" value={resolved} />

      <StatCard title="High Severity" value={high} />
    </div>
  );
}
