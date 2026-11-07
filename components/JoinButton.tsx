"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import { authFetch } from "../lib/authFetch";

export default function JoinButton({
  eventId,
  isPast,
}: {
  eventId: string;
  isPast: boolean;
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const email = session?.user.email;

  useEffect(() => {
    if (!email) {
      setJoined(false);
      return;
    }
    authFetch("/joins?email=" + encodeURIComponent(email))
      .then((res) => res.json())
      .then((list: { eventId: string }[]) => {
        setJoined(list.some((item) => item.eventId === eventId));
      })
      .catch(() => {});
  }, [email, eventId]);

  const handleJoin = async () => {
    if (!session) {
      toast.error("Please login to join this event.");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await authFetch("/joins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          userEmail: session.user.email,
          userName: session.user.name,
        }),
      });
      const data = await res.json();
      if (res.status === 409) {
        setJoined(true);
        toast.error("You have already joined this event.");
        return;
      }
      if (!res.ok) {
        toast.error(data.message || "Could not join the event.");
        return;
      }
      setJoined(true);
      toast.success("You have joined this event. See you there!");
    } catch {
      toast.error("Server is not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPast) {
    return (
      <button disabled className="btn btn-disabled">
        This event has ended
      </button>
    );
  }

  if (joined) {
    return (
      <button disabled className="btn btn-success">
        Joined ✓
      </button>
    );
  }

  return (
    <button onClick={handleJoin} disabled={loading} className="btn btn-primary">
      {loading ? "Joining..." : "Join Event"}
    </button>
  );
}