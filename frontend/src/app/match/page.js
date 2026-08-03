"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { FaSearch, FaFileInvoice } from "react-icons/fa";

export default function MatchPage() {
  const [poNumber, setPoNumber] = useState("");

  const router = useRouter();

  function search() {
    if (!poNumber.trim()) return;

    router.push(`/match/${poNumber}`);
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-16">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <FaFileInvoice className="text-blue-600 text-5xl" />
            </div>

            <h1 className="text-4xl font-bold mt-8 text-gray-800">
              Three-Way Match
            </h1>

            <p className="text-gray-500 mt-3 max-w-xl">
              Enter a Purchase Order Number to view intelligent comparison
              results between Purchase Order, Invoice and GRN.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-12">
            <input
              type="text"
              value={poNumber}
              placeholder="Enter Purchase Order Number"
              onChange={(e) => setPoNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search();
                }
              }}
              className="flex-1 rounded-xl border border-gray-300 px-5 py-4 text-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none"
            />

            <button
              onClick={search}
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-semibold transition"
            >
              <FaSearch />
              Search
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
