"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";
import { authClient } from "../lib/auth-client";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

function Avatar({ name, image }: { name: string; image?: string | null }) {
  const [failed, setFailed] = useState(false);

  if (image && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-10 w-10 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-content">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const closeMenu = () => {
    (document.activeElement as HTMLElement | null)?.blur();
  };

  const handleLogout = async () => {
    closeMenu();
    await authClient.signOut();
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 px-4 shadow-sm lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="text-xl font-bold text-primary">
          🤝 UnityHands
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />

        {isPending ? (
          <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
        ) : user ? (
          <>
            <div className="dropdown dropdown-end">
              <div className="tooltip tooltip-bottom" data-tip={user.name}>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-circle btn-ghost"
                >
                  <Avatar name={user.name} image={user.image} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li className="menu-title">{user.name}</li>
                <li><Link href="/profile" onClick={closeMenu}>My Profile</Link></li>
                <li>
                  <Link href="/create-event" onClick={closeMenu}>
                    Create Event
                  </Link>
                </li>
                <li>
                  <Link href="/manage-events" onClick={closeMenu}>
                    Manage Events
                  </Link>
                </li>
                <li>
                  <Link href="/joined-events" onClick={closeMenu}>
                    Joined Events
                  </Link>
                </li>
              </ul>
            </div>
            <button onClick={handleLogout} className="btn btn-outline btn-primary btn-sm">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}