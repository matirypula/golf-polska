import { getVenueBySlug } from "@/lib/venues";
import { MapPin, Phone, Mail, Globe2, Star, Flag, Dumbbell, Hotel, Utensils } from "lucide-react";
import { VenueGallery } from "@/components/VenueGallery";
import { VenueMap } from "@/components/VenueMap";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolved = await params;

  const venue = await getVenueBySlug(resolved.slug);

  if (!venue) {
    return {
      title: "Obiekt nie istnieje",
    };
  }

  return {
    title: `${venue.name} | Golf Polska`,
    description:
      venue.description ||
      `${venue.name} — pole golfowe w ${venue.city}.`,
    openGraph: {
      title: `${venue.name} | Golf Polska`,
      description:
        venue.description ||
        `${venue.name} — pole golfowe w ${venue.city}.`,
      images: venue.images?.length
        ? venue.images
        : venue.image
        ? [venue.image]
        : [],
    },
  };
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const venue = await getVenueBySlug(slug);
if (!venue) {
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-5xl font-black text-slate-950">
          Nie znaleziono obiektu
        </h1>

        <p className="mt-4 text-xl text-slate-600">
          Ten obiekt nie istnieje albo ma niepoprawny adres URL.
        </p>

        <a
          href="/"
          className="mt-8 inline-flex rounded-2xl bg-slate-950 px-8 py-4 font-bold text-white"
        >
          Wróć do katalogu
        </a>
      </div>
    </main>
  );
}

  return (
  <>
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-2xl font-black text-white">
            G
          </div>

          <div>
            <div className="text-2xl font-black text-slate-950">
              Golf Polska
            </div>

            <div className="text-sm text-slate-500">
              pola • range • akademie
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-10 text-lg font-semibold text-slate-600 md:flex">
          <a href="/" className="transition hover:text-slate-950">
            Powrót do katalogu
          </a>
        </nav>
      </div>
    </header>

    <main className="min-h-screen bg-slate-50">
      <section
        className="relative overflow-hidden bg-slate-950 px-6 py-24"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(2,6,23,0.25), rgba(2,6,23,0.92)), url(${venue.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            {venue.type}
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            {venue.name}
          </h1>

          <p className="mt-5 flex items-center gap-2 text-xl text-white/80">
            <MapPin className="h-5 w-5" />
            {venue.city}, {venue.region}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
              <div className="text-3xl font-black text-white">{venue.holes}</div>
              <div className="text-sm text-white/70">dołków</div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
              <div className="text-3xl font-black text-white">{venue.par}</div>
              <div className="text-sm text-white/70">par</div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-3xl font-black text-white">
                <Star className="h-6 w-6" />
                {venue.rating}
              </div>
              <div className="text-sm text-white/70">ocena</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-12">
        <VenueGallery
  images={
    venue.images?.length
      ? venue.images
      : venue.image
      ? [venue.image]
      : []
  }
/>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-black">O obiekcie</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {venue.description}
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
  <h2 className="text-3xl font-black">Udogodnienia</h2>

  <div className="mt-6 grid gap-3 sm:grid-cols-2">
    {(venue.facilities || []).map((facility: string) => {
      const Icon = facility.includes("Driving")
        ? Dumbbell
        : facility.includes("Hotel")
        ? Hotel
        : facility.includes("Restauracja")
        ? Utensils
        : Flag;

      return (
        <div
          key={facility}
          className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-4 font-semibold text-slate-700"
        >
          <Icon className="h-5 w-5" />
          {facility}
        </div>
      );
    })}
  </div>
</div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-black">Mapa</h2>
            <div className="mt-6">
              <VenueMap venue={venue} />
            </div> 
          </div>
        </div>

        <aside className="space-y-5">
          <div className="sticky top-28 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Kontakt</h2>

            <div className="mt-5 space-y-4 text-slate-700">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-slate-500" />
                <span>{venue.address}</span>
              </div>

              <div className="flex gap-3">
                <Globe2 className="h-5 w-5 text-slate-500" />
                <span>Strona www do uzupełnienia</span>
              </div>

              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-slate-500" />
                <span>Telefon do uzupełnienia</span>
              </div>

              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-slate-500" />
                <span>Email do uzupełnienia</span>
              </div>
            </div>

            <a
              href="#"
              className="mt-6 inline-flex w-full justify-center rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white transition hover:bg-emerald-700"
            >
              Przejdź na stronę obiektu
            </a>

            <button className="mt-3 inline-flex w-full justify-center rounded-2xl border border-slate-200 bg-white px-5 py-4 font-bold text-slate-800 transition hover:bg-slate-50">
              Zaproponuj aktualizację danych
            </button>
            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
  <div className="text-sm font-bold uppercase tracking-wider text-emerald-600">
    Dostępność
  </div>

  <div className="mt-3 text-3xl font-black text-slate-950">
    Rezerwacje otwarte
  </div>

  <p className="mt-3 text-slate-600">
    Skontaktuj się z obiektem lub odwiedź oficjalną stronę,
    aby sprawdzić dostępne terminy gry.
  </p>

  <div className="mt-6 space-y-3">
    <button className="inline-flex w-full justify-center rounded-2xl bg-emerald-600 px-5 py-4 font-bold text-white transition hover:bg-emerald-700">
      Zarezerwuj tee time
    </button>

    <button className="inline-flex w-full justify-center rounded-2xl border border-slate-200 bg-white px-5 py-4 font-bold text-slate-950 transition hover:bg-slate-100">
      Zadzwoń do obiektu
    </button>
  </div>
</div>
          </div>
        </aside>
      </section>
    </main>
    </>
  );
}