"use client";
import Link from "next/link";
interface LoginFormProps {
  loading?: boolean;
}

const LoginForm = ({ loading = false }: LoginFormProps) => {
  return (
    <>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-zinc-900"
        >
          Your Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 text-zinc-800 transition-all duration-200 placeholder:text-zinc-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          placeholder="Jone Duo"
          
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-zinc-900"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 text-zinc-800 transition-all duration-200 placeholder:text-zinc-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          placeholder="you@example.com"
          
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-zinc-900"
        >
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 text-zinc-800 transition-all duration-200 placeholder:text-zinc-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          placeholder="0123456789"
          
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-zinc-900"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 text-zinc-800 transition-all duration-200 placeholder:text-zinc-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          placeholder="••••••••••••••"
          autoComplete="true"
        />
      </div>
      <div></div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-zinc-900 py-3 px-4 font-medium text-white shadow-sm transition-all duration-200 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      <div className=" text-center">
        <p className="text-sm text-slate-600">
          Already have an account?{" "}
          <button className="font-medium text-teal-700 transition-colors hover:text-teal-800">
            <Link href="/login">Login</Link>
          </button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
