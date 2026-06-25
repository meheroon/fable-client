"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";

export default function ManageEbooksPage() {
  const { user } = useAuth();
  const [ebooks, setEbooks] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/writer/ebooks/${user.email}`)
      .then((res) => setEbooks(res.data || []));
  }, [user?.email]);

  return (
    <section>
      <h1 className="text-3xl font-bold">Manage My Ebooks</h1>

      {ebooks.length === 0 ? (
        <p className="mt-6">No ebooks found.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Genre</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {ebooks.map((ebook) => (
                <tr key={ebook._id} className="border-b">
                  <td className="p-3">{ebook.title}</td>
                  <td className="p-3">{ebook.genre}</td>
                  <td className="p-3">${ebook.price}</td>
                  <td className="p-3">{ebook.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}