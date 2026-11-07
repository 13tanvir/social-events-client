export default function EventCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card bg-base-100 shadow-md">
          <div className="skeleton h-48 w-full rounded-b-none" />
          <div className="card-body gap-3">
            <div className="skeleton h-5 w-1/2" />
            <div className="skeleton h-6 w-3/4" />
            <div className="skeleton h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}