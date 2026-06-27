"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);

//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/browse", label: "Browse Ebooks" },
//     { href: "/dashboard", label: "Dashboard" },
//   ];
const dashboardHref = user
  ? "/dashboard"
  : "/login";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse Ebooks" },
  { href: dashboardHref, label: "Dashboard" },
];

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("fable-token");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-slate-900">
          Fable
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${
                pathname === link.href
                  ? "text-indigo-600"
                  : "text-slate-700 hover:text-indigo-600"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user && (
            <span className="text-sm font-semibold text-slate-700">
              Hi, {user.displayName || user.email}
            </span>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white"
            >
              Login
            </Link>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={pathname === link.href ? "text-indigo-600" : ""}
              >
                {link.label}
              </Link>
            ))}

            {user && (
              <span className="text-sm font-semibold text-slate-700">
                Hi, {user.displayName || user.email}
              </span>
            )}

            {user ? (
              <button onClick={handleLogout} className="text-left">
                Logout
              </button>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}