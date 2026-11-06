import EventCard, { EventItem } from "../../components/EventCard";
import { API_URL } from "../../lib/api";

export const dynamic = "force-dynamic";

async function getEvents(): Promise<EventItem[] | null> {
  try {
    const res = await fetch(API_URL + "/events", { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-primary">
        Upcoming Events
      </h1>
      <p className="mx-auto mt-2 mb-10 max-w-2xl text-center opacity-70">
        Find a cause near you and join hands with your community.
      </p>

      {events === null ? (
        <div className="alert alert-error justify-center">
          Could not load events right now. Please try again in a moment.
        </div>
      ) : events.length === 0 ? (
        <div className="py-20 text-center opacity-70">
          No upcoming events yet. Be the first to create one!
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}