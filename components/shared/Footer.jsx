import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h2 className="text-3xl font-bold">Fable</h2>
            <p className="mt-4 text-sm text-slate-300">
              Discover, read and share amazing ebooks from talented writers.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/browse">Browse Ebooks</Link></li>
              <li><Link href="/login">Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
              <li><Link href="/help-center">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <input className="w-full rounded-md px-3 py-2 text-black" placeholder="Enter your email" />
            <button className="mt-3 w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold">
              Subscribe
            </button>

            <div className="mt-5 flex gap-4 text-xl">
              <a href="https://facebook.com" target="_blank"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank"><FaInstagram /></a>
              <a href="https://x.com" target="_blank"><FaXTwitter /></a>
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