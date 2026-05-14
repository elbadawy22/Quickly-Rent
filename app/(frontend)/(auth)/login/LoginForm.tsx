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
          required
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
          required
          autoComplete="true"
        />
      </div>
      <div></div>
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="size-4 rounded border-zinc-300 text-teal-600 focus:ring-2 focus:ring-teal-500/40"
          />
          <span className="ml-2 text-sm text-slate-600">Remember me</span>
        </label>
        <button
          type="button"
          className="text-sm font-medium text-teal-700 transition-colors hover:text-teal-800"
        >
          Forgot password?
        </button>
      </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-zinc-900 py-3 px-4 font-medium text-white shadow-sm transition-all duration-200 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      <div className=" text-center">
        <p className="text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <button className="font-medium text-teal-700 transition-colors hover:text-teal-800">
            <Link href="/register">Sign up</Link>
          </button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
