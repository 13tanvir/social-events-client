"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PrivateRoute from "../../components/PrivateRoute";
import { authClient } from "../../lib/auth-client";
import { authFetch } from "../../lib/authFetch";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Donation",
  "Education",
  "Health Camp",
  "Other",
];

function CreateEventForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") || "").trim();
    const description = String(form.get("description") || "").trim();
    const eventType = String(form.get("eventType") || "");
    const thumbnail = String(form.get("thumbnail") || "").trim();
    const location = String(form.get("location") || "").trim();
    const eventDate = String(form.get("eventDate") || "");

    if (title.length < 5) {
      toast.error("Title must be at least 5 characters long.");
      return;
    }
    if (description.length < 20) {
      toast.error("Description must be at least 20 characters long.");
      return;
    }
    if (!eventType) {
      toast.error("Please choose an event type.");
      return;
    }
    if (!eventDate || eventDate < today) {
      toast.error("Event date must be today or a future date.");
      return;
    }

    setLoading(true);
    try {
      const res = await authFetch("/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          eventType,
          thumbnail,
          location,
          eventDate,
          creatorEmail: session?.user.email,
          creatorName: session?.user.name,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not create the event.");
        return;
      }
      toast.success("Event created successfully!");
      router.push("/events");
    } catch {
      toast.error("Server is not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="card bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h1 className="text-center text-3xl font-bold text-primary">
            Create an Event
          </h1>

          <label className="form-control w-full">
            <span className="label-text mb-1">Event Title</span>
            <input name="title" type="text" required placeholder="Winter Clothes Distribution" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Description</span>
            <textarea name="description" required rows={4} placeholder="Tell people what the event is about and how they can help" className="textarea textarea-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Event Type</span>
            <select name="eventType" required defaultValue="" className="select select-bordered w-full">
              <option value="" disabled>Select a type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Thumbnail Image URL</span>
            <input name="thumbnail" type="url" required placeholder="https://example.com/event.jpg" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Location</span>
            <input name="location" type="text" required placeholder="Mirpur 10, Dhaka" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Event Date</span>
            <input name="eventDate" type="date" required min={today} className="input input-bordered w-full" />
          </label>

          <button type="submit" disabled={loading} className="btn btn-primary mt-2">
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <PrivateRoute>
      <CreateEventForm />
    </PrivateRoute>
  );
}