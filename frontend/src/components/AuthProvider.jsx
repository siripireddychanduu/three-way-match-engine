"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Public pages
    const publicRoutes = ["/login"];

    if (!token && !publicRoutes.includes(pathname)) {
      router.replace("/login");
      return;
    }

    if (token && pathname === "/login") {
      router.replace("/dashboard");
    }
  }, [pathname, router]);

  return children;
}
