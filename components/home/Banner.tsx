import Link from "next/link";

export default function Banner() {
  return (
    <section className="bg-linear-to-br from-primary/20 via-base-100 to-secondary/20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="badge badge-primary badge-outline mb-4">
            Community-powered change
          </span>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Small acts, <span className="text-primary">big impact</span> in your neighbourhood
          </h1>
          <p className="mt-4 max-w-xl text-lg opacity-80">
            Find cleanups, plantation drives and donation events near you, or
            organise your own. When neighbours show up together, whole
            communities change.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className="btn btn-primary">
              Browse Events
            </Link>
            <Link href="/create-event" className="btn btn-outline btn-primary">
              Create an Event
            </Link>
          </div>
        </div>

        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/unityhands-hero/800/600"
            alt="Volunteers working together in a community event"
            className="h-72 w-full rounded-2xl object-cover shadow-2xl md:h-96"
          />
        </div>
      </div>
    </section>
  );
}