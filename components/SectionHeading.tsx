export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-bold text-primary">{title}</h2>
      {subtitle ? (
        <p className="mx-auto mt-2 max-w-2xl opacity-70">{subtitle}</p>
      ) : null}
    </div>
  );
}