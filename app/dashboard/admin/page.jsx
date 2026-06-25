"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RoleRoute from "@/components/shared/RoleRoute";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function AdminDashboardPage() {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/stats").then((res) => setStats(res.data || {}));
    axiosSecure.get("/admin/transactions").then((res) => setTransactions(res.data || []));
  }, [axiosSecure]);

  return (
    <RoleRoute allowedRole="admin">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-slate-600">Monitor users, ebooks and transactions.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-5">
          <Stat title="Users" value={stats.totalUsers || 0} />
          <Stat title="Writers" value={stats.totalWriters || 0} />
          <Stat title="Ebooks" value={stats.totalEbooks || 0} />
          <Stat title="Sold" value={stats.totalEbooksSold || 0} />
          <Stat title="Revenue" value={`$${stats.totalRevenue || 0}`} />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Link href="/dashboard/admin/manage-users" className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Manage Users</h2>
            <p className="mt-2 text-slate-600">Update user roles.</p>
          </Link>
          <Link href="/dashboard/admin/manage-ebooks" className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Manage Ebooks</h2>
            <p className="mt-2 text-slate-600">Review platform ebooks.</p>
          </Link>
          <Link href="/dashboard/admin/transactions" className="rounded-2xl bg-indigo-600 p-6 text-white shadow">
            <h2 className="text-xl font-bold">Transactions</h2>
            <p className="mt-2">View payment records.</p>
          </Link>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">Recent Transactions</h2>
          {transactions.length === 0 ? (
            <p className="text-slate-500">No transactions found.</p>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 5).map((item) => (
                <div key={item._id} className="flex justify-between border-b pb-3">
                  <span>{item.email}</span>
                  <span>${item.amount}</span>
                  <span>{item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </RoleRoute>
  );
}

function Stat({ title, value }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <p className="text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-bold">{value}</h2>
    </div>
  );
}