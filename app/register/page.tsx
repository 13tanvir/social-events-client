"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const photoURL = String(form.get("photoURL") || "").trim();
    const password = String(form.get("password") || "");

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    toast.success("Registration successful! Welcome to UnityHands.");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form onSubmit={handleRegister} className="card-body gap-3">
          <h1 className="text-center text-3xl font-bold text-primary">
            Create your account
          </h1>
          <p className="text-center text-sm opacity-70">
            Join UnityHands and start helping your community.
          </p>

          <label className="form-control w-full">
            <span className="label-text mb-1">Name</span>
            <input
              name="name"
              type="text"
              required
              placeholder="Your full name"
              className="input input-bordered w-full"
            />
          </label>

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
            <span className="label-text mb-1">Photo URL</span>
            <input
              name="photoURL"
              type="url"
              required
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Password</span>
            <input
              name="password"
              type="password"
              required
              placeholder="Min 6 characters, upper and lower case"
              className="input input-bordered w-full"
            />
          </label>

          <button type="submit" disabled={loading} className="btn btn-primary mt-2">
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}