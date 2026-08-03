"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 flex gap-6">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/upload">Upload</Link>
      <Link href="/purchase-order">Purchase Order</Link>
      <Link href="/fulfillment">Fulfillment</Link>
      <Link href="/match">Match</Link>
      <Link href="/delivery">Delivery</Link>
      <Link href="/summary">Summary</Link>
      <Link href="/sku-master">SKU Master</Link>
    </nav>
  );
}
