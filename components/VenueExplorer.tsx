"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VenueCard } from "@/components/VenueCard";
import type { Venue } from "@/lib/venues";

export function VenueExplorer({ venues }: { venues: Venue[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
const initialType = searchParams.get("type") || "Wszystkie";
  const [query, setQuery] = useState(
  searchParams.get("q") || ""
);
  const [region, setRegion] = useState(
  searchParams.get("region") || "Wszystkie"
);
  const [type, setType] = useState(initialType);
  const [facility, setFacility] = useState(
  searchParams.get("facility") || "Wszystkie"
);

  const regions = useMemo(() => {
    return [
      "Wszystkie",
      ...Array.from(
        new Set(
          venues
            .map((venue) => venue.region)
            .filter(Boolean)
        )
      ),
    ];
  }, [venues]);

  const types = useMemo(() => {
    return [
      "Wszystkie",
      ...Array.from(
        new Set(
          venues
            .map((venue) => venue.type)
            .filter(Boolean)
        )
      ),
    ];
  }, [venues]);

  const facilities = useMemo(() => {
    return [
      "Wszystkie",
      ...Array.from(
        new Set(
          venues
            .flatMap((venue) => venue.facilities || [])
            .filter(Boolean)
        )
      ),
    ];
  }, [venues]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return venues.filter((venue) => {
      const queryOk =
        !q ||
        venue.name?.toLowerCase().includes(q) ||
        venue.city?.toLowerCase().includes(q) ||
        venue.region?.toLowerCase().includes(q) ||
        venue.type?.toLowerCase().includes(q);

      const regionOk =
        region === "Wszystkie" || venue.region === region;

      const typeOk =
        type === "Wszystkie" || venue.type === type;

      const facilityOk =
        facility === "Wszystkie" ||
        (venue.facilities || []).includes(facility);

      return queryOk && regionOk && typeOk && facilityOk;
    });
  }, [venues, query, region, type, facility]);

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-12">
      <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <input
            value={query}
            onChange={(e) => {
  const value = e.target.value;

  setQuery(value);

  const params = new URLSearchParams(searchParams);

  if (!value) {
    params.delete("q");
  } else {
    params.set("q", value);
  }

  router.push(`/?${params.toString()}`);
}}
            placeholder="Szukaj: nazwa, miasto, województwo..."
            className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
          />

          <select
            value={region}
            onChange={(e) => {
  const value = e.target.value;

  setRegion(value);

  const params = new URLSearchParams(searchParams);

  if (value === "Wszystkie") {
    params.delete("region");
  } else {
    params.set("region", value);
  }

  router.push(`/?${params.toString()}`);
}}
            className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
          >
            {regions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) => {
  const value = e.target.value;

  setType(value);

  const params = new URLSearchParams(searchParams);

  if (value === "Wszystkie") {
    params.delete("type");
  } else {
    params.set("type", value);
  }

  router.push(`/?${params.toString()}`);
}}
            className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
          >
            {types.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={facility}
            onChange={(e) => {
  const value = e.target.value;

  setFacility(value);

  const params = new URLSearchParams(searchParams);

  if (value === "Wszystkie") {
    params.delete("facility");
  } else {
    params.set("facility", value);
  }

  router.push(`/?${params.toString()}`);
}}
            className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
          >
            {facilities.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-950">
            Obiekty golfowe
          </h2>
          <p className="mt-2 text-slate-500">
            Znaleziono: {filtered.length}
          </p>
        </div>

        {(query ||
          region !== "Wszystkie" ||
          type !== "Wszystkie" ||
          facility !== "Wszystkie") && (
          <button
            onClick={() => {
              setQuery("");
              setRegion("Wszystkie");
              setType("Wszystkie");
              setFacility("Wszystkie");
              router.push("/");
            }}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Wyczyść filtry
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((venue) => (
            <VenueCard key={venue.slug} venue={venue} />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h3 className="text-3xl font-black text-slate-950">
            Brak wyników
          </h3>
          <p className="mt-3 text-slate-500">
            Zmień wyszukiwanie albo wyczyść filtry.
          </p>
        </div>
      )}
    </section>
  );
}