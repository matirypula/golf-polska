import Link from "next/link";
import {
  MapPin,
  Star,
  Flag,
  Dumbbell,
  Hotel,
  Utensils,
  Sparkles,
} from "lucide-react";
import type { Venue } from "@/lib/venues";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80";

function FacilityIcon({ facility }: { facility: string }) {
  if (facility.includes("Driving")) return <Dumbbell className="h-4 w-4" />;
  if (facility.includes("Hotel")) return <Hotel className="h-4 w-4" />;
  if (facility.includes("Restauracja")) return <Utensils className="h-4 w-4" />;
  return <Flag className="h-4 w-4" />;
}

export function VenueCard({ venue }: { venue: Venue }) {
  const facilities = venue.facilities || [];
  const hasRange = facilities.includes("Driving range");

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden">
        <img
          src={venue.image || FALLBACK_IMAGE}
          alt={venue.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-slate-800 shadow backdrop-blur">
            {venue.type}
          </span>

          {venue.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-4 py-2 text-sm font-black text-white shadow">
              <Sparkles className="h-4 w-4" />
              Polecane
            </span>
          )}
        </div>

        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-slate-900 shadow backdrop-blur">
          <Star className="h-4 w-4" />
          {venue.rating || "—"}
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="line-clamp-2 text-3xl font-black leading-tight text-white">
            {venue.name}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-white/80">
            <MapPin className="h-5 w-5" />
            <span>
              {venue.city}, {venue.region}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="line-clamp-2 text-base leading-7 text-slate-600">
          {venue.description || "Opis obiektu do uzupełnienia."}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-slate-100 p-4 text-center">
            <div className="text-3xl font-black text-slate-950">
              {venue.holes || "—"}
            </div>
            <div className="mt-1 text-sm text-slate-500">dołków</div>
          </div>

          <div className="rounded-2xl bg-slate-100 p-4 text-center">
            <div className="text-3xl font-black text-slate-950">
              {venue.par || "—"}
            </div>
            <div className="mt-1 text-sm text-slate-500">par</div>
          </div>

          <div className="rounded-2xl bg-slate-100 p-4 text-center">
            <div className="text-3xl font-black text-slate-950">
              {hasRange ? "tak" : "—"}
            </div>
            <div className="mt-1 text-sm text-slate-500">range</div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {facilities.slice(0, 4).map((facility) => (
            <div
              key={facility}
              className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              <FacilityIcon facility={facility} />
              <span>{facility}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/obiekt/${venue.slug}`}
          className="mt-6 inline-flex w-full justify-center rounded-2xl bg-slate-950 px-5 py-4 text-lg font-bold text-white transition hover:bg-emerald-700"
        >
          Zobacz szczegóły
        </Link>
      </div>
    </article>
  );
}