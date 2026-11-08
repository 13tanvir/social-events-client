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

  const handleGithub = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message || "GitHub login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body gap-3">
          <h1 className="text-center text-3xl font-bold text-primary">
            Welcome back
          </h1>
          <p className="text-center text-sm opacity-70">
            Login to create and join community events.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
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
          </form>

          <div className="divider my-1">OR</div>

          <button onClick={handleGithub} className="btn btn-outline">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            Continue with GitHub
          </button>

          <p className="text-center text-sm">
            New to UnityHands?{" "}
            <Link href="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}