"use client";

import PrivateRoute from "@/components/shared/PrivateRoute";

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-slate-600">Protected dashboard route.</p>
      </div>
    </PrivateRoute>
  );
}