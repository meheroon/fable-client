"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosPublic from "@/lib/axiosPublic";
import EbookCard from "@/components/shared/EbookCard";

export default function Home() {
  const [ebooks, setEbooks] = useState([]);
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    axiosPublic.get("/featured-ebooks").then((res) => setEbooks(res.data || []));
    axiosPublic.get("/top-writers").then((res) => setWriters(res.data || []));
  }, []);

  return (
    <main>
      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-24 md:grid-cols-2">
          <div>
            <p className="mb-4 font-semibold text-indigo-300">Digital Ebook Marketplace</p>
            <h1 className="text-5xl font-bold leading-tight">
              Read, publish and sell ebooks from one platform.
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              Fable helps readers discover original ebooks and helps writers manage publishing, sales and analytics.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/browse" className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white">
                Browse Ebooks
              </Link>
              <Link href="/register" className="rounded-xl border border-white px-6 py-3 font-semibold">
                Get Started
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white/10 p-8 shadow-2xl backdrop-blur">
            <h3 className="text-2xl font-bold">Platform Overview</h3>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 text-slate-950">
                <p className="text-3xl font-bold">{ebooks.length}+</p>
                <p>Featured ebooks</p>
              </div>
              <div className="rounded-2xl bg-white p-5 text-slate-950">
                <p className="text-3xl font-bold">3</p>
                <p>User roles</p>
              </div>
              <div className="rounded-2xl bg-white p-5 text-slate-950">
                <p className="text-3xl font-bold">Stripe</p>
                <p>Secure payment</p>
              </div>
              <div className="rounded-2xl bg-white p-5 text-slate-950">
                <p className="text-3xl font-bold">JWT</p>
                <p>Protected routes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold">Why Fable?</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ["For Readers", "Browse, bookmark and purchase ebooks with a clean reading journey."],
            ["For Writers", "Upload ebooks, manage your own catalog and track sales."],
            ["For Admins", "Control users, ebooks, transactions and platform analytics."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-3 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Recently Added Ebooks</h2>
            <Link href="/browse" className="font-semibold text-indigo-600">View All</Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {ebooks.length ? ebooks.slice(0, 6).map((ebook) => (
              <EbookCard key={ebook._id} ebook={ebook} />
            )) : <p>No ebooks available.</p>}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold">Top Writers</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {writers.length ? writers.map((writer) => (
            <div key={writer._id} className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">{writer._id}</h3>
              <p className="mt-2 text-slate-600">Sold Books: {writer.soldBooks}</p>
              <p className="font-semibold text-indigo-600">Revenue: ${writer.totalSales}</p>
            </div>
          )) : <p>No writer sales yet.</p>}
        </div>
      </section>
    </main>
  );
}