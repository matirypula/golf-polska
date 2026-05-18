import type { Venue } from "@/lib/venues";

export function VenueMap({ venue }: { venue: Venue }) {
  const query = encodeURIComponent(
    `${venue.name}, ${venue.address}, ${venue.city}, ${venue.region}`
  );

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm">
      <iframe
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        className="h-[420px] w-full"
        loading="lazy"
      />
    </div>
  );
}