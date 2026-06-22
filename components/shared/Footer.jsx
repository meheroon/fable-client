import Link from "next/link";
// import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold">Fable</h2>
            <p className="mt-4 text-sm text-slate-300">
              Discover, read and share amazing ebooks from talented writers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/browse">Browse Ebooks</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="#">Help Center</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-md px-3 py-2 text-black outline-none"
              />

              <button className="rounded-md bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-700">
                Subscribe
              </button>
            </div>

            <div className="mt-5 flex gap-4">
                <span>Facebook</span>
                <span>Instagram</span>
                <span>Twitter</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-5 text-center text-sm text-slate-400">
          © 2026 Fable. All rights reserved.
        </div>
      </div>
    </footer>
  );
}