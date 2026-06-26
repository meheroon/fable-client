// "use client";

// import Link from "next/link";
// import useRole from "@/hooks/useRole";

// export default function Sidebar() {
//   const { role } = useRole();

//   const commonLinks = [{ href: "/dashboard", label: "Dashboard Home" }];

//   const userLinks = [
//     { href: "/dashboard/user/purchases", label: "Purchase History" },
//     { href: "/dashboard/user/bookmarks", label: "Bookmarks" },
//   ];

//   const writerLinks = [
//     { href: "/dashboard/writer/add-ebook", label: "Add Ebook" },
//     { href: "/dashboard/writer/manage-ebooks", label: "Manage Ebooks" },
//     { href: "/dashboard/writer/sales", label: "Sales History" },
//   ];

//   const adminLinks = [
//     { href: "/dashboard/admin", label: "Analytics" },
//     { href: "/dashboard/admin/manage-users", label: "Manage Users" },
//     { href: "/dashboard/admin/manage-ebooks", label: "Manage Ebooks" },
//     { href: "/dashboard/admin/transactions", label: "Transactions" },
//   ];

//   const links =
//     role === "admin"
//       ? adminLinks
//       : role === "writer"
//       ? writerLinks
//       : userLinks;

//   return (
//     <aside className="min-h-screen w-full border-r bg-slate-950 p-5 text-white md:w-64">
//       <h2 className="mb-6 text-2xl font-bold">Dashboard</h2>

//       <nav className="space-y-3">
//         {[...commonLinks, ...links].map((link) => (
//           <Link
//             key={link.href}
//             href={link.href}
//             className="block rounded-lg px-4 py-2 text-sm hover:bg-indigo-600"
//           >
//             {link.label}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }
"use client";

import Link from "next/link";
import useRole from "@/hooks/useRole";

export default function Sidebar() {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <aside className="bg-slate-950 text-white min-h-screen p-6">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
        <p>Loading...</p>
      </aside>
    );
  }

  return (
    <aside className="bg-slate-950 text-white p-5 md:min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

      {role === "admin" && (
        <div className="mt-8 flex flex-col gap-4">
          <Link href="/dashboard/admin">Dashboard Home</Link>
          <Link href="/dashboard/admin/manage-users">Manage Users</Link>
          <Link href="/dashboard/admin/manage-ebooks">Manage Ebooks</Link>
          <Link href="/dashboard/admin/transactions">Transactions</Link>
        </div>
      )}

      {role === "writer" && (
        <div className="mt-8 flex flex-col gap-4">
          <Link href="/dashboard/writer">Dashboard Home</Link>
          <Link href="/dashboard/writer/add-ebook">Add Ebook</Link>
          <Link href="/dashboard/writer/manage-ebooks">Manage My Ebooks</Link>
          <Link href="/dashboard/writer/sales">Sales</Link>
        </div>
      )}

      {role === "user" && (
        <div className="mt-8 flex flex-col gap-4">
          <Link href="/dashboard/user">Dashboard Home</Link>
          <Link href="/dashboard/user/bookmarks">Bookmarks</Link>
          <Link href="/dashboard/user/purchases">Purchases</Link>
        </div>
      )}
    </aside>
  );
}