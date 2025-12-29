"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
      );

      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

      if (authError) {
        setError(authError.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      if (data.user && data.session) {
        // Wait a bit for cookies to be set by middleware
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Force full page reload to ensure cookies are synced
        window.location.href = "/admin";
      } else {
        setError("Login failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#495464] to-[#3a4149] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#495464] mb-2">
            Админ Панел
          </h1>
          <p className="text-[#495464]/70">Влез в системата</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#495464] mb-2"
            >
              Имейл
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] focus:border-transparent"
              placeholder="Въведи имейл адрес"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#495464] mb-2"
            >
              Парола
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] focus:border-transparent"
              placeholder="Въведи парола"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#495464] text-white py-3 rounded-lg font-medium hover:bg-[#3a4149] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Влизане..." : "Влез"}
          </button>
        </form>
      </div>
    </div>
  );
}







