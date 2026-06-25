"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axiosSecure from "@/lib/axiosSecure";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) {
        setMessage("No payment session found.");
        setLoading(false);
        return;
      }

      try {
        await axiosSecure.post("/payment-success", {
          sessionId,
        });

        setMessage("Payment completed successfully.");
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Payment confirmation failed."
        );
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [sessionId]);

  if (loading) {
    return <p className="p-10 text-center">Confirming payment...</p>;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-4xl font-bold text-slate-950">Payment Success</h1>

      <p className="mt-4 text-lg text-slate-600">{message}</p>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/dashboard/user/purchases"
          className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white"
        >
          View Purchases
        </Link>

        <Link
          href="/browse"
          className="rounded-lg border border-slate-300 px-6 py-3 font-semibold"
        >
          Browse More
        </Link>
      </div>
    </main>
  );
}