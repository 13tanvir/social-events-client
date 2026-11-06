import Link from "next/link";

export type EventItem = {
  _id: string;
  title: string;
  description?: string;
  eventType?: string;
  thumbnail?: string;
  location?: string;
  eventDate: string;
  creatorEmail?: string;
  creatorName?: string;
};

export function formatDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="card h-full bg-base-100 shadow-md transition hover:shadow-xl">
      <figure className="h-48 w-full bg-base-300">
        {event.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.thumbnail}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        ) : null}
      </figure>
      <div className="card-body">
        <div className="flex items-center justify-between gap-2">
          <span className="badge badge-primary badge-outline">
            {event.eventType || "Event"}
          </span>
          <span className="text-sm opacity-70">{formatDate(event.eventDate)}</span>
        </div>
        <h2 className="card-title line-clamp-1">{event.title}</h2>
        <p className="text-sm opacity-80">📍 {event.location || "Location to be announced"}</p>
        <div className="card-actions mt-auto justify-end pt-2">
          <Link href={"/events/" + event._id} className="btn btn-primary btn-sm">
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
}