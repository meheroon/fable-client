"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useRole from "@/hooks/useRole";

export default function DashboardPage() {
  const router = useRouter();
  const { role, roleLoading } = useRole();

  useEffect(() => {
    if (roleLoading) return;

    if (role === "admin") router.replace("/dashboard/admin");
    else if (role === "writer") router.replace("/dashboard/writer");
    else if (role === "user") router.replace("/dashboard/user");
    else router.replace("/login");
  }, [role, roleLoading, router]);

  return <p className="text-lg font-semibold">Redirecting dashboard...</p>;
}