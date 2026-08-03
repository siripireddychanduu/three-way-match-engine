"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaFingerprint,
} from "react-icons/fa";
import api from "@/services/api";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white p-16 flex-col justify-between">
        <div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaShieldAlt className="text-3xl" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Three-Way Match Engine</h1>

              <p className="text-blue-100 mt-1">Intelligent Invoice Matching</p>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-5xl font-bold leading-tight">
              AI Powered
              <br />
              Procurement
              <br />
              Automation
            </h2>

            <p className="mt-8 text-lg text-white-100 leading-8">
              Automate Purchase Order, GRN and Invoice verification with
              intelligent document comparison and exception management.
            </p>
          </div>
        </div>

        <div className="text-blue-200 text-sm">
          © 2026 Three-Way Match Engine
        </div>
      </div>

      {/* Right Side */}

      <div className="flex-1 flex items-center justify-center bg-slate-100 p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto flex items-center justify-center">
              <FaFingerprint className="text-blue-600 text-4xl" />
            </div>

            <h2 className="text-3xl font-bold mt-6 text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">Sign in to continue</p>
          </div>

          <form onSubmit={login} className="mt-10 space-y-6">
            {/* Username */}

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Username
              </label>

              <div className="relative">
                <FaUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-14 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 pl-12 pr-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <FaLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 pl-12 pr-12 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Login */}

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg transition disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Secure Authentication • JWT Protected
          </div>
        </div>
      </div>
    </div>
  );
}
