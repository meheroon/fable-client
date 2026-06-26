"use client";

import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const { registerUser, googleLogin } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const saveUserToDB = async (userData) => {
    const res = await axios.post(`${apiUrl}/register`, userData);
    localStorage.setItem("fable-token", res.data.token);
    return res.data.user;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const role = form.role.value;

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match");
      return;
    }

    try {
      await registerUser(email, password);

      await saveUserToDB({
        name,
        email,
        password,
        role,
        photo: "",
      });

      if (dbUser.role === "writer") router.push("/dashboard/writer");
      else router.push("/dashboard/user");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  const handleGoogleRegister = async () => {
    setError("");

    try {
      const result = await googleLogin();
      const loggedUser = result.user;

      await saveUserToDB({
        name: loggedUser.displayName || "Google User",
        email: loggedUser.email,
        password: "google-auth",
        role: "user",
        photo: loggedUser.photoURL || "",
      });

      router.push("/dashboard/user");
    } catch (err) {
      setError(err.message || "Google registration failed");
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
        <p className="mt-2 text-sm text-slate-500">
          Join Fable as a reader or writer.
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          <input name="name" required placeholder="Full Name" className="w-full rounded-lg border px-4 py-3" />
          <input name="email" required type="email" placeholder="Email" className="w-full rounded-lg border px-4 py-3" />
          <input name="password" required type="password" placeholder="Password" className="w-full rounded-lg border px-4 py-3" />
          <input name="confirmPassword" required type="password" placeholder="Confirm Password" className="w-full rounded-lg border px-4 py-3" />

          <select name="role" className="w-full rounded-lg border px-4 py-3">
            <option value="user">User / Reader</option>
            <option value="writer">Writer</option>
          </select>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700">
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="mt-4 w-full rounded-lg border py-3 font-semibold hover:bg-slate-50"
        >
          Continue with Google
        </button>
      </div>
    </section>
  );
}