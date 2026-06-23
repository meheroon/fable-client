"use client";

import RoleRoute from "@/components/shared/RoleRoute";

export default function UserPurchasesPage() {
  return (
    <RoleRoute allowedRole="user">
      <div>
        <h1 className="text-3xl font-bold">Purchase History</h1>
        <p className="mt-2 text-slate-600">Your purchased ebooks will show here.</p>
      </div>
    </RoleRoute>
  );
}