"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";

export default function ProfileHeader() {
  const { user } = useAuth();
  const { role } = useRole();

  const name = user?.displayName || user?.email?.split("@")[0] || "Fable User";
  const email = user?.email || "No email";
  const firstLetter = name?.charAt(0)?.toUpperCase();

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-md">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-indigo-400 text-4xl font-bold">
            {firstLetter}
          </div>

          <div>
            <h2 className="text-3xl font-bold">{name}</h2>
            <div className="mt-2 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700">
                {role || "user"}
              </span>
              <span>{email}</span>
              <span>Member since 2026</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* <Link href="/dashboard/user/purchases" className="rounded-lg bg-white/15 px-4 py-2 font-semibold">
            My Books
          </Link>
          <Link href="/dashboard/user/bookmarks" className="rounded-lg bg-white/15 px-4 py-2 font-semibold">
            Bookmarks
          </Link> */}
          <Link href="/dashboard/profile" className="rounded-lg bg-white px-4 py-2 font-semibold text-slate-900">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}