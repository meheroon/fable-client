"use client";

import PrivateRoute from "@/components/shared/PrivateRoute";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRoute>
      <section className="grid min-h-screen md:grid-cols-[256px_1fr]">
        <Sidebar />
        <main className="bg-slate-50 p-6">{children}</main>
      </section>
    </PrivateRoute>
  );
}