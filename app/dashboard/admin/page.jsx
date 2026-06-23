"use client";

import RoleRoute from "@/components/shared/RoleRoute";

export default function AdminDashboardPage() {
  return (
    <RoleRoute allowedRole="admin">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-slate-600">Welcome admin.</p>
      </div>
    </RoleRoute>
  );
}