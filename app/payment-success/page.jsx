"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosSecure from "@/lib/axiosSecure";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [message, setMessage] = useState("Confirming your payment...");

  useEffect(() => {
    if (!sessionId) {
      setMessage("Payment completed successfully.");
      return;
    }

    axiosSecure
      .post(`/payment-success?session_id=${sessionId}`)
      .then(() => setMessage("Payment completed successfully."))
      .catch((err) => {
        console.error(err.response?.data || err.message);
        setMessage("Payment completed, but purchase save failed.");
      });
  }, [sessionId]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Payment Success</h1>
        <p className="text-slate-600 mb-8">{message}</p>

        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard/user/purchases"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            View Purchases
          </Link>

          <Link
            href="/browse"
            className="border px-6 py-3 rounded-lg font-semibold"
          >
            Browse More
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<p className="p-10">Loading payment result...</p>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}