"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-black text-slate-950">
          Login admina
        </h1>

        <p className="mt-3 text-slate-600">
          Zaloguj się do panelu administracyjnego.
        </p>

        <form onSubmit={handleLogin} className="mt-8 grid gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
            required
          />

          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-slate-950 px-6 py-5 text-lg font-black text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Logowanie..." : "Zaloguj"}
          </button>

          {message && (
            <div className="rounded-2xl bg-red-100 px-5 py-4 font-bold text-red-700">
              {message}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}