"use client";

import RoleRoute from "@/components/shared/RoleRoute";

export default function UserDashboardPage() {
  return (
    <RoleRoute allowedRole="user">
      <div>
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <p className="mt-2 text-slate-600">View purchases and bookmarks.</p>
      </div>
    </RoleRoute>
  );
}