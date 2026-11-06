"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Login failed. Check your email and password.");
      return;
    }

    toast.success("Login successful! Welcome back.");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form onSubmit={handleLogin} className="card-body gap-3">
          <h1 className="text-center text-3xl font-bold text-primary">
            Welcome back
          </h1>
          <p className="text-center text-sm opacity-70">
            Login to create and join community events.
          </p>

          <label className="form-control w-full">
            <span className="label-text mb-1">Email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Password</span>
            <input
              name="password"
              type="password"
              required
              placeholder="Your password"
              className="input input-bordered w-full"
            />
          </label>

          <button type="submit" disabled={loading} className="btn btn-primary mt-2">
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm">
            New to UnityHands?{" "}
            <Link href="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}