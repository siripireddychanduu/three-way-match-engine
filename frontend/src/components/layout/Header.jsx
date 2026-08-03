"use client";

import { useRouter } from "next/navigation";
import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function Header() {
  const router = useRouter();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const logout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm">
      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back 👋</h1>

        <p className="text-sm text-gray-500 mt-1">{today}</p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">
        {/* Notification */}

        <button className="relative w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center">
          <FaBell className="text-gray-600" />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}

        <div className="flex items-center gap-3 border-l pl-5">
          <FaUserCircle className="text-4xl text-blue-600" />

          <div>
            <p className="font-semibold text-gray-800">Administrator</p>

            <p className="text-xs text-gray-500">Procurement Team</p>
          </div>
        </div>

        {/* Logout */}

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
}
