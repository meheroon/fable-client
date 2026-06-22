"use client";

import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";

export default function useRole() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (!user?.email) {
      setRole(null);
      setRoleLoading(false);
      return;
    }

    axiosSecure
      .get(`/users/role/${user.email}`)
      .then((res) => setRole(res.data.role))
      .catch(() => setRole(null))
      .finally(() => setRoleLoading(false));
  }, [user?.email, loading, axiosSecure]);

  return { role, roleLoading };
}