import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold text-primary">🤝 UnityHands</h2>
          <p className="mt-3 text-sm opacity-80">
            A community platform where neighbours organise and join social
            service events like cleanups, plantations and donation drives.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              <Link href="/" className="hover:text-primary">Home</Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-primary">Upcoming Events</Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-primary">Login</Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-primary">Register</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Get in Touch</h3>
          <p className="text-sm opacity-80">support@unityhands.com</p>
          <p className="text-sm opacity-80">Nicosia, Cyprus</p>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on X"
            className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-base-100/10 hover:bg-primary"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-neutral-content/20 py-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} UnityHands. All rights reserved.
      </div>
    </footer>
  );
}