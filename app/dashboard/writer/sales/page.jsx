"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";

export default function WriterSalesPage() {
  const { user } = useAuth();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/writer/sales/${user.email}`)
      .then((res) => setSales(res.data || []));
  }, [user?.email]);

  return (
    <section>
      <h1 className="text-3xl font-bold">Sales</h1>

      {sales.length === 0 ? (
        <p className="mt-6">No sales found.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-3 text-left">Ebook</th>
                <th className="p-3 text-left">Buyer</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale._id} className="border-b">
                  <td className="p-3">{sale.ebookTitle}</td>
                  <td className="p-3">{sale.buyerEmail}</td>
                  <td className="p-3">${sale.price}</td>
                  <td className="p-3">
                    {new Date(sale.purchaseDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}