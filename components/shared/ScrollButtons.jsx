"use client";

import { useEffect, useState } from "react";

export default function ScrollButtons() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="rounded-full bg-indigo-600 px-4 py-2 text-white">
        ↑
      </button>
      <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })} className="rounded-full bg-slate-900 px-4 py-2 text-white">
        ↓
      </button>
    </div>
  );
}