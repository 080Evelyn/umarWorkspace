
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
  ShieldCheck,
  Building2,
  Loader2,
} from "lucide-react";

import {
  apiRequest,
  setAccessToken,
  LoginResponse,
} from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");

    if (!username.trim() || !password.trim()) {
      setMessage("Please enter your username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await apiRequest<LoginResponse>(
        "/auth/signin",
        {
          method: "POST",
          skipAuth: true,
          body: JSON.stringify({
            username: username.trim(),
            password,
          }),
        }
      );

      if (!response.accessToken) {
        throw new Error(
          "Authentication succeeded without an access token. Please contact support."
        );
      }

      // Keep the JWT in memory.
      setAccessToken(response.accessToken);

      // Navigate to the dashboard.
      router.replace("/dashboard");

    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.";

      setMessage(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">

      {/* Left branding panel */}
      <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-slate-950 p-12 text-white lg:flex xl:p-16">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-green-700/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-green-600/10 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600">
            <Building2 size={23} />
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight">
              Workspace
            </p>

            <p className="text-xs text-slate-400">
              Management System
            </p>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-300">
            <ShieldCheck size={14} />
            Workspace Administration
          </span>

          <h1 className="mt-7 text-4xl font-bold leading-tight xl:text-5xl">
            Everything your workspace needs, in one place.
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
            Manage daily operations, monitor visitors, organise your team
            and keep track of your workspace finances.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold text-white">01</p>
              <p className="mt-1 text-sm text-slate-400">
                Manage operations
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold text-white">02</p>
              <p className="mt-1 text-sm text-slate-400">
                Track performance
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Workspace Management</span>
          <span>Secure workspace access</span>
        </div>
      </section>

      {/* Login form */}
      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">

        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-white">
              <Building2 size={23} />
            </div>

            <div>
              <p className="text-lg font-bold text-slate-900">
                Workspace
              </p>

              <p className="text-xs text-slate-500">
                Management System
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
              <LockKeyhole size={23} />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in with your workspace username and password
              to access your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Username
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-slate-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-green-700 hover:text-green-800"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-slate-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Backend feedback */}
            {message && (
              <div
                role="alert"
                className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={17} />
                </>
              )}
            </button>

          </form>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-center text-xs leading-6 text-slate-500">
              Access is provided by your workspace administrator.
              Contact your administrator if you need assistance
              with your login credentials.
            </p>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            Secure access to your workspace
          </p>

        </div>
      </section>
    </main>
  );
}
