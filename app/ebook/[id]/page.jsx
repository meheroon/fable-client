"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import axiosPublic from "@/lib/axiosPublic";
import axiosSecure from "@/lib/axiosSecure";

export default function EbookDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axiosPublic
      .get(`/ebooks/${id}`)
      .then((res) => setEbook(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBookmark = async () => {
    if (!user?.email) {
      router.push("/login");
      return;
    }

    try {
      await axiosSecure.post("/bookmarks", {
        userEmail: user.email,
        ebookId: ebook._id || ebook.id,
        ebookTitle: ebook.title,
      });

      setMessage("Bookmark added successfully.");
    } catch (error) {
      setMessage(error?.response?.data?.message || "Bookmark failed.");
    }
  };

  const handleBuyNow = async () => {
    if (!user?.email) {
      router.push("/login");
      return;
    }

    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        ebookId: ebook._id || ebook.id,
        buyerEmail: user.email,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      setMessage(error?.response?.data?.message || "Payment failed.");
    }
  };

  if (loading) return <p className="p-10">Loading ebook...</p>;
  if (!ebook) return <p className="p-10">Ebook not found.</p>;

  return (
  <section className="mx-auto max-w-6xl px-6 py-10">
    <button
      onClick={() => router.push("/browse")}
      className="mb-6 rounded-lg border px-5 py-2 font-semibold"
    >
      ← Back to Browse
    </button>

    <div className="grid gap-10 md:grid-cols-2">
      <img
        src={ebook.coverImage || "/placeholder.png"}
        alt={ebook.title}
        className="h-[420px] w-full rounded-xl object-cover"
      />

      <div>
        <p className="font-semibold text-indigo-600">{ebook.genre}</p>
        <h1 className="mt-4 text-4xl font-bold">{ebook.title}</h1>
        <p className="mt-4 text-slate-700">
          By <b>{ebook.writerName}</b>
        </p>
        <p className="mt-6 text-2xl font-bold">${ebook.price}</p>
        <p className="mt-4">
          Status: <b>{ebook.status}</b>
        </p>
        <p className="mt-8 text-slate-700">{ebook.description}</p>

        {message && <p className="mt-5 font-semibold text-red-600">{message}</p>}

        <div className="mt-8 flex gap-4">
          <button
            onClick={handleBuyNow}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-bold text-white"
          >
            Buy Now
          </button>

          <button
            onClick={handleBookmark}
            className="rounded-lg border px-6 py-3 font-bold"
          >
            Bookmark
          </button>
        </div>
      </div>
    </div>
  </section>
);
}