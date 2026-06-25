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
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const loadEbook = async () => {
      try {
        setLoading(true);

        const ebookRes = await axiosPublic.get(`/ebooks/${id}`);
        setEbook(ebookRes.data);

        if (user?.email) {
          const purchaseRes = await axiosSecure.get(
            `/purchases/check/${user.email}/${id}`
          );
          setPurchased(purchaseRes.data?.purchased || false);
        }
      } catch (err) {
        setError("Ebook not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    loadEbook();
  }, [id, user?.email]);

  const handlePurchase = async () => {
    if (!user?.email) {
      router.push("/login");
      return;
    }

    try {
      setPayLoading(true);

      const res = await axiosSecure.post("/create-checkout-session", {
        ebookId: id,
        buyerEmail: user.email,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed to start.");
    } finally {
      setPayLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (!user?.email) {
      router.push("/login");
      return;
    }

    try {
      await axiosSecure.post("/bookmarks", {
        userEmail: user.email,
        ebookId: id,
      });

      alert("Bookmarked successfully.");
    } catch (err) {
      alert("Failed to bookmark.");
    }
  };

  if (loading) {
    return <p className="p-10 text-center">Loading ebook details...</p>;
  }

  if (error || !ebook) {
    return <p className="p-10 text-center text-red-600">{error}</p>;
  }

  const isOwnEbook = user?.email === ebook.writerEmail;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <img
          src={ebook.coverImage}
          alt={ebook.title}
          className="h-[420px] w-full rounded-xl object-cover"
        />

        <div>
          <p className="mb-3 text-sm font-semibold text-indigo-600">
            {ebook.genre}
          </p>

          <h1 className="text-4xl font-bold text-slate-950">{ebook.title}</h1>

          <p className="mt-3 text-slate-600">
            By <span className="font-semibold">{ebook.writerName}</span>
          </p>

          <p className="mt-5 text-2xl font-bold">${ebook.price}</p>

          <p className="mt-3">
            Status:{" "}
            <span className="font-semibold">
              {purchased ? "Purchased" : ebook.status || "Available"}
            </span>
          </p>

          <p className="mt-6 leading-7 text-slate-700">{ebook.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handlePurchase}
              disabled={isOwnEbook || purchased || payLoading}
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {purchased
                ? "Already Purchased"
                : payLoading
                ? "Redirecting..."
                : "Buy Now"}
            </button>

            <button
              onClick={handleBookmark}
              className="rounded-lg border border-slate-300 px-6 py-3 font-semibold"
            >
              Bookmark
            </button>
          </div>

          {isOwnEbook && (
            <p className="mt-4 text-red-600">
              Writer cannot purchase own ebook.
            </p>
          )}

          {purchased && (
            <div className="mt-8 rounded-xl bg-slate-100 p-5">
              <h2 className="mb-3 text-xl font-bold">Full Content</h2>
              <p className="leading-7 text-slate-700">{ebook.content}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}