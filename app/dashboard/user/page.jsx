"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RoleRoute from "@/components/shared/RoleRoute";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function UserDashboardPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [purchases, setPurchases] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/purchases/${user.email}`).then((res) => {
      setPurchases(res.data || []);
    });

    axiosSecure.get(`/bookmarks/${user.email}`).then((res) => {
      setBookmarks(res.data || []);
    });
  }, [user?.email, axiosSecure]);

  return (
    <RoleRoute allowedRole="user">
      <section>
        <h1 className="text-3xl font-bold">Reader Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Track your bookmarks and purchased ebooks.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Link href="/dashboard/user/purchases" className="rounded-2xl bg-white p-6 shadow">
            <p className="text-slate-500">Total Purchases</p>
            <h2 className="mt-2 text-3xl font-bold">{purchases.length}</h2>
          </Link>

          <Link href="/dashboard/user/bookmarks" className="rounded-2xl bg-white p-6 shadow">
            <p className="text-slate-500">Total Bookmarks</p>
            <h2 className="mt-2 text-3xl font-bold">{bookmarks.length}</h2>
          </Link>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">Recent Purchases</h2>

          {purchases.length === 0 ? (
            <p className="text-slate-500">No purchases found.</p>
          ) : (
            <div className="space-y-3">
              {purchases.slice(0, 5).map((item) => (
                <div key={item._id} className="flex justify-between border-b pb-3">
                  <span>{item.ebookTitle}</span>
                  <span>${item.price}</span>
                  <span>{new Date(item.purchaseDate).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">Recent Bookmarks</h2>

          {bookmarks.length === 0 ? (
            <p className="text-slate-500">No bookmarks found.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {bookmarks.slice(0, 4).map((item) => (
                <Link
                  key={item._id}
                  href={`/ebook/${item.ebookId}`}
                  className="rounded-xl border p-4 hover:bg-slate-50"
                >
                  <h3 className="font-bold">{item.ebookTitle || "Saved Ebook"}</h3>
                  <p className="text-sm text-slate-500">View details</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </RoleRoute>
  );
}