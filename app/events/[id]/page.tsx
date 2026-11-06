import Link from "next/link";
import { notFound } from "next/navigation";
import JoinButton from "../../../components/JoinButton";
import { EventItem, formatDate } from "../../../components/EventCard";
import { API_URL } from "../../../lib/api";

export const dynamic = "force-dynamic";

async function getEvent(id: string): Promise<EventItem | null> {
  try {
    const res = await fetch(API_URL + "/events/" + id, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const today = new Date().toISOString().split("T")[0];
  const isPast = event.eventDate < today;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/events" className="link link-primary text-sm">
        ← Back to all events
      </Link>

      <div className="card mt-4 overflow-hidden bg-base-100 shadow-xl">
        <figure className="h-64 w-full bg-base-300 sm:h-96">
          {event.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.thumbnail}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </figure>

        <div className="card-body gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge badge-primary">{event.eventType || "Event"}</span>
            <span className="text-sm opacity-70">📅 {formatDate(event.eventDate)}</span>
            <span className="text-sm opacity-70">📍 {event.location || "Location to be announced"}</span>
          </div>

          <h1 className="text-3xl font-bold">{event.title}</h1>

          {event.creatorName ? (
            <p className="text-sm opacity-70">Organised by {event.creatorName}</p>
          ) : null}

          <p className="whitespace-pre-line leading-relaxed opacity-90">
            {event.description || "No description has been added for this event yet."}
          </p>

          <div className="card-actions pt-2">
            <JoinButton eventId={event._id} isPast={isPast} />
          </div>
        </div>
      </div>
    </div>
  );
}