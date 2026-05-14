"use client";

import { SquarePen } from "lucide-react";
import RegisterForm from "./RegisterForm";
import { useState } from "react";

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();
    const phone = formData.get("phone")?.toString();

    // Validation
    if (!name) {
      setError("Your Name is required");
      setLoading(false);
      return;
    }
    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }
    if (!phone) {
      setError("Phone is required");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Password is required");
      setLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name, phone }),
        headers: {
          credentials: "include",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Use window.location for full page reload to ensure cookie is read
      // This ensures the middleware sees the cookie
      window.location.href = "/login";
    } catch (err) {
      setError(err instanceof Error ? err.message + "  Hello" : "Login failed");
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="absolute inset-0 z-[100] flex min-h-dvh w-full items-center justify-center bg-linear-to-b from-zinc-100 via-white to-zinc-50 px-4">
        <div className="flex w-full max-w-5xl flex-col items-center justify-around gap-10 lg:flex-row lg:gap-16 lg:px-8">
          <div className="mb-3 text-center lg:mb-0">
            <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-zinc-900 to-teal-700 shadow-lg shadow-zinc-900/20">
              <SquarePen className="size-7 text-white" aria-hidden />
            </div>
            <h1 className="mb-2 text-3xl font-semibold tracking-tight text-zinc-900">
              Create Your Account
            </h1>
            <p className="max-w-sm text-zinc-600">
              Create your account to continue Shopping
            </p>
          </div>
          <div className="w-full max-w-md pt-3 lg:pt-8">
            <div className="w-full rounded-2xl border border-zinc-200/90 bg-white/90 p-8 shadow-xl shadow-zinc-900/5 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-4 w-full ">
                {error && (
                  <div className="rounded-xl border border-red-200/80 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
                <RegisterForm loading={loading} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
