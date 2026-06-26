"use client";

import { useEffect, useState } from "react";
import RoleRoute from "@/components/shared/RoleRoute";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function TransactionsPage() {
  const axiosSecure = useAxiosSecure();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/transactions").then((res) => {
      setTransactions(res.data || []);
    });
  }, [axiosSecure]);

  return (
    <RoleRoute allowedRole="admin">
      <section>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="mt-2 text-slate-600">Admin can view payment records here.</p>

        <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-4">{item.email}</td>
                  <td className="p-4 capitalize">{item.type}</td>
                  <td className="p-4">${item.amount}</td>
                  <td className="p-4">
                    {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {transactions.length === 0 && <p className="p-5">No transactions found.</p>}
        </div>
      </section>
    </RoleRoute>
  );
}