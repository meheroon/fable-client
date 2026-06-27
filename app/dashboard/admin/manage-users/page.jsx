"use client";

import { useEffect, useState } from "react";
import RoleRoute from "@/components/shared/RoleRoute";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function ManageUsersPage() {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/users").then((res) => setUsers(res.data || []));
  }, [axiosSecure]);

  return (
    <RoleRoute allowedRole="admin">
      <section>
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="mt-2 text-slate-600">Admin can manage user roles here.</p>

        <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow">
          <table className="w-full min-w-[750px]">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-4">{user.name || "N/A"}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
                        Edit
                      </button>
                      <button className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && <p className="p-5">No users found.</p>}
        </div>
      </section>
    </RoleRoute>
  );
}