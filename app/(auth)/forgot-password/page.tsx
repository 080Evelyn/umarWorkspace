
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  LockKeyhole,
  Mail,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    // Password reset API will be connected later.
    setSubmitted(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <Link href="/login" className="mb-10 flex items-center gap-3">
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
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {!submitted ? (
            <>
              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <LockKeyhole size={26} />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Forgot your password?
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                No worries. Enter the email address associated with your
                account and we'll help you reset your password.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                  </div>
                </div>

                {error && (
                  <p role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                >
                  Reset Password
                  <ArrowRight size={17} />
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-700">
                <CheckCircle2 size={28} />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Request received
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Your password reset form has been submitted locally for{" "}
                <span className="font-semibold text-slate-800">
                  {email}
                </span>
                .
              </p>

              <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm leading-6 text-blue-800">
                  Email delivery is not active yet. We'll enable the actual
                  password reset process when we connect the backend API.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setEmail("");
                }}
                className="mt-6 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Try another email
              </button>
            </>
          )}
        </div>

        {/* Back to login */}
        <Link
          href="/login"
          className="mt-7 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 transition hover:text-green-700"
        >
          <ArrowLeft size={16} />
          Back to Sign In
        </Link>

        <p className="mt-10 text-center text-xs text-slate-400">
          Secure access to your workspace
        </p>
      </div>
    </main>
  );
}
