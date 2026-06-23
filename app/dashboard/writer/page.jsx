"use client";

import RoleRoute from "@/components/shared/RoleRoute";

export default function WriterDashboardPage() {
  return (
    <RoleRoute allowedRole="writer">
      <div>
        <h1 className="text-3xl font-bold">Writer Dashboard</h1>
        <p className="mt-2 text-slate-600">Manage your ebooks and sales.</p>
      </div>
    </RoleRoute>
  );
}