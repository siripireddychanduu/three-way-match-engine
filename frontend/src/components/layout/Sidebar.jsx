"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaTachometerAlt,
  FaUpload,
  FaExchangeAlt,
  FaChartPie,
  FaFolderOpen,
  FaBoxes,
  FaExclamationTriangle,
} from "react-icons/fa";

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: FaTachometerAlt,
  },
  {
    name: "Upload",
    path: "/upload",
    icon: FaUpload,
  },
  {
    name: "Match",
    path: "/match",
    icon: FaExchangeAlt,
  },
  {
    name: "Summary",
    path: "/summary",
    icon: FaChartPie,
  },
  {
    name: "Documents",
    path: "/documents",
    icon: FaFolderOpen,
  },
  {
    name: "SKU Master",
    path: "/sku-master",
    icon: FaBoxes,
  },
  {
    name: "Exceptions",
    path: "/exceptions",
    icon: FaExclamationTriangle,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen shadow-2xl flex flex-col">
      {/* Logo */}

      <div className="border-b border-slate-700 p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-xl font-bold">
            TM
          </div>

          <div>
            <h2 className="text-gray-900 font-bold text-lg">
  Three-Way Match
</h2>

            <p className="text-xs text-slate-400">Procurement System</p>
          </div>
        </div>
      </div>

      {/* Menu */}

      <nav className="flex-1 px-4 py-6">
        {menus.map((menu) => {
          const Icon = menu.icon;

          const active = pathname === menu.path;

          return (
            <Link
              key={menu.path}
              href={menu.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl mb-3 transition-all duration-200

              ${active ? "bg-blue-600 shadow-lg" : "hover:bg-slate-800"}
              `}
            >
              <Icon className="text-lg" />

              <span className="font-medium">{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}

      <div className="border-t border-slate-700 p-5">
        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-sm text-slate-300">Three-Way Match Engine</p>

          <p className="text-xs text-slate-500 mt-1">Version 1.0</p>
        </div>
      </div>
    </aside>
  );
}
