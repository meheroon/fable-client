"use client";

import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold">Edit Profile</h1>
      <p className="mt-2 text-slate-600">Profile update UI only.</p>

      <div className="mt-8 max-w-xl rounded-xl bg-white p-6 shadow">
        <label className="block font-semibold">Name</label>
        <input
          defaultValue={user?.displayName || ""}
          className="mt-2 w-full rounded-md border px-4 py-3"
          placeholder="Full name"
        />

        <label className="mt-5 block font-semibold">Email</label>
        <input
          defaultValue={user?.email || ""}
          disabled
          className="mt-2 w-full rounded-md border bg-slate-100 px-4 py-3"
        />

        <label className="mt-5 block font-semibold">Bio</label>
        <textarea
          className="mt-2 w-full rounded-md border px-4 py-3"
          placeholder="Write something about yourself"
        />

        <button className="mt-6 rounded-md bg-indigo-600 px-5 py-3 font-semibold text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}