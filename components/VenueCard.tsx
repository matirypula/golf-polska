import Link from "next/link";
import { MapPin, Star, Flag, Dumbbell, Hotel, Utensils } from "lucide-react";
import type { Venue } from "@/lib/venues";

export function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden">
        <img
  src={
    venue.image ||
    "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80"
  }
          alt={venue.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />

        <div className="absolute left-6 top-6">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow">
            {venue.type}
          </span>
        </div>

        <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow">
          <Star className="h-4 w-4" />
          {venue.rating}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-3xl font-black text-slate-950">
          {venue.name}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-lg text-slate-500">
          <MapPin className="h-5 w-5" />
          <span>
            {venue.city}, {venue.region}
          </span>
        </div>

        <p className="mt-5 line-clamp-2 text-lg leading-relaxed text-slate-600">
          {venue.description}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-slate-100 p-4 text-center">
            <div className="text-4xl font-black text-slate-950">
              {venue.holes}
            </div>

            <div className="mt-1 text-sm text-slate-500">
              dołków
            </div>
          </div>

          <div className="rounded-2xl bg-slate-100 p-4 text-center">
            <div className="text-4xl font-black text-slate-950">
              {venue.par}
            </div>

            <div className="mt-1 text-sm text-slate-500">
              par
            </div>
          </div>

          <div className="rounded-2xl bg-slate-100 p-4 text-center">
            <div className="text-4xl font-black text-slate-950">
              {venue.facilities.includes("Driving range") ? "tak" : "nie"}
            </div>

            <div className="mt-1 text-sm text-slate-500">
              range
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {venue.facilities.map((facility) => (
            <div
              key={facility}
              className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {facility === "Pole 18 dołków" && (
                <Flag className="h-4 w-4" />
              )}

              {facility === "Driving range" && (
                <Dumbbell className="h-4 w-4" />
              )}

              {facility === "Hotel" && (
                <Hotel className="h-4 w-4" />
              )}

              {facility === "Restauracja" && (
                <Utensils className="h-4 w-4" />
              )}

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