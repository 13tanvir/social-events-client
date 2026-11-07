"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PrivateRoute from "../../components/PrivateRoute";
import EventCard from "../../components/EventCard";
import EventCardSkeleton from "../../components/EventCardSkeleton";
import { authClient } from "../../lib/auth-client";
import { API_URL } from "../../lib/api";

type JoinedItem = {
  _id: string;
  eventId: string;
  title: string;
  thumbnail?: string;
  location?: string;
  eventType?: string;
  eventDate: string;
};

function JoinedList() {
  const { data: session } = authClient.useSession();
  const email = session?.user.email;
  const [items, setItems] = useState<JoinedItem[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!email) return;
    fetch(API_URL + "/joins?email=" + encodeURIComponent(email))
      .then((res) => {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((data: JoinedItem[]) => setItems(data))
      .catch(() => setFailed(true));
  }, [email]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-primary">
        My Joined Events
      </h1>
      <p className="mx-auto mt-2 mb-10 max-w-2xl text-center opacity-70">
        Events you have signed up for, sorted by date.
      </p>

      {failed ? (
        <div className="alert alert-error justify-center">
          Could not load your events right now. Please try again.
        </div>
      ) : items === null ? (
        <EventCardSkeleton />
      ) : items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="mb-4 opacity-70">You have not joined any events yet.</p>
          <Link href="/events" className="btn btn-primary">
            Browse Upcoming Events
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <EventCard
              key={item._id}
              event={{
                _id: item.eventId,
                title: item.title,
                thumbnail: item.thumbnail,
                location: item.location,
                eventType: item.eventType,
                eventDate: item.eventDate,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <JoinedList />
    </PrivateRoute>
  );
}