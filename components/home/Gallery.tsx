import SectionHeading from "../SectionHeading";

const photos = [1, 2, 3, 4, 5, 6];

export default function Gallery() {
  return (
    <section className="bg-base-200 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          title="Moments from the Community"
          subtitle="A look at the kind of events our volunteers make happen together."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {photos.map((n) => (
            <div key={n} className="overflow-hidden rounded-xl shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={"https://picsum.photos/seed/unityhands" + n + "/600/450"}
                alt={"Community event photo " + n}
                className="aspect-[4/3] w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}