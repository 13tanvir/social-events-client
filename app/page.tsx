import Link from "next/link";
import Banner from "../components/home/Banner";
import Features from "../components/home/Features";
import Gallery from "../components/home/Gallery";
import Newsletter from "../components/home/Newsletter";
import EventCard, { EventItem } from "../components/EventCard";
import SectionHeading from "../components/SectionHeading";
import { API_URL } from "../lib/api";

export const dynamic = "force-dynamic";

async function getRecentEvents(): Promise<EventItem[] | null> {
  try {
    const res = await fetch(API_URL + "/events?limit=6", { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const events = await getRecentEvents();

  return (
    <>
      <Banner />
      <Features />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            title="Upcoming Events"
            subtitle="The next events happening near you. Pick one and join hands."
          />

          {events === null ? (
            <div className="alert alert-error justify-center">
              Could not load events right now. Please try again in a moment.
            </div>
          ) : events.length === 0 ? (
            <div className="py-10 text-center opacity-70">
              No upcoming events yet. Be the first to create one!
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link href="/events" className="btn btn-primary">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      <Gallery />
      <Newsletter />
    </>
  );
}