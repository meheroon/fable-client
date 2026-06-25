"use client";

import Link from "next/link";
import RoleRoute from "@/components/shared/RoleRoute";

export default function UserDashboardPage() {
  return (
    <RoleRoute allowedRole="user">
      <div>
        <h1 className="text-3xl font-bold">Reader Dashboard</h1>
        <p className="mt-2 text-slate-600">Track your bookmarks and purchased ebooks.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Link href="/dashboard/user/purchases" className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Purchase History</h2>
            <p className="mt-2 text-slate-600">View all ebooks you have purchased.</p>
          </Link>

          <Link href="/dashboard/user/bookmarks" className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Bookmarks</h2>
            <p className="mt-2 text-slate-600">Open your saved ebooks list.</p>
          </Link>
        </div>
      </div>
    </RoleRoute>
  );
}