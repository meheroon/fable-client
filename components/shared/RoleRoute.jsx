"use client";

import useRole from "@/hooks/useRole";
import PrivateRoute from "@/components/shared/PrivateRoute";

export default function RoleRoute({ allowedRole, children }) {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">Checking permission...</p>
      </div>
    );
  }

  if (role !== allowedRole) {
    return (
      <PrivateRoute>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-lg font-semibold text-red-600">
            Forbidden Access
          </p>
        </div>
      </PrivateRoute>
    );
  }

  return <PrivateRoute>{children}</PrivateRoute>;
}