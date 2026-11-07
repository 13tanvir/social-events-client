"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import PrivateRoute from "../../components/PrivateRoute";
import { EventItem, formatDate } from "../../components/EventCard";
import { authClient } from "../../lib/auth-client";
import { API_URL } from "../../lib/api";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Donation",
  "Education",
  "Health Camp",
  "Other",
];

function ManageList() {
  const { data: session } = authClient.useSession();
  const email = session?.user.email;
  const today = new Date().toISOString().split("T")[0];

  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [deleting, setDeleting] = useState<EventItem | null>(null);
  const [busy, setBusy] = useState(false);

  const loadEvents = useCallback(async () => {
    if (!email) return;
    try {
      const res = await fetch(
        API_URL + "/my-events?email=" + encodeURIComponent(email)
      );
      if (!res.ok) throw new Error("failed");
      setEvents(await res.json());
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, [email]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing || !email) return;

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

    setBusy(true);
    try {
      const res = await fetch(API_URL + "/events/" + editing._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorEmail: email,
          title,
          description,
          eventType,
          thumbnail,
          location,
          eventDate,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not update the event.");
        return;
      }
      toast.success("Event updated successfully!");
      setEditing(null);
      await loadEvents();
    } catch {
      toast.error("Server is not reachable. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting || !email) return;
    setBusy(true);
    try {
      const res = await fetch(
        API_URL +
          "/events/" +
          deleting._id +
          "?email=" +
          encodeURIComponent(email),
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not delete the event.");
        return;
      }
      toast.success("Event deleted successfully.");
      setDeleting(null);
      await loadEvents();
    } catch {
      toast.error("Server is not reachable. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-primary">
        Manage My Events
      </h1>
      <p className="mx-auto mt-2 mb-10 max-w-2xl text-center opacity-70">
        Update or delete the events you have created.
      </p>

      {failed ? (
        <div className="alert alert-error justify-center">
          Could not load your events right now. Please try again.
        </div>
      ) : events === null ? (
        <div className="space-y-3">
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-12 w-full" />
        </div>
      ) : events.length === 0 ? (
        <div className="py-20 text-center">
          <p className="mb-4 opacity-70">You have not created any events yet.</p>
          <Link href="/create-event" className="btn btn-primary">
            Create Your First Event
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box bg-base-100 shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Location</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td className="font-semibold">{event.title}</td>
                  <td>{event.eventType}</td>
                  <td className="whitespace-nowrap">{formatDate(event.eventDate)}</td>
                  <td>{event.location}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditing(event)}
                        className="btn btn-outline btn-primary btn-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setDeleting(event)}
                        className="btn btn-outline btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="text-xl font-bold text-primary">Update Event</h3>
            <form
              key={editing._id}
              onSubmit={handleUpdate}
              className="mt-4 flex flex-col gap-3"
            >
              <label className="form-control w-full">
                <span className="label-text mb-1">Event Title</span>
                <input name="title" type="text" required defaultValue={editing.title} className="input input-bordered w-full" />
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-1">Description</span>
                <textarea name="description" required rows={4} defaultValue={editing.description} className="textarea textarea-bordered w-full" />
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-1">Event Type</span>
                <select name="eventType" required defaultValue={editing.eventType || ""} className="select select-bordered w-full">
                  <option value="" disabled>Select a type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-1">Thumbnail Image URL</span>
                <input name="thumbnail" type="url" required defaultValue={editing.thumbnail} className="input input-bordered w-full" />
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-1">Location</span>
                <input name="location" type="text" required defaultValue={editing.location} className="input input-bordered w-full" />
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-1">Event Date</span>
                <input name="eventDate" type="date" required min={today} defaultValue={editing.eventDate} className="input input-bordered w-full" />
              </label>

              <div className="modal-action">
                <button type="button" onClick={() => setEditing(null)} className="btn">
                  Cancel
                </button>
                <button type="submit" disabled={busy} className="btn btn-primary">
                  {busy ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleting && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-xl font-bold text-error">Delete this event?</h3>
            <p className="py-4">
              <span className="font-semibold">{deleting.title}</span> will be
              permanently removed. This cannot be undone.
            </p>
            <div className="modal-action">
              <button onClick={() => setDeleting(null)} className="btn">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={busy} className="btn btn-error">
                {busy ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <PrivateRoute>
      <ManageList />
    </PrivateRoute>
  );
}