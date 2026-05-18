import { VenueCard } from '@/components/VenueCard';
import { SearchBox } from '@/components/SearchBox';
import { getVenues, getFeaturedVenues } from "@/lib/venues";
import { VenueExplorer } from "@/components/VenueExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golf Polska — pola golfowe, resorty i driving range",
  description:
    "Największy katalog pól golfowych w Polsce. Znajdź pole golfowe, driving range, resort lub akademię golfa.",
  openGraph: {
    title: "Golf Polska",
    description:
      "Największy katalog pól golfowych w Polsce.",
  },
};

export default async function HomePage({
  
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  
  const venues = await getVenues();
const featuredVenues = await getFeaturedVenues();

  return (
    <main>
  <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
    <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white">
          G
        </div>
        <div>
          <div className="text-lg font-black leading-none">Golf Polska</div>
          <div className="text-xs text-slate-500">pola • range • akademie</div>
        </div>
      </div>

      <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
        <a href="#" className="hover:text-slate-950">Mapa</a>
        <a href="#" className="hover:text-slate-950">Pola golfowe</a>
        <a href="#" className="hover:text-slate-950">Driving range</a>
        <a href="#" className="hover:text-slate-950">Akademie</a>
      </nav>

      <a
        href="#"
        className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
      >
        Dodaj obiekt
      </a>
    </div>
  </header>
      <section
  className="relative overflow-hidden border-b border-slate-200 bg-slate-950"
  style={{
    backgroundImage:
      "linear-gradient(to bottom, rgba(2,6,23,0.45), rgba(2,6,23,0.92)), url(https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1800&q=80)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
        <div className="mx-auto max-w-[1400px] px-6 pt-36 pb-16">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur">
              Golf Polska
            </p>
            <h1 className="mt-10 max-w-5xl text-5xl font-black leading-[0.9] tracking-tight text-white md:text-7xl">
              Pola golfowe i driving range w Polsce
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-white/85">
              Katalog obiektów golfowych, akademii, resortów i miejsc treningowych.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
  {[
    ["120+", "Obiektów golfowych"],
    ["40+", "Driving range"],
    ["16", "Województw"],
    ["24/7", "Dostęp online"],
  ].map(([value, label]) => (
    <div
      key={label}
      className="rounded-3xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl"
    >
      <div className="text-3xl font-black text-white">{value}</div>
      <div className="mt-1 text-sm text-white/70">{label}</div>
    </div>
  ))}
</div>

          <div className="mt-8 max-w-5xl">
  <SearchBox defaultValue={params.q} />

  <div className="mt-5 flex flex-wrap gap-3">
    {[
      "Driving range",
      "Pole 18 dołków",
      "Akademia golfa",
      "Hotel",
      "Restauracja",
      "Dla początkujących",
    ].map((filter) => (
      <button
        key={filter}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
      >
        {filter}
      </button>
    ))}
  </div>
</div>
        </div>
      </section>
      <section className="mx-auto max-w-[1400px] px-6 py-10">
  <div className="mb-8 flex items-center justify-between">
    <div>
      <p className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600">
        Polecane
      </p>

      <h2 className="mt-2 text-4xl font-black text-slate-950">
        Polecane pola golfowe
      </h2>
    </div>
  </div>

  <div className="grid gap-6 md:grid-cols-3">
    {featuredVenues.map((venue) => (
      <VenueCard
        key={venue.slug}
        venue={venue}
      />
    ))}
  </div>
</section>
      <VenueExplorer venues={venues} />
    </main>
  );
}
