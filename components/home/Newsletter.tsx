"use client";

import toast from "react-hot-toast";

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    toast.success("Thanks for subscribing! We will keep you posted.");
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-content shadow-xl">
          <h2 className="text-3xl font-bold">Never miss a good cause</h2>
          <p className="mx-auto mt-2 max-w-xl opacity-90">
            Subscribe to get new community events straight to your inbox.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="input w-full text-base-content"
            />
            <button type="submit" className="btn btn-neutral">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}