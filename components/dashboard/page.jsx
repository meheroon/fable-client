"use client";

import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";

export default function DashboardPage() {
  const { user } = useAuth();
  const { role } = useRole();

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      <p className="mt-2 text-slate-600">Email: {user?.email}</p>
      <p className="mt-1 text-slate-600">Role: {role}</p>
    </div>
  );
}