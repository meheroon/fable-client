"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RoleRoute from "@/components/shared/RoleRoute";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import ProfileHeader from "@/components/dashboard/ProfileHeader";

export default function WriterDashboardPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [ebooks, setEbooks] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/writer/ebooks/${user.email}`).then((res) => setEbooks(res.data || []));
      axiosSecure.get(`/writer/sales/${user.email}`).then((res) => setSales(res.data || []));
    }
  }, [user?.email, axiosSecure]);

  const totalRevenue = sales.reduce((sum, item) => sum + Number(item.price || 0), 0);

  return (
    <RoleRoute allowedRole="writer">
      <div>
        <h1 className="text-3xl font-bold">Writer Dashboard</h1>
        <p className="mt-2 text-slate-600">Manage ebooks, sales and publishing activity.</p>

        <ProfileHeader />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-slate-500">My Ebooks</p>
            <h2 className="text-3xl font-bold">{ebooks.length}</h2>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-slate-500">Total Sales</p>
            <h2 className="text-3xl font-bold">{sales.length}</h2>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-slate-500">Revenue</p>
            <h2 className="text-3xl font-bold">${totalRevenue.toFixed(2)}</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Link href="/dashboard/writer/add-ebook" className="rounded-2xl bg-indigo-600 p-6 text-white shadow">
            <h2 className="text-xl font-bold">Add Ebook</h2>
            <p className="mt-2">Publish a new ebook.</p>
          </Link>
          <Link href="/dashboard/writer/manage-ebooks" className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Manage My Ebooks</h2>
            <p className="mt-2 text-slate-600">Update your ebook list.</p>
          </Link>
          <Link href="/dashboard/writer/sales" className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Sales History</h2>
            <p className="mt-2 text-slate-600">Check recent purchases.</p>
          </Link>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">Recent Sales</h2>
          {sales.length === 0 ? (
            <p className="text-slate-500">No sales yet.</p>
          ) : (
            <div className="space-y-3">
              {sales.slice(0, 5).map((sale) => (
                <div key={sale._id} className="flex justify-between border-b pb-3">
                  <span>{sale.ebookTitle}</span>
                  <span>{sale.buyerEmail}</span>
                  <span>${sale.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </RoleRoute>
  );
}