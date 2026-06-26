"use client";

import PrivateRoute from "@/components/shared/PrivateRoute";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRoute>
      <section className="min-h-screen md:grid md:grid-cols-[256px_1fr]">
        <Sidebar />
        <main className="min-w-0 bg-slate-50 p-4 md:p-6">{children}</main>
      </section>
    </PrivateRoute>
  );
}