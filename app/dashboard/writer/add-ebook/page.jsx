"use client";

import useAuth from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";

export default function AddEbookPage() {
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const ebook = {
      title: form.title.value,
      description: form.description.value,
      content: form.content.value,
      price: Number(form.price.value),
      genre: form.genre.value,
      coverImage: form.coverImage.value,
      writerName: user?.displayName || "Test User",
      writerEmail: user?.email,
      status: "published",
    };

    await axiosSecure.post("/ebooks", ebook);
    alert("Ebook added successfully");
    form.reset();
  };

  return (
    <section>
      <h1 className="text-3xl font-bold">Add Ebook</h1>

      <form onSubmit={handleSubmit} className="mt-6 grid max-w-2xl gap-4">
        <input name="title" placeholder="Title" className="border p-3" required />
        <input name="genre" placeholder="Genre" className="border p-3" required />
        <input name="price" type="number" step="0.01" placeholder="Price" className="border p-3" required />
        <input name="coverImage" placeholder="Cover Image URL" className="border p-3" required />
        <textarea name="description" placeholder="Description" className="border p-3" required />
        <textarea name="content" placeholder="Ebook Content" className="border p-3" required />

        <button className="rounded bg-indigo-600 px-5 py-3 font-bold text-white">
          Add Ebook
        </button>
      </form>
    </section>
  );
}