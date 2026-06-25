"use client";

import { useEffect, useState } from "react";
import EbookCard from "@/components/shared/EbookCard";
import axiosPublic from "@/lib/axiosPublic";

export default function BrowsePage() {
  const [ebooks, setEbooks] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axiosPublic
      .get(`/ebooks?search=${search}&genre=${genre}&sort=${sort}`)
      .then((res) => setEbooks(res.data?.ebooks || []))
      .catch(() => setEbooks([]))
      .finally(() => setLoading(false));
  }, [search, genre, sort]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-4xl font-bold">Browse Ebooks</h1>
      <p className="mt-2 text-slate-600">
        Explore original ebooks from talented writers.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search by title or writer"
          className="rounded-lg border p-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="rounded-lg border p-3"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
        </select>

        <select
          className="rounded-lg border p-3"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price Low to High</option>
          <option value="price-high">Price High to Low</option>
        </select>
      </div>

      {loading ? (
        <p className="mt-10">Loading ebooks...</p>
      ) : ebooks.length === 0 ? (
        <p className="mt-10 text-slate-500">No ebooks found.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ebooks.map((ebook) => (
            <EbookCard key={ebook._id || ebook.id} ebook={ebook} />
          ))}
        </div>
      )}
    </main>
  );
}