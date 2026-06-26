"use client";

import useAuth from "@/hooks/useAuth";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { loginUser, googleLogin } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const saveToken = async (email, password = "google-auth") => {
    const res = await axios.post(`${apiUrl}/login`, { email, password });
    localStorage.setItem("fable-token", res.data.token);
    return res.data.user;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);
      const dbUser = await saveToken(email, password);

      if (dbUser.role === "admin") router.push("/dashboard/admin");
      else if (dbUser.role === "writer") router.push("/dashboard/writer");
      else router.push("/dashboard/user");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
  setError("");

  try {
    const result = await googleLogin();
    const loggedUser = result.user;

    const res = await axios.post(`${apiUrl}/social-login`, {
      name: loggedUser.displayName || "Google User",
      email: loggedUser.email,
      photo: loggedUser.photoURL || "",
      role: "user",
    });

    localStorage.setItem("fable-token", res.data.token);

    const dbUser = res.data.user;

    if (dbUser.role === "admin") router.push("/dashboard/admin");
    else if (dbUser.role === "writer") router.push("/dashboard/writer");
    else router.push("/dashboard/user");
  } catch (err) {
    setError(err.message || "Google login failed");
  }
};

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
        <p className="mt-2 text-sm text-slate-500">
          Login to continue your reading journey.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            name="email"
            required
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            name="password"
            required
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-3"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full rounded-lg border py-3 font-semibold hover:bg-slate-50"
        >
          Continue with Google
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          New to Fable?{" "}
          <Link href="/register" className="font-semibold text-indigo-600">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}