"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";

export default function UserBookmarksPage() {
  const { user, loading } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/bookmarks/${user.email}`)
      .then((res) => setBookmarks(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setDataLoading(false));
  }, [user?.email]);

  if (loading || dataLoading) return <p>Loading bookmarks...</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold">My Bookmarks</h1>
      <p className="mt-2 text-slate-600">Your saved ebooks will show here.</p>

      {bookmarks.length === 0 ? (
        <p className="mt-8 text-slate-600">No bookmarks found.</p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((item) => (
            <div key={item._id} className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="text-xl font-bold">{item.ebookTitle || "Saved Ebook"}</h3>
              <p className="mt-2 text-slate-600">Ebook ID: {item.ebookId}</p>

              <Link
                href={`/ebook/${item.ebookId}`}
                className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}