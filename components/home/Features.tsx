import SectionHeading from "../SectionHeading";

const features = [
  {
    icon: "📝",
    title: "Create Events",
    text: "Start a cleanup, plantation or donation drive in minutes and tell your community where to show up.",
  },
  {
    icon: "🤝",
    title: "Join with One Click",
    text: "Pick an event that matters to you and join instantly. No long forms, no waiting.",
  },
  {
    icon: "📅",
    title: "Track Your Impact",
    text: "See every event you have joined in one place, sorted by date, so you never miss a good cause.",
  },
  {
    icon: "🛠️",
    title: "Manage Easily",
    text: "Update details or remove your own events whenever plans change. Only you can edit what you create.",
  },
];

export default function Features() {
  return (
    <section className="bg-base-200 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          title="Why UnityHands"
          subtitle="Everything you need to organise and join social service events, in one friendly place."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="card h-full bg-base-100 shadow-md">
              <div className="card-body items-center text-center">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="text-sm opacity-80">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}